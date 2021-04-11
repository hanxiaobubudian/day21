import React from "react";
import IndexView from "./index";
import AboutView from "./about";
import ListView from "./list";
import UndefinedView from "./404";

let routes = [
  {
    path: "/",
    exact: true,
    render: props => {
      return <IndexView {...props} />;
    }
  },
  {
    path: "/about",
    exact: true,
    render: props => {
      return <AboutView {...props} />;
    }
  },
  {
    path: ["/list", "/list/:page"],
    exact: true,
    render: props => {
      let { page = 1 } = props.match.params;
      if (page >= 1) {
        return <ListView {...props} />;
      }
      return <UndefinedView {...props} />;
    }
  },
  {
    path: "",
    exact: false,
    render: props => {
      return <UndefinedView {...props} />;
    }
  }
];

let navs = [
  {
    to: "/",
    exact: true,
    title: "首页"
  },
  {
    to: "/about",
    exact: true,
    title: "关于"
  },
  {
    to: "/list",
    title: "课程列表",
    isActive: url => {
      let urlData = url.split("/");
      if (
        url === "/list" ||
        (urlData.length === 3 && urlData[1] === "list" && urlData[2] > 0)
      ) {
        // 判断URL为‘/list’或'/list'大于1的数字时，选中当前项，否则不选中
        return true;
      }
      return false;
    }
  }
];

export { routes, navs };
