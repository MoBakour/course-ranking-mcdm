import { useState } from "react";
import Upload from "../components/calculator/Upload";
import Results from "../components/calculator/Results";
import type { ExpertData, Ranking } from "../types";

const Calculator = () => {
    const [data, setData] = useState<ExpertData | null>(null);
    const [ranking, setRanking] = useState<Ranking[] | null>(null);

    return (
        <div className="flex flex-col gap-10">
            {data && ranking && <Results data={data} ranking={ranking} />}
            <Upload setData={setData} setRanking={setRanking} />
        </div>
    );
};

export default Calculator;
