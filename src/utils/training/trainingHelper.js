// Для тренировки нужно выбирать 10 случайных пунктов из словаря, чтобы они не повторялись

export const generateTaskList = (dictionary) => {
  if (!dictionary) return console.log('there is no dictionary');
  if (!dictionary.length) return console.log('dictionary is empty');
  if (dictionary.length < 4) return console.log('dictionary is less 4 words');

  const tenRandomWords = getTenWordsForTraining(dictionary);
  const taskList = [];
  tenRandomWords.forEach((item) => {
    const shuffledArray = shuffleArray([
      item,
      ...getRandomItems(
        tenRandomWords.filter((x) => x.word !== item.word),
        3
      )
    ]);
    taskList.push({ question: item, answers: shuffledArray, isRight: false });
  });
  console.log('success taskList');
  return taskList;
};

const getTenWordsForTraining = (
  dictionary,
  minLengthForTraining = 4,
  maxLengthForTraining = 10
) => {
  // 10 случайных пунктов слово-значение из 500
  // делаем выборку словаря для тренировки
  const dictionaryForTraining = dictionary.filter((item) => item.progress < 100);
  // установили минимальную и максимальную длину выборки
  if (dictionaryForTraining.length < minLengthForTraining)
    return console.log('less then 4 words for training');
  // выбираем 10 случайных пунктов (минимум 4) в случайном порядке из словаря
  const lengthOfDictionary = dictionaryForTraining.length;
  const amountOfItems = lengthOfDictionary < 10 ? lengthOfDictionary : maxLengthForTraining;
  const setOfIndexes = new Set();
  while (setOfIndexes.size < amountOfItems) {
    const randomIndex = +(Math.random() * (lengthOfDictionary - 1)).toFixed(0);
    setOfIndexes.add(randomIndex);
  }
  const indexesForTraining = Array.from(setOfIndexes);
  console.log(indexesForTraining);
  const finalArrayForTraining = indexesForTraining.map((item) => ({
    ...dictionaryForTraining[item],
    indexInMainDictionary: item
  }));
  return finalArrayForTraining;
};

function getRandomItems(array, count) {
  const shuffledArray = shuffleArray(array);
  return shuffledArray.slice(0, count);
}

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
