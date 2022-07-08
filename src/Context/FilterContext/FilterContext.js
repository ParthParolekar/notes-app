import React, { useReducer, createContext, useContext } from "react";
import { filterReducer, initialState } from "./FilterReducer";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filterState, filterDispatch] = useReducer(filterReducer, initialState);

  //ApplyFilters
  const applyFilters = (notes) => {
    console.log("run");
    let unpinnedNotes =
      notes && notes.filter((note) => note.isPinned === false);
    let tempNotes = unpinnedNotes;

    if (filterState?.filterByTags.length > 0) {
      tempNotes = filterState.filterByTags.map((tag) =>
        tempNotes.filter((note) => note.tags.includes(tag))
      );
    }

    if (filterState?.filterByPriority !== "ALL") {
      tempNotes = tempNotes
        .flat()
        .filter((note) => note.priority === filterState.filterByPriority);
    }

    if (filterState?.sortByDate === "LATEST") {
      tempNotes = tempNotes
        .flat()
        .sort((a, b) => a.createdAt.time - b.createdAt.time);
    }
    if (filterState?.sortByDate === "OLDEST") {
      tempNotes = tempNotes
        .flat()
        .sort((a, b) => b.createdAt.time - a.createdAt.time);
    }

    return tempNotes?.flat().filter((note) => note.isPinned === false);
  };

  return (
    <FilterContext.Provider value={[filterState, filterDispatch, applyFilters]}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
