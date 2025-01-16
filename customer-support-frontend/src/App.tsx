import React from "react";
import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import PlayerList from "./components/Player/PlayerList";

const PlayerDetail = React.lazy(
  () => import("./components/Player/PlayerDetail")
);

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PlayerList />} />
        <Route
          path="player/:playerId"
          element={
            <React.Suspense fallback={<></>}>
              <PlayerDetail />
            </React.Suspense>
          }
        />
        {/*<Route path="*" element={<NoMatch />} />*/}
      </Route>
    </Routes>
  );
};

export default App;
