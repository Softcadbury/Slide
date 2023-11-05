import styled from "@emotion/styled";
import { useState } from "react";

const numberOfColumns = 3;

const GridParent = styled.div`
    display: grid;
    grid-template-columns: repeat(${numberOfColumns}, 40px);
    grid-template-rows: 40px;
    grid-gap: 1px;
`;

const GridItem = styled.div`
    box-shadow: 0 0 0 1px black;
`;

const moveValue = (
    array: number[],
    indexFrom: number,
    indexTo: number
): number[] => {
    const newArray = [...array];
    const value = newArray.splice(indexFrom, 1)[0];
    newArray.splice(indexTo, 0, value);
    return newArray;
};

const switchValues = (
    array: number[],
    indexValue1: number,
    indexValue2: number
): number[] => {
    const newArray = [...array];
    [newArray[indexValue1], newArray[indexValue2]] = [
        newArray[indexValue2],
        newArray[indexValue1],
    ];
    return newArray;
};

function App() {
    const [array, setArray] = useState<number[]>(
        Array.from(Array(numberOfColumns * numberOfColumns).keys())
    );

    const slideLeft = (row: number) => {
        const indexBase = numberOfColumns * row;
        setArray(moveValue(array, indexBase, indexBase + numberOfColumns - 1));
    };

    const slideRight = (row: number) => {
        const indexBase = numberOfColumns * row;
        setArray(moveValue(array, indexBase + numberOfColumns - 1, indexBase));
    };

    const slideUp = (column: number) => {
        let newArray: number[] = [...array];

        for (let i = 0; i < numberOfColumns - 1; i++) {
            newArray = switchValues(
                newArray,
                column + numberOfColumns * i,
                column + numberOfColumns * (i + 1)
            );
        }

        setArray(newArray);
    };

    const slideDown = (column: number) => {
        let newArray: number[] = [...array];

        for (let i = numberOfColumns - 2; i >= 0; i--) {
            newArray = switchValues(
                newArray,
                column + numberOfColumns * (i + 1),
                column + numberOfColumns * i
            );
        }

        setArray(newArray);
    };

    return (
        <>
            <GridParent>
                {array.map((value) => (
                    <GridItem key={value}>{value}</GridItem>
                ))}
            </GridParent>

            {Array.from(Array(numberOfColumns).keys()).map((value) => (
                <div>
                    <br />
                    <button onClick={() => slideLeft(value)}>
                        ⇦ left {value}
                    </button>
                    <button onClick={() => slideRight(value)}>
                        ⇨ right {value}
                    </button>
                    <button onClick={() => slideUp(value)}>⇧ up {value}</button>
                    <button onClick={() => slideDown(value)}>
                        ⇩ down {value}
                    </button>
                    <br />
                </div>
            ))}
        </>
    );
}

export default App;
