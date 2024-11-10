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
    <div className="sort-widget">
      <p className="sort-widget__label">Sort by</p>
      {options.map((optionText) => {
        return (
          <button
            key={optionText}
            className={
              "sort-widget__option" +
              (sortBy === optionText ? " sort-widget__option--selected" : "")
            }
            onClick={() => handleClick(optionText)}
          >
            {optionText}
            {sortBy !== optionText && <>&nbsp;</>}
            {sortBy === optionText && (isSortDesc ? <>&darr;</> : <>&uarr;</>)}
          </button>
        );
      })}
    </div>
  );
}
