import { Hike } from "@/types/hikes";
import HikeImageCarousel from "../molecules/HikeImageCarousel";
import HikeIcons from "./HikeIcons";

const HikeCard = ({ hike }: { hike: Hike }) => {
    return (
        <div
            className="flex flex-col gap-2 min-h-40 rounded-md bg-white
             w-full border cursor-pointer hover:bg-slate-50 transition-all border-slate-200"
        >
            <div className="flex flex-col gap-4 px-2 pt-2">
                <HikeImageCarousel backgroundImage={hike.images[0].image_url} />
                <div className="flex items-center justify-between">
                    <div className="flex flex-col items-start">
                        <h2 className="max-w-[19rem] truncate font-bold">
                            {hike.title}
                        </h2>
                        <h3 className="text-sm text-slate-500">
                            {hike.municipality}
                        </h3>
                    </div>

                    <span className="font-bold p-1 bg-white rounded-md">
                        {hike.distance / 1000} Km
                    </span>
                </div>
            </div>

            <HikeIcons hike={hike} />
        </div>
    );
};

export default HikeCard;
