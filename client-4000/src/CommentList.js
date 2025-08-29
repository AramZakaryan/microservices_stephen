import React from "react";

const CommentList = ({comments}) => {

    const renderedComments = comments.map(({id, content, status}) => {
        let contentView

        switch (status) {
            case 'accepted':
                contentView = content
                break;
            case 'pending':
                contentView = 'waiting moderation'
                break;
            case 'rejected':
                contentView = 'rejected by moderation'
                break;
            default:
                contentView = 'unknown status'
        }

        return <li key={id}>{contentView}</li>;
    });

    return <ul>{renderedComments}</ul>;
};


export default CommentList;
