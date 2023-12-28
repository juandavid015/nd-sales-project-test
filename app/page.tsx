'use client';

import { useEffect } from 'react';
import db from './db';

export default function Home() {
  useEffect(() => {
    console.log(db);
  }, []);
  return (
    <main>
      Home
    </main>
  );
}
