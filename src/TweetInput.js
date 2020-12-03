import React, { useState } from "react";
import { storage, db } from "./firebase";
import firebase from "firebase/app";
import { IconButton} from "@material-ui/core";
import { Form, Button } from "reactstrap";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBInput } from 'mdbreact';
import ImageUploader from 'react-images-upload';

const TweetInput = () => {
  // 記述3. useStateを用意します　画像を保持する箱、入力された文字列を保持する箱
  const [title, setTitle] = useState("");
  const [inputImage, setInputImage] = useState(null);
  const [message, setMessage] = useState("");
  const onChangeImageHandler = (e) => {

    if (e.target.files[0]) {
      setInputImage(e.target.files[0]);
      e.target.value = "";
    }
  };

  // 記述7．送信処理を記述
  const sendTweet = (e) =>{
    //   状態を確認する
    console.log(message, inputImage);
    e.preventDefault();

    if(inputImage){
      // firebaseの仕様で同じファイル名の画像を複数回アップしてしまうと元々あったファイルが削除される
      // そのためにファイル名をランダムなファイル名を作る必要がある、それが下
      const S =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; //ランダムな文字列を作るための候補、62文字
      const N = 16; //16文字の文字列を作るという意味生成したい文字数が１６の文字列になる
      
      const randomMoji = Array.from(crypto.getRandomValues(new Uint32Array(N))) //乱数を生成してくれるもので0からランダムな数字が１６こ選ばれる
       .map((n) => S[n % S.length])
       .join("");
      const fileName = randomMoji + "_" + inputImage.name;
      
       // firebase storageに登録する処理
       const uploadTweetImg = storage.ref(`images/${fileName}`).put(inputImage);
    　　
    　　//　firebaseのDBに登録する処理    
       uploadTweetImg.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {},　//
        (err) => {
        // 　エラーに関する処理
          alert(err.message);
        },
        async () => {
        // 　成功したとき
          await storage
            .ref("images")
            .child(fileName)
            .getDownloadURL()
            .then(async (url) => {
              await db.collection("posts").add({
                title:title,
                image: url,
                text: message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              });
            });
        }
      );
    }else{
        // テキストだけの処理
        db.collection("posts").add({
            title:title,
            image: "",
            text: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
    }
    setTitle("");
    setInputImage(null);
    setMessage("");
  }  
  return (
    <div className="form">
      <h2>Postit！</h2>
      {/* 記述1. formのタグを書く */}
      <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <MDBCard>
      <Form onSubmit={sendTweet}>
        {/* 記述2 inputタグを書きます */}
        <p className="text">タイトル</p>
        <MDBInput
           className="input"
           type="text"
           autoFocus
           value={title}
           // eventを書きます onChange
           // 記述6 event
           onChange={(e) => setTitle(e.target.value)}
        />
        <p className="text">感想</p>
        <textarea
          className="textarea"
          type="text"
          autoFocus
          value={message}
          // eventを書きます onChange
          // 記述6 event
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
   
        <p className="text">写真</p>
        <IconButton>
          <label>
            <AddAPhotoIcon />
            <input type="file" onChange={onChangeImageHandler} />
            {/* <ImageUploader
                
                withIcon={true}
                buttonText='Choose images'
                onChange={onChangeImageHandler}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            /> */}
       

          </label>
        </IconButton>
        <br />
        <br />
        <Button className="btn" type="submit" disabled={!message}>
          Postit
        </Button>
      </Form>
      </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
      {/*  */}
    </div>
  );
};
export default TweetInput;









