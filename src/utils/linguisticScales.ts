import type { PFS } from "../types";

export const linguisticScale: Record<string, PFS> = {
    "Extremely Good (EG)": { phi: 0.995, neutral: 0.0, negative: 0.0 },
    "Very Very Good (VVG)": { phi: 0.825, neutral: 0.015, negative: 0.015 },
    "Very Good (VG)": { phi: 0.755, neutral: 0.043, negative: 0.05 },
    "Good (G)": { phi: 0.65, neutral: 0.131, negative: 0.137 },
    "Medium Good (MG)": { phi: 0.51, neutral: 0.135, negative: 0.25 },
    "Medium (M)": { phi: 0.26, neutral: 0.26, negative: 0.26 },
    "Medium Bad (MB)": { phi: 0.225, neutral: 0.39, negative: 0.263 },
    "Bad (B)": { phi: 0.15, neutral: 0.4, negative: 0.295 },
    "Very Bad (VB)": { phi: 0.06, neutral: 0.41, negative: 0.4 },
    "Very Very Bad (VVB)": { phi: 0.04, neutral: 0.4, negative: 0.4 },
};

// ---- Expert Importance Linguistic Scale (from table) ----
export const expertImportanceScale: Record<string, PFS> = {
    "Very Important (VI)": { phi: 0.7, neutral: 0.01, negative: 0.01 },
    "Important (I)": { phi: 0.6, neutral: 0.035, negative: 0.03 },
    "Medium (M)": { phi: 0.26, neutral: 0.26, negative: 0.26 },
    "Unimportant (UI)": { phi: 0.21, neutral: 0.27, negative: 0.325 },
    "Very Unimportant (VUI)": { phi: 0.015, neutral: 0.397, negative: 0.397 },
};

export const getLinguisticLabel = (scale: Record<string, PFS>, pfs: PFS) => {
    return Object.entries(scale).find(([_, scalePfs]) => {
        return (
            pfs.phi === scalePfs.phi &&
            pfs.neutral === scalePfs.neutral &&
            pfs.negative === scalePfs.negative
        );
    })?.[0];
};

// This translates abbreviation such as (VI) to the full name
export const getLingusticFromAbbreviation = (
    abbreviation: string,
    scale: Record<string, PFS>
) => {
    return (
        Object.entries(scale).find(([key, _]) => {
            return key.includes(`(${abbreviation})`);
        })?.[0] || "Medium (M)"
    );
};
