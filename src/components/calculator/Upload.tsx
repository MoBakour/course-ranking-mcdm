import { useState } from "react";
import { FaArrowUpFromBracket } from "react-icons/fa6";
import {
    extractDataFromCSVString,
    extractDataFromFolder,
} from "../../utils/dataExtractor";
import { runPFS_CIMAS_ARTASI } from "../../utils/calculator";
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

        if (files && files.length === 1) {
            const fileContent = await files[0].text();
            data = extractDataFromCSVString(fileContent);
        } else if (files && files.length > 1) {
            const processedFiles = [...files];

            data = extractDataFromFolder({
                experts:
                    (await processedFiles
                        .find((file) => file.name === "experts.csv")
                        ?.text()) || "",
                criteria:
                    (await processedFiles
                        .find((file) => file.name === "criteria.csv")
                        ?.text()) || "",
                alternatives:
                    (await processedFiles
                        .find((file) => file.name === "alternatives.csv")
                        ?.text()) || "",
                criteriaEvals:
                    (await processedFiles
                        .find(
                            (file) =>
                                file.name ===
                                "expert-alternative-evaluation.csv"
                        )
                        ?.text()) || "",
            });
        } else {
            const expertsCount = +(prompt("Enter the number of experts") || 10);
            const fileContent = generateRandomSurveyCSV(expertsCount);
            data = extractDataFromCSVString(fileContent);
        }

        // const data = extractDataFromCSVString(fileContent);
        setData(data);

        console.log("DATA");
        console.log(data);

        const ranked = runPFS_CIMAS_ARTASI(
            data.experts,
            data.alternatives,
            data.numCriteria
        );

        console.log(ranked);
        setRanking(ranked);
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
