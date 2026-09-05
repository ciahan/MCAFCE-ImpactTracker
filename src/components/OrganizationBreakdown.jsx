import '../App.css'

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

import {
    organizations,
    items
} from "../data/data.jsx";

export default function OrganizationBreakdown({ currentMonthData }) {
    // Formats the organization data to display the number of each item that was donated to a certain organization
    const organizationDataFormatted = (organizationDonationData) => {
        return organizationDonationData.map((donation) => {
            const item = items.find(
                (item) => item.id === donation.item
            );

            return {
                name: item.name,
                value: donation.num,
                color: item.color,
            }
        })
    }

    return (
        <>
            {/* DISTRIBUTION OF ITEMS DONATED FOR EACH ORGANIZATION */}
            {currentMonthData.distributions.map((distribution) => {
                const formattedData = organizationDataFormatted(distribution.donations);

                const organizationInfo = organizations.find(
                    (organization) =>
                        organization.id === distribution.organization
                );
                
                return (
                    <container
                        style={{ width: "100%", height: "400px" }}
                        key={distribution.organization}
                    >
                        <h3>
                            {organizationInfo.name}
                        </h3>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie 
                                    data={formattedData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={120}
                                    innerRadius={60}
                                >
                                    {formattedData.map((entry, index) => (
                                        <Cell 
                                            key={entry.name}
                                            fill={entry.color}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    formatter={ (value, name) => [`${value} ${name}`]}
                                />
                                <Legend
                                    verticalAlign="middle"
                                    align="right"
                                    layout="vertical"
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </container>
                )
            })}
        </>
    )
}