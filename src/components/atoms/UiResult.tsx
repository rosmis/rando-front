import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const StyledResult = styled.div`
    width: 350px;
    background-color: #f3f4f6;
    cursor: pointer;
    border-top-left-radius: ${(props) => (props.roundedtop ? "5px" : "0")};
    border-top-right-radius: ${(props) => (props.roundedtop ? "5px" : "0")};
    border-bottom-left-radius: ${(props) =>
        props.roundedbottom ? "5px" : "0"};
    border-bottom-right-radius: ${(props) =>
        props.roundedbottom ? "5px" : "0"};
    transition: background-color 0.2s ease-in-out;
    &:hover {
        background-color: #e5e7eb;
    }
`;

const UiResult = ({ location, handleSelectedLocation, ...props }) => {
    const handleSelection = () => {
        handleSelectedLocation(location);
    };

    const params = new URLSearchParams();
    params.set("search", location.name);
    params.set("latitude", location.centerCoordinates[1]);
    params.set("longitude", location.centerCoordinates[0]);

    return (
        <StyledResult {...props}>
            <Link
                to={{
                    pathname: "/",
                    search: params.toString(),
                }}
                className="flex items-center justify-start gap-4 px-4 py-2"
                onClick={handleSelection}
            >
                <FaChevronRight className="text-[#4b5563] w-fit shrink-0" />
                <div className="flex flex-col items-start ">
                    <p className="font-bold text-[#4b5563] max-w-[300px] truncate">
                        {location.name}
                    </p>
                    <p className="text-sm text-[#4b5563] max-w-[300px] truncate">
                        {location.location}
                    </p>
                </div>
            </Link>
        </StyledResult>
    );
};

export default UiResult;
