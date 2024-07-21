import React, { useEffect, useState } from 'react';
import { Calendar, CalendarDateTemplateEvent } from 'primereact/calendar';
import { Nullable } from 'primereact/ts-helpers';
import { fetchEvents } from '../functions/EventService'; // Importa a função do serviço
import {
  isHighlighted,
  getHighlightedMessage,
} from '../functions/HighlightUtils'; // Importa funções utilitárias

export default function CalendarComp() {
  const [date, setDate] = useState<Nullable<Date>>(null);
  const [highlightedDates, setHighlightedDates] = useState<Date[]>([]);
  const [highlightedMessages, setHighlightedMessages] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    const fetchAndSetEvents = async () => {
      const { dates, messages } = await fetchEvents();
      setHighlightedDates(dates);
      setHighlightedMessages(messages);
    };

    fetchAndSetEvents();
  }, []);

  const dateTemplate = (event: CalendarDateTemplateEvent) => {
    const { day, year, month } = event;
    const date = new Date(year, month, day);
    const isDateHighlighted = isHighlighted(date, highlightedDates);
    const message = getHighlightedMessage(date, highlightedMessages);

    return (
      <div
        className={isDateHighlighted ? 'highlighted-date' : ''}
        title={message}
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
        `}
      </style>
    </div>
  );
}
