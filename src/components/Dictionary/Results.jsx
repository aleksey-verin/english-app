/* eslint-disable react/prop-types */
import Sound from '../../images/sound.png';
import Add from '../../images/add.png';
import Remove from '../../images/remove.png';
import Loader from '../Loader';
import { selectorResult } from '../../store/reducers/requestWordSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDictionary, selectorDictionary } from '../../store/reducers/userDictionarySlice';
import { addInUserDictionary } from '../../store/reducers/addInUserDictionarySlice';
import {
  updateInUserDictionary,
  updateTypes
} from '../../store/reducers/updateInUserDictionarySlice';

const Results = () => {
  const dispatch = useDispatch();
  const { results, isLoading } = useSelector(selectorResult);
  const { userDictionary: dictionary } = useSelector(selectorDictionary);
  const { word, meanings, phonetics } = results;
  if (isLoading) return <Loader />;

  const isWordInDictionary = dictionary.find((item) => item.word === word);
  console.log(isWordInDictionary);

  function handleSound() {
    const sound = phonetics;
    if (sound.audio) {
      new Audio(sound.audio).play();
    }
  }
  function handleClick(word, definition) {
    if (isWordInDictionary) {
      if (isWordInDictionary.definition.includes(definition)) {
        dispatch(updateInUserDictionary([word, definition, updateTypes.removeDefinition]));
      } else {
        dispatch(updateInUserDictionary([word, definition, updateTypes.addDefinition]));
      }
    } else {
      dispatch(addInUserDictionary([word, definition]));
    }
    dispatch(getUserDictionary());
  }

  return (
    <div className="results">
      <div className="results-info">
        <div className="results-word">{word}</div>
        <div className="results-sound">
          <img src={Sound} alt="sound-pic" onClick={handleSound} />
        </div>
      </div>
      <div className="results-list">
        {meanings.map((item, i) => (
          <div key={i} className="results-item">
            <div className="results-item__part">{item.partOfSpeech}</div>
            <div className="results-item__definitions">
              {item.definitions.map((def, i) => (
                <div
                  key={i + 20}
                  className="results-item__definition"
                  style={
                    isWordInDictionary.definition.includes(def.definition)
                      ? { backgroundColor: 'aliceblue' }
                      : null
                  }>
                  {isWordInDictionary ? (
                    <div
                      className="results-item__add"
                      onClick={() => handleClick(word, def.definition)}>
                      {isWordInDictionary.definition.includes(def.definition) ? (
                        <img src={Remove} alt="add" />
                      ) : (
                        <img src={Add} alt="add" />
                      )}
                    </div>
                  ) : (
                    <div
                      className="results-item__add"
                      onClick={() => handleClick(word, def.definition)}>
                      <img src={Add} alt="add" />
                    </div>
                  )}
                  {/* {!isWordInDictionary.filter((item) => item.definition === definition.definition)
                    .length ? (
                    <div
                      className="results-item__add"
                      onClick={(e) => handleClick(e, definition.definition)}>
                      <img src={Add} alt="add" />
                    </div>
                  ) : (
                    <div className="results-item__add">
                      {`${
                        isWordInDictionary[
                          isWordInDictionary.findIndex(
                            (item) => item.definition === definition.definition
                          )
                        ].progress
                      }%`}
                    </div>
                  )} */}
                  <p>{def.definition}</p>
                  {def.example ? (
                    <div className="results-item__example">
                      <p>
                        Example: <span></span>
                        {def.example}
                      </p>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
// const AddWord = ({ dictionary }) => {

export default Results;

// Если добавлять слово и массив значений для него
// {word: cat, definitions: ['like a dog', 'kitty']}

// let [isWordInDictionary] = dictionary.filter((item) => item.word === word) // допускаю что есть разные слова с одинаковыми значениями
//   if (!isWordInDictionary) {
//     isWordInDictionary = { word: word, definitions: [] }
//   }

//   return (
//     <div className="results">
//       <div className="results-info">
//         <div className="results-word">{word}</div>
//         <div className="results-sound">
//           <img src={Sound} alt="sound-pic" onClick={handleSound} />
//         </div>
//       </div>
//       <div className="results-list">
//         {meanings.map((item, i) => (
//           <div key={i} className="results-item">
//             <div className="results-item__part">{item.partOfSpeech}</div>
//             <div className="results-item__definitions">
//               {item.definitions.map((definition, i) => (
//                 <div key={i + 20} className="results-item__definition">
//                   {!isWordInDictionary.definitions.includes(
//                     definition.definition
//                   ) ? (
//                     <div
//                       className="results-item__add"
//                       onClick={(e) => handleClick(e, definition.definition)}
//                     >
//                       <img src={Add} alt="add" />
//                     </div>
//                   ) : null}
//                   <p>{definition.definition}</p>
//                   {definition.example ? (
//                     <div className="results-item__example">
//                       <p>
//                         Example: <span></span>
//                         {definition.example}
//                       </p>
//                     </div>
//                   ) : null}
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
