import { useState } from "react";
import { FaArrowUpFromBracket } from "react-icons/fa6";
import {
    extractDataFromCSVString,
    extractDataFromFolder,
} from "../../utils/dataExtractor";
import { extractDataFromArticleFiles } from "../../utils/dataExtractor2";
import { runPFS_CIMAS_ARTASI } from "../../utils/calculator";
import { runPFS_CIMAS_ARTASI_Article } from "../../utils/calculator2";
import { generateRandomSurveyCSV } from "../../utils/generateRandomData";
import type { ExpertData, Ranking } from "../../types";

interface UploadProps {
    setData: (data: ExpertData) => void;
    setRanking: (ranking: Ranking[]) => void;
}

const Upload = ({ setData, setRanking }: UploadProps) => {
    const [dragging, setDragging] = useState(false);

    const processFile = async (
        e?:
            | React.ChangeEvent<HTMLInputElement>
            | React.DragEvent<HTMLLabelElement>,
        files?: FileList
    ) => {
        if (e) {
            e.preventDefault();
        }

        console.log("FILES", files);

        let data: any;
        let ranking: Ranking[];

        if (files && files.length === 1) {
            // Single file upload - use old format
            const fileContent = await files[0].text();
            data = extractDataFromCSVString(fileContent);
            ranking = runPFS_CIMAS_ARTASI(
                data.experts,
                data.alternatives,
                data.numCriteria
            );
        } else if (files && files.length > 1) {
            // Multiple files - check if it's article data format
            const processedFiles = [...files];
            const fileNames = processedFiles.map((f) => f.name);

            const readFile = async (name: string) => {
                const file = processedFiles.find((file) => file.name === name);
                return file ? await file.text() : "";
            };

            // Check if all required article data files are present
            const requiredFiles = [
                "experts.csv",
                "criteria.csv",
                "alternatives.csv",
                "expert-alternative-evaluation.csv",
                "quantitative-data.csv",
                "criteria-eval-r1.csv",
                "criteria-eval-r2.csv",
            ];

            const hasAllArticleFiles = requiredFiles.every((file) =>
                fileNames.includes(file)
            );

            if (hasAllArticleFiles) {
                // Use article data format
                data = extractDataFromArticleFiles({
                    experts: await readFile("experts.csv"),
                    criteria: await readFile("criteria.csv"),
                    alternatives: await readFile("alternatives.csv"),
                    expertAlternativeEval: await readFile(
                        "expert-alternative-evaluation.csv"
                    ),
                    quantitativeData: await readFile("quantitative-data.csv"),
                    criteriaEvalR1: await readFile("criteria-eval-r1.csv"),
                    criteriaEvalR2: await readFile("criteria-eval-r2.csv"),
                });

                ranking = runPFS_CIMAS_ARTASI_Article(
                    data.experts,
                    data.alternatives,
                    data.criteria,
                    data.quantitativeMatrix
                );
            } else {
                // Use old folder format
                data = extractDataFromFolder({
                    experts: await readFile("experts.csv"),
                    criteria: await readFile("criteria.csv"),
                    alternatives: await readFile("alternatives.csv"),
                    criteriaEvals: await readFile(
                        "expert-alternative-evaluation.csv"
                    ),
                });

                ranking = runPFS_CIMAS_ARTASI(
                    data.experts,
                    data.alternatives,
                    data.numCriteria
                );
            }
        } else {
            // Generate random data
            const expertsCount = +(prompt("Enter the number of experts") || 10);
            const fileContent = generateRandomSurveyCSV(expertsCount);
            data = extractDataFromCSVString(fileContent);
            ranking = runPFS_CIMAS_ARTASI(
                data.experts,
                data.alternatives,
                data.numCriteria
            );
        }

        console.log("DATA", data);
        setData(data);
        setRanking(ranking);
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            processFile(e, files);
        }
    };

    const handleFileDrop = async (e: React.DragEvent<HTMLLabelElement>) => {
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            processFile(e, files);
        }
    };

    const handleDrag = (
        e: React.DragEvent<HTMLLabelElement>,
        status: boolean
    ) => {
        e.preventDefault();
        setDragging(status);
    };

    return (
        <div className="flex flex-col items-center gap-5">
            <label
                onDrop={handleFileDrop}
                onDragOver={(e) => handleDrag(e, true)}
                onDragLeave={(e) => handleDrag(e, false)}
                className={`w-full flex flex-col justify-center items-center gap-2 border-dashed border-2 opacity-30 text-lg rounded-md h-32 transition hover:opacity-50 cursor-pointer ${
                    dragging ? "opacity-50" : ""
                }`}
            >
                <input
                    onChange={handleFileChange}
                    multiple
                    type="file"
                    accept=".csv"
                    className="hidden"
                />
                <FaArrowUpFromBracket />
                <span>Upload Expert Data (.csv)</span>
                <span className="text-sm">
                    Single file or multiple files (experts.csv, criteria.csv,
                    etc.)
                </span>
            </label>

            <button
                className="bg-theme-400 w-fit px-4 py-2 rounded-md text-sm hover:scale-102 transition cursor-pointer"
                onClick={() => processFile()}
            >
                Or test with random data
            </button>
        </div>
    );
};

export default Upload;
