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

export default function TotalDistribution({currentMonthData}) {
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

    const formattedData
    <>
    </>
}