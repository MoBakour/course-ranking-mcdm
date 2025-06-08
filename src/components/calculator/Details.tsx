import { useEffect, useMemo } from "react";
import { FaArrowLeft } from "react-icons/fa";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import type { ExpertData } from "../../types";
import { linguisticScale, getLinguisticLabel } from "../../utils/calculator";

interface DetailsProps {
    data: ExpertData;
    details: string;
    setDetails: (course: string | null) => void;
}

const linguisticOrder = Object.keys(linguisticScale).map((label) =>
    label.split(" ").at(-1)
);

const Details = ({ data, details, setDetails }: DetailsProps) => {
    const criteriaData = useMemo(() => {
        const chartData = [];

        // find index of alternative
        const alternativeIndex = data.alternatives.findIndex(
            (alternative) => alternative.name === details
        );

        // For each criterion
        for (let i = 0; i < data.numCriteria; i++) {
            // Count occurrences of each linguistic value
            const counts: Record<string, number> = {};

            data.experts.forEach((expert) => {
                const rating = expert.alternativeRatings[alternativeIndex][i];

                const linguisticValue =
                    getLinguisticLabel(linguisticScale, rating) || "Unknown";
                counts[linguisticValue] = (counts[linguisticValue] || 0) + 1;
            });

            // Convert counts to chart data format
            const criterionData = Object.entries(counts)
                .map(([rating, count]) => ({
                    rating: rating.split(" ").at(-1),
                    count,
                }))
                .sort((a, b) => {
                    return (
                        linguisticOrder.indexOf(a.rating || "") -
                        linguisticOrder.indexOf(b.rating || "")
                    );
                });

            chartData.push({
                criterionIndex: i,
                data: criterionData,
            });
        }

        return chartData;
    }, [data]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="space-y-8">
            <button
                onClick={() => setDetails(null)}
                className="text-theme-400 hover:text-theme-500 flex items-center gap-2 cursor-pointer transition hover:opacity-70"
                title="Back"
            >
                <FaArrowLeft className="w-4 h-4" />
                <span>Back</span>
            </button>

            <h2 className="text-2xl font-bold">{details}</h2>

            {/* lingustic scale */}
            <div className="grid grid-cols-5 max-[900px]:grid-cols-3 max-[600px]:grid-cols-2">
                {Object.keys(linguisticScale).map((label) => (
                    <p key={label} className="text-xs text-white/50">
                        {label.split(" ").at(-1)}{" "}
                        {label.split(" ").slice(0, -1).join(" ")}
                    </p>
                ))}
            </div>

            <div className="flex flex-col justify-center items-center gap-10">
                {criteriaData.map((criterion, idx) => (
                    <div key={idx} className="">
                        <h2 className="text-xl mb-4">{data.criterias[idx]}</h2>
                        <BarChart
                            width={600}
                            height={200}
                            data={criterion.data}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="rating" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="count"
                                fill="#8884d8"
                                name="Experts"
                            />
                        </BarChart>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Details;
