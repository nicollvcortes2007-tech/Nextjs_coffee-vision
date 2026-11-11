"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function TrendChart({
  data = [],
  categoryKey,
  valueKey,
  color = "#769f1a",
  mode = "area",
  valueSuffix = "",
}) {
  if (!data.length) {
    return <p className="chart-empty">Aún no hay datos para este periodo.</p>;
  }

  const Chart = mode === "bar" ? BarChart : AreaChart;

  return (
    <figure className="trend-chart" aria-label="Gráfica de tendencias">
      <ResponsiveContainer width="100%" height="100%">
        <Chart data={data} margin={{ top: 10, right: 12, left: -14, bottom: 0 }}>
          <CartesianGrid stroke="#edf0e9" strokeDasharray="3 6" vertical={false} />
          <XAxis
            dataKey={categoryKey}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#849087", fontSize: 11 }}
            dy={8}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9aa39b", fontSize: 10 }}
            width={42}
          />
          <Tooltip
            cursor={{ stroke: `${color}66`, strokeDasharray: "4 4" }}
            contentStyle={{
              border: "1px solid #e8e1d9",
              borderRadius: 12,
              boxShadow: "0 12px 32px rgba(35, 50, 40, .12)",
              fontSize: 12,
            }}
            formatter={(value) => [`${value}${valueSuffix}`, "Total"]}
          />
          {mode === "bar" ? (
            <Bar dataKey={valueKey} fill={color} radius={[7, 7, 2, 2]} maxBarSize={34} />
          ) : (
            <Area
              type="monotone"
              dataKey={valueKey}
              stroke={color}
              strokeWidth={3}
              fill={color}
              fillOpacity={0.13}
              activeDot={{ r: 5, strokeWidth: 0, fill: color }}
            />
          )}
        </Chart>
      </ResponsiveContainer>
    </figure>
  );
}
