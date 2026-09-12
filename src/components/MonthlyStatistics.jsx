export default function MonthlyStatistics ({ currentMonthData }) {
    return (
        <>
            <container><tab>Monthly Statistics</tab></container>
            <div className="flex gap-2">
                <container className="flex-1">
                    <div className="flex flex-col h-full p-3 gap-3">
                        <div className="statistic"> {currentMonthData.participants} </div>
                        <h2 className="flex-1 flex items-center"> Participants </h2>
                    </div>
                </container>
                <container className="flex-1">
                    <div className="flex flex-col h-full p-3 gap-3">
                        <div className="statistic"> {currentMonthData.students} </div>
                        <h2 className="flex-1 flex items-center"> Number of students </h2>
                    </div>
                </container>
                <container className="flex-1">
                    <div className="flex flex-col h-full p-3 gap-3">
                        <div className="statistic"> {currentMonthData.sslHours} </div>
                        <h2 className="flex-1 flex items-center"> SSL Hours awarded </h2>
                    </div>
                </container>
            </div>
        </>
    )
}