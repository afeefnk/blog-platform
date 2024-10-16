import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../context/AutthContext'
import axios from 'axios'
import Button from '../components/Button'

const PostDetailPage = () => {
    const {id} =useParams()
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    const [post , setPost] = useState(null)
    const [loading,  setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchPost = async () => {
          try {
            const response = await axios.get(
              `http://localhost:9012/api/getposts/${id}`
            );
            setPost(response.data);
          } catch (err) {
            setError("Error fetching post details");
          } finally {
            setLoading(false);
          }
        };
        fetchPost();
      }, [id]);
    
      const handleDelete = async () => {
        const token = localStorage.getItem("token");
        try {
          await axios.delete(`http://localhost:9012/api/deleteposts/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("Post deleted successfully");
          navigate("/");
        } catch (error) {
          console.error("Error deleting post", error);
          setError("Failed to delete the post.");
        }
      };
    
      const handleEdit = () => {
        navigate(`/update/${id}`);
      };
    
      if (loading) {
        return <p>Loading...</p>;
      }
    
      if (error) {
        return <p className="text-red-500">{error}</p>;
      }


  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
    {post && (
      <>
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-2">
          By <span className="font-semibold">{post.author?.name || "Unknown Author"}</span>
        </p>
        <p className="text-gray-700 mb-6">{post.content}</p>
  
        {/* {user && post.author && user.id === post.author._id && ( */}
          <div className="flex space-x-4">
            <Button onClick={handleEdit} className="bg-blue-500 text-white hover:bg-blue-600 transition duration-200">
              Edit Post
            </Button>
            <Button onClick={handleDelete} variant="danger" className="bg-red-500 text-white hover:bg-red-600 transition duration-200">
              Delete Post
            </Button>
          </div>
           {/* )} */}
      </>
    )}
  </div>
  )
}

export default PostDetailPage
