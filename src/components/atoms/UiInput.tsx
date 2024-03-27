import { styled } from "styled-components";

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
    const handleInputChange = (e) => {
        handleInput(e.target.value);
    };

    const handleResetInput = () => {
        handleInput("");
    };

    return (
        <>
            <StyledInput className="flex items-center bg-slate-200 gap-4">
                {icon}
                <input
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
            </StyledInput>
        </>
    );
};

export default UiInput;
