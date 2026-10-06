'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';

interface Game {
  id: number;
  name: string;
  slug: string;
  thumbnail: string | null;
  requires_server_id: boolean;
}

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['games'],
    queryFn: async () => {
      const response = await api.get('/games');
      return response.data.data as Game[];
    },
  });

  if (isLoading) return <p className="p-8">Loading...</p>;
  if (error) return <p className="p-8 text-red-500">Error: {(error as Error).message}</p>;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Daftar Game</h1>
      <ul className="space-y-2">
        {data?.map((game) => (
          <li key={game.id} className="border p-3 rounded">
            {game.name} ({game.slug})
          </li>
        ))}
      </ul>
    </main>
  );
}