import React, {useEffect, useState} from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";
import axios from "axios";

const App = () => {
    const [posts, setPosts] = useState({});
    const fetchPosts = async () => {
        const res = await axios.get("http://localhost:4003/posts");

        setPosts(res.data);
    };

    useEffect(() => {
        fetchPosts().catch((err) => console.log(err));
    }, []);

    return (
        <div className="container">
            <h1>Create Post</h1>
            <PostCreate/>
            <hr/>
            <h1>Posts</h1>
            <PostList posts={posts}/>
        </div>
    );
};
export default App;
