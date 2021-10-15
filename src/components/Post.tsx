import React from "react";
import "../styles/Post.scss";
import { ImArrowUp } from "react-icons/im";
import { Link } from "react-router-dom";
import differenceInSeconds from "date-fns/differenceInSeconds";
import secondsToHours from "date-fns/secondsToHours";
import daysToWeeks from "date-fns/daysToWeeks";

interface Props {
  postTitle: string;
  src?: string;
  originalPoster: string;
  postScore: number;
  postText?: string;
  isTextPost: boolean;
  id: string;
  timeStamp: any;
}

const Post: React.FC<Props> = ({
  postTitle,
  src,
  originalPoster,
  postScore,
  postText,
  isTextPost,
  id,
  timeStamp,
}) => {
  
  const getTimeSincePost = (timeStamp: any) => {
    let inSeconds = differenceInSeconds(new Date(), timeStamp.toDate());

    let inMinutes = Math.round(inSeconds / 60);

    let inHours = Math.round(inMinutes / 60);

    let inDays = Math.round(inHours / 24);

    let inWeeks = daysToWeeks(inDays);

    let inMonths = Math.round(inWeeks / 4);

    let inYears = Math.round(inMonths / 12);

    if (inYears > 0) {
      if (inYears === 1) {
        return inYears.toString() + " year ago";
      } else {
        return inYears.toString() + " years ago";
      }
    } else if (inMonths > 0) {
      if (inMonths === 1) {
        return inMonths.toString() + " month ago";
      } else {
        return inMonths.toString() + " months ago";
      }
    } else if (inWeeks > 0) {
      if (inWeeks === 1) {
        return inWeeks.toString() + " week ago";
      } else {
        return inWeeks.toString() + " weeks ago";
      }
    } else if (inDays > 0) {
      if (inDays === 1) {
        return inDays.toString() + " day ago";
      } else {
        return inDays.toString() + " days ago";
      }
    } else if (inHours > 0) {
      if (inHours === 1) {
        return inHours.toString() + " hour ago";
      } else {
        return inHours.toString() + " hours ago";
      }
    } else if (inMinutes > 0) {
      if (inMinutes === 1) {
        return inMinutes.toString + " minute ago";
      } else {
        return inMinutes.toString + " minutes ago";
      }
    } else {
      if (inSeconds === 1) {
        return inSeconds.toString() + " second ago";
      } else {
        return inSeconds.toString() + " seconds ago";
      }
    }
  };

  let postContent;
  if (isTextPost) {
    postContent = (
      <div className="text-container">
        <div className="text">{postText}</div>
      </div>
    );
  } else {
    postContent = <img className="image" alt="" src={src}></img>;
  }

  return (
    <div className="section-container post-container">
      <div className="post-score-container">
        <div className="voting">
          <ImArrowUp size={20} className="up-arrow arrow" />
          <p className="post-score-number">{postScore}</p>
          <ImArrowUp size={20} className="down-arrow arrow" />
        </div>
      </div>
      <div className="post-info-container">
        <p className="posted-by">
          Posted by u/{originalPoster} {getTimeSincePost(timeStamp)}
        </p>

        <h3 className="post-title">{postTitle}</h3>

        {postContent}
        <div className="comments-link-container">
          <Link style={{ textDecoration: "none" }} to={`/comments/${id}`}>
            <p className="comments-link">100 comments</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Post;
