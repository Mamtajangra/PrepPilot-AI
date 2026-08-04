import "./AICommon.css";

function AILayout({ title, subtitle, sidebar, children }) {
  return (
    <div className="ai-layout">

      {sidebar}

      <main className="ai-main">

        <div className="ai-header">

          <h1>{title}</h1>

          {subtitle && (
            <p>{subtitle}</p>
          )}

        </div>

        {children}

      </main>

    </div>
  );
}

export default AILayout;