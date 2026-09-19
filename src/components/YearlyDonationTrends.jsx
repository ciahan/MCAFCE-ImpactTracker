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

import {
    CustomTick,
} from "./CustomChartComponents.jsx";

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
            <div className='header'>
                Yearly Donation Trends
            </div>
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
                <containerWithTabs className='w-full p-6 flex flex-col gap-4'>
                    {chartType === "line" ? (
                        <div className='w-full overflow-x-auto'>
                            <div
                                style={{
                                    width: `${currentYearData.months.length * 90}px`,
                                    minWidth: '100%'
                                }}                        
                            >
                                <ResponsiveContainer className="chart" width="100%" height={435}>
                                    <LineChart
                                        data={chartData}
                                        margin={{
                                            top: 10,
                                            right: 40,
                                            left: 10,
                                            bottom: 20,
                                        }}
                                    >
                                        <div>
                                            <XAxis
                                                interval={0}
                                                dataKey="month"
                                                axisLine={{ stroke: "var(--text)" }}
                                                tick={CustomTick}
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
                            </div>
                        </div>
                    ) : (
                        <div className='w-full overflow-x-auto'>
                            <div
                                style={{
                                    width: `${chartData.length * 130}px`,
                                    minWidth: '100%'
                                }}
                            >
                                <ResponsiveContainer className="chart" width="100%" height={435}>
                                    <BarChart
                                        data={chartData}
                                        margin={{
                                            top: 10,
                                            right: 10,
                                            left: 10,
                                            bottom: 20,
                                        }}
                                    >
                                        <XAxis
                                            interval={0}
                                            dataKey="month"
                                            axisLine={{ stroke: "var(--text)" }}
                                            tick={{ fill: "var(--text)" }}
                                            tickLine={{ stroke: "var(--text)" }}
                                            tickMargin={12}
                                        />
                                        <YAxis
                                            width={25}
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
                            </div>
                        </div>
                    )}
                    <CustomLegend itemsSet={yearlyItems} orientation='horizontal' />
                </containerWithTabs>
            </div>
        </div>
    )
}