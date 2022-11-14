import { dbService } from "../fbase";
import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore"
import { async } from "@firebase/util";

const Home = () => {
    const [nweet, setNweet] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        await addDoc(collection(dbService, "nweet"), {
            text: nweet,
            createAt: Date.now(),
        });
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
        <form onSubmit={onSubmit}>
            <input
                value={nweet}
                onChange={onChange}
                type="text"
                placeholder="What's on your mind?"
                maxLength={120}
            />
            <input type="submit" value="Nweet" />
        </form>
    );
}

export default Home;