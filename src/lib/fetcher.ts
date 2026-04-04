export async function fetcher(url: string) {
  const res = await fetch(url, { cache: 'no-cache' });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Fetch error');
  }
  const json = await res.json();
  return json;
}