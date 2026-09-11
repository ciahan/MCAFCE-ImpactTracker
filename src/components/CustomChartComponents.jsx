import {
    Rectangle,
    Sector,
} from "recharts";

export const CustomBar = (props) => {
    return (
        <Rectangle
            {...props}
            fill={props.payload.color}
        />
    );
};

export const CustomPieSlice = (props) => {
    return (
        <Sector
            {...props}
            fill={props.payload.color}
        />
    )
};

export const CustomPieLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    value,
}) => {
    const RADIAN = Math.PI / 180;

    const bendRadius = outerRadius + 25;

    const bendX =
        cx + bendRadius * Math.cos(-midAngle * RADIAN);

    const y =
        cy + bendRadius * Math.sin(-midAngle * RADIAN);

    const isRight = bendX > cx;

    const x = bendX + (isRight ? 30 : -30);

    return (
        <text
            x={x}
            y={y}
            fill="var(--text)"
            textAnchor={isRight ? "start" : "end"}
            dominantBaseline="central"
        >
            {value}
        </text>
    );
};

export const CustomLabelLine = ({
    cx,
    cy,
    midAngle,
    outerRadius,
}) => {
    const RADIAN = Math.PI / 180;

    const startRadius = outerRadius + 5;
    const bendRadius = outerRadius + 25;

    // Start point
    const x1 = cx + startRadius * Math.cos(-midAngle * RADIAN);
    const y1 = cy + startRadius * Math.sin(-midAngle * RADIAN);

    // Bend point
    const x2 = cx + bendRadius * Math.cos(-midAngle * RADIAN);
    const y2 = cy + bendRadius * Math.sin(-midAngle * RADIAN);

    // Horizontal end point
    const x3 = x2 + (x2 > cx ? 25 : -25);
    const y3 = y2;

    return (
        <polyline
            points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
            fill="none"
            stroke="var(--text)"
        />
    );
};