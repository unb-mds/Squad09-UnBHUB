import { db } from '../../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

type EventData = {
  description: string;
  event: string; // formato "DD/MM/AAAA" ou "DD/MM/AAAA a DD/MM/AAAA"
};

export const fetchEvents = async () => {
  const docRef = doc(db, 'APIs', 'Calendar');
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error('No such document!');
  }

  const data = docSnap.data();
  const events: EventData[] = data.content;

  const dates: Date[] = [];
  const messages: Record<string, string> = {};

  events.forEach((event) => {
    const [startDateStr, endDateStr] = event.event.split(' a ');
    const [startDay, startMonth, startYear] = startDateStr
      .split('/')
      .map(Number);
    const startDate = new Date(startYear, startMonth - 1, startDay);

    let endDate: Date;

    if (endDateStr) {
      const [endDay, endMonth, endYear] = endDateStr.split('/').map(Number);
      endDate = new Date(endYear, endMonth - 1, endDay);

      const currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        const dateKey = `${currentDate.getFullYear()}-${String(
          currentDate.getMonth() + 1
        ).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
        dates.push(new Date(currentDate));
        messages[dateKey] = event.description;
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } else {
      dates.push(startDate);
      const dateKey = `${startDate.getFullYear()}-${String(
        startDate.getMonth() + 1
      ).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
      messages[dateKey] = event.description;
    }
  });

  return { dates, messages };
};
