import { HikePreview } from "@/types/hikes";
import HikeImageCarousel from "../molecules/HikeImageCarousel";
import HikeIcons from "./HikeIcons";
import { Skeleton } from "@/components/ui/skeleton";

const HikeCard = ({
    hike,
    isLoading,
}: {
    hike?: HikePreview;
    isLoading?: boolean;
}) => {
    return (
        <div
            className="flex flex-col gap-2 h-full rounded-md bg-white
             w-full border cursor-pointer hover:bg-slate-50 transition-all border-slate-200"
        >
            {hike && !isLoading && (
                <>
                    <div className="flex flex-col gap-4 px-2 pt-2">
                        <HikeImageCarousel
                            backgroundImage={hike.images[0].image_url}
                        />
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col items-start">
                                <h2 className="max-w-[19rem] truncate font-bold">
                                    {hike.title}
                                </h2>
                                <h3 className="text-sm text-slate-500">
                                    {hike.municipality}
                                </h3>
                            </div>

                            <span className="font-bold whitespace-nowrap p-1 bg-white rounded-md">
                                {hike.distance / 1000} Km
                            </span>
                        </div>
                    </div>

                    <HikeIcons hike={hike} />
                </>
            )}

            {isLoading && (
                <div className="flex flex-col gap-4 p-2">
                    <Skeleton className="h-32 w-full" />

                    <div className="flex flex-col gap-1 items-start">
                        <Skeleton className="w-[14rem] h-4" />
                        <Skeleton className="w-10 h-4" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default HikeCard;
