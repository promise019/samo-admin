// import {
//   collection,
//   addDoc,
//   serverTimestamp,
//   doc,
//   deleteDoc,
// } from "firebase/firestore";
// import { db, auth } from "./firebase";

// // Define the interface to keep TypeScript happy
// interface PostData {
//   title: string;
//   message: string;
//   says: string;
//   verse: string;
// }

// export const uploadAdminPost = async (textData: PostData) => {
//   const user = auth.currentUser;
//   const ADMIN_UID = "EW6i913LHFQuqfzijz6GrGjQXQJ2";

//   // Security check
//   if (!user || user.uid !== ADMIN_UID) {
//     throw new Error("Unauthorized: Admin login required");
//   }

//   // Save ONLY text to Firestore
//   const docRef = await addDoc(collection(db, "posts"), {
//     title: textData.title,
//     message: textData.message,
//     verse: textData.verse,
//     says: textData.says,
//     adminId: user.uid,
//     isAdminPost: true,
//     createdAt: serverTimestamp(),
//   });

//   return docRef.id;
// };

// // Simplified delete (no storage cleanup needed)
// export const deletePost = async (postId: string) => {
//   try {
//     const postDocRef = doc(db, "posts", postId);
//     await deleteDoc(postDocRef);
//     return { success: true };
//   } catch (error) {
//     console.error("Deletion failed:", error);
//     throw error;
//   }
// };

import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
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
