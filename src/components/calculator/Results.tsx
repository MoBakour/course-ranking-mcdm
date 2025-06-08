import { useState } from "react";
import Table from "./Table";
import Details from "./Details";
import Charts from "./Charts";
import type { ExpertData, Ranking } from "../../types";

interface ResultsProps {
    data: ExpertData;
    ranking: Ranking[];
}

const Results = ({ data, ranking }: ResultsProps) => {
    const [details, setDetails] = useState<string | null>(null);

    return (
        <div className="space-y-8">
            {details !== null ? (
                <Details
                    data={data}
                    details={details}
                    setDetails={setDetails}
                />
            ) : (
                <>
                    <Table data={ranking} setDetails={setDetails} />
                    <Charts data={data} ranking={ranking} />
                </>
            )}
        </div>
    );
};

export default Results;
