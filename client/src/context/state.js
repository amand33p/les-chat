import { useReducer, createContext, useContext } from 'react';

const StateContext = createContext({
  selectedChat: null,
  selectChat: (chatData, chatType) => {},
  updateMembers: (updatedData) => {},
});

const stateReducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_CHAT':
      return {
        ...state,
        selectedChat: action.payload,
      };
    case 'UPDATE_GROUP_PARTICIPANTS':
      return {
        ...state,
        selectedChat: {
          ...state.selectedChat,
          chatData: {
            ...state.selectedChat.chatData,
            participants: action.payload,
          },
        },
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

  const updateMembers = (updatedData) => {
    if (state.selectedChat.chatData.id === updatedData.groupId) {
      dispatch({
        type: 'UPDATE_GROUP_PARTICIPANTS',
        payload: updatedData.participants,
      });
    }
  };

  return (
    <StateContext.Provider
      value={{ selectedChat: state.selectedChat, selectChat, updateMembers }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
