export const initialState = { editNote: false, editNoteDetails: null };

export const noteReducer = (state, { type, payload }) => {
  switch (type) {
    case "NOTE_HANDLER":
      return {
        ...state,
        editNote: payload.editNote,
        editNoteDetails: payload.editNoteDetails,
      };
  }
};
