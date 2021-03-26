import {SAVE_FILTER_DATA} from '../Action/saveFilterData'
const initialState = {
  filteredData: [],
};

export const FilteredData = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_FILTER_DATA:
      return action.data;
    default:
        return state;
  }
};
