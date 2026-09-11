export default function CustomTooltip({ active, payload, label}) {
    if (!active || !payload || payload.length === 0) {
        return null;
    }

    return (
        <div className="customTooltip flex flex-col gap-1">
            {label &&
                <h3> {label}: </h3>
            }

            <div>
                {payload.map((entry) => {
                    const color = entry.payload?.color || entry.color;
                    return (
                        <div
                            key={entry.datakey}
                            className="flex items-center gap-3"
                        >
                            <legendIcon 
                                style={{ backgroundColor: color }}
                            />
                            <div className="flex-1 text-left">
                                {entry.name}
                            </div>
                            <div>
                                {entry.value}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}