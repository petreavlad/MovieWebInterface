var state_holder = [];
var darkBackgroundListener;

export function getComponentState(key) {
  return state_holder.find((state) => state.key === key);
}

export function setBackgroundListener(listener) {
  darkBackgroundListener = listener;
  console.log(darkBackgroundListener);
}

export function getBackgroundListener() {
  return darkBackgroundListener;
}

export function insertComponentState(key, state) {
  const found = state_holder.find((state) => state.key === key);

  if (found) {
    const previous_index = state_holder.indexOf(found);

    state_holder.splice(previous_index, 1);
  }

  state_holder.push({ key, state });
}
