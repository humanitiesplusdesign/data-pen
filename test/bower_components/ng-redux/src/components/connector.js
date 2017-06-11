import shallowEqual from '../utils/shallowEqual';
import wrapActionCreators from '../utils/wrapActionCreators';
import invariant from 'invariant';

import isPlainObject from 'lodash.isplainobject';
import isFunction from 'lodash.isfunction';
import isObject from 'lodash.isobject';
import assign from 'lodash.assign';

const defaultMapStateToTarget = () => ({});
const defaultMapDispatchToTarget = dispatch => ({dispatch});

export default function Connector(store) {
  return (mapStateToTarget, mapDispatchToTarget) => {

    const finalMapStateToTarget = mapStateToTarget || defaultMapStateToTarget;

    const finalMapDispatchToTarget = isPlainObject(mapDispatchToTarget) ?
      wrapActionCreators(mapDispatchToTarget) :
      mapDispatchToTarget || defaultMapDispatchToTarget;

    invariant(
      isFunction(finalMapStateToTarget),
      'mapStateToTarget must be a Function. Instead received $s.', finalMapStateToTarget
      );

    invariant(
      isPlainObject(finalMapDispatchToTarget) || isFunction(finalMapDispatchToTarget),
      'mapDispatchToTarget must be a plain Object or a Function. Instead received $s.', finalMapDispatchToTarget
      );

    let slice = getStateSlice(store.getState(), finalMapStateToTarget);

    const boundActionCreators = finalMapDispatchToTarget(store.dispatch);

    return (target) => {

      invariant(
        isFunction(target) || isObject(target),
        'The target parameter passed to connect must be a Function or a object.'
        );

      //Initial update
      updateTarget(target, slice, boundActionCreators);

      const unsubscribe = store.subscribe(() => {
        const nextSlice = getStateSlice(store.getState(), finalMapStateToTarget);
        if (!shallowEqual(slice, nextSlice)) {
          slice = nextSlice;
          updateTarget(target, slice, boundActionCreators);
        }
      });
      return unsubscribe;
    }

  }
}

function updateTarget(target, StateSlice, dispatch) {
  if(isFunction(target)) {
    target(StateSlice, dispatch);
  } else {
    assign(target, StateSlice, dispatch);
  }
}

function getStateSlice(state, mapStateToScope) {
  const slice = mapStateToScope(state);

  invariant(
    isPlainObject(slice),
    '`mapStateToScope` must return an object. Instead received %s.',
    slice
    );

  return slice;
}
