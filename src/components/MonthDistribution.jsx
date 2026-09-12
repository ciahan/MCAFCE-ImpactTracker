import MonthlyStatistics from "./MonthlyStatistics.jsx";
import MonthlyDonationDistribution from "./MonthlyDonationDistribution.jsx";
import MonthlyOrganizationBreakdown from "./MonthlyOrganizationBreakdown.jsx";

export default function MonthDistribution({ currentMonthData }) {
    return (
        <div className="flex flex-col gap-2">
            <MonthlyStatistics currentMonthData={currentMonthData} />
            <MonthlyDonationDistribution currentMonthData={currentMonthData} />
            <MonthlyOrganizationBreakdown currentMonthData={currentMonthData} />
        </div>
    )
}