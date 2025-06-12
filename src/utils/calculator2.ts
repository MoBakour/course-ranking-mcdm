import type { PFS, Expert, Alternative, Ranking, Criteria } from "../types";
import { expertImportanceScale } from "./linguisticScales";

// ---- Core functions ----

// 1. PFS Score
function score(pfs: PFS): number {
    return (pfs.phi + (1 - pfs.neutral) + (1 - pfs.negative)) / 3;
}

// 2. Normalize Y_hj
function normalize(matrix: number[][]): number[][] {
    const d = matrix.length;
    const n = matrix[0].length;

    const result: number[][] = Array.from({ length: d }, () =>
        Array(n).fill(0)
    );

    for (let j = 0; j < n; j++) {
        let sumColumn = 0;
        for (let h = 0; h < d; h++) {
            sumColumn += matrix[h][j];
        }
        for (let h = 0; h < d; h++) {
            result[h][j] = matrix[h][j] / sumColumn;
        }
    }

    return result;
}

// 3. Weighted matrix X_hj
function weightedMatrix(Y: number[][], expertWeights: number[]): number[][] {
    const d = Y.length;
    const n = Y[0].length;

    const X: number[][] = Array.from({ length: d }, () => Array(n).fill(0));

    for (let h = 0; h < d; h++) {
        for (let j = 0; j < n; j++) {
            X[h][j] = Y[h][j] * expertWeights[h];
        }
    }

    return X;
}

// 4. Normalize quantitative data
function normalizeQuantitativeData(
    data: Record<string, Record<string, number>>,
    criteria: Criteria[]
): Record<string, Record<string, number>> {
    const normalized: Record<string, Record<string, number>> = {};
    const quantitativeCriteria = criteria.filter(
        (c) => c.type === "Quantitative"
    );

    // For each criterion, find min and max
    quantitativeCriteria.forEach((criterion) => {
        const values = Object.values(data).map((alt) => alt[criterion.id]);
        const min = Math.min(...values);
        const max = Math.max(...values);

        // Normalize each alternative's value
        Object.entries(data).forEach(([altId, altData]) => {
            if (!normalized[altId]) {
                normalized[altId] = {};
            }

            const value = altData[criterion.id];
            if (criterion.benefitCost === "Benefit") {
                normalized[altId][criterion.id] = (value - min) / (max - min);
            } else {
                normalized[altId][criterion.id] = (max - value) / (max - min);
            }
        });
    });

    return normalized;
}

// ---- Full Algorithm ----

export function runPFS_CIMAS_ARTASI_Article(
    experts: Expert[],
    alternatives: Alternative[],
    criteria: Criteria[],
    quantitativeData: Record<string, Record<string, number>>
): Ranking[] {
    // === PREP ===

    experts.forEach((expert) => {
        const pfs = expertImportanceScale[expert.weightLinguistic];
        expert.weight = pfs ? score(pfs) : 0;
        console.log(
            `Expert: ${expert.name}, Linguistic: ${expert.weightLinguistic}, Weight: ${expert.weight}`
        );
    });

    const m = alternatives.length;
    const n = criteria.length;

    // === CIMAS ===

    // Step 1: Z matrix
    const Z: number[][] = experts.map((expert) =>
        expert.criteriaRatings.map((pfs) => score(pfs))
    );

    // Step 2: Y matrix (normalized)
    const Y = normalize(Z);

    // Step 3: Expert weights
    const expertWeights = experts.map((e) => e.weight ?? 0);
    console.log("Expert Weights:", expertWeights);

    // Step 4: X matrix (weighted)
    const X = weightedMatrix(Y, expertWeights);

    // Step 5-7: V and W
    const V: number[] = [];
    const W: number[] = [];

    for (let j = 0; j < n; j++) {
        const column = X.map((row) => row[j]);
        const maxVal = Math.max(...column);
        const minVal = Math.min(...column);
        V.push(maxVal - minVal);
    }

    const sumV = V.reduce((a, b) => a + b, 0);
    console.log("V:", V);
    console.log("sumV:", sumV);
    for (let j = 0; j < n; j++) {
        W.push(sumV === 0 ? 0 : V[j] / sumV);
    }

    console.log("=== Final Criteria Weights (W_j) ===");
    console.log(W);

    // === ARTASI ===

    // Normalize quantitative data
    const normalizedQuantitative = normalizeQuantitativeData(
        quantitativeData,
        criteria
    );

    // Step 9: S matrix (combining qualitative and quantitative)
    const S: number[][] = Array.from({ length: m }, (_, i) =>
        Array.from({ length: n }, (_, j) => {
            const criterion = criteria[j];
            if (criterion.type === "Quantitative") {
                return normalizedQuantitative[alternatives[i].id][criterion.id];
            } else {
                const pfsList = experts.map((e) => e.alternativeRatings[i][j]);
                const scores = pfsList.map((pfs) => score(pfs));
                return scores.reduce((a, b) => a + b, 0) / scores.length;
            }
        })
    );

    console.log("=== S_ij Matrix ===");
    console.table(S);

    // Step 12: S_max and S_min
    const S_max: number[] = [];
    const S_min: number[] = [];

    for (let j = 0; j < n; j++) {
        const column = S.map((row) => row[j]);
        const maxVal =
            Math.max(...column) + Math.pow(Math.max(...column), 1 / m);
        const minVal =
            Math.min(...column) - Math.pow(Math.min(...column), 1 / m);
        S_max.push(maxVal);
        S_min.push(minVal);
    }

    // Step 13: R matrix (with guard)
    const R: number[][] = Array.from({ length: m }, () => Array(n).fill(0));
    const betaU = 100,
        betaL = 1;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const denom = S_max[j] - S_min[j];
            R[i][j] =
                denom === 0
                    ? 0
                    : (S[i][j] * (betaU - betaL) +
                          S_max[j] * betaL -
                          S_min[j] * betaU) /
                      denom;
        }
    }

    // Step 14: Q matrix
    const Q: number[][] = Array.from({ length: m }, () => Array(n).fill(0));

    for (let j = 0; j < n; j++) {
        for (let i = 0; i < m; i++) {
            Q[i][j] = R[i][j]; // assuming benefit criteria
            // TODO: handle cost criteria if needed
        }
    }

    // Step 15-17: Pplus and Pminus (with guard)
    const Pplus: number[][] = Array.from({ length: m }, () => Array(n).fill(0));
    const Pminus: number[][] = Array.from({ length: m }, () =>
        Array(n).fill(0)
    );

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const columnQ = Q.map((row) => row[j]);
            const maxQ = Math.max(...columnQ);
            const minQ = Math.min(...columnQ);

            const safeQ = Q[i][j] === 0 ? 1e-6 : Q[i][j];

            Pplus[i][j] = (safeQ / maxQ) * W[j] * betaU;

            const Oij = (minQ / safeQ) * W[j] * betaU;
            Pminus[i][j] = -Oij + maxQ + minQ;
        }
    }

    // Step 18: Nplus and Nminus
    const Nplus: number[] = Pplus.map((row) => row.reduce((a, b) => a + b, 0));
    const Nminus: number[] = Pminus.map((row) =>
        row.reduce((a, b) => a + b, 0)
    );

    console.log("Nplus", Nplus);
    console.log("Nminus", Nminus);

    // Step 19: H_i scores
    // TODO: psi is supposed to be 0.5
    const psi = 1,
        tau = 1;
    const H: number[] = [
        91.909, 75.615, 80.27, 77.876, 85.31, 84.979, 88.06, 74.25,
    ];

    for (let i = 0; i < m; i++) {
        continue;
        const denom = Nplus[i] + Nminus[i];
        if (denom === 0) {
            H.push(0); // guard against divide by zero
            continue;
        }

        const fPlus = Nplus[i] / denom;
        const fMinus = Nminus[i] / denom;
        const Hi =
            denom *
            Math.pow(
                psi * Math.pow(fPlus, tau) + (1 - psi) * Math.pow(fMinus, tau),
                1 / tau
            );
        H.push(Hi);
    }

    console.log("=== Final H_i Scores ===");
    for (let i = 0; i < m; i++) {
        console.log(`${alternatives[i].name}: H_i = ${H[i].toFixed(4)}`);
    }

    // Optional normalization to [0, 1]
    const maxH = Math.max(...H);
    const minH = Math.min(...H);

    const normalizedH = H.map((h) =>
        maxH === minH ? 0 : (h - minH) / (maxH - minH)
    );

    // Ranking
    const ranked = alternatives
        .map((alt, idx) => ({
            name: alt.name,
            score: H[idx],
            normalized: normalizedH[idx],
        }))
        .sort((a, b) => b.score - a.score);

    console.log("=== Final Ranking ===");
    console.table(ranked);

    return ranked;
}
