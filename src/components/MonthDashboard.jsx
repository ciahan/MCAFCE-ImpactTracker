import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    distributionData,
} from "../data/data.jsx";

import MonthDistribution from "./MonthDistribution.jsx";

export default function MonthDashboard () {
    const { year, month } = useParams();
    const navigate = useNavigate();

    const currentYearData = distributionData.find(
        (yearData) => yearData.year === Number(year)
    );

    const monthIndex = currentYearData.months.findIndex(
        (monthData) => monthData.month === month
    );

    const currentMonthData = currentYearData.months[monthIndex];

    const goToPreviousMonth = () => {
        if (monthIndex > 0) {
            const previousMonth = currentYearData.months[monthIndex - 1];
            navigate(`/${currentYearData.year}/${previousMonth.month}`)
        }
    };

    const goToNextMonth = () => {
        if (monthIndex < currentYearData.months.length - 1) {
            const nextMonth = currentYearData.months[monthIndex + 1];
            navigate(`/${currentYearData.year}/${nextMonth.month}`);
        }
    };

    return (
        <div className="p-3 flex flex-col gap-2">
            <button 
                className="flex items-center justify-center"
                style={{
                    padding: "1.5rem"
                }}
                onClick={() => {
                    navigate(`/${currentYearData.year}`);
                }}
            >
                <span
                    style={{
                        fontSize: "35px"
                    }}
                > 
                    Back to Yearly Dashboard
                </span>
            </button>

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