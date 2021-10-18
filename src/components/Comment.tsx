import React from "react";
import "../styles/Comment.scss";
import { ImArrowUp } from "react-icons/im";
import ProfileImage from "../icons/profileimage.png";
import { ChatbubbleOutline } from "react-ionicons";
import differenceInSeconds from 'date-fns/differenceInSeconds';
import daysToWeeks from 'date-fns/daysToWeeks';
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { doc, setDoc } from "firebase/firestore";

interface Props {
  comment: string;
  originalPoster: string;
  commentScore: number;
  commentId: string;
  timeStamp: any;
  postId: string;
  votes: any;
  getUpArrowClasses: (voteObj: any, user: any) => any;
  getDownArrowClasses: (voteObj: any, user: any) => any;
  openSignup: () => void;
}

const Comment: React.FC<Props> = ({
  commentId,
  comment,
  originalPoster,
  commentScore,
  timeStamp,
  postId,
  votes,
  getUpArrowClasses,
  getDownArrowClasses,
  openSignup
}) => {


  const { currentUser } = useAuth();



  const getTimeSinceComment = (timeStamp: any) => {

    let inSeconds = differenceInSeconds(new Date(), timeStamp.toDate())

    let inMinutes = Math.round(inSeconds / 60)

    let inHours = Math.round(inMinutes / 60)
    
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
    } else if (inMinutes > 0) {
      return inMinutes.toString() + ' m'
    } else {
      return inSeconds.toString() + ' s'
    }

  }

  const handleCommentUpVote = async () => {
    
    if (!currentUser) {

      openSignup()
      return;
    }

    let userId = currentUser.uid;
    const postRef = doc(db, "posts", postId, "comments", commentId);
    

    if (votes[`${userId}`] === true) {
      await setDoc(
        postRef,
        {
          score: commentScore - 1,
          votes: {
            [userId]: null,
          },
        },
        { merge: true }
      );
    } else if (votes[`${userId}`] === false) {
      await setDoc(
        postRef,
        {
          score: commentScore + 2,
          votes: {
            [userId]: true,
          },
        },
        { merge: true }
      );
    } else {
      console.log('hi')
      await setDoc(
        postRef,
        {
          score: commentScore + 1,
          votes: {
            [userId]: true,
          },
        },
        { merge: true }
      );
    }
  };

  const handleCommentDownVote = async () => {
    
    if (!currentUser) {
      openSignup()
      return;
    }

    let userId = currentUser.uid;
    const postRef = doc(db, "posts", postId, "comments", commentId);
    

    if (votes[`${userId}`] === false) {
      await setDoc(
        postRef,
        {
          score: commentScore + 1,
          votes: {
            [userId]: null,
          },
        },
        { merge: true }
      );
    } else if (votes[`${userId}`] === true) {
      await setDoc(
        postRef,
        {
          score: commentScore - 2,
          votes: {
            [userId]: false,
          },
        },
        { merge: true }
      );
    } else {
      
      await setDoc(
        postRef,
        {
          score: commentScore - 1,
          votes: {
            [userId]: false,
          },
        },
        { merge: true }
      );
    }
  };

  

  return (
    <div>
      <div className="comment-container">
        <div className="img-line-container">
          <img alt="profile" className="comment-image" src={ProfileImage}></img>
          <div className="line"></div>
        </div>
        <div className="comment-content">
          <div className="name-timestamp">
            <div className="comment-original-poster">{originalPoster}</div>
            {timeStamp && (<div className="timestamp">{getTimeSinceComment(timeStamp)}</div>)}
            
          </div>
          <div className="comment-value">{comment}</div>
          <div className="bottom-bar-container">
            <div className="comment-score-container">
              <ImArrowUp 
              onClick={handleCommentUpVote}
              size={20}
              className={getUpArrowClasses(votes, currentUser)}
               />
              <p className="comment-post-score-number">{commentScore}</p>
              <ImArrowUp onClick={handleCommentDownVote} size={20} className={getDownArrowClasses(votes, currentUser)} />
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
