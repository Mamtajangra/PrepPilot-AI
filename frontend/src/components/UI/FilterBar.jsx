import "./common.css";

function FilterBar({
  options,
  active,
  onChange,
}) {
  return (
    <div className="filter-bar">

      {options.map((option) => (

        <button
          key={option}
          type="button"
          className={
            active === option
              ? "filter-btn active"
              : "filter-btn"
          }
          onClick={() => onChange(option)}
        >
          {option}
        </button>

      ))}

    </div>
  );
}

export default FilterBar;