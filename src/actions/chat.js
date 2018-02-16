
export const loadMessages = () => (dispatch) => {
  FIREBASE_REF_MESSAGES.limitToLast(FIREBASE_REF_MESSAGES_LIMIT).on('value', (snapshot) => {
    dispatch(loadMessagesSuccess(snapshot.val()));
  }, (errorObject) => {
    dispatch(loadMessagesError(errorObject.message));
  });
};

