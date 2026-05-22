import React from "react";
import {
  CBreadcrumb,
  CBreadcrumbItem,
} from "@coreui/react";

const CommonBreadcrumb = ({
  parent = "Admin",
  current,
}) => {
  return (
    <div className="mb-3">
      <CBreadcrumb>
        <CBreadcrumbItem href="#">
          {parent}
        </CBreadcrumbItem>

        <CBreadcrumbItem active>
          {current}
        </CBreadcrumbItem>
      </CBreadcrumb>
    </div>
  );
};

export default CommonBreadcrumb;