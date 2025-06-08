import type { Ranking } from "../../types";

interface TableProps {
    data: Ranking[];
    setDetails: (course: string | null) => void;
}

const Table = ({ data, setDetails }: TableProps) => {
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="w-full bg-theme-200/25 backdrop-blur-xl rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-theme-300 text-sm">
                            <th className="px-6 py-3 text-left font-semibold">
                                Rank
                            </th>
                            <th className="px-6 py-3 text-left font-semibold">
                                Course Name
                            </th>
                            <th className="px-6 py-3 text-left font-semibold">
                                Score
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item: Ranking, index: number) => (
                            <tr
                                onClick={() => setDetails(item.name)}
                                key={index}
                                className="border-t border-theme-300 text-sm transition hover:bg-theme-300/15 hover:scale-102 cursor-pointer"
                            >
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">{item.name}</td>
                                <td className="px-6 py-4 text-sm">
                                    {(item.score * 100).toFixed(2)}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
