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
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.DragEvent<HTMLLabelElement>,
        file: File
    ) => {
        e.preventDefault();

        if (file) {
            const fileContent = await file.text();
            // const fileContent = generateRandomSurveyCSV(10); // for testing

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
        }
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
        <div>
            <label
                onDrop={handleFileDrop}
                onDragOver={(e) => handleDrag(e, true)}
                onDragLeave={(e) => handleDrag(e, false)}
                className={`flex flex-col justify-center items-center gap-2 border-dashed border-2 opacity-30 text-lg rounded-md h-32 transition hover:opacity-50 cursor-pointer ${
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
        </div>
    );
};

export default Upload;
