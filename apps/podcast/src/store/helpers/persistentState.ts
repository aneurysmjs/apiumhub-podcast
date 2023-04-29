export const loadState = () => {
  try {
    const serialState = localStorage.getItem('podcastState');
    if (serialState === null) {
      return undefined;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(serialState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = <T>(state: T) => {
  try {
    const serialState = JSON.stringify(state);
    localStorage.setItem('podcastState', serialState);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};
