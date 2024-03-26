import { Hike } from "@/types/hikes";
import HikeIcon from "../molecules/HikeIcon";

const HikeIcons = ({ hike }: { hike: Hike }) => {
    return (
        <div className="flex gap-4 w-full justify-between p-2 border-t border-t-slate-200">
            <HikeIcon icon="dial-med-low"></HikeIcon>

            <HikeIcon icon="clock"> {hike.duration} </HikeIcon>

            <HikeIcon icon="mountain-high"> {hike.highest_point} m </HikeIcon>
            <HikeIcon icon="mountain-low"> {hike.lowest_point} m </HikeIcon>
        </div>
    );
};

export default HikeIcons;
