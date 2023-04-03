// нужно выбирать случайно слова из словаря, чтобы они не повторялись
// например если мы начали тренировку, то ставить метку на словах о том что уже такая тренировка была
// или брать стек слов и удалять при успешном тесте

export const dataTrainingDictionaryWord = (dictionary) => {
  // 1 слово из 500 и 3 случайных значений из 500

  // выбираем случайное слово
  // - убираем слова с прогрессом 100
  if (!dictionary) return;
  const dictionaryForTraining = dictionary.filter((item) => item.progress !== 100);
  if (dictionaryForTraining.length === 0) return;
  // находим случайную ячейку в массиве
  const randomItemInArrayIndex = +(Math.random() * (dictionaryForTraining.length - 1)).toFixed(0);
  // находим случайное слово
  const randomWord = dictionaryForTraining[randomItemInArrayIndex];
  // находим "остальные" слова без искомого
  const dictionaryForAnswers = dictionaryForTraining.filter(
    (_, index) => index !== randomItemInArrayIndex
  );
  // находим 3 случайных слова из "остальных" слов
  const treeRandomAnswersArray = dictionaryForAnswers.sort(() => 0.5 - Math.random()).slice(0, 3);
  const fourAnswersForTest = [...treeRandomAnswersArray, randomWord];
  // объединяем случайное слово и "остальные" 3 слова в один массив и перемешиваем
  const finalArray = [...fourAnswersForTest].sort(() => 0.5 - Math.random()).slice(0, 4);

  return { randomWord, finalArray };
};
