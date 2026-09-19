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
        (monthData) => monthData.slug === month
    );

    const currentMonthData = currentYearData.months[monthIndex];

    const goToPreviousMonth = () => {
        if (monthIndex > 0) {
            const previousMonth = currentYearData.months[monthIndex - 1];
            navigate(`/${currentYearData.year}/${previousMonth.slug}`)
        }
    };

    const goToNextMonth = () => {
        if (monthIndex < currentYearData.months.length - 1) {
            const nextMonth = currentYearData.months[monthIndex + 1];
            navigate(`/${currentYearData.year}/${nextMonth.slug}`);
        }
    };

    return (
        <div className="p-3 flex flex-col gap-2">
            <button 
                className="bigButton"
                onClick={() => {
                    navigate(`/${currentYearData.year}`);
                }}
            >
                <span> 
                    Back to Yearly Dashboard
                </span>
            </button>

            {/* TOGGLE MONTH */}
            <div className="dashboardButtons">
                <button
                    className="arrow"
                    onClick={goToPreviousMonth}
                    disabled={monthIndex === 0}
                >
                    <span>{ "<"} </span>
                </button>
                <div className="buttonStyle flex-1">
                    <div
                        className="buttonTitle"
                    >
                        MDAFCE Impact Tracker
                    </div>
                    <div className="buttonSubTitle">
                        {currentMonthData.month}
                    </div>
                </div>
                <button
                    className="arrow"
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