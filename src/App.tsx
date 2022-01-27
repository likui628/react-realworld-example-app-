import { HashRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login"
import { Register } from "./pages/Register/Register"
import { Settings } from "./pages/Settings/Settings"
import { EditArticle } from "./pages/EditArticle/EditArticle"
import { Article } from "./pages/Article/Article"
import { Profile } from "./pages/Profile/Profile"

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/editor" element={<EditArticle />}>   </Route>
        <Route path="/editor/:slug" element={<EditArticle />}></Route>
        <Route path="/profile/@:username" element={<Profile />}> </Route>
        <Route path="/profile/@:username/favorites" element={<Profile />}></Route>
        <Route path="/article/:slug" element={<Article />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
