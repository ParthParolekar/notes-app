export const initialState = {
  foundUser: {
    _id: null,
    firstName: null,
    lastName: null,
    email: null,
  },
  encodedToken: null,
};

export const authReducer = (
  state,
  { type, payload: { foundUser, encodedToken } }
) => {
  switch (type) {
    case "HANDLE_USER_AUTH":
      return {
        ...state,
        foundUser: {
          _id: foundUser._id,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          email: foundUser.email,
        },
        encodedToken,
      };

    default:
      return state;
  }
};
