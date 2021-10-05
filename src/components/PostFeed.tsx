import React, {useState, useEffect} from 'react'
import Post from './Post'
import { db } from "../firebase";
import { onSnapshot, collection, query, where, DocumentData} from "firebase/firestore";


const PostFeed:React.FC = () => {

  const [posts, setPosts] = useState([])
  useEffect(() => {
    const q = query(collection(db, 'posts'))
    const getPosts = onSnapshot(q, (snapshot) => {
    //setPosts(snapshot.docs)
    console.log(snapshot.docs)
    
    // querySnapshot.forEach((doc) => {
    //   console.log(postsData)
    //   postsData.push(doc.data())
    //   setPosts()
    // })
  })
    
  }, [])


  

  // let content = postsData.map((post, index) => {
  //   return <Post postTitle={post.PostTitle} isTextPost={post.isTextPost} originalPoster={post.originalPoster} postScore={post.postScore} src={post.src} postText={post.postText} />
  // })

  console.log(content)
  
  let score1 = 10
  let score2 = 20

    return (
        <div>
          {content}
      <Post postTitle="What's the most dangerous" isTextPost={false} originalPoster="UserEg1" postScore={score1} src="https://i.imgur.com/3tDMfFi.jpeg"/>
      <Post postTitle="Have you quit your job" isTextPost={true} originalPoster="anothername" postScore={score2} postText={`Reddit is an American social news aggregation, web content rating, and discussion website. Registered members submit content to the site such as links, text posts, images, and videos, which are then voted up or down by other members. Posts are organized by subject into user-created boards called "communities" or "subreddits", which cover a variety of topics such as news, politics, religion, science, movies, video games, music, books, sports, fitness, cooking, pets, and image-sharing. Submissions with more upvotes appear towards the top of their subreddit and, if they receive enough upvotes, ultimately on the site's front page. Although there are strict rules prohibiting harassment, it still occurs, and Reddit administrators moderate the communities and close or restrict them on occasion. Moderation is also conducted by community-specific moderators, who are not considered Reddit employees.[5] `} />
      <Post postTitle="omg another cute cat" isTextPost={false} originalPoster="silolyname" postScore={score1} src="https://i.imgur.com/p0D86uQ.jpeg" />
   
        </div>
    )
}

export default PostFeed
