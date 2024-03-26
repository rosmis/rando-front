import { Hike } from "@/types/hikes";
import HikeImageCarousel from "../molecules/HikeImageCarousel";

const HikeCard = ({ hike }: { hike: Hike }) => {
    return (
        <div
            className="flex flex-col gap-4 min-h-40 rounded-md bg-white p-2
             w-full border cursor-pointer hover:bg-slate-100 transition-all border-slate-200"
        >
            <HikeImageCarousel backgroundImage={hike.images[0].image_url} />
            <div className="flex flex-col items-start">
                <h2 className="max-w-[19rem] truncate font-bold">{hike.title}</h2>
                <h3 className="text-sm text-slate-500">{hike.municipality}</h3>
            </div>
        </div>
    );
};

export default HikeCard;
