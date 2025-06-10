export type PFS = {
    phi: number;
    neutral: number;
    negative: number;
};

export type Expert = {
    id: string; // TODO: optional
    name: string;
    weightLinguistic: string; // e.g., "Very important"
    weight?: number; // will be computed from linguistic
    criteriaRatings: PFS[]; // length = n criteria
    alternativeRatings: PFS[][]; // matrix [alternative][criterion]
};

export type Alternative = {
    id: string; // TODO: alternative had only name
    name: string;
    description: string;
};

export type Criteria = {
    // TODO: Criteria did not exist
    id: string;
    name: string;
    type: "Quantitative" | "Qualitative";
    benefitCost: "Benefit" | "Cost";
};

export interface Ranking {
    name: string;
    score: number;
}

export interface ExpertData {
    experts: Expert[];
    alternatives: Alternative[];
    criteria: Criteria[]; // TODO: this was string[]
    numCriteria: number;
    quantitativeMatrix: Record<string, Record<string, number>>; // TODO: this wasn't there
}

declare module "react" {
    interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
        webkitdirectory?: string;
    }
}
