import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function Pagation(props) {
  let { activePage, pageLength } = props; // activePage 当前第几页， pageLength总共多少页
  return (
    <nav>
      {[...".".repeat(pageLength)].map((_, index) => {
        return (
          <Fragment key={index}>
            {index > 0 && <span>|</span>}
            <Link
              to={"/list/" + (index + 1)}
              style={{
                color: activePage == index + 1 ? "red" : "#000"
              }}
            >
              {index + 1}
            </Link>
          </Fragment>
        );
      })}
    </nav>
  );
}
