import { dbService } from "../fbase";
import { React, useEffect, useState } from "react";
import { collection, getDocs, addDoc, query, onSnapshot, orderBy, serverTimestamp, doc } from "firebase/firestore"
import Nweet from "../components/Nweet";
import { async } from "@firebase/util";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    // const getNweets = async () => {
    //     const dbNweets = await getDocs(collection(dbService, "nweets"));
    //     dbNweets.forEach((document) =>{
    //         const nweetObject = { ...document.data(), id: document.id };
    //         setNweets((prev) => [nweetObject, ...prev])
    //     });
    // };

    //데이터베이스에서 불러오기
    useEffect(() => {
        // getNweets();

        // onSnapshot(collection(dbService, "sweets"), (snapshot) => { 
        //     const newArray = snapshot.docs.map((document) => ({
        //         id: document.id,
        //         ...document.data(),
        //     }));
        //     setNweets(newArray);
        // });

        const q = query(
          collection(dbService, "nweets"),
          orderBy("createdAt", "desc")
        );
    
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const nextNweets = querySnapshot.docs.map((doc) => {
            return {
              id: doc.id, ...doc.data(),
            };
          });
          setNweets(nextNweets);
        });
    
        return () => {
          unsubscribe();
        };
      }, []);

    // 저장하는 버튼
    const onSubmit = async (event) => {
        event.preventDefault();
        const docRef = await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            createdAt: serverTimestamp(),
            creatorId: userObj.uid,
          });
          console.log("Document written with ID:", docRef.id);
      
          setNweet("");
    };
      

    const onChange = (event) => {
        event.preventDefault();
        const {
            target: { value },
        } = event;
        setNweet(value);
    };

      return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
            onChange={onChange}
            value={nweet}
          />
          <input type="submit" value="Nweet" />
        </form>
          <div>
            {/* 트윗이 하나도 없을 경우 */}
           { nweets.length === 0
            ? <li>이 앱은 망한 앱입니다</li>
             : nweets.map((nweets) => (
            <Nweet key={nweet.id} nweetObj={nweets} isOwner={userObj.uid} />
            ))
           }
        </div>
      </div>
      
    </>
  );
};

export default Home;