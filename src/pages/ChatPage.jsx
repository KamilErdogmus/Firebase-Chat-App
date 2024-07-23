import { useEffect, useRef, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  where,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import Messages from "../pages/Messages";
import { v4 } from "uuid";
import InputEmoji from "react-input-emoji";
import { toast } from "react-toastify";

const ChatPage = ({ setRoom, room }) => {
  const lastMsg = useRef();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.trim() === "") {
      return toast.warning("Please fill message box");
    }

    //& Veri tabanına yeni eleman ekleme
    await addDoc(collection(db, "Chat-Messages"), {
      room,
      id: v4(),
      text: inputValue,
      author: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
    });

    //~ Yeni mesaj atıldığında mesaja gitme
    lastMsg.current.scrollIntoView({ behavior: "smooth" });

    setInputValue("");
  };

  useEffect(() => {
    //*Abone olunacak koleksiyonun referansını al
    const messagesCol = collection(db, "Chat-Messages");

    //!Sorgu ayarları (Indexes-add Index)
    const q = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );

    //* onSnapshot ile anlık koleksiyondaki değişimleri izler ve koleksiyon her
    //* değiştiğinde verdiğimiz fonk ile koleksiyondaki güncellemeleri al.
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let tempMsg = [];
      //? Dökümanların  içerisindeki veriye eriş ve geçici diziye ekle
      snapshot.docs.forEach((doc) =>
        tempMsg.push({ ...doc.data(), id: doc.id })
      );
      setMessages(tempMsg);
    });

    //* Aboneliği durdur
    return () => unsubscribe();
  }, [room]);

  return (
    <div className="chat-page">
      <header>
        <p>{auth.currentUser.displayName}</p>
        <div className="room">
          <span>Room:</span>
          <p>{room}</p>
        </div>

        <button onClick={() => setRoom(null)}>Change Room</button>
      </header>
      <main>
        {messages.length === 0 ? (
          <p>Send the first message</p>
        ) : (
          messages.map((msg) => <Messages key={msg.id} msg={msg} />)
        )}
        <div ref={lastMsg} />
      </main>

      <form onSubmit={handleSubmit}>
        <InputEmoji
          value={inputValue}
          height={20}
          cleanOnEnter={false}
          onChange={setInputValue}
          placeholder="Type a message"
        />

        <button className="submit">Submit</button>
      </form>
    </div>
  );
};

export default ChatPage;
