import { 
  signInWithPhoneNumber, 
  RecaptchaVerifier,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";
import { auth } from "./firebase";

const AUTH_ERROR_MESSAGES = {
  "auth/account-exists-with-different-credential": "An account already exists with this email. Sign in with the method you used before.",
  "auth/email-already-in-use": "This email is already registered. Please sign in instead.",
  "auth/invalid-credential": "The email or password is incorrect.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/network-request-failed": "Network issue while contacting Firebase. Please check your internet connection.",
  "auth/operation-not-allowed": "This sign-in method is not enabled in Firebase Authentication.",
  "auth/popup-blocked": "The Google sign-in popup was blocked. Please allow popups for this site and try again.",
  "auth/popup-closed-by-user": "Google sign-in was cancelled before it finished.",
  "auth/too-many-requests": "Too many attempts. Please wait a bit and try again.",
  "auth/unauthorized-domain": "This browser address is not authorized in Firebase. Open the app on localhost or add this domain in Firebase Authentication settings.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/user-not-found": "No account exists with this email. Please create an account first.",
  "auth/weak-password": "Password must be at least 6 characters.",
  "auth/wrong-password": "The email or password is incorrect.",
};

const getAuthErrorMessage = (error) => {
  const code = error?.code;
  return AUTH_ERROR_MESSAGES[code] || error?.message || "Authentication failed. Please try again.";
};

const ensurePersistence = async () => {
  await setPersistence(auth, browserLocalPersistence);
};

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

export const signUpWithEmail = async (email, password) => {
  try {
    await ensurePersistence();
    const result = await createUserWithEmailAndPassword(auth, email.trim(), password);
    return { success: true, user: result.user };
  } catch (error) {
    console.error("Email Signup Error:", error);
    return { success: false, error: getAuthErrorMessage(error), code: error?.code };
  }
};

export const signInWithEmail = async (email, password) => {
  try {
    await ensurePersistence();
    const result = await signInWithEmailAndPassword(auth, email.trim(), password);
    return { success: true, user: result.user };
  } catch (error) {
    console.error("Email Login Error:", error);
    return { success: false, error: getAuthErrorMessage(error), code: error?.code };
  }
};

export const signInWithGoogle = async () => {
  try {
    await ensurePersistence();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    const result = await signInWithPopup(auth, provider);
    return { success: true, user: result.user };
  } catch (error) {
    console.error("Google Auth Error:", error);
    return { success: false, error: getAuthErrorMessage(error), code: error?.code };
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
