import { 
  signInWithPhoneNumber, 
  RecaptchaVerifier,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { auth } from "./firebase";

/**
 * Sends an OTP via Firebase Phone Auth
 * @param {string} phone - The phone number (+91...)
 * @param {string} containerId - The ID of the div for the invisible reCAPTCHA
 */
export const sendFirebaseOTP = async (phone, containerId) => {
  try {
    // 1. Initialize ReCAPTCHA
    const recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
      callback: (_response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    });

    // 2. Request OTP
    const confirmationResult = await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
    
    // 3. Store the result globally (or handle via state/navigation)
    window.confirmationResult = confirmationResult;
    
    return { success: true };
  } catch (error) {
    console.error("Firebase Auth Error:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Verifies the OTP entered by the user
 * @param {string} code - The 4 or 6 digit OTP code
 */
export const verifyFirebaseOTP = async (code) => {
  try {
    const result = await window.confirmationResult.confirm(code);
    const user = result.user;
    return { success: true, user };
  } catch (error) {
    console.error("OTP Verification Error:", error);
    return { success: false, error: error.message };
  }
};

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return { success: true, user: result.user };
  } catch (error) {
    console.error("Google Auth Error:", error);
    return { success: false, error: error.message };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
