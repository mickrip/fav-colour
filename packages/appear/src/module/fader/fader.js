const fader = s => {
  return { opacity: s ? 1 : 0, config: { duration: 350 } };
};

export default fader;
