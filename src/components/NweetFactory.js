import { useState } from "react";
import { dbService, storageService } from "../fbase";
import { v4 as uuidv4 } from "uuid";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const NweetFactory = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] =useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
    
        // Upload and Display attachment
        let attachmentUrl = "";
        if (attachment !== "") {
          const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
          const response = await uploadString(attachmentRef, attachment, "data_url");
          attachmentUrl = await getDownloadURL(attachmentRef).then(response);
        }
        // nweetObj
        const docRef = await addDoc(collection(dbService, "nweets"), {
          text: nweet,
          createdAt: serverTimestamp(),
          creatorId: userObj.uid,
          attachmentUrl,
        });
        setNweet("");
        setAttachment("");
    };

    const onChange = (event) => {
        event.preventDefault();
        const {
          target: { value },
        } = event;
        setNweet(value);
    };

    // Read attachment
    const onFileChange = (event) => {
        const {
          target: {files},
        } = (event);
        const thefile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(thefile);
    }

    // Clear attachment
    const onClearAttachment = () => setAttachment("");

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="What's on your mind?"
                maxLength={120}
                onChange={onChange}
                value={nweet}
            />
            {/* 파일 첨부, 삭제*/}
            <input type="file" accept="image/*" onChange={onFileChange} />
            {/* Nweet 작성 */}
            <input type="submit" value="Nweet" />
            {attachment && (
                <div>
                    {/* 첨부파일 초기화, 미리보기 */}
                    <button onClick={onClearAttachment}>Clear</button>
                    <img src={attachment} width="50px" height="100px" />
                </div>
            )};
        </form>
    );
};

export default NweetFactory;