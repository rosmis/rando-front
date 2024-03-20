import SearchBar from "./SearchBar";

const Navbar = () => {
    return (
        <>
            <div className="bg-white z-10 px-20 flex justify-center items-center py-2 fixed top-0 left-0 right-0">
                <SearchBar />
            </div>
        </>
    );
};

export default Navbar;
