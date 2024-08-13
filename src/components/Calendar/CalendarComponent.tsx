import { Calendar, CalendarDateTemplateEvent } from 'primereact/calendar';
import { Nullable } from 'primereact/ts-helpers';
import { useEffect, useState } from 'react';
import { fetchEvents } from '../../functions/Calendar/EventService';
import { fetchBookDates } from '../../functions/Calendar/fetchBookDates'; // Importa a função fetchBookDates
import { fetchExamDates } from '../../functions/Calendar/fetchExamDates'; // Importa a função do serviço
import { fetchTaskDates } from '../../functions/Calendar/fetchTaskDates'; // Importa a nova função
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
  const [taskDates, setTaskDates] = useState<
    { deliveryDay: Date; description: string }[]
  >([]);
  const [bookDates, setBookDates] = useState<
    { deliveryDay: Date; bookName: string }[]
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
      } catch (error) {
        console.error('Error fetching exam dates:', error);
      }
    };

    const fetchAndSetTaskDates = async () => {
      try {
        const dates = await fetchTaskDates();
        setTaskDates(dates);
      } catch (error) {
        console.error('Error fetching task dates:', error);
      }
    };

    const fetchAndSetBookDates = async () => {
      try {
        const dates = await fetchBookDates();
        setBookDates(dates);
      } catch (error) {
        console.error('Error fetching book dates:', error);
      }
    };

    fetchAndSetEvents();
    fetchAndSetExamDates();
    fetchAndSetTaskDates();
    fetchAndSetBookDates();
  }, []);

  const isExamDate = (date: Date): string => {
    const formattedDate = date.toLocaleDateString();
    const examDate = examDates.find((d) => d.date === formattedDate);
    return examDate ? 'red' : '';
  };

  const isTaskDate = (date: Date): string => {
    const taskDate = taskDates.find(
      (d) => d.deliveryDay.toLocaleDateString() === date.toLocaleDateString()
    );
    return taskDate ? 'blue' : '';
  };

  const isBookDate = (date: Date): string => {
    const bookDate = bookDates.find(
      (d) => d.deliveryDay.toLocaleDateString() === date.toLocaleDateString()
    );
    return bookDate ? 'green' : '';
  };

  const dateTemplate = (event: CalendarDateTemplateEvent) => {
    const { day, year, month } = event;
    const date = new Date(year, month, day);
    const isDateHighlighted = isHighlighted(date, highlightedDates);
    const message = getHighlightedMessage(date, highlightedMessages);
    const examColor = isExamDate(date);
    const taskColor = isTaskDate(date);
    const bookColor = isBookDate(date);

    const className = isDateHighlighted
      ? examColor
        ? 'highlighted-date exam-date'
        : taskColor
        ? 'highlighted-date task-date'
        : bookColor
        ? 'highlighted-date book-date'
        : 'highlighted-date'
      : examColor
      ? 'exam-date'
      : taskColor
      ? 'task-date'
      : bookColor
      ? 'book-date'
      : '';

    return (
      <div
        className={className}
        title={
          message ||
          (examColor
            ? 'Data de Prova'
            : taskColor
            ? 'Data de Tarefa'
            : bookColor
            ? 'Data de Entrega de Livro'
            : '')
        }
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
          .task-date {
            background-color: blue;
            border-radius: 50%;
            color: white;
            padding: 5px;
            width: 2em;
            height: 2em;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .book-date {
            background-color: green;
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
