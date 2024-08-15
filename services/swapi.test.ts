import { fetchAllCharactersFromSwapi, Character } from "./swapi";

describe("fetchAllCharactersFromSwapi", () => {
  it("should fetch all characters from SWAPI", async () => {
    const mockResponse: Character[] = [
      { name: "Luke Skywalker", eye_color: "blue", created: "2021-01-01" },
      { name: "Darth Vader", eye_color: "yellow", created: "2021-01-02" },
    ];

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        count: mockResponse.length,
        next: null,
        previous: null,
        results: mockResponse,
      }),
    });

    const characters = await fetchAllCharactersFromSwapi();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("https://swapi.dev/api/people/");

    expect(characters).toEqual(mockResponse);
  });
});
