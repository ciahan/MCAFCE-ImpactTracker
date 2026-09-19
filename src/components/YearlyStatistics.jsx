export default function YearlyStatistics({ yearlyItems }) {
    return (
        <>
            <div className="header">
                Total Donations Recieved
            </div>
            <div className="pageCols">
                {yearlyItems
                    .slice(0, 4)
                    .map((item) => (
                        <statContainer className="flex-1" key={item.id}>
                            <div className="statContainer">
                                <div className="statistic"> {item.totalNum} </div>
                                <div className="statisticDescription flex-1"> {item.name} </div>
                            </div> 
                        </statContainer>
                    ))
                }
            </div>
        </>
    )
}