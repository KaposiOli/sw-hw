import { sortCharacters, SortOrder, SortColumn } from "../utils/sortCharacters";
import { Character } from "../services/swapi";

describe("sortCharacters", () => {
  const characters: Character[] = [
    {
      name: "Luke Skywalker",
      created: "1977-05-25T22:00:00.000Z",
      eye_color: "blue",
    },
    {
      name: "Darth Vader",
      created: "1977-05-25T12:00:00.000Z",
      eye_color: "yellow",
    },
    {
      name: "Leia Organa",
      created: "1977-05-25T00:00:00.000Z",
      eye_color: "brown",
    },
  ];

  it("should sort characters in default order", () => {
    const sorted = sortCharacters(characters, SortOrder.DEFAULT);
    expect(sorted).toEqual([
      {
        name: "Luke Skywalker",
        created: "1977-05-25T22:00:00.000Z",
        eye_color: "blue",
      },
      {
        name: "Leia Organa",
        created: "1977-05-25T00:00:00.000Z",
        eye_color: "brown",
      },
      {
        name: "Darth Vader",
        created: "1977-05-25T12:00:00.000Z",
        eye_color: "yellow",
      },
    ]);
  });

  it("should sort characters by name in ascending order", () => {
    const sorted = sortCharacters(characters, SortOrder.ASC, SortColumn.NAME);

    expect(sorted).toEqual([
      {
        name: "Darth Vader",
        created: "1977-05-25T12:00:00.000Z",
        eye_color: "yellow",
      },
      {
        name: "Leia Organa",
        created: "1977-05-25T00:00:00.000Z",
        eye_color: "brown",
      },
      {
        name: "Luke Skywalker",
        created: "1977-05-25T22:00:00.000Z",
        eye_color: "blue",
      },
    ]);
  });

  it("should sort characters by name in descending order", () => {
    const sorted = sortCharacters(characters, SortOrder.DESC, SortColumn.NAME);

    expect(sorted).toEqual([
      {
        name: "Luke Skywalker",
        created: "1977-05-25T22:00:00.000Z",
        eye_color: "blue",
      },
      {
        name: "Leia Organa",
        created: "1977-05-25T00:00:00.000Z",
        eye_color: "brown",
      },
      {
        name: "Darth Vader",
        created: "1977-05-25T12:00:00.000Z",
        eye_color: "yellow",
      },
    ]);
  });

  it("should sort characters by created date in ascending order", () => {
    const sorted = sortCharacters(
      characters,
      SortOrder.ASC,
      SortColumn.CREATED
    );
    expect(sorted).toEqual([
      {
        name: "Leia Organa",
        created: "1977-05-25T00:00:00.000Z",
        eye_color: "brown",
      },
      {
        name: "Darth Vader",
        created: "1977-05-25T12:00:00.000Z",
        eye_color: "yellow",
      },
      {
        name: "Luke Skywalker",
        created: "1977-05-25T22:00:00.000Z",
        eye_color: "blue",
      },
    ]);
  });

  it("should sort characters by created date in descending order", () => {
    const sorted = sortCharacters(
      characters,
      SortOrder.DESC,
      SortColumn.CREATED
    );
    expect(sorted).toEqual([
      {
        name: "Luke Skywalker",
        created: "1977-05-25T22:00:00.000Z",
        eye_color: "blue",
      },
      {
        name: "Darth Vader",
        created: "1977-05-25T12:00:00.000Z",
        eye_color: "yellow",
      },
      {
        name: "Leia Organa",
        created: "1977-05-25T00:00:00.000Z",
        eye_color: "brown",
      },
    ]);
  });

  it("should sort characters by eye color in ascending order", () => {
    const sorted = sortCharacters(
      characters,
      SortOrder.ASC,
      SortColumn.EYE_COLOR
    );
    expect(sorted).toEqual([
      {
        name: "Luke Skywalker",
        created: "1977-05-25T22:00:00.000Z",
        eye_color: "blue",
      },
      {
        name: "Leia Organa",
        created: "1977-05-25T00:00:00.000Z",
        eye_color: "brown",
      },
      {
        name: "Darth Vader",
        created: "1977-05-25T12:00:00.000Z",
        eye_color: "yellow",
      },
    ]);
  });

  it("should sort characters by eye color in descending order", () => {
    const sorted = sortCharacters(
      characters,
      SortOrder.DESC,
      SortColumn.EYE_COLOR
    );
    expect(sorted).toEqual([
      {
        name: "Darth Vader",
        created: "1977-05-25T12:00:00.000Z",
        eye_color: "yellow",
      },
      {
        name: "Leia Organa",
        created: "1977-05-25T00:00:00.000Z",
        eye_color: "brown",
      },
      {
        name: "Luke Skywalker",
        created: "1977-05-25T22:00:00.000Z",
        eye_color: "blue",
      },
    ]);
  });
});
