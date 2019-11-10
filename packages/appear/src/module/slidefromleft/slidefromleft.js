const slidefromleft = (s, params = { amount: 300 }) => {
  return {
    opacity: s ? 1 : 0,
    marginLeft: s ? 0 : -params.amount || -300,
    config: { duration: 300, mass: 1, friction: 100, tension: 280 }
  };
};

export default slidefromleft;
