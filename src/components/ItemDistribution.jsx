import { useState, useEffect } from "react";
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

export default function ItemDistribution({ currentMonthData }) {
    // Controls which item is selected, defaults to "Blankets"
    const [item, setItem] = useState(
        items.find(
            (item) => item.id === 'blankets'
        )
    )

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

    // Formats the month data to display the number of a certain item that was donated to each organization during the month
    const chartData = currentMonthData.distributions
        .map((distribution) => {
            const donation = distribution.donations.find(
                (donation) => donation.item === item.id
            );

            const organization = organizations.find(
                (organization) => organization.id === distribution.organization
            );

            return {
                name: organization
                    ? organization.name
                    : distribution.organization,
                value: donation ? donation.num : 0,
                color: organization
                    ? organization.color
                    : "var(--color-10)",
            };
        })
        .filter((entry) => entry.value > 0);

    // Updates the item selected when navigating months, keepts the same item selected if possible then goes to next item and then previous item (based on alphabetical order)
    useEffect(() => {
        // If the current item that is selected is in newAvailableItems, keep it selected
        const itemStillExists = availableItems.find(
            (availableItem) => availableItem.id == item.id
        );

        if (itemStillExists) {
            setItem(itemStillExists);
            return;
        }

        // Sorts the master list of donated items in alphabetical order
        const allItemsAlphabetical = [...items].sort(
            (a, b) => a.name.localeCompare(b.name)
        );

        // Finds the index of the currently selected item
        const currentItemIndex = allItemsAlphabetical.findIndex(
            (currentItem) => currentItem.id === item.id
        );

        // Finds the index of the next available item in the new month
        const nextItem = allItemsAlphabetical
            .slice(currentItemIndex + 1)
            .find((possibleItem) =>
                availableItems.some(
                    (availableItem) =>
                        availableItem.id === possibleItem.id
                )
            );

        // Finds the index of the previous available item in the new month
        const previousItem = allItemsAlphabetical
            .slice(0, currentItemIndex)
            .reverse()
            .find((possibleItem) =>
                availableItems.some(
                    (availableItem) =>
                        availableItem.id === possibleItem.id
                )
            );
        
        // Sets a new item for the new month
        setItem(
            nextItem || 
            previousItem ||
            availableItems[0]
        );
    }, [currentMonthData]); // runs when currentMonthData is change (currentMonthData is the dependency array)

    return (
        <>
            {/* TOGGLE ITEM SELECTED */}
            <container
                className="flex justify-center"
            >
                <select
                    value={item.id}
                    onChange={(e) => {
                        const selectedItem = items.find(
                            (item) => item.id === e.target.value
                        );

                        setItem(selectedItem);
                    }}
                >
                    {availableItems.map((item) => (
                        <option
                            key={item.id}
                            value={item.id}
                        >
                            {item.name}
                        </option>
                    ))}
                </select>
            </container>

            {/* DISTRIBUTION OF A CERTAIN ITEM DONATED PER ORGANIZATION */}
            <container
                style={{ width: "100%", height: "400px" }}
            >
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
                        >
                            {chartData.map((entry, index) => (
                                <Cell 
                                    key={entry.name}
                                    fill={entry.color}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            separator=": "
                            formatter={ (value, name) => [`${value} ${item.name}`, name]}
                        />
                        <Legend 
                            verticalAlign="middle"
                            align="right"
                            layout="vertical"
                        />
                    </PieChart>
                </ResponsiveContainer>
            </container>
        </>
    )
}