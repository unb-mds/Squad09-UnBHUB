import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

export default function Subjects() {
  return (
    <div className="flex flex-column">
      <div className="flex justify-content-between">
        <p>Matérias</p>
        <Button
          label="Ver Tudo"
          icon="pi pi-angle-right"
          iconPos="right"
          size="small"
          text
        />
      </div>

      <div className="flex flex-row justify-content-between gap-2">
        <Card title="Matéria 01">
          <p className="m-0">
            Lorem ipsum dolor sit amet. Quo repellat voluptas vel praesentium
            quasi non consequatur optio ut consequatur corrupti a blanditiis
            facere eum beatae dolor in dicta odio? Non facilis doloribus ab amet
            itaque ea facilis nostrum.
          </p>
        </Card>
        <Card title="Matéria 02">
          <p className="m-0">
            Lorem ipsum dolor sit amet. Quo repellat voluptas vel praesentium
            quasi non consequatur optio ut consequatur corrupti a blanditiis
            facere eum beatae dolor in dicta odio? Non facilis doloribus ab amet
            itaque ea facilis nostrum.
          </p>
        </Card>
        <Card title="Matéria 03">
          <p className="m-0">
            Lorem ipsum dolor sit amet. Quo repellat voluptas vel praesentium
            quasi non consequatur optio ut consequatur corrupti a blanditiis
            facere eum beatae dolor in dicta odio? Non facilis doloribus ab amet
            itaque ea facilis nostrum.
          </p>
        </Card>
        <Card title="Matéria 04">
          <p className="m-0">
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
