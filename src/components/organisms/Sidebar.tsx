import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import SidebarWrapper from "../ui/SidebarWrapper";
import HikeCard from "./HikeCard";
import { useMemo } from "react";

const Sidebar = () => {
    const isSidebarOpened = useSelector(
        (state: RootState) => state.sidebar.isOpen
    );
    const hikesPreview = useSelector(
        (state: RootState) => state.hike.hikesPreview
    );
    const isHikesPreviewLoading = useSelector(
        (state: RootState) => state.hike.isHikesPreviewLoading
    );

    const searchedHikesPreview = useMemo(() => {
        if (isHikesPreviewLoading) {
            return Array.from({ length: 3 }, (_, i) => {
                return "hello";
            });
        }
    }, [hikesPreview]);

    return (
        <>
            <aside
                className={`pt-14 pb-16 w-[35vw] bg-white transition-all h-screen ${
                    isSidebarOpened ? "mr-0" : "-mr-[35%]"
                }`}
            >
                <SidebarWrapper>
                    {!!hikesPreview.length &&
                        hikesPreview.map((hike) => {
                            return <HikeCard key={hike.id} hike={hike} />;
                        })}
                </SidebarWrapper>
            </aside>
        </>
    );
};

export default Sidebar;
