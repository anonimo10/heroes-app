import { Link } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
interface Breadcrumb {
  label: string;
  to: string;
}
interface Props {
  currentPage: string;
  breadcrumds?: Breadcrumb[];
}

export const CustomBreadcrumbs = ({ currentPage, breadcrumds = [] }: Props) => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          {/* Inicio */}
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={"/"}> Inicio</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {breadcrumds.map((crumd) => (
            <BreadcrumbItem className="flex items-center">
              <BreadcrumbSeparator />
              <BreadcrumbLink asChild>
                <Link to={crumd.to}> {crumd.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}

          {/* Pagina Actual */}
          <BreadcrumbSeparator />
          <BreadcrumbItem className="flex items-center">
            <BreadcrumbLink className="text-black">
              {currentPage}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};
