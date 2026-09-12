export default function YearlyStatistics({ yearlyItems }) {
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
        </>
    )
}