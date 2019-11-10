import React, { useEffect, useState } from 'react';
import { useAppState } from '@bluechilli/bcstatemachine';
import { useSpring, animated } from 'react-spring';
import fader from './module/fader/fader';
import ocoutside from 'react-onclickoutside';

const createSpringAnim = (obj, setAnimatedStart) => {
  obj['onRest'] = () => {
    setAnimatedStart(false);
  };
  return obj;
};

const Appear = ({
  id,
  children,
  show,
  anim = fader,
  animParams = undefined,
  closeWhenClickOutside = false,
  onClickOutside = () => {},
}) => {
  const useAppear = useAppState('appear');
  const [_show, _setShow] = useState(false);
  const [animatedStart, setAnimatedStart] = useState(false);
  const [_sourceTruthShow, _setSourceTruthShow] = useState(false);

  const appear = useSpring(createSpringAnim(anim(_show, animParams), setAnimatedStart));

  Appear.handleClickOutside = () => {
    if (closeWhenClickOutside === true) {
      if (id !== undefined) {
        useAppear.close(id);
      }
    }
    onClickOutside();
  };

  useEffect(() => {
    setAnimatedStart(true);
    _setShow(useAppear.isOpen(id) || show);
  }, [useAppear.appearStates, show]);

  useEffect(() => {
    let isShow = _show;
    if (!_show && animatedStart) {
      isShow = true;
    }
    _setSourceTruthShow(isShow);
  }, [animatedStart]);

  return _sourceTruthShow === true ? (
    <span style={{ display: 'block' }}>
      <animated.div style={appear}>{children}</animated.div>
    </span>
  ) : (
    <span style={{ display: 'none' }} />
  );
};

const clickOutsideConfig = {
  handleClickOutside: () => Appear.handleClickOutside,
};

export default ocoutside(Appear, clickOutsideConfig);

/*
     <animated.div style={appear} className="TAG">
        {children}
      </animated.div>
 */
