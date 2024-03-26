import { FaSearch } from "react-icons/fa";
import UiInput from "../atoms/UiInput";

const SearchInput = ({ handleInput, iconRight = <></>, searchTerm = "" ,handleKeyUp,handleBlur}) => {
    return (
        <UiInput
            icon={<FaSearch className="text-[#4b5563]" />}
            handleInput={handleInput}
            iconRight={iconRight}
            searchTerm={searchTerm}
            handleKeyUp={handleKeyUp}
            handleBlur={handleBlur}
        />
    );
};

export default SearchInput;
