import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import Post from "./Post";
import TweetInput from "./TweetInput";
import Grid from '@material-ui/core/Grid';
import { Button } from "reactstrap";
import TaskItem from "./TaskItem";

const Feed = () => {
    // firebaseに作成した項目を受け取るための変数＝useState
    const [posts, setPosts] = useState([
        {
            id:"",
            title:"",
            image:"",
            text:"",
            timestamp:null,
        },
    ]);

   

    // 記述2．useEffectの処理を書きます
    useEffect(() => {
        const firebaseData = db
          .collection("posts")
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) => {
            console.log(snapshot)
            setPosts(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                title:doc.data().title,
                image: doc.data().image,
                text: doc.data().text,
                timestamp: doc.data().timestamp,
              }))
            )}
          );
        return () => {
          firebaseData();
        };
      }, []);
      console.log(posts);

      return (
        <div>
          {/* TweetInput読み込み */}
          <TweetInput />
          
          {/* 記述3. Postコンポーネントを表示するロジックを書きます */}
          {/* postsにデータがあったら表示しますよという書き方　＆＆　で書く */}
          {posts && (
              <>
           <Grid container spacing={4}>
          {posts.map((postItem) => (
            <>
            <Grid item xs={12} md={6}>
            <Post
              key={postItem.id}
              title={postItem.title}
              image={postItem.image}
              text={postItem.text}
              timestamp={postItem.timestamp}
              
            />
            <br/>
            <TaskItem id={postItem.id} />
            
            </Grid>
            </>
          ))}
         
          
      
          </Grid>
          {/*  */}
        </>
      )}
      </div>
      )
}

export default Feed
