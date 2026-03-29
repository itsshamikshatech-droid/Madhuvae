import { db } from "./firebase";
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  doc, 
  updateDoc 
} from "firebase/firestore";

/**
 * Service for Firestore interactions (Profiles, Admin Management, etc.)
 */

// Save a new user profile
export const createProfile = async (userData) => {
  try {
    const docRef = await addDoc(collection(db, "profiles"), {
      ...userData,
      verified: false,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (e) {
    console.error("Error creating profile:", e);
    throw e;
  }
};

// Fetch pending users for a specific Seemai admin
export const getPendingUsersBySeemai = async (seemai) => {
  const q = query(
    collection(db, "profiles"), 
    where("seemai", "==", seemai), 
    where("verified", "==", false)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Approve/Verify a user profile
export const verifyUserProfile = async (userId) => {
  const userRef = doc(db, "profiles", userId);
  await updateDoc(userRef, { verified: true });
};
