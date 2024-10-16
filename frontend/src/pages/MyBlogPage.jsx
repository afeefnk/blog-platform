import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AutthContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const MyBlogPage = () => {
    const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('http://localhost:9012/api/getmyblog', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data);
      } catch (error) {
        setError("Error fetching your blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchMyBlogs();
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Blogs</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="border rounded-lg p-4 mb-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-500 text-sm">
        {new Date(post.timestamp).toLocaleString()}
      </p>
      <p className="mt-2">{post.content.substring(0, 100)}...</p>
      <Button
        onClick={() => navigate(`/posts/${post._id}`)}
        className="mt-4"
        variant="primary" // Use primary style (blue)
      >
        View More
      </Button>
          </div>
        ))
      ) : (
        <p>You haven't written any blogs yet.</p>
      )}
    </div>
  )
}

export default MyBlogPage
