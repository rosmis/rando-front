import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import SidebarWrapper from "../ui/SidebarWrapper";
import HikeCard from "./HikeCard";
import { useMemo } from "react";
import HikePagination from "./HikePagination";

const Sidebar = () => {
    const isSidebarOpened = useSelector(
        (state: RootState) => state.sidebar.isOpen
    );
    const hikesPreview = useSelector(
        (state: RootState) => state.hike.hikesPreview
    );
    const isHikesPreviewFetching = useSelector(
        (state: RootState) => state.hike.isHikesPreviewLoading
    );
    const selectedLocation = useSelector(
        (state: RootState) => state.location.selectedLocation
    );

    const searchedHikesPreview = useMemo(() => {
        if (isHikesPreviewFetching) {
            return Array.from({ length: 3 }, (_, i) => {
                return <HikeCard key={i} isLoading />;
            });
        }

        if (!hikesPreview) return;

        console.log(hikesPreview);

        return hikesPreview.data.map((hike) => {
            return <HikeCard key={hike.id} hike={hike} />;
        });
    }, [hikesPreview, isHikesPreviewFetching]);

    return (
        <>
            <aside
                className={`pt-14 pb-16 w-[35vw] bg-white transition-all duration-300 h-screen ${
                    isSidebarOpened ? "mr-0" : "-mr-[35%]"
                }`}
            >
                <SidebarWrapper>{searchedHikesPreview}</SidebarWrapper>

                <HikePagination
                    total={hikesPreview?.total}
                    selectedLocation={selectedLocation}
                />
            </aside>
        </>
    );
};

export default Sidebar;
