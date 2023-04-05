import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  hideSystemMessage,
  selectorSystemMessage,
  setSystemMessage
} from '../store/reducers/systemMessageSlice';
import { useDispatch } from 'react-redux';

// error-message  note-message

const SystemMessage = () => {
  const dispatch = useDispatch();
  const { isVisible, type, message } = useSelector(selectorSystemMessage);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        dispatch(hideSystemMessage());
      }, 2000);
    }
  }, [isVisible]);

  if (!isVisible) return null;
  return (
    <div className="systemMessage">
      <div className={`systemMessage-content ${type}-message`}>
        <div>{message}</div>
      </div>
    </div>
  );
};

export default SystemMessage;
