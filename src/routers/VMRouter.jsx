import NotFound from "pages/NotFound";
import VendingMachine from "pages/VendingMachine";
import Wallet from "pages/Wallet";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import App from "App";
import WalletProvider from "contexts/WalletProvider";

const routes = [
  {
    page: <VendingMachine />,
    path: "/",
    props: "index",
  },
  {
    page: <Wallet />,
    path: "/wallet",
    props: "",
  },
];

const VMRouter = () => {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <WalletProvider>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<App />}>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} {...route.props} element={route.page} />
            ))}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </WalletProvider>
    </AnimatePresence>
  );
};

export default VMRouter;
