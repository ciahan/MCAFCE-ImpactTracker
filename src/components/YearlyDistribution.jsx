import {
    items,
} from "../data/data.jsx";

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

            <YearlyDonationTrends currentYearData={currentYearData} yearlyItems={yearlyItems}/>
            <YearlyParticipationTrends currentYearData={currentYearData} yearlyItems={yearlyItems} />
        </>

    )
}