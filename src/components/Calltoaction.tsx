import { Button } from 'primereact/button';

export default function Calltoaction() {
  return (
    <div className="surface-section text-700 text-center">
      <div className="text-blue-600 font-bold mb-3">
        <i className="pi pi-github" />
        &#160;POWERED BY SQUAD9
      </div>
      <div className="text-900 font-bold text-5xl mb-3 mt-8">
        Entre em contato conosco
      </div>
      <div className="text-700 text-2xl mb-5 mt-5">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam
        eligendi quos.
      </div>
      <Button
        type="button"
        value="Join Now"
        className="font-bold px-4 py-2 ui-button-raised rounded-button white-space-nowrap mt-2"
      >
        <i className="pi pi-envelope ml-4 mr-2" />
        squad9@gmail.com
      </Button>
    </div>
  );
}
