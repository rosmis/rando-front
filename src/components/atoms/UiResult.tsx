import { FaChevronRight } from "react-icons/fa";
import styled from "styled-components";

const StyledResult = styled.div`
    padding: 0.5em 1em;
    width: 350px;
    background-color: #f3f4f6;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    &:hover {
        background-color: #e5e7eb;
    }
`;

const UiResult = ({ mainResult, secondaryResult }) => {
    return (
        <StyledResult className="flex items-center justify-start gap-4">
            <FaChevronRight className="text-[#4b5563] w-fit shrink-0" />
            <div className="flex flex-col items-start ">
                <p className="font-bold text-[#4b5563] max-w-[300px] truncate">
                    {mainResult}
                </p>
                <p className="text-sm text-[#4b5563] max-w-[300px] truncate">
                    {secondaryResult}
                </p>
            </div>
        </StyledResult>
    );
};

export default UiResult;
