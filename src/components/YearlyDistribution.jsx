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

import {
    items,
} from "../data/data.jsx";

export default function YearlyDistribution({ currentYearData }) {
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

    // a list of only the items that show up at least once on the production list of any month
    const yearlyItems = items
        .map((item) => {
            let totalItem = 0;
            currentYearData.months.forEach((currentMonthData) => {
                const monthItemDonation = currentMonthData.production.find(
                    (donation) => donation.item === item.id
                );
                if (monthItemDonation !== undefined) {
                    totalItem += monthItemDonation.num;
                };
            });
            return {
                ...item, // ... is the spread operator, it take all the properties inside item and copies them into the new object
                totalNum: totalItem,
            };
        })
        .filter((item) => item.totalNum > 0)
        .sort((a, b) => b.totalNum - a.totalNum);

    return (
        <>
            <container>
                <tab> Total Donations Recieved </tab>
            </container>
            <div className="flex gap-2">
                {yearlyItems
                    .slice(0, 4)
                    .map((item) => (
                        <container className="flex-1 p-3" key={item.id}>
                            <div className="flex flex-col gap-2">
                                <div className="statistic"> {item.totalNum} </div>
                                <h2 className="flex-1"> {item.name} </h2>
                            </div>
                        </container>
                    ))
                }
            </div>
            <container>
                <tab> Yearly Donation Trends </tab>
            </container>
            <div>
                <div className="flex w-full gap-3">
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
                            <containerWithTabs className="w-full">
                                <ResponsiveContainer className="chart" width="100%" height={420}>
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
                                                axisLine={{ stroke: "var(--text)" }}
                                                tick={{ fill: "var(--text)" }}
                                                tickLine={{ stroke: "var(--text)" }}
                                            />
                                            <CartesianGrid
                                                stroke="var(--blue)"
                                                strokeDasharray="6 6"
                                            />

                                            <Tooltip />

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
                            <containerWithTabs className="w-full">
                                <ResponsiveContainer className="chart" width="100%" height={420}>
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
                                            axisLine={{ stroke: "var(--text)" }}
                                            tick={{ fill: "var(--text)" }}
                                            tickLine={{ stroke: "var(--text)" }}
                                        />
                                        <Tooltip />

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
                    <container className="w-[160px] p-6">
                        <div className="flex flex-col gap-4 w-full">
                            {yearlyItems.map((item) => (
                                <div key={item.id} className="flex gap-3">
                                    <legendicon
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <div className="flex-1 text-left"> {item.name} </div> 
                                </div>
                            ))}
                        </div>
                    </container>
                </div>
            </div>
        </>

    )
}