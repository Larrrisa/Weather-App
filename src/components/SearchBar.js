function SearchBar({ handleSubmit, handleChange, inputValue }) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        value={inputValue}
        placeholder="Search city"
        required
      />
    </form>
  );
}

export default SearchBar;
