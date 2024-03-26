const UiIcon = ({ icon }: { icon: string }) => {
    return (
        <>
            <img className="h-5" src={`./src/assets/icons/${icon}.svg`} />
        </>
    );
};

export default UiIcon;
