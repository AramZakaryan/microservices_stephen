import React from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = ({posts = []}) => {
    // const [posts, setPosts] = useState({});

    // const fetchPosts = async () => {
    //   const res = await axios.get("http://localhost:4001/posts");
    //
    //   setPosts(res.data);
    // };
    //
    // useEffect(() => {
    //   fetchPosts();
    // }, []);

    const renderedPosts = Object.values(posts).map((post) => {
        console.log(post)
        return (
            <div
                className="card"
                style={{width: "30%", marginBottom: "20px"}}
                key={post.id}
            >
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <CommentList
                        // postId={post.id}
                        comments={post.comments}/>
                    <CommentCreate postId={post.id}/>
                </div>
            </div>
        );
    });

    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderedPosts}
        </div>
    );
};

export default PostList;
