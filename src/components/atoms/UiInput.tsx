import { styled } from "styled-components";

const StyledInput = styled.div`
    padding: 0.5em 1em;
    border-radius: 5px;
    min-width: 350px;
    background-color: #f3f4f6;
    color: #4b5563;
`;

const UiInput = ({
    icon = <></>,
    placeholder = "Recherchez un lieu...",
    handleInput,
}) => {
    const handleInputChange = (e) => {
        handleInput(e.target.value);
    };

    return (
        <>
            <StyledInput className="flex items-center gap-4">
                {icon}
                <input
                    type="text"
                    placeholder={placeholder}
                    className="outline-none w-full bg-transparent"
                    onChange={handleInputChange}
                />
            </StyledInput>
        </>
    );
};

export default UiInput;
