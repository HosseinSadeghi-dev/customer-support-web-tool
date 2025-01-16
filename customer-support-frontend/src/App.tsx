import React from "react";
import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import PlayerList from "./components/Player/PlayerList";

// const Prize = React.lazy(() => import("./components/Prize/Prize.tsx"));

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PlayerList />} />
        {/* <Route
          path="prize"
          element={
            <React.Suspense fallback={<></>}>
              <Prize />
            </React.Suspense>
          }
        /> */}
        {/*<Route path="*" element={<NoMatch />} />*/}
      </Route>
    </Routes>
  );
};

export default App;
