const SidebarWrapper = ({ ...props }) => {
    return (
        <div className="bg-slate-100 mx-3 h-full border border-slate-200 rounded-md p-4">
            {props.children}
        </div>
    );
};

export default SidebarWrapper;
