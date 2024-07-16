import { Avatar } from 'primereact/avatar';
import { Image } from 'primereact/image';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { classNames } from 'primereact/utils';
import React from 'react';

export default function SideBarComponent() {
  const toast = React.useRef(null);

  const items: MenuItem[] = [
    {
      template: () => {
        return (
          <span className="inline-flex align-items-center gap-1 px-2 py-2">
            <Image src="/images/logo.svg" alt="logo" width="60" height="60" />
            <span className="text-xl font-semibold">
              UnB<span className="text-primary">HUB</span>
            </span>
          </span>
        );
      },
    },
    {
      separator: true,
    },
    {
      command: () => {
        toast.current.show({
          severity: 'info',
          summary: 'Info',
          detail: 'Item Selected',
          life: 3000,
        });
      },
      template: (options) => {
        return (
          <div>
            <button
              onClick={(e) => options.onClick(e)}
              className={classNames(
                options.className,
                'w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround'
              )}
            >
              <i className="pi pi-fw pi-calendar mr-2"></i>
              <span>Cronograma</span>
            </button>
            <a
              href="http://localhost:5173/Subjects"
              style={{ textDecoration: 'none' }}
            >
              <button
                onClick={(e) => options.onClick(e)}
                className={classNames(
                  options.className,
                  'w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround'
                )}
              >
                <i className="pi pi-fw pi-bookmark mr-2" />
                <span>Matérias</span>
              </button>
            </a>

            <a
              href="http://localhost:5173/Tasks"
              style={{ textDecoration: 'none' }}
            >
              <button
                onClick={(e) => options.onClick(e)}
                className={classNames(
                  options.className,
                  'w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround'
                )}
              >
                <i className="pi pi-fw pi-clipboard mr-2" />
                <span>Tarefas</span>
              </button>
            </a>
            <button
              onClick={(e) => options.onClick(e)}
              className={classNames(
                options.className,
                'w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround'
              )}
            >
              <Avatar
                image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
                className="mr-2"
                shape="circle"
              />
              <div className="flex flex-column align">
                <span className="font-bold">Nome do Usuário</span>
                <span className="text-sm">Estudante</span>
              </div>
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="card flex">
      <Menu model={items} className="w-full md:w-15rem min-h-screen" />
    </div>
  );
}
