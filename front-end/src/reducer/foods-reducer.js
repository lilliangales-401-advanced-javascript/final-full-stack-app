export default (state = [], {type, payload}) => {
  switch(type) {
    case 'FOODS_LOAD':
      return payload;
    default:
      return state;
  }
};
