import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Avatar } from 'primereact/avatar';
import { ProgressBar } from 'primereact/progressbar';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import Stats from '../components/Stats';
import { auth, db } from '../../config/firebase';

interface IUserInfo {
  userName: string;
  email: string;
  course: string;
  currentSemester: number;
  endSemester: number;
}

export default function User() {
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [editDialogVisible, setEditDialogVisible] = useState<boolean>(false);

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

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!userInfo) {
    return <div>Informações do usuário não encontradas.</div>;
  }

  const progress = ((userInfo.currentSemester / userInfo.endSemester) * 100).toFixed(2);

  return (
    <div className="surface-50 my-1 mx-3 border-round-xl px-3 py-2">
      <div className="flex align-items-center">
        <Avatar
          image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
          size="xlarge"
          className="mr-3"
          shape="circle"
          style={{ width: '120px', height: '120px' }}
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
          type="submit"
          icon="pi pi-sign-out"
          className="text-black mx-2 px-8"
          label="Sair"
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
              <div className="p-float-label my-4"> {}
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
    </div>
  );
}
