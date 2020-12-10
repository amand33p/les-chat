import { useReducer, createContext, useContext } from 'react';

const StateContext = createContext({
  selectedChat: null,
  selectChat: (chatData, chatType) => {},
});

const stateReducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_CHAT':
      return {
        ...state,
        selectedChat: action.payload,
      };
    default:
      return state;
  }
};

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, { selectedChat: null });

  const selectChat = (chatData, chatType) => {
    dispatch({
      type: 'SELECT_CHAT',
      payload: { chatData, chatType },
    });
  };

  return (
    <StateContext.Provider
      value={{ selectedChat: state.selectedChat, selectChat }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
