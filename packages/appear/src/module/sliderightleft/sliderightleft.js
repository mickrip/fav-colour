const sliderightleft = (s, params = { amount: 3000 }) => {
  return {
    marginLeft: s ? 0 : -params.amount || -2000,
    config: { duration: 500, mass: 1, tension: 180, friction: 12 },
  };
};
//
export default sliderightleft;
