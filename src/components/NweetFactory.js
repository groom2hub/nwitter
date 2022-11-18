import { useState } from "react";
import { dbService, storageService } from "../fbase";
import { v4 as uuidv4 } from "uuid";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] =useState("");
    
    const onSubmit = async (event) => {
        event.preventDefault();
        if (nweet === "") {
            return;
        }
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
          displayName: userObj.displayName,
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
        if(Boolean(thefile)){
            reader.readAsDataURL(thefile);
        }
    }

    // Clear attachment
    const onClearAttachment = () => setAttachment("");

    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input
                    className="factoryInput__input"
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type={"submit"} value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add Photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            {/* 파일 첨부, 삭제 */}
            <input
                id="attach-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{ opacity: 0, }}
            />
            {attachment && (
                // 첨부파일 미리보기, 초기화
                <div className="factoryForm__attachment">
                    <img 
                        src={attachment} 
                        style={{ backgroundImage: attachment, }} 
                    />
                    <div className="factoryForm__Clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
        </form>
    );
};

export default NweetFactory;