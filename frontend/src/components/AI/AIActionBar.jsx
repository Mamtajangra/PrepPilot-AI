import {
  Clipboard,
  Download,
  RefreshCcw,
  Trash2,
} from "lucide-react";

function AIActionBar({
  onCopy,
  onDownload,
  onRegenerate,
  onClear,
}) {
  return (
    <div className="ai-action-bar">

      <button
        className="ai-action-btn"
        onClick={onCopy}
        type="button"
      >
        <Clipboard size={18} />
        Copy
      </button>

      <button
        className="ai-action-btn"
        onClick={onDownload}
        type="button"
      >
        <Download size={18} />
        PDF
      </button>

      <button
        className="ai-action-btn"
        onClick={onRegenerate}
        type="button"
      >
        <RefreshCcw size={18} />
        Regenerate
      </button>

      <button
        className="ai-action-btn danger"
        onClick={onClear}
        type="button"
      >
        <Trash2 size={18} />
        Clear
      </button>

    </div>
  );
}

export default AIActionBar;