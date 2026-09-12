import {
    items,
} from "../data/data.jsx";

import YearlyStatistics from "./YearlyStatistics.jsx";
import YearlyDonationTrends from "./YearlyDonationTrends.jsx";
import YearlyParticipationTrends from "./YearlyParticipationTrends.jsx";

export default function YearlyDistribution({ currentYearData }) {
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
            <YearlyStatistics yearlyItems={yearlyItems} />
            <YearlyDonationTrends currentYearData={currentYearData} yearlyItems={yearlyItems}/>
            <YearlyParticipationTrends currentYearData={currentYearData} yearlyItems={yearlyItems} />
        </>

    )
}