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
        <div className="flex flex-col items-start gap-4">
            <Button
                size="xs"
                variant={"ghost"}
                className="flex gap-2 items-center"
                onClick={handleBack}
            >
                <FaChevronLeft className="h-3 fill-slate-400" />
                <span className="text-slate-400 text-sm">Retour</span>
            </Button>

            <img
                src={selectedHike?.images[0].image_url}
                className="rounded-md w-full bg-cover h-[12rem]"
            />

            <pre className="whitespace-pre">
                {JSON.stringify(selectedLocationBoundingBox)}
            </pre>
        </div>
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
