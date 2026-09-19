export default function CustomLegend({ itemsSet, orientation }) {
    return (
        <>
            {orientation === "horizontal"? (
                <div className="customLegend">
                    {itemsSet.map((item) => (
                        <div key={item.id} className="customLegendIcon">
                            <legendicon
                                style={{ backgroundColor: item.color }}
                            />
                            <div className="flex-1 text-left"> {item.name} </div> 
                        </div>
                    ))}
                </div>
            ) : (
                <container className="w-[160px] p-6">
                    <div className="flex flex-col gap-4">
                        {itemsSet.map((item) => (
                            <div key={item.id} className="customLegendIcon">
                                <legendicon
                                    style={{ backgroundColor: item.color }}
                                />
                                <div className="flex-1 text-left"> {item.name} </div> 
                            </div>
                        ))}
                    </div>
                </container>
            )}
        </>
    )
}