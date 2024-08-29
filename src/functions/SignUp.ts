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
      console.log(`usuário ${user} criado com sucesso`);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      
      // Loga o erro no console ou trata conforme necessário
      console.error(`Error code: ${errorCode}`);
      console.error(`Error message: ${errorMessage}`);
    });
}
