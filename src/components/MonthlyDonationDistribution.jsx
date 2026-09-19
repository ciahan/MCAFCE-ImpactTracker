import { useState } from "react";

import {
    BarChart,
    Bar,
    LabelList,
    PieChart,
    Pie,
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer
} from "recharts";

import {
    items,
} from "../data/data.jsx";

import {
    CustomBar,
    CustomPieSlice,
    CustomPieLabel,
    CustomLabelLine,
    CustomTick,
} from "./CustomChartComponents.jsx";

import CustomTooltip from "./CustomTooltip.jsx";
import CustomLegend from "./CustomLegend.jsx";

export default function MonthlyDonationDistribution ({ currentMonthData }) {
    const [chartType, setChartType] = useState("pie");

    const chartData = currentMonthData.production.map((donation) => {
        const itemInfo = items.find(
            (item) => item.id === donation.item
        );

        return {
            item: itemInfo?.name,
            num: donation.num,
            color: itemInfo?.color,
        };
    });

    const monthItems = currentMonthData.production.map((donation) => {
        const item = items.find(
            (item) => item.id === donation.item
        )
        return item;
    });

    return (
        <div className="flex flex-col gap-2">
            <div className='header'>
                Donations Recieved
            </div>
            <div className="w-full">
                <div className="w-full flex justify-start">
                    <button
                        onClick={() => setChartType("pie")}
                        className={`chartTab ${chartType === "pie" ? "selected" : ""}`}
                    >
                        <p> Pie Chart </p>
                    </button>
                    <button
                        onClick={() => setChartType("bar")}
                        className={`chartTab ${chartType === "bar" ? "selected" : ""}`}
                    >
                        Bar Chart
                    </button>
                </div>
                {chartType === "bar" ? (
                    <containerWithTabs className="w-full p-6">
                        <div className='w-full overflow-x-auto'>
                            <div
                                style={{
                                    width: `${currentMonthData.production.length * 130}px`,
                                    minWidth: '100%'
                                }}
                            >
                                <ResponsiveContainer className="chart" width="100%" height={435}>
                                    <BarChart
                                        data={chartData}
                                        margin={{
                                            top: 30,
                                            right: 10,
                                            left: 10,
                                            bottom: 20,
                                        }}
                                    >
                                        <XAxis
                                            interval={0}
                                            dataKey="item"
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

                                        <Bar 
                                            dataKey="num"
                                            shape={CustomBar}
                                        >
                                            <LabelList 
                                                dataKey="num"
                                                position="top"
                                                fill="var(--text)"
                                                fontSize={30}
                                                fontWeight={500}
                                            />
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </containerWithTabs>
                ) : (
                    <containerWithTabs className="w-full p-6 flex flex-col gap-4 lg:gap-8">
                        <ResponsiveContainer className="chart" width="100%" height={280}>
                            <PieChart>
                                <Pie 
                                    data={chartData}
                                    dataKey="num"
                                    nameKey="item"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius='70%'
                                    innerRadius='30%'
                                    shape={CustomPieSlice}
                                    label={CustomPieLabel}
                                    labelLine={CustomLabelLine}
                                />
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                        <CustomLegend
                            itemsSet={monthItems}
                            orientation="horizontal"
                        />
                    </containerWithTabs>
                )}
            </div>
        </div>
    )
}