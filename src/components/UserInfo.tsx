import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { Avatar } from 'primereact/avatar';
import { ProgressBar } from 'primereact/progressbar';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { FileUpload } from 'primereact/fileupload'; 
import Stats from '../components/Stats';
import { auth, db, storage } from '../../config/firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

interface IUserInfo {
  userName: string;
  email: string;
  course: string;
  currentSemester: number;
  endSemester: number;
  profileImageUrl?: string;
}

export default function User() {
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [editDialogVisible, setEditDialogVisible] = useState<boolean>(false);
  const [passwordDialogVisible, setPasswordDialogVisible] = useState<boolean>(false);
  const [imageDialogVisible, setImageDialogVisible] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchUserInfo = async () => {
          const userDoc = doc(db, 'Users', user.uid);
          const userSnapshot = await getDoc(userDoc);

          if (userSnapshot.exists()) {
            const data = userSnapshot.data().UserInfo;
            setUserInfo({
              userName: data.userName,
              email: user.email || '',
              course: data.course,
              currentSemester: data.currentSemester,
              endSemester: data.endSemester,
              profileImageUrl: data.profileImageUrl || ''
            });
          }
          setLoading(false);
        };

        fetchUserInfo();
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const updateUserProfile = async (values: IUserInfo) => {
    if (auth.currentUser) {
      const userDoc = doc(db, 'Users', auth.currentUser.uid);
      await updateDoc(userDoc, { UserInfo: values });
      setUserInfo(values);
      setEditDialogVisible(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (auth.currentUser) {
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email!, password);

        try {
            await reauthenticateWithCredential(user, credential);

            // exclui a imagem de perfil do Storage
            if (userInfo?.profileImageUrl) {
                const storageRef = ref(storage, `profileImages/${auth.currentUser.uid}`);
                await deleteObject(storageRef);
            }

            // exclui o documento do Firestore e a conta do usuário
            const userDoc = doc(db, 'Users', auth.currentUser.uid);
            await deleteDoc(userDoc);
            await deleteUser(user);

            setPasswordDialogVisible(false);
        } catch (error) {
            console.error("Erro ao excluir a conta:", error);
            setErrorMessage('Senha incorreta');
        }
    }
};

  const handleFileUpload = (e: any) => {
    const file = e.files[0];
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleImageUpload = async () => {
    if (auth.currentUser && selectedFile) {
      const storageRef = ref(storage, `profileImages/${auth.currentUser.uid}`);
      setUploading(true); // Indica que o upload está começando

      try {
        await uploadBytes(storageRef, selectedFile);
        const downloadURL = await getDownloadURL(storageRef);

        const userDoc = doc(db, 'Users', auth.currentUser.uid);
        await updateDoc(userDoc, { 'UserInfo.profileImageUrl': downloadURL });

        setUserInfo((prevState) => prevState ? { ...prevState, profileImageUrl: downloadURL } : null);
        setImagePreview(downloadURL); // Atualiza a imagem exibida na UI
      } catch (error) {
        console.error("Erro ao fazer upload da imagem: ", error);
      } finally {
        setUploading(false); // Indica que o upload terminou
        setImageDialogVisible(false);
      }
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!userInfo) {
    return <div>Informações do usuário não encontradas.</div>;
  }

  const progress = ((userInfo.currentSemester / userInfo.endSemester) * 100).toFixed(2);

  return (
    <div className="my-1 mx-3 border-round-xl px-3 py-2">
      <div className="relative flex align-items-center">
        <Avatar
          image={userInfo.profileImageUrl}
          icon={!userInfo.profileImageUrl ? 'pi pi-user' : undefined}
          size="xlarge"
          className="mr-3"
          shape="circle"
          style={{ width: '120px', height: '120px' }}
        />
        <Button
          icon="pi pi-camera"
          className="p-button-rounded p-button-secondary absolute top-0 right-0"
          onClick={() => setImageDialogVisible(true)}
        />
        <div className="flex flex-column">
          <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            {userInfo.userName}
          </span>
          <span style={{ fontSize: '1.5rem', color: 'gray' }}>
            {userInfo.email}
          </span>
          <span style={{ fontSize: '1.5rem', color: 'gray' }}>
            {userInfo.course}
          </span>
        </div>
      </div>
      <div className="flex flex-column my-3">
        <p className="text-lg">
          Semestre <b>{userInfo.currentSemester}</b> de {userInfo.endSemester}
        </p>
        <ProgressBar value={parseFloat(progress)}></ProgressBar>
      </div>
      <div className="my-6">
        <Stats />
      </div>
      <div className="flex justify-content-center flex-wrap">
        <Button
          type="button"
          icon="pi pi-trash"
          className="text-black mx-2 px-8"
          label="Excluir Conta"
          onClick={() => setPasswordDialogVisible(true)}
        />
        <Button
          type="button"
          icon="pi pi-pencil"
          className="text-black mx-2 px-8"
          label="Atualizar perfil"
          onClick={() => setEditDialogVisible(true)}
        />
      </div>

      <Dialog
        header="Atualizar Perfil"
        visible={editDialogVisible}
        style={{ width: '30vw' }}
        modal
        onHide={() => setEditDialogVisible(false)}
      >
        <Formik
          initialValues={userInfo}
          validationSchema={Yup.object({
            userName: Yup.string().required('Nome de usuário é obrigatório'),
            course: Yup.string().required('Curso é obrigatório'),
            currentSemester: Yup.number().required('Semestre atual é obrigatório'),
            endSemester: Yup.number().required('Semestre final é obrigatório'),
          })}
          onSubmit={updateUserProfile}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="p-float-label my-4">
                <Field
                  as={InputText}
                  id="userName"
                  name="userName"
                  className={`w-full ${errors.userName && touched.userName ? 'p-invalid' : ''}`}
                />
                <label htmlFor="userName">Nome de usuário</label>
                {errors.userName && touched.userName ? (
                  <small className="p-error">{errors.userName}</small>
                ) : null}
              </div>
              <div className="p-float-label my-4">
                <Field
                  as={InputText}
                  id="course"
                  name="course"
                  className={`w-full ${errors.course && touched.course ? 'p-invalid' : ''}`}
                />
                <label htmlFor="course">Curso</label>
                {errors.course && touched.course ? (
                  <small className="p-error">{errors.course}</small>
                ) : null}
              </div>
              <div className="p-float-label my-4">
                <Field
                  as={InputText}
                  id="currentSemester"
                  name="currentSemester"
                  type="number"
                  className={`w-full ${errors.currentSemester && touched.currentSemester ? 'p-invalid' : ''}`}
                />
                <label htmlFor="currentSemester">Semestre Atual</label>
                {errors.currentSemester && touched.currentSemester ? (
                  <small className="p-error">{errors.currentSemester}</small>
                ) : null}
              </div>
              <div className="p-float-label my-4">
                <Field
                  as={InputText}
                  id="endSemester"
                  name="endSemester"
                  type="number"
                  className={`w-full ${errors.endSemester && touched.endSemester ? 'p-invalid' : ''}`}
                />
                <label htmlFor="endSemester">Semestre Final</label>
                {errors.endSemester && touched.endSemester ? (
                  <small className="p-error">{errors.endSemester}</small>
                ) : null}
              </div>
              <Button type="submit" label="Salvar" className="mt-2" />
            </Form>
          )}
        </Formik>
      </Dialog>

      <Dialog
        header="Confirme sua senha"
        visible={passwordDialogVisible}
        style={{ width: '30vw' }}
        modal
        onHide={() => setPasswordDialogVisible(false)}
      >
        <div className="flex flex-column align-items-center">
          <InputText
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            className="w-full mb-3"
          />
          {errorMessage && <small className="p-error">{errorMessage}</small>}
          <Button
            type="button"
            label="Confirmar"
            icon="pi pi-check"
            onClick={handleDeleteAccount}
            autoFocus
          />
        </div>
      </Dialog>

      <Dialog
        header="Atualizar Imagem de Perfil"
        visible={imageDialogVisible}
        style={{ width: '30vw' }}
        modal
        onHide={() => setImageDialogVisible(false)}
      >
        <div className="flex flex-column align-items-center">
          <FileUpload
            name="profileImage"
            accept="image/*"
            customUpload
            uploadHandler={handleFileUpload}
            mode="basic"
            auto
            chooseLabel="Escolher"
            className="mb-3"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Imagem de perfil" style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '10px' }} />
          )}
          <Button
            type="button"
            label="Confirmar"
            icon="pi pi-check"
            onClick={handleImageUpload}
            disabled={uploading} // Desativa o botão durante o upload
            className={uploading ? 'p-button-loading' : ''}
            autoFocus
          />
        </div>
      </Dialog>
    </div>
  );
}
