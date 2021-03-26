export const SAVE_FILTER_DATA="SAVE_FILTER_DATA";

export const saveFilterData = (data) => {
  return {
    type:SAVE_FILTER_DATA,
    data
  }
};