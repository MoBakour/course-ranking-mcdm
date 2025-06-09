import { useEffect, useMemo } from "react";
import { FaArrowLeft } from "react-icons/fa";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { ExpertData } from "../../types";
import {
    linguisticScale,
    getLinguisticLabel,
} from "../../utils/linguisticScales";

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

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

            <div className="flex justify-center items-center gap-12 flex-wrap">
                {criteriaData.map((criterion, idx) => {
                    const chartData = {
                        labels: criterion.data.map((item) => item.rating),
                        datasets: [
                            {
                                label: "Experts",
                                data: criterion.data.map((item) => item.count),
                                backgroundColor: "#8884d8",
                            },
                        ],
                    };

                    const options = {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: "top" as const,
                            },
                            title: {
                                display: true,
                                text: data.criterias[idx],
                            },
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    stepSize: 1,
                                },
                            },
                        },
                    };

                    return (
                        <div key={idx}>
                            <Bar data={chartData} options={options} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Details;
