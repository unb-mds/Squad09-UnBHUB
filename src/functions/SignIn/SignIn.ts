import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../config/firebase';

export default function SignInFunction(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password)
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      
      // Loga o erro no console ou trata conforme necessário
      console.error(`Error code: ${errorCode}`);
      console.error(`Error message: ${errorMessage}`);
    });
}
