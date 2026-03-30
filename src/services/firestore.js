import { db } from "./firebase";
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  doc, 
  updateDoc,
  getDoc
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

// Check if a user (by UID) exists in the profiles collection
export const checkIfUserExists = async (uid) => {
  try {
    const q = query(collection(db, "profiles"), where("uid", "==", uid));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  } catch (e) {
    console.error("Error checking user existence:", e);
    return false;
  }
};

// Get a user profile by UID
export const getUserProfile = async (uid) => {
  try {
    const q = query(collection(db, "profiles"), where("uid", "==", uid));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
    }
    return null;
  } catch (e) {
    console.error("Error getting user profile:", e);
    return null;
  }
};

// Hardcoded Admin Lookup Table (since there are only 4 Seemai regions)
const SEEMAI_ADMINS = {
  "Thodha Naadu": { name: "Elder Mani", phone: "+91 94430 12345", title: "Thodha Naadu Admin" },
  "Porangaadu": { name: "Elder Raju", phone: "+91 94431 23456", title: "Porangaadu Admin" },
  "Mekku Naadu": { name: "Elder Kumar", phone: "+91 94432 34567", title: "Mekku Naadu Admin" },
  "Kundhe Naadu": { name: "Elder Shiv", phone: "+91 94433 45678", title: "Kundhe Naadu Admin" }
};

export const getAdminBySeemai = (seemai) => {
  return SEEMAI_ADMINS[seemai] || { name: "Community Admin", phone: "+91 XXXXX XXXXX", title: "General Admin" };
};
