const Search = ({ onSubmit, onChange, value }) => {
  return (
    <form onSubmit={onSubmit} >
      <input
        type="text"
        name="search"
        value={value}
        placeholder="Search Games"
        onChange={onChange}
      />
      <button type='submit'>submit</button>
    </form>
  )
}

export default Search
