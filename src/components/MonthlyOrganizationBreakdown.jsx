import { useState } from "react";

import {
    BarChart,
    Bar,
    PieChart,
    Pie,
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
} from "./CustomChartComponents.jsx";

import CustomTooltip from "./CustomTooltip.jsx";
import CustomLegend from "./CustomLegend.jsx";

export default function MonthlyOrganizationBreakdown ({ currentMonthData }) {
    const [chartType, setChartType] = useState("bar");

    const [item, setItem] = useState("total");

    // Filters for the items that were donated to at least one organization in a certain month
    const getAvailableItems = (monthData) => {
        return items
            .filter((item) =>
                monthData.distributions.some((distribution) =>
                    distribution.donations.some(
                        (donation) => donation.item === item.id
                    )
                )
            )
            .sort((a, b) => a.name.localeCompare(b.name));
    };

    // The items that were donated to at least one organization in the month currently selected
    const availableItems = getAvailableItems(currentMonthData);

    const distributionData = currentMonthData.distributions.map((org) => {
        const organizationInfo = organizations.find(
            (orgo) => orgo.id === org.organization,
        );
        const organizationData = {
            organization: organizationInfo.name,
        };
        org.donations.forEach((donation) => {
            organizationData[donation.item] = donation.num;
        });
        return organizationData;
    });

    const chartData = currentMonthData.distributions
        .map((distribution) => {
            const organization = organizations.find(
                (organization) => organization.id === distribution.organization
            );

            let value = 0;

            if (item === "total") {
                value = distribution.donations.reduce(
                    (sum, donation) => sum + donation.num,
                    0
                );
            } else {
                const donation = distribution.donations.find(
                    (donation) => donation.item === item
                );
                value = donation ? donation.num : 0;
            }

            return {
                name: organization
                    ? organization.name
                    : distribution.organization,
                value: value,
                color: organization
                    ? organization.color
                    : "var(--color-10)",
            };
        })
        .filter((entry) => entry.value > 0);

    const monthlyOrganizations = currentMonthData.distributions.map((org) => {
        const organization = organizations.find(
            (organization) => organization.id === org.organization
        );
        const organizationInfo = {
            id: organization.id,
            name: organization.name,
            color: organization.color,
        };
        return organizationInfo;
    });

    const [organization, setOrganization] = useState(monthlyOrganizations[0]?.id);

    const selectedOrganizationData = currentMonthData.distributions.find(
        (distribution) => distribution.organization === organization
    );

    const organizationData = selectedOrganizationData
        ? selectedOrganizationData.donations.map((donation) => {
            const itemInfo = items.find(
                (item) => item.id === donation.item
            );
            return {
                name: itemInfo.name,
                value: donation.num,
                color: itemInfo.color,
            };
        })
        : [];

    return (
        <div className="flex flex-col gap-2">
            <container><tab>Organization Breakdown</tab></container>

            <div>
                <div className="w-full flex justify-start">
                    <button
                        onClick={() => setChartType("bar")}
                        className={`chartTab ${chartType === "bar" ? "selected" : ""}`}
                    >
                        <p> Bar Chart </p>
                    </button>
                    <button
                        onClick={() => setChartType("pie")}
                        className={`chartTab ${chartType === "pie" ? "selected" : ""}`}
                    >
                        Pie Chart
                    </button>
                </div>

                {chartType === "bar" ? (
                    <containerWithTabs className="w-full p-6">
                        <ResponsiveContainer className="chart" width="100%" height={435}>
                            <BarChart
                                data={distributionData}
                                margin={{
                                    top: 30,
                                    right: 30,
                                    left: 10,
                                    bottom: 20,
                                }}
                            >
                                <XAxis
                                    dataKey="organization"
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
                        <CustomLegend itemsSet={availableItems} orientation="horizontal" />
                    </containerWithTabs>
                ) : (
                    /* DISTRIBUTION OF A CERTAIN ITEM DONATED PER ORGANIZATION */
                    <containerWithTabs
                        className="p-6"
                        style={{ width: "100%", height: "450px" }}
                    >
                        <div className="flex gap-2 items-center">
                            Filter by item:
                            <div className="selector">
                                <select
                                    value={item.id}
                                    onChange={(e) => {
                                        setItem(e.target.value);
                                    }}
                                >
                                    <option value="total">
                                        Total Items Donated
                                    </option>
                                    {availableItems.map((item) => (
                                        <option
                                            key={item.id}
                                            value={item}
                                        >
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={120}
                                    innerRadius={60}
                                    shape={CustomPieSlice}
                                    label={CustomPieLabel}
                                    labelLine={CustomLabelLine}
                                />
                                <Tooltip content={<CustomTooltip />}/>
                            </PieChart>
                        </ResponsiveContainer>
                        <CustomLegend itemsSet={monthlyOrganizations} orientation="horizontal"/>
                    </containerWithTabs>
                )}
            </div>

            <container className="p-6">
                <div className="flex gap-2 items-center">
                    Filter by organization:
                    <div className="selector">
                        <select
                            value={organization}
                            onChange={(e) => {
                                setOrganization(e.target.value)
                            }}
                        >
                            {monthlyOrganizations.map((item) => (
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
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={organizationData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            innerRadius={60}
                            shape={CustomPieSlice}
                            label={CustomPieLabel}
                            labelLine={CustomLabelLine}
                        />
                        <Tooltip content={<CustomTooltip />}/>
                    </PieChart>
                </ResponsiveContainer>
                <CustomLegend itemsSet={availableItems} orientation="horizontal" />
            </container>
        </div>
    )
}