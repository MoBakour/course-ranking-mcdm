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
import type { ExpertData, Ranking } from "../../types";

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface ChartsProps {
    data: ExpertData;
    ranking: Ranking[];
}

const Charts = ({ data, ranking }: ChartsProps) => {
    // Prepare ranking data
    const rankingData = {
        labels: ranking.map((item) => item.name),
        datasets: [
            {
                label: "Score",
                data: ranking.map((item) => item.score),
                backgroundColor: "rgba(136, 132, 216, 0.8)",
                borderColor: "rgba(136, 132, 216, 1)",
                borderWidth: 1,
            },
        ],
    };

    // Prepare expert weights data
    const expertWeightsData = {
        labels: data.experts.map((expert) => expert.name),
        datasets: [
            {
                label: "Expert Weights",
                data: data.experts.map((expert) => expert.weight || 0),
                backgroundColor: "rgba(136, 132, 216, 0.8)",
                borderColor: "rgba(136, 132, 216, 1)",
                borderWidth: 1,
            },
        ],
    };

    // Calculate average ratings for each criterion and alternative
    const averageRatings = data.criteria.map((_criterion, criterionIndex) => {
        return data.alternatives.map((_alternative, altIndex) => {
            const ratings = data.experts.map((expert) => {
                const rating =
                    expert.alternativeRatings[altIndex][criterionIndex];
                return (rating.phi + rating.neutral + rating.negative) / 3;
            });
            return ratings.reduce((a, b) => a + b, 0) / ratings.length;
        });
    });

    const averageRatingsData = {
        labels: data.alternatives.map((alt) => alt.name),
        datasets: data.criteria.map((criterion, index) => ({
            label: criterion?.name || (criterion as unknown as string),
            data: averageRatings[index],
            backgroundColor: [
                "rgba(33, 15, 55, 0.6)", // theme-100
                "rgba(79, 28, 81, 0.6)", // theme-200
                "rgba(165, 91, 75, 0.6)", // theme-300
                "rgba(220, 160, 109, 0.6)", // theme-400
            ][index % 4],
            borderColor: [
                "rgba(33, 15, 55, 1)", // theme-100
                "rgba(79, 28, 81, 1)", // theme-200
                "rgba(165, 91, 75, 1)", // theme-300
                "rgba(220, 160, 109, 1)", // theme-400
            ][index % 4],
            borderWidth: 1,
        })),
    };

    const rankingOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Alternative Rankings",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
            x: {
                ticks: {
                    display: false,
                },
            },
        },
    };

    const expertWeightsOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Expert Weights Distribution",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
            x: {
                ticks: {
                    display: false,
                },
            },
        },
    };

    const averageRatingsOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Average Ratings by Criterion",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
            x: {
                ticks: {
                    display: false,
                },
            },
        },
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold">Data Visualization</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/5 p-4 rounded-lg">
                    <Bar data={rankingData} options={rankingOptions} />
                </div>

                <div className="bg-white/5 p-4 rounded-lg">
                    <Bar
                        data={expertWeightsData}
                        options={expertWeightsOptions}
                    />
                </div>

                <div className="bg-white/5 p-4 rounded-lg md:col-span-2">
                    <Bar
                        data={averageRatingsData}
                        options={averageRatingsOptions}
                    />
                </div>
            </div>
        </div>
    );
};

export default Charts;
