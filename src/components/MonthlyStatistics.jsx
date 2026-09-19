export default function MonthlyStatistics ({ currentMonthData }) {
    return (
        <>
            <div className="header"> 
                Monthly Statistics
            </div>
            <div className="flex gap-2">
                <statContainer className="flex-1">
                    <div className="statContainer flex flex-col h-full p-3 gap-3">
                        <div className="statistic"> {currentMonthData.participants} </div>
                        <h2 className="statisticDescription flex-1 flex items-center"> Participants </h2>
                    </div>
                </statContainer>
                <statContainer className="flex-1">
                    <div className="statContainer flex flex-col h-full p-3 gap-3">
                        <div className="statistic"> {currentMonthData.students} </div>
                        <h2 className="statisticDescription flex-1 flex items-center"> Number of Students </h2>
                    </div>
                </statContainer>
                <statContainer className="flex-1">
                    <div className="statContainer flex flex-col h-full p-3 gap-3">
                        <div className="statistic"> {currentMonthData.sslHours} </div>
                        <h2 className="statisticDescription flex-1 flex items-center"> SSL Hours Awarded </h2>
                    </div>
                </statContainer>
            </div>
        </>
    )
}