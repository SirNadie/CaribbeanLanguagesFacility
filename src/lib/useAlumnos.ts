'use client'
import useSWR from 'swr';
import { fetcher } from './fetcher';

export function useAlumnos() {
  const { data, error, isLoading, mutate } = useSWR('/api/alumnos', fetcher, {
    revalidateOnFocus: false
  });

  return {
    alumnos: data ?? [],
    isLoading,
    isError: !!error,
    mutate
  };
}
