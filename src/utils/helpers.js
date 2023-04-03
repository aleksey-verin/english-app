export const getScore = (dictionary) => {
  if (!dictionary) return;
  const total = dictionary.length;
  const done = dictionary.filter((item) => item.progress >= 100).length;
  const training = total - done;
  return { total, done, training };
};
