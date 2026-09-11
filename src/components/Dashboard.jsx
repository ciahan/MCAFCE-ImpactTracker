import { useState } from "react";

import {
    distributionData,
} from "../data/data.jsx";

import YearlyDistribution from "./YearlyDistribution.jsx";
import MonthDistribution from "./MonthDistribution.jsx";

export default function Dashboard() {
    const [yearIndex, setYearIndex] = useState(
        distributionData.length - 1
    )

    const currentYearData = distributionData[yearIndex];

    // Controls which month is selected, defaults to the last (and latest) month
    const [monthIndex, setMonthIndex] = useState(
        currentYearData.months.length - 1
    )

    // Gets all the data from the selected month
    const currentMonthData = currentYearData.months[monthIndex];

    // Select the previous year
    const goToPreviousYear = () => {
        const currentYear = currentYearData.year;
        const currentMonth = currentMonthData.monthNum;

        setYearIndex(yearIndex - 1);
        const newYearData = distributionData[yearIndex - 1];

        for (let i = newYearData.months.length - 1; i >= 0; i--) {
            const newMonthData = newYearData.months[i];
            const newMonth = newMonthData.monthNum;

            if (newMonth <= currentMonth) {
                setMonthIndex(i);
                return;
            }
        }

        // edge case: Jan 2026 --> ? --> Feb 2025 (in case there's no Jan in 2025 and Feb is the first entry)
        setMonthIndex(0);
    };

    // Select the next year
    const goToNextYear = () => {
        const currentYear = currentYearData.year;
        const currentMonth = currentMonthData.monthNum;

        setYearIndex(yearIndex - 1);
        const newYearData = distributionData[yearIndex + 1];

        for (let i = 0; i < distributionData.months.length; i++) {
            const newMonthData = newYearData.months[i];
            const newMonth = newMonthData.monthNum;

            if (newMonth >= currentMonth) {
                setMonthIndex(i);
                return;
            }
        }

        setMonthIndex(newYearData.months.length);
    };

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
                    onClick={goToPreviousYear}
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
                    onClick={goToNextYear}
                    disabled={yearIndex === distributionData.length - 1}
                >
                    <span> {">"} </span>
                </button>
            </div>

            <YearlyDistribution currentYearData={currentYearData} />

            {/* TOGGLE MONTH */}
            <div className="flex items-stretch justify-center gap-2 w-full">
                <button
                    className="w-[100px]"
                    onClick={goToPreviousMonth}
                    disabled={monthIndex === 0}
                >
                    <span>{ "<"} </span>
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
                    {`${currentMonthData.month} Distribution`}
                </div>
                <button
                    className="w-[100px]"
                    onClick={goToNextMonth}
                    disabled={monthIndex === currentYearData.months.length - 1}
                >
                    <span> {">"} </span>
                </button>
            </div>

            <MonthDistribution currentMonthData={currentMonthData} />

        </div>
    )
}