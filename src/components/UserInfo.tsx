import { Avatar } from 'primereact/avatar';
import { ProgressBar } from 'primereact/progressbar';
import HeadlessDemo from '../components/Headless';
import { Button } from 'primereact/button';
import Stats from '../components/Stats';

export default function User() {
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
            Nome de usuário
          </span>
          <span style={{ fontSize: '1.5rem', color: 'gray' }}>
            teste@gmail.com
          </span>
          <span style={{ fontSize: '1.5rem', color: 'gray' }}>Curso</span>
          <span style={{ fontSize: '1rem', color: 'gray' }}>2024.1</span>
        </div>
      </div>
      <div className="flex flex-column my-3">
        <p className="text-lg">
          Semestre <b>5</b> de 10
        </p>
        <ProgressBar value={50}></ProgressBar>
      </div>
      <div className="my-6">
        <Stats />
      </div>
      <div className="flex justify-content-center flex-wrap">
        <HeadlessDemo />
        <Button
          type="submit"
          icon="pi pi-sign-out"
          className=" text-black mx-2 px-8"
          label="Sair"
        />
      </div>
    </div>
  );
}
