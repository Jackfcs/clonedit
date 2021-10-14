import React, {useState} from 'react';
import "../styles/AddComment.scss"

const AddComment: React.FC = () => {
    const [commentContent, setCommentContent] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('hi')
    }

    return (
        <div>
            <form>
            <textarea onChange={(event) => setCommentContent(event.target.value)} placeholder="What are your thoughts?" className="post-input reply-input"></textarea>
            <input
                  onClick={handleSubmit}
                  className="submit-post"
                  type="submit"
                  value="POST"
                ></input>
            </form>
        </div>
    )
}

export default AddComment;
