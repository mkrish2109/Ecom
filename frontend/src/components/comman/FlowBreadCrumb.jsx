import { Breadcrumb } from "flowbite-react";
import React from "react";
import { HiHome } from "react-icons/hi";
import { Link } from "react-router-dom";

function FlowBreadCrumb() {
  return (
    <div>
      <Breadcrumb aria-label="Default breadcrumb example">
        <Link to="/">
          <Breadcrumb.Item icon={HiHome}>Home</Breadcrumb.Item>
        </Link>
        <Breadcrumb.Item href="#">Projects</Breadcrumb.Item>
        <Breadcrumb.Item>Flowbite React</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}

export default FlowBreadCrumb;
