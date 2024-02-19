import NavigationBar from "./navigation/navigation-bar";

const Header = () => {
  return (
    <div className="flex gap-3 p-4 border-b border-slate-400">
      <NavigationBar />
    </div>
  );
};

export default Header;
