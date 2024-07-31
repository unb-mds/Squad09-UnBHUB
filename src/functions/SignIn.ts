import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';

export default function SignInFunction(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
}
