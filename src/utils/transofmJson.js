export const transformJSON = async () => {
  const response = await fetch('/mockData/6365414.json');
  const json = await response.json();
  const data = json.wordlist.words.map((item) => ({
    word: item.word,
    definition: [item.sense.definition],
    // example: item.example.text,
    progress: 0
  }));
  return JSON.stringify(data);
};
