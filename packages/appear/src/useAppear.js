import { useState, useEffect } from "react";

const useAppear = () => {
  const [appearStates, setAppearState] = useState(new Map());

  useEffect(() => {
    console.log("appearStates", appearStates);
  });

  const open = id => {
    const newModalState = new Map(appearStates);
    newModalState.set(id, true);
    setAppearState(newModalState);
  };

  const close = id => {
    const newModalState = new Map(appearStates);
    newModalState.set(id, false);
    setAppearState(newModalState);
  };

  const toggle = id => {
    const newModalState = new Map(appearStates);
    newModalState.set(id, !isOpen(id));
    setAppearState(newModalState);
  };

  const isOpen = id => {
    return appearStates.get(id) || false;
  };

  return {
    open,
    close,
    toggle,
    isOpen,
    appearStates
  };
};

export default useAppear;
