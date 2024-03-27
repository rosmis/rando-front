import { RootState } from "@/state/store";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";

const HikeDetails = () => {
    const selectedHike = useSelector(
        (state: RootState) => state.hike.selectedHike
    );

    console.log(selectedHike);

    return (
        <div className="flex flex-col items-start gap-4">
            <Button size="xs" variant={"ghost"} className="flex gap-2 items-center">
                <FaChevronLeft className="h-3 fill-slate-400" />
                <span className="text-slate-400 text-sm">Retour</span>
            </Button>

            <img
                src={selectedHike?.images[0].image_url}
                className="rounded-md w-full bg-cover h-[12rem]"
            />

            <pre className="whitespace-pre">{JSON.stringify(selectedHike)}</pre>
        </div>
    );
};

export default HikeDetails;
