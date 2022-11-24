import { deleteDoc, updateDoc, doc } from "firebase/firestore"
import { ref, deleteObject } from "firebase/storage";
import { dbService, storageService } from "../fbase";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faHeart } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const [likeIt, setLikeIt] = useState(nweetObj.likeIt);

    // Delete Nweet, attachment
    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");
        if (ok) {
            deleteDoc(doc(dbService, "nweets", nweetObj.id));
            if (nweetObj.attachmentUrl !== ""){
                const deleteRef = ref(storageService, nweetObj.attachmentUrl);
                deleteObject(deleteRef).then();
            }
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev);

    //Edit Nweet 입력란
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewNweet(value);
    };

    //Edit Nweet 입력값 반영
    const onSubmit = async (event) => {
        event.preventDefault();
        updateDoc(doc(dbService, "nweets", nweetObj.id), { text: newNweet });
        setEditing(false);
    };

    // 좋아요 입력값 반영
    const onlikeItClick = async () => {
        const ok = window.confirm("좋아요를 누르시겠습니까?");
        if (ok) {
            updateDoc(doc(dbService, "nweets", nweetObj.id), { likeIt: nweetObj.likeIt + 1 });
        }
        setLikeIt(0);
    };

    return(
        <div className="nweet">
            {editing ? (
                <>  
                    {/*Update Nweet Button*/}
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input 
                            onChange={onChange} 
                            value={newNweet} 
                            required 
                            placeholder="Edit your nweet"
                            autoFocus
                            className="formInput"
                        />
                        <input type="submit" value="Update Nweet" className="formBtn" />
                    </form>
                    <button onClick={toggleEditing} className="formBtn cancelBtn">
                        Cancel
                    </button>
                </>
            ) : (
                <>
                    {/*Display Nweet, attachment*/}
                    <h1>{nweetObj.displayName}</h1>
                    <h4>{nweetObj.text}</h4>
                    <h2>+{nweetObj.likeIt}</h2>
                    {nweetObj.attachmentUrl && (
                        <img src={nweetObj.attachmentUrl} width="50px" height="50px" />
                    )}
                    { (nweetObj.creatorId === isOwner && (
                        <div className="nweet_actions">
                            <span onClick={onDeleteClick} >
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing} >
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>
                    
                    )) || (
                        // 자신의 nweet일때 좋아요 불가
                        <span onClick={onlikeItClick} >
                            <FontAwesomeIcon icon={faHeart} />
                        </span>
                    )}
                </>
            )}
        </div>
    );
};

export default Nweet;