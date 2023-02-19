import { HashRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Settings } from './pages/Settings';
import { EditArticle } from './pages/EditArticle';
import { Article } from './pages/Article';
import { Profile } from './pages/Profile';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/editor" element={<EditArticle />} />
        <Route path="/editor/:slug" element={<EditArticle />} />
        <Route path="/profile/@:username" element={<Profile />} />
        <Route path="/profile/@:username/favorites" element={<Profile />} />
        <Route path="/article/:slug" element={<Article />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
