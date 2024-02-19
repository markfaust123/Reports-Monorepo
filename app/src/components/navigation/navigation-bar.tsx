import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import NavigationBarItem from "./navigation-bar-item";

const NavigationBar = () => {
  return (
    <div className="flex gap-3">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationBarItem title="Title #1" />
          <NavigationBarItem title="Title #2" />
          <NavigationBarItem title="Title #3" />
          <NavigationBarItem title="Title #4" />
          <NavigationBarItem title="Title #5" />
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavigationBar;
