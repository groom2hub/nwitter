import { async } from "@firebase/util";
import { deleteDoc, updateDoc, doc } from "firebase/firestore"
import { dbService } from "../fbase";
import { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    // Delete Nweet
    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");
        console.log(ok);
        if (ok) {
            console.log(nweetObj.id);
            const data = deleteDoc(doc(dbService, "nweets", nweetObj.id));
            console.log(data);
        }
    };

    // const toggleEditing = () => setEditing((prev) => !prev);
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

    return(
        <div>
            {editing ? (
                <>  
                    {/*Update Nweet Button*/}
                    <form onSubmit={onSubmit}>
                        <input onChange={onChange} value={newNweet} required />
                        <input type="submit" value="Update Nweet" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                <>
                    {/*Display Nweet and Nweet Button*/}
                    <h4>{nweetObj.text}</h4>
                    { nweetObj.creatorId === isOwner && (
                        <>
                            <button onClick={onDeleteClick} >Delete Nweet</button>
                            <button onClick={toggleEditing} >Edit Nweet</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Nweet;