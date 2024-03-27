import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import SidebarWrapper from "../ui/SidebarWrapper";
import HikeCard from "./HikeCard";
import { useMemo } from "react";
import HikePagination from "./HikePagination";
import { Route, Routes } from "react-router-dom";
import HikeDetails from "./HikeDetails";

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

        return (
            <>
                {...hikesPreview.data.map((hike) => {
                    return <HikeCard key={hike.id} hike={hike} />;
                })}

                <HikePagination
                    total={hikesPreview?.total}
                    selectedLocation={selectedLocation}
                />
            </>
        );
    }, [hikesPreview, isHikesPreviewFetching, selectedLocation]);

    return (
        <>
            <aside
                className={`pt-14 w-[27rem] bg-white transition-all duration-300 h-screen ${
                    isSidebarOpened ? "mr-0" : "-mr-[27rem]"
                }`}
            >
                <SidebarWrapper>
                    <Routes>
                        <Route path="/" element={searchedHikesPreview} />
                        <Route path="/hike/:hikeId" element={<HikeDetails />} />
                    </Routes>
                </SidebarWrapper>
            </aside>
        </>
    );
};

export default Sidebar;
