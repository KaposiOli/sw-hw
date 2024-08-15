import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import { Character, fetchAllCharactersFromSwapi } from "../services/swapi";
import RNPickerSelect from "react-native-picker-select";
import { sortCharacters, SortColumn, SortOrder } from "../utils/sortCharacters";

const PAGE_SIZES = [25, 50, 100, 150];

interface CharacterListProps {
  searchQuery: string;
}

const CharacterList: React.FC<CharacterListProps> = ({ searchQuery }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [paginatedCharacterLength, setPaginatedCharacterLength] =
    useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState<number>(25);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [sortColumn, setSortColumn] = useState<SortColumn>(SortColumn.NAME);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DEFAULT);

  useEffect(() => {
    async function fetchAllCharacters() {
      setAllCharacters(await fetchAllCharactersFromSwapi());
      setLoading(false);
    }
    try {
      setLoading(true);
      fetchAllCharacters();
    } catch (error) {
      console.error("Error fetching characters", error);
      setError("Error fetching characters");
      setLoading(false);
    }
  }, []);

  const applySearchSortAndPagination = useCallback(() => {
    let filteredData = allCharacters.filter((character) =>
      character.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    let sortedData = sortCharacters(filteredData, sortOrder, sortColumn);

    setPaginatedCharacterLength(sortedData.length);

    const start = (pageNumber - 1) * pageSize;
    const paginatedData = sortedData.slice(start, start + pageSize);

    setCharacters(paginatedData);
  }, [allCharacters, sortOrder, sortColumn, pageNumber, pageSize, searchQuery]);

  useEffect(() => {
    applySearchSortAndPagination();
  }, [
    allCharacters,
    pageSize,
    pageNumber,
    sortColumn,
    sortOrder,
    searchQuery,
    applySearchSortAndPagination,
  ]);

  const handleSort = (field: SortColumn) => {
    if (sortColumn === field) {
      setSortOrder(
        sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC
      );
    } else {
      setSortColumn(field);
      setSortOrder(SortOrder.ASC);
    }
  };

  useEffect(() => {
    setPageNumber(1);
  }, [searchQuery]);

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setPageNumber(1);
  };

  const handleNextPage = () => {
    setPageNumber((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
  };

  const renderHeader = () => (
    <View style={styles.headerRow}>
      <TouchableOpacity
        onPress={() => handleSort(SortColumn.NAME)}
        style={styles.headerCell}
      >
        <Text>
          Name{" "}
          {sortColumn === SortColumn.NAME
            ? sortOrder === SortOrder.ASC
              ? "↑"
              : "↓"
            : ""}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleSort(SortColumn.EYE_COLOR)}
        style={styles.headerCell}
      >
        <Text>
          Eye Color{" "}
          {sortColumn === SortColumn.EYE_COLOR
            ? sortOrder === SortOrder.ASC
              ? "↑"
              : "↓"
            : ""}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleSort(SortColumn.CREATED)}
        style={styles.headerCell}
      >
        <Text>
          Created{" "}
          {sortColumn === SortColumn.CREATED
            ? sortOrder === SortOrder.ASC
              ? "↑"
              : "↓"
            : ""}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }: { item: Character }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.eye_color}</Text>
      <Text style={styles.cell}>{item.created}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={handlePageSizeChange}
        items={PAGE_SIZES.map((size) => ({
          label: `${size} items`,
          value: size,
        }))}
        style={pickerSelectStyles}
        value={pageSize}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <FlatList
            data={characters}
            keyExtractor={(item) => item.name}
            renderItem={renderItem}
            ListHeaderComponent={renderHeader}
          />
        </>
      )}
      <View style={styles.paginationControls}>
        <Button
          title="Previous"
          disabled={loading || pageNumber <= 1}
          onPress={handlePreviousPage}
        />
        <Button
          title="Next"
          disabled={
            loading || pageNumber * pageSize >= paginatedCharacterLength
          }
          onPress={handleNextPage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#ddd",
    padding: 10,
  },
  row: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerCell: {
    flex: 1,
  },
  cell: {
    flex: 1,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    margin: 10,
  },
  paginationControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
});

export default CharacterList;
