import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./config";

/**
 * Create user with email and password
 */
export const createEmailUser = (
  email: string,
  password: string
): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential)
    .catch((error) => {
      throw error;
    });
};

/**
 * Sign user in with email and password
 *
 * @param email - Email
 * @param password - password
 * @returns Promise<UserCredential>
 */
export const signInEmailUser = (
  email: string,
  password: string
): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential)
    .catch((error) => {
      throw error;
    });
};
