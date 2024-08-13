'use client';

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

export default function SearchDropdownComponent({
  selectedSubject,
  setSelectedSubject,
}: SubjectProps) {
  const [allSearchSubjects, setAllSearchSubjects] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsub = onSnapshot(doc(db, 'Users', user.uid), (doc) => {
          if (doc.exists() && doc.data().subjects) {
            setAllSearchSubjects(doc.data().subjects); // Define como os dados do documento se existir
          } else {
            setAllSearchSubjects([]); // Define como uma lista vazia se não existir
          }
        });

        return () => unsub();
      }
    });
  }, []);

  const filteredSubjects = Object.values(allSearchSubjects).map(
    (subject: { nameSubject: string; id: string }) => {
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
