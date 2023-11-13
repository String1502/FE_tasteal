import { UserCredential, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config";

/**
 * Create user with email and password
 */
export const createUserEmail = (
  email: string,
  password: string
): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential)
    .catch((error) => {
      throw error;
    });
};
