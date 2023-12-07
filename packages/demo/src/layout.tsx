import React from "react";

import { useNavigation, Outlet, Link } from "react-router-dom";

export default function Root() {
  const navigation = useNavigation();

  return (
    <>
      <div id="sidebar">
        <h1>React Router</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <Link to={`modal/1`}>Modal1</Link>
              <Link to={`modal/2`}>Modal2</Link>
              <Link to={`select`}>Select</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        {/* 妈诶，react-router终于开窍了，设计一个outlet，
        以前都是用Switch来实现的，而switch真的很难用，还必须在里面把Route全部声明出来，几乎没人这么写
        最后只能通过组件里，一遍遍的嵌套同样的Layout来实现*/}
        <Outlet />
      </div>
    </>
  );
}
