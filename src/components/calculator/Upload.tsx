import { useState } from "react";
import { FaArrowUpFromBracket } from "react-icons/fa6";
import { extractDataFromCSVString } from "../../utils/dataExtractor";
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
        file?: File
    ) => {
        if (e) {
            e.preventDefault();
        }

        let fileContent: string;

        if (file) {
            fileContent = await file.text();
        } else {
            const expertsCount = +(prompt("Enter the number of experts") || 10);
            fileContent = generateRandomSurveyCSV(expertsCount);
        }

        const data = extractDataFromCSVString(fileContent);
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
        const file = e.target.files?.[0];
        if (file) {
            processFile(e, file);
        }
    };

    const handleFileDrop = async (e: React.DragEvent<HTMLLabelElement>) => {
        const file = e.dataTransfer.files[0];
        if (file) {
            processFile(e, file);
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
