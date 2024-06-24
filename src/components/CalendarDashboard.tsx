import { Calendar } from 'primereact/calendar';
import { ProgressBar } from 'primereact/progressbar';

export default function CalendarDashboardComponent() {
  return (
    <div className="flex flex-column justify-item-center align-center">
      <div className="flex flex-column py-3 px-3">
        <p className="text-lg">
          Semestre <b>3</b> de 10
        </p>
        <ProgressBar value={50}></ProgressBar>
      </div>
      <Calendar inline />
    </div>
  );
}
