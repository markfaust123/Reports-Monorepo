import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import * as React from "react";

import { cn } from "@/lib/utils";

const NavigationBarItem = ({ title }: { title: string }) => {
  const components = [
    {
      title: "Overiew",
      href: "/general-overview",
      description: "An overview of the <Research Team>.",
    },
    {
      title: "Team",
      href: "/general-team",
      description: "View <Research Team> administrators.",
    },
    {
      title: "Resources",
      href: "/general-resources",
      description: "A listing of valuable resources for the <Research Team>.",
    },
  ];

  return (
    <>
      <NavigationMenuItem>
        <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[540] gap-3 p-4 md:w-[540px] md:grid-cols-1 lg:w-[540px]">
            {components.map((component) => (
              <ListItem
                key={component.title}
                title={component.title}
                href={component.href}
              >
                {component.description}
              </ListItem>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </>
  );
};

export default NavigationBarItem;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
