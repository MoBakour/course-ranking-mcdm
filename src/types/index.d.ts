export type PFS = {
    phi: number;
    neutral: number;
    negative: number;
};

export type Expert = {
    name: string;
    weightLinguistic: string; // e.g., "Very important"
    weight?: number; // will be computed from linguistic
    criteriaRatings: PFS[]; // length = n criteria
    alternativeRatings: PFS[][]; // matrix [alternative][criterion]
};

export type Alternative = {
    name: string;
};

export interface Ranking {
    name: string;
    score: number;
}

export interface ExpertData {
    experts: Expert[];
    alternatives: Alternative[];
    numCriteria: number;
    criterias: string[];
}

declare module "react" {
    interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
        webkitdirectory?: string;
    }
}
