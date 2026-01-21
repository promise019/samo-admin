import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "./firebase";

interface PostData {
  title: string;
  message: string;
  says: string;
  verse: string;
}

export const uploadAdminPost = async (textData: PostData) => {
  const user = auth.currentUser;

  // 1. DYNAMIC CHECK: Ensure someone is logged in
  if (!user) {
    throw new Error("Unauthorized: Please log in to post.");
  }

  // 2. Save with the current user's UID
  const docRef = await addDoc(collection(db, "posts"), {
    title: textData.title,
    message: textData.message,
    verse: textData.verse,
    says: textData.says,
    adminId: user.uid, // This links the post to the specific admin
    isAdminPost: true,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
};

export const deletePost = async (postId: string) => {
  const user = auth.currentUser;

  if (!user) throw new Error("You must be logged in to delete.");

  try {
    const postDocRef = doc(db, "posts", postId);

    // 3. SAFETY CHECK: Verify ownership before deleting
    const postSnap = await getDoc(postDocRef);

    if (postSnap.exists() && postSnap.data().adminId !== user.uid) {
      throw new Error("Permission Denied: You can only delete your own posts.");
    }

    await deleteDoc(postDocRef);
    return { success: true };
  } catch (error) {
    console.error("Deletion failed:", error);
    throw error;
  }
};

export const updatePost = async (
  postId: string,
  updatedData: Partial<PostData>,
) => {
  try {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, updatedData);
    return { success: true };
  } catch (error) {
    console.error("Update failed:", error);
    throw error;
  }
};
