import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import FbPost from "./pages/FbPost";
import IgPost from "./pages/IgPost";
import IgComment from "./pages/IgComment";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/FbPost" element={<FbPost />} />
          <Route path="/IgPost" element={<IgPost />} />
          <Route path="/IgComment" element={<IgComment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
