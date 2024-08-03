import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';

interface SignUpProps {
  email: string;
  password: string;
}

export default function SignUpFunction(props: SignUpProps) {
  createUserWithEmailAndPassword(auth, props.email, props.password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}
