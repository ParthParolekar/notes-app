export const intitalState = {
  notes: [],
  archive: [],
  trash: [],
};

export const userReducer = (state, { type, payload }) => {
  switch (type) {
    case "NOTES_HANDLER":
      return { ...state, notes: payload };
    case "ARCHIVE_HANDLER":
      return { ...state, notes: payload.notes, archive: payload.archive };
    case "TRASH_HANDLER":
      return { ...state, trash: payload };
  }
};
