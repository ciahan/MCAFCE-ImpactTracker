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
        <div className="page p-3 flex flex-col gap-2">
            {/* TOGGLE YEAR */}
            <div className="dashboardButtons">
                <button
                    className="arrow"
                    onClick={() => {
                        const previousYear = distributionData[yearIndex - 1].year;
                        navigate(`/${previousYear}`);
                    }}
                    disabled={yearIndex === 0}
                >
                    <span> {"<"} </span>
                </button>
                <div className="buttonStyle flex-1">
                    <div className="buttonTitle">
                        MCAFCE Impact Tracker
                    </div>
                    {currentYearData.year}
                </div>
                <button
                    className="arrow"
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
                onClick={() => {
                    const latestMonth = currentYearData.months[currentYearData.months.length - 1];
                    navigate(`/${currentYearData.year}/${latestMonth.slug}`);
                }}
            >
                <span
                    className="bigButton"
                > 
                    See Monthly Distribution Data
                </span>
            </button>
        </div>
    )
}