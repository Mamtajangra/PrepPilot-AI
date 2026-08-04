import ReactMarkdown from "react-markdown";

function AIResult({
  loading,
  title,
  data,
  emptyTitle,
  emptyDescription,
  actions,
}) {
  return (
    <div className="ai-result-card">

      <div className="ai-result-header">

        <h2>{title}</h2>

        {actions}

      </div>

      {loading ? (

        <div className="ai-loading">

          <div className="ai-spinner"></div>

          <p>Generating...</p>

        </div>

      ) : data ? (

        <div className="ai-markdown">

          <ReactMarkdown>
            {data}
          </ReactMarkdown>

        </div>

      ) : (

        <div className="ai-empty">

          <h3>{emptyTitle}</h3>

          <p>{emptyDescription}</p>

        </div>

      )}

    </div>
  );
}

export default AIResult;