import Papa from "papaparse";
import type { PFS } from "../types";
import { linguisticScale } from "./calculator";

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
    const expertImportanceCol = header[1];
    let criteriaStart = 2;
    let criteriaEnd = criteriaStart;

    const criterias: string[] = [];

    while (
        criteriaEnd < header.length &&
        header[criteriaEnd].includes("How important is the criterion")
    ) {
        const quote = header[criteriaEnd].includes("'") ? "'" : '"';
        criterias.push(header[criteriaEnd].split(quote)[1]);
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
            name: `Expert ${expertIdx + 1}`,
            weightLinguistic,
            criteriaRatings,
            alternativeRatings,
        };
    });

    return { experts, alternatives, numCriteria, criterias };
}
