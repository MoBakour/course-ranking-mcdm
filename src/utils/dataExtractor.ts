import Papa from "papaparse";
import type { PFS } from "../types";
import {
    linguisticScale,
    expertImportanceScale,
    getLingusticFromAbbreviation,
} from "./linguisticScales";

const extractCourseName = (header: string, index: number) => {
    const parts = header.split("-");
    if (parts.length > 1) {
        return parts[0].trim();
    }
    return `Course ${index}`;
};

export function extractDataFromCSVString(csvString: string) {
    const result = Papa.parse(csvString, {
        header: true,
        skipEmptyLines: true,
    });
    const records = result.data as Record<string, string>[];

    const header = Object.keys(records[0]);
    const expertImportanceCol = header[2];
    let criteriaStart = 3;
    let criteriaEnd = criteriaStart;

    const criteria: string[] = [];

    while (
        criteriaEnd < header.length &&
        header[criteriaEnd].includes("How important is the criterion")
    ) {
        const quote = header[criteriaEnd].includes("'") ? "'" : '"';
        criteria.push(header[criteriaEnd].split(quote)[1]);
        criteriaEnd++;
    }

    const numCriteria = criteriaEnd - criteriaStart;
    const altRatingStart = criteriaEnd;
    const numAltRatings = header.length - altRatingStart;
    const numAlternatives = Math.floor(numAltRatings / numCriteria);

    const alternatives = Array.from({ length: numAlternatives }, (_, i) => ({
        name: extractCourseName(header[altRatingStart + i * numCriteria], i),
    }));

    const experts = records.map((row: any, expertIdx: number) => {
        const weightLinguistic = row[expertImportanceCol];
        const criteriaRatings: PFS[] = [];

        for (let i = 0; i < numCriteria; i++) {
            const label = row[header[criteriaStart + i]];
            criteriaRatings.push(linguisticScale[label]);
        }

        const alternativeRatings: PFS[][] = [];

        for (let alt = 0; alt < numAlternatives; alt++) {
            const altRatings: PFS[] = [];

            for (let crit = 0; crit < numCriteria; crit++) {
                const colIdx = altRatingStart + alt * numCriteria + crit;
                const label = row[header[colIdx]];
                altRatings.push(linguisticScale[label]);
            }

            alternativeRatings.push(altRatings);
        }

        return {
            name: row["What is your name?"] || `Expert ${expertIdx + 1}`,
            weightLinguistic,
            criteriaRatings,
            alternativeRatings,
        };
    });

    return { experts, alternatives, numCriteria, criteria };
}

interface FolderData {
    experts: string;
    criteria: string;
    alternatives: string;
    criteriaEvals: string;
}

export function extractDataFromFolder(data: FolderData) {
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

    // Parse criteria evaluations
    const criteriaEvalsResult = Papa.parse(data.criteriaEvals, {
        header: true,
        skipEmptyLines: true,
    });
    const criteriaEvalsData = criteriaEvalsResult.data as Record<
        string,
        string
    >[];

    // Create experts array with required format
    const experts = expertsData.map((expert) => {
        // Get all evaluations for this expert
        const expertEvals = criteriaEvalsData.filter(
            (row) => row.Expert_ID === expert.Expert_ID
        );

        // Get criteria importance evaluations
        const criteriaRatings: PFS[] = criteriaData.map((criterion) => {
            const evaluation = expertEvals.find(
                (e) =>
                    e.Criteria_ID === criterion.Criteria_ID && !e.Alternative_ID // Only criteria importance evaluations
            );

            return linguisticScale[
                getLingusticFromAbbreviation(
                    evaluation?.Evaluation || "M",
                    linguisticScale
                )
            ];
        }) as PFS[];

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
            name: expert.Expert_Name,
            weightLinguistic: getLingusticFromAbbreviation(
                expert.Importance_Level || "M",
                expertImportanceScale
            ),
            criteriaRatings,
            alternativeRatings,
        };
    });

    // Create alternatives array with required format
    const alternatives = alternativesData.map((alt) => ({
        name: alt.Alternative_Name,
    }));

    // Create criteria array
    const criteria = criteriaData.map((crit) => crit.Criteria_Name);

    return {
        experts,
        alternatives,
        numCriteria: criteriaData.length,
        criteria,
    };
}
