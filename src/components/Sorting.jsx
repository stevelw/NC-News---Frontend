export default function Sorting({ sortBy, setSortBy, options }) {
  function handleClick(option) {
    setSortBy(option);
  }

  return (
    <div className="widget-sort">
      <p>Sort by</p>
      {options.map((option) => {
        return (
          <button
            key={option}
            disabled={sortBy === option}
            onClick={() => handleClick(option)}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
