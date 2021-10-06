import React from 'react';

interface Props {
    comment: string,
    originalPoster: string,
    parent?: string,
    score: number,
    id: string
    
  }

const Comment: React.FC<Props> = ({id, comment, originalPoster, parent, score}) => {
   

    return (
        <div>
            
            <div>Comment: {comment}</div>
            <div>Poster: {originalPoster}</div>
            <div>Parent: {parent}</div>
            <div>Post Score: {score}</div>
            <div>ID is {id}</div>
            <div>  </div>
        </div>
    )
}

export default Comment
