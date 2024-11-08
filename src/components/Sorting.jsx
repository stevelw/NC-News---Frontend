export default function Sorting({
  sortBy,
  setSortBy,
  isSortDesc,
  setIsSortDesc,
  options,
}) {
  function handleClick(option) {
    if (sortBy === option)
      setIsSortDesc((currentSortOrder) => !currentSortOrder);
    setSortBy(option);
  }

  return (
    <div className="widget-sort">
      <p>Sort by</p>
      {options.map((option) => {
        return (
          <button
            key={option}
            className={sortBy === option ? "selected" : ""}
            onClick={() => handleClick(option)}
          >
            {option}{" "}
            {sortBy === option ? (
              isSortDesc ? (
                <>&darr;</>
              ) : (
                <>&uarr;</>
              )
            ) : (
              <>&nbsp;</>
            )}
          </button>
        );
      })}
    </div>
  );
}
