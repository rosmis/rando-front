import { FaSearch } from "react-icons/fa";
import UiInput from "../atoms/UiInput";

const SearchInput = ({ handleInput, iconRight = <></>, searchTerm = "" }) => {
    return (
        <UiInput
            icon={<FaSearch className="text-[#4b5563]" />}
            handleInput={handleInput}
            iconRight={iconRight}
            searchTerm={searchTerm}
        />
    );
};

export default SearchInput;
