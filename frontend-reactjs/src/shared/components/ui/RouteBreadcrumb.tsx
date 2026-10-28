import { Link, useMatches } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./Breadcrumb";
import { HomeIcon } from "lucide-react";
import { RxHome } from "react-icons/rx";
import { PiHouseLight, PiHouseSimple } from "react-icons/pi";

interface RouteHandle {
  title?: string;
  breadcrumb?: string;
}

export const RouteBreadcrumb = () => {
  const matches = useMatches();
  const crumbs = matches.flatMap((match) => {
    const handle = match.handle as RouteHandle | undefined;
    const label = handle?.breadcrumb ?? handle?.title;

    return label && match.pathname !== "/" ? [{ pathname: match.pathname, label }] : [];
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link to="/" />}>
            <PiHouseSimple />
          </BreadcrumbLink>
        </BreadcrumbItem>
        {crumbs.map((crumb, index) => (
          <BreadcrumbItem key={`${crumb.pathname}-${index}`}>
            <BreadcrumbSeparator />
            {index === crumbs.length - 1 ? (
              <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink render={<Link to={crumb.pathname} />}>{crumb.label}</BreadcrumbLink>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
