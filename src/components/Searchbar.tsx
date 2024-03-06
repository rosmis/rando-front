const Searchbar = ({ query, handler }) => {
    return <input type="text" onChange={handler} value={query} />;
};

export default Searchbar;
