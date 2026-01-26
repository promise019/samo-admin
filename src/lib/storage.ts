import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Storage utilities
import { db, auth, storage } from "./firebase";

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
  // imageFile?: File | null; // 1. Added this to fix the TS error
  imageUrl?: string;
}

export const uploadAdminPost = async (textData: PostData) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Unauthorized: Please log in to post.");
  }

  let finalImageUrl = "";

  // 3. Handle Image Upload if a file exists
  // if (textData.imageFile) {
  //   try {
  //     // Create a unique filename
  //     const storageRef = ref(
  //       storage,
  //       `posts/${Date.now()}_${textData.imageFile.name}`,
  //     );

  //     // Upload the file
  //     const snapshot = await uploadBytes(storageRef, textData.imageFile);

  //     // Get the public URL
  //     finalImageUrl = await getDownloadURL(snapshot.ref);
  //   } catch (error) {
  //     console.error("Image upload failed:", error);
  //     // You can choose to throw or continue without an image
  //   }
  // }

  // 4. Save to Firestore
  const docRef = await addDoc(collection(db, "posts"), {
    title: textData.title,
    message: textData.message,
    verse: textData.verse,
    says: textData.says,
    imageUrl: finalImageUrl, // Store the link to the image
    adminId: user.uid,
    isAdminPost: true,
    createdAt: textData.createdAt || serverTimestamp(),
    publishedAt: textData.publishedAt,
    status: textData.status || "published",
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
