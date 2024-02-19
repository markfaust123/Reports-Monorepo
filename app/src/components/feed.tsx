import Header from "./header";
import Reports from "./report/reports";

const Feed = () => {
  return (
    <div className="flex flex-col w-full min-h-screen border-x border-slate-400 md:max-w-xl">
      <Header />
      <Reports />
    </div>
  );
};

export default Feed;
