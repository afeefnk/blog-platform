import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Correct import
// import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CreatePostPage from './pages/CreatePostPage';
import PostDetailPage from './pages/PostDetailPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import UpdatePostPage from './pages/UpdatePostPage';
import MyBlogPage from './pages/MyBlogPage';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto mt-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/update/:id" element={<UpdatePostPage />} />
          <Route path="/myblogs" element={<MyBlogPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
