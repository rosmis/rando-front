import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
    return (
        <>
            <div className="bg-white z-10 px-10 flex justify-between items-center py-2 absolute top-0 left-0 right-0">
                <Link to="/" >HOME</Link>
                <SearchBar />
                <Avatar>
                    <AvatarImage
                        src="https://github.com/rosmis-cse.png"
                        alt="@rosmis"
                    />
                    <AvatarFallback>RL</AvatarFallback>
                </Avatar>
            </div>
        </>
    );
};

export default Navbar;
