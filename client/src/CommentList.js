import React from "react";

const CommentList = ({
                         // postId,
                         comments
                     }) => {
    // const [comments, setComments] = useState([]);
    //
    // const fetchData = async () => {
    //   const res = await axios.get(
    //     `http://localhost:4002/posts/${postId}/comments`
    //   );
    //
    //   setComments(res.data);
    // };

    // useEffect(() => {
    //   fetchData();
    // }, []);

    const renderedComments = comments.map((comment) => {
        return <li key={comment.id}>{comment.content}</li>;
    });

    return <ul>{renderedComments}</ul>;
};

export default CommentList;
