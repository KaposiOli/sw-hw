import { Character } from "../services/swapi";

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
  DEFAULT = "default",
}

export enum SortColumn {
  NAME = "name",
  CREATED = "created",
  EYE_COLOR = "eye_color",
}

export function sortCharacters(
  characters: Character[],
  sortOrder: SortOrder,
  sortColumn?: SortColumn
) {
  let sorted = [...characters];

  if (sortOrder === SortOrder.DEFAULT) {
    sorted = sorted.sort((a, b) => {
      if (a.eye_color === "blue" && b.eye_color !== "blue") return -1;
      if (a.eye_color !== "blue" && b.eye_color === "blue") return 1;
      if (a.eye_color === "blue" && b.eye_color === "blue") {
        return a.name.localeCompare(b.name);
      }
      return new Date(a.created).getTime() - new Date(b.created).getTime();
    });
  } else {
    sorted = sorted.sort((a, b) => {
      if (sortColumn === SortColumn.NAME) {
        return sortOrder === SortOrder.ASC
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortColumn === SortColumn.CREATED) {
        return sortOrder === SortOrder.ASC
          ? new Date(a.created).getTime() - new Date(b.created).getTime()
          : new Date(b.created).getTime() - new Date(a.created).getTime();
      } else if (sortColumn === SortColumn.EYE_COLOR) {
        return sortOrder === SortOrder.ASC
          ? a.eye_color.localeCompare(b.eye_color)
          : b.eye_color.localeCompare(a.eye_color);
      }
      return 0;
    });
  }

  return sorted;
}
