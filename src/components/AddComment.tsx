import React from 'react';
import "../styles/addComment.scss"

const addComment: React.FC = () => {
    return (
        <div>
            <textarea className="post-input reply-input"></textarea>
        </div>
    )
}

export default addComment
