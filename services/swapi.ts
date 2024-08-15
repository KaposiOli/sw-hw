export interface Character {
  name: string;
  eye_color: string;
  created: string;
}

interface SWAPIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
}

export async function fetchAllCharactersFromSwapi(): Promise<Character[]> {
  let url: string | null = "https://swapi.dev/api/people/";
  const allCharacters: Character[] = [];

  while (url) {
    const response = await fetch(url);
    const data: SWAPIResponse = await response.json();

    allCharacters.push(...data.results);
    url = data.next || null;
  }

  return allCharacters;
}
