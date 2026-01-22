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
  // Add these as optional so they don't break the updatePost function
  publishedAt?: Date | any;
  createdAt?: Date | any;
  status?: string;
  adminId?: string;
  isAdminPost: boolean;
}

export const uploadAdminPost = async (textData: PostData) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Unauthorized: Please log in to post.");
  }

  // FIXED: We now include publishedAt and status so the query can "see" the post
  const docRef = await addDoc(collection(db, "posts"), {
    title: textData.title,
    message: textData.message,
    verse: textData.verse,
    says: textData.says,
    adminId: user.uid,
    isAdminPost: true,
    createdAt: textData.createdAt || serverTimestamp(),
    publishedAt: textData.publishedAt, // CRITICAL: This was missing
    status: textData.status || "published", // CRITICAL: This was missing
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
