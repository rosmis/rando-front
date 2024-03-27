type IconSize = "small" | "medium" | "large";

const sizeClasses: Record<IconSize, string> = {
    small: "h-3",
    medium: "h-5",
    large: "h-8",
};

interface UiIconProps {
    icon: string;
    size?: IconSize;
}

const UiIcon = ({ icon, size = "medium" }: UiIconProps) => {
    const sizeClass = sizeClasses[size];
    return (
        <>
            <img className={`${sizeClass}`} src={icon} />
        </>
    );
};

export default UiIcon;
