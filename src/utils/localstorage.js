export const storage = {
  user: 'english-user'
  // dictionary: 'englishDictionary'
  // weatherFavoriteList: 'weatherFavoriteList',
  // weatherCurrentCity: 'weatherCurrentCity',
};

export const storageGetItem = (storageItem) => {
  try {
    console.log(storageItem);
    const response = localStorage.getItem(storageItem);
    if (response) {
      return JSON.parse(response);
    }
  } catch (error) {
    console.log(error);
  }
};

export const storageSetItem = (storageItem, value) => {
  try {
    console.log(storageItem);
    localStorage.setItem(storageItem, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};
