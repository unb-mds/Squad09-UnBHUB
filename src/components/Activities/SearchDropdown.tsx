import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { useEffect, useState } from 'react';
import { auth, db } from '../../../config/firebase';

interface SubjectProps {
  selectedSubject: {
    name: string;
    code: string;
  };
  setSelectedSubject: (props: { name: string; code: string }) => void;
}

interface Subject {
  nameSubject: string;
  id: string;
  status: string;
}

interface SubjectsData {
  [key: string]: Subject;
}

export default function SearchDropdownComponent({
  selectedSubject,
  setSelectedSubject,
}: SubjectProps) {
  const [allSearchSubjects, setAllSearchSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsub = onSnapshot(doc(db, 'Users', user.uid), (doc) => {
          if (doc.exists() && doc.data()?.subjects) {
            const subjectsData = doc.data().subjects as SubjectsData;

            // Filtra as matérias para exibir apenas aquelas com status "Active".
            const activeSubjects = Object.values(subjectsData).filter(
              (subject) => subject.status === 'Active'
            );

            setAllSearchSubjects(activeSubjects);
          } else {
            setAllSearchSubjects([]);
          }
        });

        return () => unsub();
      }
    });
  }, []);

  // Mapeia os assuntos disponíveis para um formato adequado para o Dropdown.
  const filteredSubjects = allSearchSubjects.map(
    (subject) => {
      return {
        name: subject.nameSubject,
        code: subject.id,
      };
    }
  );

  return (
    <Dropdown
      value={selectedSubject}
      onChange={(e: DropdownChangeEvent) => setSelectedSubject(e.value)}
      options={filteredSubjects}
      placeholder="Selecione a matéria"
      optionLabel="name"
      className="w-full"
    />
  );
}
