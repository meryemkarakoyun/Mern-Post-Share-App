const initialState = {
  open: false,
  updateId: null,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MODAL":
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default modalReducer;
