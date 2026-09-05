import { useState } from "react";
import './App.css'

import {
    distributionData,
} from "../data/data.jsx";

import YearlyDistribution from "./YearlyDistribution.jsx";
import ItemDistribution from "./ItemDistribution.jsx";
import OrganizationBreakdown from "./OrganizationBreakdown.jsx";

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
                    {"<"}
                </button>
                <button className="flex-1"> {currentYearData.year} </button>
                <button
                    className="w-[100px]"
                    onClick={goToNextYear}
                    disabled={yearIndex === distributionData.length - 1}
                >
                    {">"}
                </button>
            </div>

            <YearlyDistribution currentYearData={currentYearData} />

            {/* TOGGLE MONTH */}
            <div className="flex items-center justify-center gap-2 w-full">
                <button
                    className="w-[100px]"
                    onClick={goToPreviousMonth}
                    disabled={monthIndex === 0}
                >
                    {"<"}
                </button>
                <button className="flex-1"> {`${currentMonthData.month} Distribution`} </button>
                <button
                    className="w-[100px]"
                    onClick={goToNextMonth}
                    disabled={monthIndex === distributionData.length - 1}
                >
                    {">"}
                </button>
            </div>

            {/* MONTH STATISTICS */}
            <div className="flex gap-2">
                <container className="flex-1">
                    <div className="flex flex-col h-full p-3 gap-3">
                        <h2 className="flex-1 flex items-center"> Number of participants </h2>
                        <h1> {currentMonthData.participants} </h1>
                    </div>
                </container>
                <container className="flex-1">
                    <div className="flex flex-col h-full p-3 gap-3">
                        <h2 className="flex-1 flex items-center"> Number of students </h2>
                        <h1> {currentMonthData.students} </h1>
                    </div>
                </container>
                <container className="flex-1">
                    <div className="flex flex-col h-full p-3 gap-3">
                        <h2 className="flex-1 flex items-center"> SSL Hours awarded to sstudents </h2>
                        <h1> {currentMonthData.sslHours} </h1>
                    </div>
                </container>
            </div>

            <ItemDistribution currentMonthData={currentMonthData} />

            <OrganizationBreakdown currentMonthData={currentMonthData} />

        </div>
    )
}