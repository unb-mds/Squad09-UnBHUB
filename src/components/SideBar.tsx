import { Avatar } from 'primereact/avatar';
import { Image } from 'primereact/image';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { classNames } from 'primereact/utils';
import React from 'react';

export default function SideBarComponent() {
  const toast = React.useRef(null);

  let items: MenuItem[] = [
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
      template: (item, options) => {
        return (
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
