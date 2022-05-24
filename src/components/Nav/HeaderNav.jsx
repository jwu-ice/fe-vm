import { styledFocusing } from "helpers/styleTemplate";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const HeaderNav = () => {
  const path = useLocation().pathname;

  return (
    <nav className="flex gap-4 justify-center items-center my-10 text-xl">
      <Link to="/" className={`${styledFocusing("/", path)} headerTab--starbucks`}>
        자판기
      </Link>
      <Link to="/wallet" className={`${styledFocusing("/wallet", path)} headerTab--starbucks`}>
        지갑
      </Link>
    </nav>
  );
};

export default HeaderNav;
