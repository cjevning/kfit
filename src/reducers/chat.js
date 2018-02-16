import { FirebaseRef } from '../lib/firebase';

export const CHAT_MESSAGE_LOADING = 'CHAT_MESSAGE_LOADING';
export const CHAT_MESSAGE_SUCCESS = 'CHAT_MESSAGE_SUCCESS';
export const CHAT_MESSAGE_ERROR = 'CHAT_MESSAGE_ERROR';
export const CHAT_MESSAGE_UPDATE = 'CHAT_MESSAGE_UPDATE';
export const CHAT_LOAD_MESSAGES_SUCCESS = 'CHAT_LOAD_MESSAGES_SUCCESS';
export const CHAT_LOAD_MESSAGES_ERROR = 'CHAT_LOAD_MESSAGES_ERROR';


const FIREBASE_REF_MESSAGES = FirebaseRef.child('Messages');
const FIREBASE_REF_MESSAGES_LIMIT = 20;

const chat = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_MESSAGE_LOADING:
      return { ...state, sending: true, sendingError: null };
    case CHAT_MESSAGE_ERROR:
      return { ...state, sending: false, sendingError: action.error };
    case CHAT_MESSAGE_SUCCESS:
      return {
        ...state, sending: false, sendingError: null, message: '',
      };
    case CHAT_MESSAGE_UPDATE:
      return {
        ...state, sending: false, message: action.text, sendingError: null,
      };
    case CHAT_LOAD_MESSAGES_SUCCESS:
      return { ...state, messages: action.messages, loadMessagesError: null };
    case CHAT_LOAD_MESSAGES_ERROR:
      return { ...state, messages: null, loadMessagesError: action.error };
    default:
      return state;
  }
};

export default chat;

const chatMessageLoading = () => ({
  type: CHAT_MESSAGE_LOADING,
});

const chatMessageSuccess = () => ({
  type: CHAT_MESSAGE_SUCCESS,
});

const chatMessageError = error => ({
  type: CHAT_MESSAGE_ERROR,
  error,
});

const chatUpdateMessage = text => ({
  type: CHAT_MESSAGE_UPDATE,
  text,
});

const loadMessagesSuccess = messages => ({
  type: CHAT_LOAD_MESSAGES_SUCCESS,
  messages,
});

const loadMessagesError = error => ({
  type: CHAT_LOAD_MESSAGES_ERROR,
  error,
});

const initialState = {
  sending: false,
  sendingError: null,
  message: '',
  messages: {},
  loadMessagesError: null,
};

export const sendMessage = message => (dispatch) => {
  dispatch(chatMessageLoading());

  const currentUser = firebaseService.auth().currentUser;
  const createdAt = new Date().getTime();
  const chatMessage = {
    text: message,
    createdAt,
    user: {
      id: currentUser.uid,
      email: currentUser.email,
    },
  };

  FIREBASE_REF_MESSAGES.push().set(chatMessage, (error) => {
    if (error) {
      dispatch(chatMessageError(error.message));
    } else {
      dispatch(chatMessageSuccess());
    }
  });
};

export const updateMessage = text => (dispatch) => {
  dispatch(chatUpdateMessage(text));
};

export const loadMessages = () => (dispatch) => {
  FIREBASE_REF_MESSAGES.limitToLast(FIREBASE_REF_MESSAGES_LIMIT).on('value', (snapshot) => {
    dispatch(loadMessagesSuccess(snapshot.val()));
  }, (errorObject) => {
    dispatch(loadMessagesError(errorObject.message));
  });
};
