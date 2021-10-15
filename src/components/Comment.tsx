import React from "react";
import "../styles/Comment.scss";
import { ImArrowUp } from "react-icons/im";
import ProfileImage from "../icons/profileimage.png";
import { ChatbubbleOutline } from "react-ionicons";
import differenceInSeconds from 'date-fns/differenceInSeconds';
import secondsToHours from 'date-fns/secondsToHours';
import daysToWeeks from 'date-fns/daysToWeeks'

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
  timeStamp,
}) => {

  
 

 



  const getTimeSinceComment = (timeStamp: any) => {

    let inSeconds = differenceInSeconds(new Date(), timeStamp.toDate())

    let inHours = secondsToHours(inSeconds)
    
    let inDays = Math.round(inHours / 24)
     
    let inWeeks = daysToWeeks(inDays)
      
    let inMonths = Math.round(inWeeks / 4)
      
    let inYears = Math.round(inMonths / 12)
    
    if (inYears > 0) {
      return inYears.toString() + ' y'
    } else if (inMonths > 0) {
      return inMonths.toString() + ' m'
    } else if (inWeeks > 0) {
      return inWeeks.toString() + ' w'
    } else if (inDays > 0) {
      return inDays.toString() + ' d'
    } else if (inHours > 0) {
      return inHours.toString() + ' h'
    } else {
      return inSeconds.toString() + ' s'
    }

  }




  // const getTimeSincePost = (timeStamp: string) => {
  //   let result

  //   return result
  // }

  // console.log(getTimeSincePost)
  

  return (
    <div>
      <div className="comment-container">
        <div className="img-line-container">
          <img className="comment-image" src={ProfileImage}></img>
          <div className="line"></div>
        </div>
        <div className="comment-content">
          <div className="name-timestamp">
            <div className="comment-original-poster">{originalPoster}</div>
            <div className="timestamp">{getTimeSinceComment(timeStamp)}</div>
          </div>
          <div className="comment-value">{comment}</div>
          <div className="bottom-bar-container">
            <div className="comment-score-container">
              <ImArrowUp size={20} className="comment-up-arrow arrow" />
              <p className="comment-post-score-number">{score}</p>
              <ImArrowUp size={20} className="comment-down-arrow arrow" />
            </div>
            <div className="reply-container">
              <ChatbubbleOutline
                color={"#878A8C"}
                height="28px"
                width="28px"
                cssClasses="reply-icon"
              />
              <p className="reply">Reply</p>
            </div>
          </div>
        </div>
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
