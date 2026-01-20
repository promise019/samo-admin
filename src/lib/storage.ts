import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { storage, db, auth } from "./firebase";

export const uploadAdminPost = async (
  file: File,
  textData: { title: string; description: string },
) => {
  const user = auth.currentUser;

  // Security check: You might want to hardcode your Admin UID here or check a custom claim
  if (!user) throw new Error("Unauthorized: Admin login required");

  // 1. Storage Path (organized by admin folder)
  const storagePath = `admin_content/${Date.now()}_${file.name}`;
  const storageRef = ref(storage, storagePath);

  // 2. Upload to Storage
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);

  // 3. Save to Firestore Collection
  const docRef = await addDoc(collection(db, "posts"), {
    ...textData,
    imageUrl: downloadURL,
    imagePath: storagePath,
    adminId: user.uid,
    isAdminPost: true, // Flag for the other website to filter
    createdAt: serverTimestamp(),
  });

  return docRef.id;
};

export const deletePost = async (postId: string, imagePath: string) => {
  try {
    // 1. Remove the file from Firebase Storage
    const imageRef = ref(storage, imagePath);
    await deleteObject(imageRef);

    // 2. Remove the document from Firestore
    const postDocRef = doc(db, "posts", postId);
    await deleteDoc(postDocRef);

    return { success: true };
  } catch (error) {
    console.error("Deletion failed:", error);
    throw error;
  }
};
