import { AppDispatch, RootState } from "@/state/store";
import { FaChevronLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { MapRef } from "react-map-gl";
import { useMapRef } from "@/composables/useMapRef";
import {
    setSelectedGeoJsonHike,
    setSelectedHike,
} from "@/state/hike/hikeSlice";
import HikePercs from "../molecules/HikePercs";
import icons from "@/assets/icons/icons";
import { HikeDifficulty } from "@/types/hikes";
import { Skeleton } from "../ui/skeleton";

const HikeDetails = () => {
    const selectedHike = useSelector(
        (state: RootState) => state.hike.selectedHike
    );
    const mapRef = useMapRef();
    const dispatch = useDispatch<AppDispatch>();

    const selectedLocationBoundingBox = useSelector(
        (state: RootState) => state.location.selectedLocationBoundingBox
    );

    const navigate = useNavigate();

    const handleBack = () => {
        if (selectedLocationBoundingBox)
            redirectToSeletedViewport(mapRef, selectedLocationBoundingBox);

        dispatch(setSelectedGeoJsonHike(undefined));
        dispatch(setSelectedHike(undefined));

        navigate(-1);
    };

    return (
        <>
            <div className="flex flex-col items-start max-w-full gap-4 p-2">
                <Button
                    size="xs"
                    variant={"ghost"}
                    className="flex gap-2 items-center"
                    onClick={handleBack}
                >
                    <FaChevronLeft className="h-3 fill-slate-400" />
                    <span className="text-slate-400 text-sm">Retour</span>
                </Button>

                {selectedHike && (
                    <>
                        <img
                            src={selectedHike?.images[0].image_url}
                            className="rounded-md w-full bg-cover h-[12rem]"
                        />

                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col items-start">
                                <h1 className="font-bold text-lg">
                                    {selectedHike?.title}
                                </h1>
                                <h2 className="text-md text-slate-400">
                                    {selectedHike?.municipality}
                                </h2>
                            </div>
                            <div
                                className="leading-6 text-slate-500 max-w-full"
                                dangerouslySetInnerHTML={{
                                    __html: selectedHike?.excerpt as string,
                                }}
                            ></div>

                            <div className="grid grid-cols-3 gap-2">
                                <HikePercs
                                    icon={icons.personHiking}
                                    title={`${
                                        selectedHike?.distance / 1000
                                    } km`}
                                    content="Distance"
                                />

                                <HikePercs
                                    icon={icons.clock}
                                    title={selectedHike?.duration}
                                    content="Durée moyenne"
                                />

                                <HikePercs
                                    icon={
                                        icons[`dial${selectedHike?.difficulty}`]
                                    }
                                    title={
                                        HikeDifficulty[
                                            selectedHike?.difficulty.toUpperCase() as keyof typeof HikeDifficulty
                                        ]
                                    }
                                    content="Difficulté"
                                />

                                <HikePercs
                                    icon={icons.mountainHigh}
                                    title={selectedHike?.highest_point + " m"}
                                    content="Point le plus haut"
                                />

                                <HikePercs
                                    icon={icons.mountainLow}
                                    title={selectedHike?.lowest_point + " m"}
                                    content="Point le plus bas"
                                />

                                <HikePercs
                                    icon={icons.arrowUpRightDots}
                                    title={
                                        selectedHike?.positive_elevation + " m"
                                    }
                                    content="Élévation positive"
                                />
                            </div>

                            <div
                                className="leading-7 max-w-full"
                                dangerouslySetInnerHTML={{
                                    __html: selectedHike?.description as string,
                                }}
                            ></div>
                        </div>
                    </>
                )}

                {!selectedHike && (
                    <div className="flex flex-col items-start w-full gap-4 p-2">
                        <Skeleton className="h-[12rem] w-full" />

                        <div className="flex flex-col gap-1 items-start">
                            <Skeleton className="w-[14rem] h-4" />
                            <Skeleton className="w-10 h-4" />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <Skeleton className="w-full h-4" />
                            <Skeleton className="w-full h-4" />
                            <Skeleton className="w-full h-4" />
                        </div>

                        <div className="grid grid-cols-3 gap-2 w-full">
                            {Array.from({ length: 6 }, (_, i) => (
                                <Skeleton className="h-20 w-full" />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

function redirectToSeletedViewport(
    mapRef: React.RefObject<MapRef>,
    selectedBoundingBox: number[]
) {
    return mapRef.current?.fitBounds(
        [
            [selectedBoundingBox[0], selectedBoundingBox[1]],
            [selectedBoundingBox[2], selectedBoundingBox[3]],
        ],
        {
            padding: { top: 10, bottom: 25, left: 15, right: 5 },
        }
    );
}

export default HikeDetails;
