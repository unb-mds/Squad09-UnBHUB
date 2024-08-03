import { Calendar, CalendarDateTemplateEvent } from 'primereact/calendar';
import { Nullable } from 'primereact/ts-helpers';
import { useEffect, useState } from 'react';
import { fetchEvents } from '../../functions/Calendar/EventService';
import { fetchExamDates } from '../../functions/Calendar/fetchExamDates'; // Importa a função do serviço
import {
  getHighlightedMessage,
  isHighlighted,
} from '../../functions/Calendar/HighlightUtils';

export default function CalendarComp() {
  const [date, setDate] = useState<Nullable<Date>>(null);
  const [highlightedDates, setHighlightedDates] = useState<Date[]>([]);
  const [highlightedMessages, setHighlightedMessages] = useState<
    Record<string, string>
  >({});
  const [examDates, setExamDates] = useState<
    { date: string; codeSubject: string }[]
  >([]);

  useEffect(() => {
    const fetchAndSetEvents = async () => {
      const { dates, messages } = await fetchEvents();
      setHighlightedDates(dates);
      setHighlightedMessages(messages);
    };

    const fetchAndSetExamDates = async () => {
      try {
        const dates = await fetchExamDates();
        setExamDates(dates);
        console.log('Exam dates set:', dates); // Adicione este log
      } catch (error) {
        console.error('Error fetching exam dates:', error);
      }
    };

    fetchAndSetEvents();
    fetchAndSetExamDates();
  }, []);

  const isExamDate = (date: Date): string => {
    const formattedDate = date.toLocaleDateString();
    const examDate = examDates.find((d) => d.date === formattedDate);
    return examDate ? 'red' : '';
  };

  const dateTemplate = (event: CalendarDateTemplateEvent) => {
    const { day, year, month } = event;
    const date = new Date(year, month, day);
    const isDateHighlighted = isHighlighted(date, highlightedDates);
    const message = getHighlightedMessage(date, highlightedMessages);
    const examColor = isExamDate(date);

    const className = isDateHighlighted
      ? examColor
        ? 'highlighted-date exam-date'
        : 'highlighted-date'
      : examColor
      ? 'exam-date'
      : '';

    return (
      <div
        className={className}
        title={message || (examColor ? 'Data de Prova' : '')}
      >
        {day}
      </div>
    );
  };

  return (
    <div className="card flex justify-content-center">
      <Calendar
        value={date}
        onChange={(e) => setDate(e.value)}
        inline
        showWeek
        dateTemplate={dateTemplate}
      />
      <style>
        {`
          .highlighted-date {
            background-color: #ffd700;
            border-radius: 50%;
            color: white;
            padding: 5px;
            width: 2em;
            height: 2em;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .exam-date {
            background-color: red;
            border-radius: 50%;
            color: white;
            padding: 5px;
            width: 2em;
            height: 2em;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
    </div>
  );
}
