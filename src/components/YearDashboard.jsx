import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    distributionData,
} from "../data/data.jsx";

import YearlyDistribution from "./YearlyDistribution.jsx";

export default function YearDashboard() {
    const { year } = useParams();
    const navigate = useNavigate();

    const yearIndex = distributionData.findIndex(
        (yearData) => yearData.year === Number(year)
    );

    const currentYearData = distributionData[yearIndex];

    // Controls which month is selected, defaults to the last (and latest) month
    const [monthIndex, setMonthIndex] = useState(
        currentYearData.months.length - 1
    )

    // Gets all the data from the selected month
    const currentMonthData = currentYearData.months[monthIndex];

    // Select the previous month
    const goToPreviousMonth = () => {
        if (monthIndex > 0) {
            setMonthIndex(monthIndex - 1);
        }
    };

    // Select the next month
    const goToNextMonth = () => {
        if (monthIndex < currentYearData.months.length - 1) {
            setMonthIndex(monthIndex + 1);
        }
    };

    return (
        <div className="p-3 flex flex-col gap-2">
            {/* TOGGLE YEAR */}
            <div className="flex items-stretch justify-center gap-2 w-full">
                <button
                    className="w-[100px]"
                    onClick={() => {
                        const previousYear = distributionData[yearIndex - 1].year;
                        navigate(`/${previousYear}`);
                    }}
                    disabled={yearIndex === 0}
                >
                    <span> {"<"} </span>
                </button>
                <div className="buttonStyle flex-1">
                    <div
                        style={{
                            fontSize: 40,
                            fontWeight: 300
                        }}
                    >
                        MDAFCE Impact Tracker
                    </div>
                    {currentYearData.year}
                </div>
                <button
                    className="w-[100px]"
                    onClick={() => {
                        const nextYear = distributionData[yearIndex + 1].year;
                        navigate(`/${nextYear}`);
                    }}
                    disabled={yearIndex === distributionData.length - 1}
                >
                    <span> {">"} </span>
                </button>
            </div>

            <YearlyDistribution currentYearData={currentYearData} />
            <button 
                className="flex items-center justify-center"
                style={{
                    padding: "1.5rem"
                }}
                onClick={() => {
                    const latestMonth = currentYearData.months[currentYearData.months.length - 1];
                    navigate(`/${currentYearData.year}/${latestMonth.month}`);
                }}
            >
                <span
                    style={{
                        fontSize: "35px"
                    }}
                > 
                    See Monthly Distribution Data
                </span>
            </button>
        </div>
    )
}