export const getScore = (dictionary) => {
  if (!dictionary) return;
  const total = dictionary.length;
  const done = dictionary.filter((item) => item.progress >= 100).length;
  const training = total - done;

  const zero = dictionary.filter((item) => item.progress === 0).length;
  const twenty = dictionary.filter((item) => item.progress === 20).length;
  const forty = dictionary.filter((item) => item.progress === 40).length;
  const sixty = dictionary.filter((item) => item.progress === 60).length;
  const eighty = dictionary.filter((item) => item.progress === 80).length;
  const hundred = done;

  const percentages = {
    zero,
    twenty,
    forty,
    sixty,
    eighty,
    hundred
  };
  return { total, done, training, percentages };
};
