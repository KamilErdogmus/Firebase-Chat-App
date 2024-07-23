import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";

const Edit = ({ msg }) => {
  const handleDelete = async () => {
    if (auth.currentUser?.uid !== msg.author.id) {
      return;
    }
    const deleteRef = doc(db, "Chat-Messages", msg.id);

    try {
      await deleteDoc(deleteRef);
      toast.info("Message deleted");
    } catch (error) {
      toast.error("Something went wrong: " + error.message);
    }
  };

  return (
    <div className="show">
      <button onClick={handleDelete} id="del">
        Del
      </button>
    </div>
  );
};

export default Edit;
