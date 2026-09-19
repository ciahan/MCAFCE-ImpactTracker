import { useState } from "react";

import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

import CustomTooltip from "./CustomTooltip.jsx";
import CustomLegend from "./CustomLegend.jsx";

export default function YearlyParticipationTrends ({ currentYearData, yearlyItems }) {
    const [chartType, setChartType] = useState("participants");

    const chartData = currentYearData.months.map((currentMonthData) => {
        const monthChartData = {
            month: currentMonthData.month,
            participants: currentMonthData.participants,
            students: currentMonthData.students,
            sslHours: currentMonthData.sslHours,
        };
        return monthChartData;
    });

    const participantInfo = [
        {
            name: "Participants",
            color: "var(--color-1)",
        },
        {
            name: "Students",
            color: "var(--color-2)",
        }
    ]

    const sslHourInfo = [
        {
            name: "SSL Hours",
            color: "var(--color-3)",
        },
    ]

    return (
        <div className="flex flex-col gap-2">
            <div className='header'>
                Yearly Participation Trends
            </div>

            <div>
                <div className="w-full flex justify-start">
                    <button
                        onClick={() => setChartType("participants")}
                        className={`chartTab ${chartType === "participants" ? "selected" : ""}`}
                    >
                        <p> Number of Participants </p>
                    </button>
                    <button
                        onClick={() => setChartType("sslHours")}
                        className={`chartTab ${chartType === "sslHours" ? "selected" : ""}`}
                    >
                        SSL Hours Given to Students
                    </button>
                </div>
                {chartType === "participants" ? (
                    <containerWithTabs className="w-full p-6">
                        <ResponsiveContainer className="chart" width="100%" height={435}>
                            <LineChart
                                data={chartData}
                                margin={{
                                    top: 20,
                                    right: 10,
                                    left: 10,
                                    bottom: 20,
                                }}
                            >
                                <XAxis
                                    dataKey="month"
                                    axisLine={{ stroke: "var(--text)" }}
                                    tick={{ fill: "var(--text)" }}
                                    tickLine={{ stroke: "var(--text)" }}
                                />
                                <YAxis
                                    width={25}
                                    axisLine={{ stroke: "var(--text)" }}
                                    tick={{ fill: "var(--text)" }}
                                    tickLine={{ stroke: "var(--text)" }}
                                />
                                <CartesianGrid
                                    stroke="var(--blue)"
                                    strokeDasharray="6 6"
                                />

                                <Tooltip content={<CustomTooltip />}/>

                                <Line 
                                    key={"participants"}
                                    type="monotone"
                                    dataKey={"participants"}
                                    name={"Participants"}
                                    stroke={"var(--color-1)"}
                                />
                                <Line 
                                    key={"students"}
                                    type="monotone"
                                    dataKey={"students"}
                                    name={"Students"}
                                    stroke={"var(--color-2)"}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                        <CustomLegend itemsSet={participantInfo} orientation="horizontal" />
                    </containerWithTabs>
                ) : (
                    <containerWithTabs className="w-full p-6">
                        <ResponsiveContainer className="chart" width="100%" height={435}>
                            <LineChart
                                data={chartData}
                                margin={{
                                    top: 30,
                                    right: 30,
                                    left: 10,
                                    bottom: 20,
                                }}
                            >
                                <div>
                                    <XAxis
                                        dataKey="month"
                                        axisLine={{ stroke: "var(--text)" }}
                                        tick={{ fill: "var(--text)" }}
                                        tickLine={{ stroke: "var(--text)" }}
                                    />
                                    <YAxis
                                        axisLine={{ stroke: "var(--text)" }}
                                        tick={{ fill: "var(--text)" }}
                                        tickLine={{ stroke: "var(--text)" }}
                                    />
                                    <CartesianGrid
                                        stroke="var(--blue)"
                                        strokeDasharray="6 6"
                                    />

                                    <Tooltip content={<CustomTooltip />}/>

                                    <Line 
                                        key={"sslHours"}
                                        type="monotone"
                                        dataKey={"sslHours"}
                                        name={"SSL Hours"}
                                        stroke={"var(--color-3)"}
                                    />
                                </div>
                            </LineChart>
                        </ResponsiveContainer>
                        <CustomLegend itemsSet={sslHourInfo} orientation="horizontal" />
                    </containerWithTabs>
                )}
            </div>
        </div>
    )
}