/* eslint-disable react/prop-types */
import Sound from '../../images/sound.png';
import Add from '../../images/add.png';
// import { useGetNewWordQuery } from '../../store/reducers/requestWordApi';
// import { useFetchUserDictionaryQuery } from '../../store/reducers/userDictionaryApi';
import Loader from '../Loader';
import { selectorResult } from '../../store/reducers/requestWordSlice';
import { useSelector } from 'react-redux';
import { useFetchUserDictionaryQuery } from '../../store/reducers/userDictionaryApi';

const Results = () => {
  // const { data, isLoading, isSuccess, isError, error } = useGetNewWordQuery();
  // const { data: dictionary } = useFetchUserDictionaryQuery();
  // console.log(data);
  // if (isLoading) return <Loader />;
  // // if (!dictionary) return;

  const { results: data, isLoading } = useSelector(selectorResult);
  const { data: dictionary } = useFetchUserDictionaryQuery();
  console.log(data);

  if (isLoading) return <Loader />;
  // const [wordInDictionary, setWordInDictionary] = useState()

  const item = data[0];
  // console.log(item);
  const word = item.word.toLowerCase();
  const meanings = item.meanings;
  const phonetics = item.phonetics;
  const wordInDictionary = dictionary.filter((item) => item.word === word);

  function handleSound() {
    if (phonetics.length) {
      const sound = phonetics[0];
      if (sound.audio) {
        new Audio(sound.audio).play();
      }
    }
  }

  function handleClick(e, def) {
    if (wordInDictionary.filter((item) => item.definition === def).length) return;
    addInDictionary(word, def);
    // e.target.style.backgroundColor = 'lightblue'
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
              {item.definitions.map((definition, i) => (
                <div key={i + 20} className="results-item__definition">
                  {!wordInDictionary.filter((item) => item.definition === definition.definition)
                    .length ? (
                    <div
                      className="results-item__add"
                      onClick={(e) => handleClick(e, definition.definition)}>
                      <img src={Add} alt="add" />
                    </div>
                  ) : (
                    <div className="results-item__add">
                      {`${
                        wordInDictionary[
                          wordInDictionary.findIndex(
                            (item) => item.definition === definition.definition
                          )
                        ].progress
                      }%`}
                    </div>
                  )}
                  <p>{definition.definition}</p>
                  {definition.example ? (
                    <div className="results-item__example">
                      <p>
                        Example: <span></span>
                        {definition.example}
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
//   if (def !== definition.definition) {
//     return (
//       <>
//         <div
//           className="results-item__add"
//           onClick={(e) => handleClick(e, definition.definition)}
//         >
//           <img src={Add} alt="add" />
//         </div>
//       </>
//     )
//   }
// if (def !== definition.definition){
// return (
//   <>
//      <div
//   className="results-item__add"
//   onClick={(e) => handleClick(e, definition.definition)}
//      >
//      <img src={Add} alt="add" />
//       </div
//   </>)
// }

export default Results;

// Если добавлять слово и массив значений для него
// {word: cat, definitions: ['like a dog', 'kitty']}

// let [wordInDictionary] = dictionary.filter((item) => item.word === word) // допускаю что есть разные слова с одинаковыми значениями
//   if (!wordInDictionary) {
//     wordInDictionary = { word: word, definitions: [] }
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
//                   {!wordInDictionary.definitions.includes(
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
