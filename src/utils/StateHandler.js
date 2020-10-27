var state_holder = [];

export function getComponentState(key) {
  return state_holder.find((state) => state.key === key);
}

export function insertComponentState(key, state) {
  const found = state_holder.find((state) => state.key === key);

  if (found) {
    const previous_index = state_holder.indexOf(found);

    state_holder.splice(previous_index, 1);
  }

  state_holder.push({ key, state });
}