import { FaSearch } from "react-icons/fa";
import UiInput from "../atoms/UiInput";

const SearchInput = ({ handleInput }) => {
    return (
        <UiInput
            icon={<FaSearch className="text-[#4b5563]" />}
            handleInput={handleInput}
        />
    );
};

export default SearchInput;
