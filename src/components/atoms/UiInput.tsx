import React from "react";
import { styled } from "styled-components";
import UiIcon from "./UiIcon";
import icons from "@/assets/icons/icons";

const StyledInput = styled.div`
    padding: 0.3em 1em;
    border-radius: 6px;
    min-width: 350px;
    background-color: #f3f4f6;
    color: #4b5563;
`;

const UiInput = ({
    icon = <></>,
    placeholder = "Recherchez un lieu...",
    handleInput,
    iconRight = <></>,
    searchTerm = "",
    handleKeyUp,
}) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleInputChange = (e) => {
        handleInput(e.target.value);
    };

    const handleResetInput = () => {
        handleInput("");
    };

    // Toggle the searchbar when ⌘/ctrk + K is pressed
    React.useEffect(() => {
        const down = (e) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey) && inputRef.current) {
                e.preventDefault();
                inputRef.current.focus();
            }

            if (e.key === "Escape" && inputRef.current) {
                inputRef.current.blur();
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <>
            <StyledInput className="flex items-center bg-slate-200 gap-4">
                {icon}
                <input
                    ref={inputRef}
                    type="text"
                    placeholder={placeholder}
                    className="outline-none w-full h-5 bg-transparent placeholder-slate-400 leading-4"
                    onChange={handleInputChange}
                    value={searchTerm}
                    onKeyUpCapture={handleKeyUp}
                />

                <span
                    className="transition-all cursor-pointer"
                    onClick={handleResetInput}
                >
                    {iconRight}
                </span>

                {!searchTerm && (
                    <span className="flex items-center gap-[2px] text-sm font-normal text-[#4b5563]">
                        <UiIcon icon={icons.command} size="small" />K
                    </span>
                )}
            </StyledInput>
        </>
    );
};

export default UiInput;
