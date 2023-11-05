import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const numberOfColumns = 4;
const mixComplexity = 50;

const GridParent = styled.div`
  display: grid;
  grid-template-columns: repeat(${numberOfColumns}, 40px);
  grid-template-rows: 40px;
  grid-gap: 1px;
`;

const GridItem = styled.div`
  box-shadow: 0 0 0 1px black;
`;

const moveValue = (array: number[], indexFrom: number, indexTo: number): number[] => {
  const newArray = [...array];
  const value = newArray.splice(indexFrom, 1)[0];
  newArray.splice(indexTo, 0, value);
  return newArray;
};

const switchValues = (array: number[], indexValue1: number, indexValue2: number): number[] => {
  const newArray = [...array];
  [newArray[indexValue1], newArray[indexValue2]] = [newArray[indexValue2], newArray[indexValue1]];
  return newArray;
};

const slideLeft = (array: number[], row: number) => {
  let newArray: number[] = [...array];
  const index = numberOfColumns * row;
  newArray = moveValue(array, index, index + numberOfColumns - 1);
  return newArray;
};

const slideRight = (array: number[], row: number) => {
  let newArray: number[] = [...array];
  const index = numberOfColumns * row;
  newArray = moveValue(array, index + numberOfColumns - 1, index);
  return newArray;
};

const slideUp = (array: number[], column: number) => {
  let newArray: number[] = [...array];

  for (let i = 0; i < numberOfColumns - 1; i++) {
    newArray = switchValues(newArray, column + numberOfColumns * i, column + numberOfColumns * (i + 1));
  }

  return newArray;
};

const slideDown = (array: number[], column: number) => {
  let newArray: number[] = [...array];

  for (let i = numberOfColumns - 2; i >= 0; i--) {
    newArray = switchValues(newArray, column + numberOfColumns * (i + 1), column + numberOfColumns * i);
  }

  return newArray;
};

const getRandomNUmber = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const mixArray = (array: number[]) => {
  let newArray: number[] = [...array];

  for (let i = 0; i < mixComplexity - 1; i++) {
    const randomRowOrColumn = getRandomNUmber(0, numberOfColumns);
    const direction = getRandomNUmber(0, 4);

    switch (direction) {
      case 0:
        newArray = slideLeft(newArray, randomRowOrColumn);
        break;
      case 1:
        newArray = slideRight(newArray, randomRowOrColumn);
        break;
      case 2:
        newArray = slideUp(newArray, randomRowOrColumn);
        break;
      case 3:
        newArray = slideDown(newArray, randomRowOrColumn);
        break;
    }
  }

  return newArray;
};

function App() {
  const [array, setArray] = useState<number[]>(Array.from(Array(numberOfColumns * numberOfColumns).keys()));

  const onClickSlideLeft = (row: number) => setArray(slideLeft(array, row));

  const onClickSlideRight = (row: number) => setArray(slideRight(array, row));

  const onClickSlideUp = (column: number) => setArray(slideUp(array, column));

  const onClickSlideDown = (column: number) => setArray(slideDown(array, column));

  useEffect(() => {
    setArray(mixArray(array));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <GridParent>
        {array.map((value, index) => (
          <GridItem key={value}>
            {value}
            {index === value ? 'True' : ''}
          </GridItem>
        ))}
      </GridParent>

      {Array.from(Array(numberOfColumns).keys()).map((value) => (
        <div key={value}>
          <br />
          <button onClick={() => onClickSlideLeft(value)}>⇦ left {value}</button>
          <button onClick={() => onClickSlideRight(value)}>⇨ right {value}</button>
          <button onClick={() => onClickSlideUp(value)}>⇧ up {value}</button>
          <button onClick={() => onClickSlideDown(value)}>⇩ down {value}</button>
          <br />
        </div>
      ))}
    </>
  );
}

export default App;
