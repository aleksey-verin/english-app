export const storage = {
  user: 'english-user'
  // weatherFavoriteList: 'weatherFavoriteList',
  // weatherCurrentCity: 'weatherCurrentCity',
};

export const storageGetItem = (storageItem) => {
  try {
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
    localStorage.setItem(storageItem, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};
