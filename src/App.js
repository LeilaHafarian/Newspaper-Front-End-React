import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import ArticlePage from "./pages/ArticlePage";
import JournalistPage from "./pages/JournalistPage";
import BilderPage from "./pages/BilderPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={"/"} exact element={<ArticlePage />} />
          <Route path={"/journalist"} exact element={<JournalistPage />} />
          <Route path={"/bilder"} exact element={<BilderPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
