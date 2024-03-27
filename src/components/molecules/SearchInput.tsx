import { FaSearch } from "react-icons/fa";
import UiInput from "../atoms/UiInput";

const SearchInput = ({
    handleInput,
    iconRight = <></>,
    searchTerm = "",
    handleKeyUp,
}) => {
    return (
        <UiInput
            icon={<FaSearch className="text-[#4b5563]" />}
            handleInput={handleInput}
            iconRight={iconRight}
            searchTerm={searchTerm}
            handleKeyUp={handleKeyUp}
        />
    );
};

export default SearchInput;
