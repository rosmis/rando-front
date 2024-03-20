import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import SidebarWrapper from "../ui/SidebarWrapper";

const Sidebar = () => {
    const isSidebarOpened = useSelector(
        (state: RootState) => state.sidebar.isOpen
    );

    return (
        <>
            <aside className={
                `pt-14 pb-4 bg-white transition-all h-screen ${
                    isSidebarOpened ? "w-[35vw]" : "w-0"
                }`
            }>
                <SidebarWrapper>
                    <p>content goes here</p>
                </SidebarWrapper>
            </aside>
        </>
    );
};

export default Sidebar;
