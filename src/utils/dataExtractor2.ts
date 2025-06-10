import Papa from "papaparse";
import type { PFS, Expert, Alternative, Criteria } from "../types";
import {
    linguisticScale,
    expertImportanceScale,
    getLingusticFromAbbreviation,
} from "./linguisticScales";

interface ArticleData {
    experts: string;
    criteria: string;
    alternatives: string;
    expertAlternativeEval: string;
    quantitativeData: string;
    criteriaEvalR1: string;
    criteriaEvalR2: string;
}

export function extractDataFromArticleFiles(data: ArticleData) {
    // Parse experts
    const expertsResult = Papa.parse(data.experts, {
        header: true,
        skipEmptyLines: true,
    });
    const expertsData = expertsResult.data as Record<string, string>[];

    // Parse criteria
    const criteriaResult = Papa.parse(data.criteria, {
        header: true,
        skipEmptyLines: true,
    });
    const criteriaData = criteriaResult.data as Record<string, string>[];

    // Parse alternatives
    const alternativesResult = Papa.parse(data.alternatives, {
        header: true,
        skipEmptyLines: true,
    });
    const alternativesData = alternativesResult.data as Record<
        string,
        string
    >[];

    // Parse quantitative data
    const quantitativeResult = Papa.parse(data.quantitativeData, {
        header: true,
        skipEmptyLines: true,
    });
    const quantitativeData = quantitativeResult.data as Record<
        string,
        string
    >[];

    // Parse expert-alternative evaluations
    const expertAltEvalResult = Papa.parse(data.expertAlternativeEval, {
        header: true,
        skipEmptyLines: true,
    });
    const expertAltEvalData = expertAltEvalResult.data as Record<
        string,
        string
    >[];

    // Parse criteria evaluations (R1)
    const criteriaEvalR1Result = Papa.parse(data.criteriaEvalR1, {
        header: true,
        skipEmptyLines: true,
    });
    const criteriaEvalR1Data = criteriaEvalR1Result.data as Record<
        string,
        string
    >[];

    // TODO: fix this
    // Parse criteria evaluations (R2)
    // const criteriaEvalR2Result = Papa.parse(data.criteriaEvalR2, {
    //     header: true,
    //     skipEmptyLines: true,
    // });
    // const criteriaEvalR2Data = criteriaEvalR2Result.data as Record<
    //     string,
    //     string
    // >[];

    // Create criteria array with type information
    const criteria: Criteria[] = criteriaData.map((crit) => ({
        id: crit.Criteria_ID,
        name: crit.Criteria_Name,
        type: crit.Type as "Quantitative" | "Qualitative",
        benefitCost: crit.Benefit_Cost as "Benefit" | "Cost",
    }));

    // Create alternatives array
    const alternatives: Alternative[] = alternativesData.map((alt) => ({
        id: alt.Alternative_ID,
        name: alt.Alternative_Name,
        description: alt.Description,
    }));

    // Create experts array with required format
    const experts: Expert[] = expertsData.map((expert) => {
        // Get all evaluations for this expert
        const expertEvals = expertAltEvalData.filter(
            (row) => row.Expert_ID === expert.Expert_ID
        );

        // Get criteria importance evaluations from R1
        const criteriaRatings: PFS[] = criteriaData.map((criterion) => {
            const evaluation = criteriaEvalR1Data.find(
                (e) =>
                    e.Expert_ID === expert.Expert_ID &&
                    e.Criteria_ID === criterion.Criteria_ID
            );

            return linguisticScale[
                getLingusticFromAbbreviation(
                    evaluation?.Evaluation || "M",
                    linguisticScale
                )
            ];
        });

        // Get alternative evaluations
        const alternativeRatings: PFS[][] = alternativesData.map(
            (alternative) => {
                return criteriaData.map((criterion) => {
                    const evaluation = expertEvals.find(
                        (e) =>
                            e.Expert_ID === expert.Expert_ID &&
                            e.Criteria_ID === criterion.Criteria_ID &&
                            e.Alternative_ID === alternative.Alternative_ID
                    );

                    return linguisticScale[
                        getLingusticFromAbbreviation(
                            evaluation?.Evaluation || "M",
                            linguisticScale
                        )
                    ];
                });
            }
        );

        return {
            id: expert.Expert_ID,
            name: expert.Expert_Name,
            weightLinguistic: getLingusticFromAbbreviation(
                expert.Importance_Level || "M",
                expertImportanceScale
            ),
            criteriaRatings,
            alternativeRatings,
        };
    });

    // Create quantitative data matrix
    const quantitativeMatrix: Record<string, Record<string, number>> = {};
    alternativesData.forEach((alt) => {
        quantitativeMatrix[alt.Alternative_ID] = {};
        criteriaData
            .filter((crit) => crit.Type === "Quantitative")
            .forEach((crit) => {
                const value = quantitativeData.find(
                    (row) =>
                        row.Alternative_ID === alt.Alternative_ID &&
                        row.Criteria_ID === crit.Criteria_ID
                );
                quantitativeMatrix[alt.Alternative_ID][crit.Criteria_ID] = value
                    ? parseFloat(value.Value)
                    : 0;
            });
    });

    return {
        experts,
        alternatives,
        criteria,
        quantitativeMatrix,
    };
}
