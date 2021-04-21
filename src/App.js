import "./App.css";
import React, { useEffect, useState } from "react";
import {messaging} from "./firebase";
import axios from 'axios';

export default function App() {

  const [state, setState] = useState({
    title: '',
    body: '',
  });

  const {title, body} = state;

  useEffect(() => {
    getFCMToken();
  }, []);

  const getFCMToken = async () => {
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log("token :", token);
    localStorage.setItem("token", token);
  };
  

  const handleChange = (e) => {
    setState({...state, [e.target.name]: e.target.value});
  }

  const handleSend = async () => {
    const data = JSON.stringify({
      "notification": {
        "title": "Firebase",
        "body": "Firebase is awesome",
        "click_action": "http://localhost:3000/",
        "icon": "http://url-to-an-icon/icon.png"
    },
      "to": localStorage.getItem("token")
    });

const config = {
  method: 'post',
  url: 'https://fcm.googleapis.com/fcm/send',
  headers: { 
    'authorization': 'key=AAAAHw_y6Q4:APA91bHZgk-Cg7uwd14df8gyQWLnaw8y-s88mcN1oHhKOffR2fkAcrQb1LXk-DzFSBjENZtE-XMiu0GVmrPUaYOwpiyIW-o0H0EwyxT-hXs1mDWSCCTXGfpN4rLbNYSkYs2XEX0mPdEk', 
    'Content-Type': 'application/json'
  },
  data : data
};

await axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
console.log("calling onMessage");
messaging.onMessage(function (payload) {
  console.log("Message received. ", payload);
});
console.log("called onMessage");
}


  return (
    <div className="App">
      <h1>Send Notifiction</h1>
      <br/>
      <input type="text" placeholder="Title" name="title" value={title} onChange={(e) => handleChange(e)} /><br/>
      <input type="text" placeholder="Body" name="body" value={body} onChange={(e) => handleChange(e)} /><br/>
      <button onClick={() => handleSend()}>Send</button>
    </div>
  );
}
