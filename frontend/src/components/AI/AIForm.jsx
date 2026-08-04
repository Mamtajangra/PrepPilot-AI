function AIForm({
  children,
  onSubmit,
  loading,
  buttonText = "Generate",
  loadingText = "Generating...",
}) {
  return (
    <form className="ai-form-card" onSubmit={onSubmit}>

      {children}

      <button
        className="ai-primary-btn"
        type="submit"
        disabled={loading}
      >
        {loading ? loadingText : buttonText}
      </button>

    </form>
  );
}

export default AIForm;