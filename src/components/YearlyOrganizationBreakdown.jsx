import { useState } from "react";

import {
    BarChart,
    Bar,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import {
    items,
    organizations,
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

export default function YearlyOrganizationBreakdown ({ currentYearData }) {
    const [chartType, setChartType] = useState("bar");

    const [item, setItem] = useState("total");

    // Filters for the items that were donated to at least one organization throughout the year
    const getAvailableItems = (yearData) => {
        return items
            .filter((item) =>
                yearData.months.some((monthData) => 
                    monthData.distributions.some((distribution) =>
                        distribution.donations.some(
                            (donation) => donation.item === item.id
                        )
                    )
                )
            )
            .sort((a, b) => a.name.localeCompare(b.name));
    };

    const getAvailableOrganizations = (yearData) => {
        return organizations
            .filter((organization) =>
                yearData.months.some((monthData) => 
                    monthData.distributions.some((distribution) => 
                        distribution.organization === organization.id
                    )
                )
            )
    };

    // The items that were donated to at least one organization in the month currently selected
    const availableItems = getAvailableItems(currentYearData);
    const availableOrganizations = getAvailableOrganizations(currentYearData);

    // For the bar chart:
    // The total number of item types donated to each organization throughout the year
    const distributionData = availableOrganizations.map((org) => {
        const organizationData = {
            organization: org.name,
            id: org.id,
        }
        currentYearData.months.map((month) => {
            month.distributions.map((distribution) => {
                if (distribution.organization === organizationData.id) {
                    distribution.donations.map((donation) => {
                        if (!organizationData[donation.item]) {
                            organizationData[donation.item] = donation.num;
                        } else {
                            organizationData[donation.item] += donation.num;
                        }
                    })
                }
            })
        })
        return organizationData;
    });

    const [organization, setOrganization] = useState(availableOrganizations[0]?.id);

    // Gets all the items donated to a specific organization throughout the year
    const yearlyOrganizationItems = [];
        currentYearData.months.forEach((month) => {
            month.distributions.forEach((distribution) => {
                if (distribution.organization === organization) {
                    distribution.donations.forEach((donation) => {
                        const itemInfo = availableItems.find(
                            (item) => item.id === donation.item
                        );
                        if (itemInfo && !yearlyOrganizationItems.some((item) => item.id === itemInfo.id)) {
                            yearlyOrganizationItems.push(itemInfo);
                        };
                    });
                };
            });
        });
    
    // For the line chart:
    const organizationData = currentYearData.months.map((month) => {
        const monthData = {
            id: month.monthNum,
            month: month.month,
        }
        month.distributions.forEach((distribution) => {
            if (distribution.organization === organization) {
                distribution.donations.forEach((donation) => {
                    monthData[donation.item] = donation.num;
                })
            }
        })
        return monthData;
    });

    return (
        <div className="flex flex-col gap-2">
            <div className='header'>
                Organization Breakdown
            </div>

            <div>
                <div className="w-full flex justify-start">
                    <button
                        onClick={() => setChartType("bar")}
                        className={`chartTab ${chartType === "bar" ? "selected" : ""}`}
                    >
                        Bar Chart
                    </button>
                    <button
                        onClick={() => setChartType("pie")}
                        className={`chartTab ${chartType === "pie" ? "selected" : ""}`}
                    >
                        Line Chart
                    </button>
                </div>

                {chartType === "bar" ? (
                    <containerWithTabs className="w-full p-6 flex gap-4">
                        <div className="w-full overflow-x-auto pb-3">
                            <ResponsiveContainer className="chart" width={Math.max(distributionData.length * 140, 1000)} height={470}>
                                <BarChart
                                    data={distributionData}
                                    margin={{
                                        top: 30,
                                        right: 30,
                                        left: 10,
                                        bottom: 40,
                                    }}
                                >
                                    <XAxis
                                        dataKey="organization"
                                        interval={0}
                                        tick={CustomTick}
                                        axisLine={{ stroke: "var(--text)" }}
                                        tickLine={{ stroke: "var(--text)" }}
                                    />
                                    <YAxis
                                        axisLine={{ stroke: "var(--text)" }}
                                        tick={{ fill: "var(--text)" }}
                                        tickLine={{ stroke: "var(--text)" }}
                                    />
                                    <Tooltip content={<CustomTooltip />} />

                                    {availableItems.map((item) => (
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
                        <CustomLegend itemsSet={availableItems} orientation="horizontal" />
                    </containerWithTabs>
                ) : (
                    /* DISTRIBUTION OF A CERTAIN ITEM DONATED PER ORGANIZATION */
                    <containerWithTabs className="w-full flex p-6 gap-4">
                        <div className="flex gap-2 items-center">
                            Filter by organization:
                            <div className="selector">
                                <select
                                    value={organization}
                                    onChange={(e) => {
                                        setOrganization(e.target.value)
                                    }}
                                >
                                    {availableOrganizations.map((item) => (
                                        <option
                                            key={item.id}
                                            value={item.id}
                                        >
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <ResponsiveContainer className="chart" width="100%" height={435}>
                            <LineChart
                                data={organizationData}
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

                                    {yearlyOrganizationItems.map((item) => (
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
                        <CustomLegend itemsSet={availableItems} orientation="horizontal"/>
                    </containerWithTabs>
                )}
            </div>
        </div>
    )
}