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

export default function YearlyDonationTrends ({ currentYearData, yearlyItems }) {
    const [chartType, setChartType] = useState("line");

    const chartData = currentYearData.months.map((currentMonthData) => {
        const monthChartData = {
            month: currentMonthData.month,
        };
        currentMonthData.production.forEach((donation) => {
            monthChartData[donation.item] = donation.num;
        });
        return monthChartData;
    });

    return (
        <div className="flex flex-col gap-2">
            <container>
                <tab> Yearly Donation Trends </tab>
            </container>
            <div className="flex w-full gap-2">
                <div className="w-full">
                    <div className="w-full flex justify-start">
                        <button
                            onClick={() => setChartType("line")}
                            className={`chartTab ${chartType === "line" ? "selected" : ""}`}
                        >
                            <p> Line Chart </p>
                        </button>
                        <button
                            onClick={() => setChartType("bar")}
                            className={`chartTab ${chartType === "bar" ? "selected" : ""}`}
                        >
                            Bar Chart
                        </button>
                    </div>
                    {chartType === "line" ? (
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

                                        {yearlyItems.map((item) => (
                                            <Line 
                                                key={item.id}
                                                type="monotone"
                                                dataKey={item.id}
                                                name={item.name}
                                                stroke={item.color}
                                            />
                                        ))}
                                    </div>
                                </LineChart>
                            </ResponsiveContainer>
                        </containerWithTabs>
                    ) : (
                        <containerWithTabs className="w-full p-6">
                            <ResponsiveContainer className="chart" width="100%" height={435}>
                                <BarChart
                                    data={chartData}
                                    margin={{
                                        top: 30,
                                        right: 30,
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
                                        axisLine={{ stroke: "var(--text)" }}
                                        tick={{ fill: "var(--text)" }}
                                        tickLine={{ stroke: "var(--text)" }}
                                    />
                                    <Tooltip content={<CustomTooltip />} />

                                    {yearlyItems.map((item) => (
                                        <Bar 
                                            key={item.id}
                                            dataKey={item.id}
                                            name={item.name}
                                            stackId="donations"
                                            fill={item.color}
                                        />
                                    ))}
                                </BarChart>
                            </ResponsiveContainer>
                        </containerWithTabs>
                    )}
                </div>
                {/* LEGEND */}
                <CustomLegend itemsSet={yearlyItems} />
            </div>
        </div>
    )
}