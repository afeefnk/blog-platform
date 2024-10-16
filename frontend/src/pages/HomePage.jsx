import React, { useEffect, useState } from 'react'
import axios from "axios"
import PostCard from '../components/PostCard';

const HomePage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:9012/api/getallposts")
        .then((res)=>{
            setPosts(res.data);
        })
        .catch((error)=>{
            console.log("Error fetching posts:", error);
            
        })
    },[]);
    
  return (
    <div className="container mx-auto p-4">
  <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Blog Posts</h1>
  
  {posts.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  ) : (
    <p className="text-lg text-gray-600 text-center mt-4">No posts available.</p>
  )}
</div>
  )
}

export default HomePage
