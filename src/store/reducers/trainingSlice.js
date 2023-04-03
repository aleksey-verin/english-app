import { createSlice } from '@reduxjs/toolkit';
import { generateTaskList } from '../../utils/training/trainingHelper';

const initialState = {
  trainingTasks: []
};

const trainingSlice = createSlice({
  name: 'trainingSlice',
  initialState,
  reducers: {
    setTrainingTasks(state, action) {
      state.trainingTasks = generateTaskList(action.payload);
    }
  }
});

export const selectorTrainingSlice = (state) => state.trainingSlice;

const { actions } = trainingSlice;
export const { setTrainingTasks } = actions;

export default trainingSlice.reducer;
