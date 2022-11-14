import { async } from "@firebase/util";
import { deleteDoc, doc } from "firebase/firestore"
import { dbService } from "../fbase";

const Nweet = ({ nweetObj, isOwner }) => {
    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");
        console.log(ok);
        if (ok) {
            console.log(nweetObj.id);
            const data = deleteDoc(doc(dbService, "nweets", nweetObj.id));
            console.log(data);
        }
    }

    return(
        <div>
            <h4>{nweetObj.text}</h4>
            { nweetObj.creatorId === isOwner && (
                <>
                    <button onClick={onDeleteClick} >Delete Nweet</button>
                    <button>Edit Nweet</button>
                </>
            )}
        </div>
    );
};

export default Nweet;