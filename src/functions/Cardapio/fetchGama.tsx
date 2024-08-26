import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';

export const fetchItems = async () => {
  // Caminho para 'APIs -> RU -> Gama'
  const docRef = doc(db, 'APIs', 'RU');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();

    // Acessa o mapa "Gama"
    const gamaMap = data['Gama'];

    if (gamaMap && typeof gamaMap === 'object') {
      const items = Object.keys(gamaMap).map((key) => ({
        name: key,
        url: gamaMap[key],
      }));

      // Ordenar os itens por data
      items.sort((a, b) => {
        const matchA = a.name.match(/\d{2}-\d{2}/);
        const dateA = matchA
          ? new Date(matchA[0].split('-').reverse().join('-'))
          : new Date();
        const matchB = b.name.match(/\d{2}-\d{2}/);
        const dateB = matchB
          ? new Date(matchB[0].split('-').reverse().join('-'))
          : new Date();
        return +dateA - +dateB;
      });

      return items;
    } else {
      console.log('Gama map is empty or not found!');
      return [];
    }
  } else {
    console.log('No such document!');
    return [];
  }
};
