import { useReducer, createContext, useContext } from 'react';

const StateContext = createContext({
  selectedChat: null,
  notification: null,
  selectChat: (chatData, chatType) => {},
  updateMembers: (updatedData) => {},
  updateName: (updatedData) => {},
  unselectChat: () => {},
  notify: (message, severity, duration) => {},
  clearNotif: () => {},
});

const stateReducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_CHAT':
      return {
        ...state,
        selectedChat: action.payload,
      };
    case 'UPDATE_GROUP':
      return {
        ...state,
        selectedChat: {
          ...state.selectedChat,
          chatData: {
            ...state.selectedChat.chatData,
            ...action.payload,
          },
        },
      };
    case 'UNSELECT_CHAT':
      return {
        ...state,
        selectedChat: null,
      };
    case 'SET_NOTIFICATION':
      return {
        ...state,
        notification: action.payload,
      };
    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        notification: null,
      };
    default:
      return state;
  }
};

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, {
    selectedChat: null,
    notification: null,
  });

  const selectChat = (chatData, chatType) => {
    dispatch({
      type: 'SELECT_CHAT',
      payload: { chatData, chatType },
    });
  };

  const updateMembers = (updatedData) => {
    if (state.selectedChat.chatData.id === updatedData.groupId) {
      dispatch({
        type: 'UPDATE_GROUP',
        payload: { participants: updatedData.participants },
      });
    }
  };

  const updateName = (updatedData) => {
    if (state.selectedChat.chatData.id === updatedData.groupId) {
      dispatch({
        type: 'UPDATE_GROUP',
        payload: { name: updatedData.name },
      });
    }
  };

  const unselectChat = () => {
    dispatch({
      type: 'UNSELECT_CHAT',
    });
  };

  let timeoutID = null;

  const notify = (message, severity = 'success', duration = 5) => {
    clearTimeout(timeoutID);

    dispatch({
      type: 'SET_NOTIFICATION',
      payload: { message, severity, duration },
    });

    timeoutID = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      });
    }, duration * 1000);
  };

  const clearNotif = () => {
    dispatch({
      type: 'CLEAR_NOTIFICATION',
    });
  };

  return (
    <StateContext.Provider
      value={{
        selectedChat: state.selectedChat,
        notification: state.notification,
        selectChat,
        updateMembers,
        updateName,
        unselectChat,
        notify,
        clearNotif,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
