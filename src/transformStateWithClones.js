'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const modifyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        result.push(addProperties(modifyState, action.extraData));
        break;

      case 'removeProperties':
        result.push(removeProperties(modifyState, action.keysToRemove));
        break;

      case 'clear':
        result.push(clear(modifyState));
        break;
    }
  }

  return result;
}

function addProperties(state, properties) {
  Object.assign(state, properties);

  return { ...state };
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }

  return { ...state };
}

function clear(state) {
  for (const key of Object.keys(state)) {
    delete state[key];
  }

  return {};
}

module.exports = transformStateWithClones;
