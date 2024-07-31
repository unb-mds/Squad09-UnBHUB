import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

export const fetchItems = async () => {
  const docRef = doc(db, 'APIs', 'RU');
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    const items = Object.keys(data).map((key) => ({
      name: key,
      url: data[key],
    }));

    // Ordenar os itens por data
    items.sort((a, b) => {
      const match = a.name.match(/\d{2}-\d{2}/);
      const dateA = match
        ? new Date(match[0].split('-').reverse().join('-'))
        : new Date();
      const matchB = b.name.match(/\d{2}-\d{2}/);
      const dateB = matchB
        ? new Date(matchB[0].split('-').reverse().join('-'))
        : new Date();
      return +dateA - +dateB;
    });

    return items;
  } else {
    console.log('No such document!');
    return [];
  }
};
