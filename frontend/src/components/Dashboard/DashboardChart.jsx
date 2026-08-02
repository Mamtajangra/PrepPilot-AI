import "./DashboardChart.css";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function DashboardChart({ stats }) {
  const data = [
    {
      name: "Completed",
      value: stats.completed || 0,
      color: "#22c55e",
    },
    {
      name: "Pending",
      value: stats.pending || 0,
      color: "#f59e0b",
    },
  ];

  return (
    <div className="dashboard-chart">

      <div className="chart-header">

        <div>
          <h2>Study Progress</h2>
          <p>Your current learning distribution</p>
        </div>

        <span className="completion-badge">
          {stats.completion_rate || 0}% Complete
        </span>

      </div>

      <div className="chart-body">

        <div className="chart-wrapper">

          <ResponsiveContainer width="100%" height={280}>

            <PieChart>

              <Pie
                data={data}
                innerRadius={75}
                outerRadius={105}
                dataKey="value"
                paddingAngle={4}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.color}
                  />
                ))}
              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        <div className="chart-legend">

          {data.map((item, index) => (
            <div
              className="legend-item"
              key={index}
            >
              <span
                className="legend-dot"
                style={{
                  background: item.color,
                }}
              ></span>

              <div>

                <h4>{item.name}</h4>

                <p>{item.value} Plans</p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default DashboardChart;