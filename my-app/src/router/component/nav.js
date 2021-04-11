import React, { Fragment } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { navs } from "../router";

export default function Nav() {
  let { pathname } = useLocation();
  return (
    <nav>
      {navs.map((item, index) => {
        return (
          <Fragment key={index}>
            {index !== 0 && <span>|</span>}
            <NavLink
              to={item.to}
              exact={item.exact}
              isActive={
                item.isActive
                  ? () => {
                      return item.isActive(pathname);
                    }
                  : null
              }
            >
              {item.title}
            </NavLink>
          </Fragment>
        );
      })}
    </nav>
  );
}
