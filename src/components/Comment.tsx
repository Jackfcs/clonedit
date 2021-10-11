import React from "react";
import "../styles/Comment.scss";
import { ImArrowUp } from "react-icons/im";
import ProfileImage from "../icons/profileimage.png";

interface Props {
  comment: string;
  originalPoster: string;
  score: number;
  id: string;
  timeStamp: any;
}


const Comment: React.FC<Props> = ({
    id,
    comment,
    originalPoster,
    score,
    timeStamp
}) => {
  
  let content;

  

  return (
      <div>
    <div className="comment-container">
        <div className="icon-name-timestamp">
      <img className="comment-image" src={ProfileImage}></img>
      <div className="comment-original-poster">{originalPoster}</div>
      <div className="timestamp">{timeStamp.seconds}</div>
      </div>

      <div>Comment: {comment}</div>
      <div>Post Score: {score}</div>
      <div>ID is {id}</div>
      <div className="comment-score-container">
        <div className="voting">
          <ImArrowUp size={20} className="up-arrow arrow" />
          <p className="post-score-number">20</p>
          <ImArrowUp size={20} className="down-arrow arrow" />
        </div>
      </div>
    </div>

    <div>
     
      {content}
    </div>
    </div>
  );
};

export default Comment;



//RECURSIVE COMMENTS
// if (comments) {
//     content = (
//       <>
//         {/* {comments.map((comment: any, index: number) => {
//           return (
//             <div key={index}>
//               <p key={index}>{comment.value}</p>
//               {comment.replies
//                 ? comment.replies.map((comment: any) => {
//                     if (comment.replies) {
//                       return (
//                         <div>
//                           <p>{comment.value}</p>
//                           <Comment comments={comment.replies} />
//                         </div>
//                       );
//                     } else {
//                       return <p>{comment.value}</p>;
//                     }
//                   })
//                 : null}
//             </div>
//           );
//         })} */}


//       </>
//     );
//   } else {
//     content = <div></div>;
//   }





 /* {comments.map((comment: any, index: number) => {
   return (<div key={index}>
   <p key={index} >{comment.value}</p>
    {
        comment.replies ? 
        comment.replies.map((comment: any) => {
            if (comment.replies) {
                return ( <div> <p>{comment.value}</p>
                    <Comment comments={comment.replies} />
                    </div>
                )
            } else {
                return <p >{comment.value}</p>
            }
            
        })
        : null
    }

   </div>
   ) 
   
  
    
})} */