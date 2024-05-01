import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

export default function Subjects() {
  return (
    <div className="flex flex-column">
      <div className="flex justify-content-between">
        <p className="flex w-4 h-1rem gap-2 align-items-center">
          <i className="pi pi-book"></i>
          Matérias
        </p>
        <a href="http://localhost:5173/Subjects">
          <Button
            label="Ver Tudo"
            icon="pi pi-angle-right"
            iconPos="right"
            size="small"
            text
            link
          />
        </a>
      </div>

      <div className="flex flex-row justify-content-between gap-2">
        <Card title="Matéria 01">
          <p className="m-0 text-justify">
            Lorem ipsum dolor sit amet. Quo repellat voluptas vel praesentium
            quasi non consequatur optio ut consequatur corrupti a blanditiis
            facere eum beatae dolor in dicta odio? Non facilis doloribus ab amet
            itaque ea facilis nostrum.
          </p>
        </Card>
        <Card title="Matéria 02">
          <p className="m-0 text-justify">
            Lorem ipsum dolor sit amet. Quo repellat voluptas vel praesentium
            quasi non consequatur optio ut consequatur corrupti a blanditiis
            facere eum beatae dolor in dicta odio? Non facilis doloribus ab amet
            itaque ea facilis nostrum.
          </p>
        </Card>
        <Card title="Matéria 03">
          <p className="m-0 text-justify">
            Lorem ipsum dolor sit amet. Quo repellat voluptas vel praesentium
            quasi non consequatur optio ut consequatur corrupti a blanditiis
            facere eum beatae dolor in dicta odio? Non facilis doloribus ab amet
            itaque ea facilis nostrum.
          </p>
        </Card>
        <Card title="Matéria 04">
          <p className="m-0 text-justify">
            Lorem ipsum dolor sit amet. Quo repellat voluptas vel praesentium
            quasi non consequatur optio ut consequatur corrupti a blanditiis
            facere eum beatae dolor in dicta odio? Non facilis doloribus ab amet
            itaque ea facilis nostrum.
          </p>
        </Card>
      </div>
    </div>
  );
}
