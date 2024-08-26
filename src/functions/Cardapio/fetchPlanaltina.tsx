import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';

export const fetchItems = async () => {
  // Caminho para 'APIs -> RU -> Planaltina'
  const docRef = doc(db, 'APIs', 'RU');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();

    // Acessa o mapa "Planaltina"
    const PlanaltinaMap = data['Planaltina'];

    if (PlanaltinaMap && typeof PlanaltinaMap === 'object') {
      const items = Object.keys(PlanaltinaMap).map((key) => ({
        name: key,
        url: PlanaltinaMap[key],
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
      console.log('Planaltina map is empty or not found!');
      return [];
    }
  } else {
    console.log('No such document!');
    return [];
  }
};
