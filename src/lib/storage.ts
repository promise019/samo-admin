import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "./firebase";

// Define the interface to keep TypeScript happy
interface PostData {
  title: string;
  message: string;
  verse: string;
}

export const uploadAdminPost = async (textData: PostData) => {
  const user = auth.currentUser;
  const ADMIN_UID = "EW6i913LHFQuqfzijz6GrGjQXQJ2";

  // Security check
  if (!user || user.uid !== ADMIN_UID) {
    throw new Error("Unauthorized: Admin login required");
  }

  // Save ONLY text to Firestore
  const docRef = await addDoc(collection(db, "posts"), {
    title: textData.title,
    message: textData.message,
    verse: textData.verse,
    adminId: user.uid,
    isAdminPost: true,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
};

// Simplified delete (no storage cleanup needed)
export const deletePost = async (postId: string) => {
  try {
    const postDocRef = doc(db, "posts", postId);
    await deleteDoc(postDocRef);
    return { success: true };
  } catch (error) {
    console.error("Deletion failed:", error);
    throw error;
  }
};
