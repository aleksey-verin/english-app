export const normalizeData = (data) => {
  const item = data[0];
  return {
    word: item.word.toLowerCase(),
    meanings: item.meanings,
    phonetics: item.phonetic.length ? item.phonetics[0] : null
  };
};
