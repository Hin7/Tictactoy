/**
 * Author: HIN
 * Date:   25.10.2021
 */

import React from 'react';

const styles = {
    general:{
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        padding: 20
    },
    boardCell: {
        height: 80,
        width: 80,
        fontSize: "30pt",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'gold',
        borderRadius: '40%'
    },
    winBoardCell: {
        height: 80,
        width: 80,
        fontSize: "30pt",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        borderRadius: '40%'
    },
    column: {
        display: 'flex',
        flexDirection: 'column'
    },
    row: {
        display: 'flex',
        flexDirection: 'row'
    }
};

//линия игрового поля
const BoardLine = ({line, onCellClick}) => (
    <div style={styles.row}>
        { line.map((item, index)=>
            (<div key={index} style={ item[0]==='.' ? styles.winBoardCell : styles.boardCell }
                  onClick={onCellClick.bind(0, index)}>
                {item}
            </div>)
          )
        }
    </div>
);

//игровое поле
const GameBoard = ({board, onCellClick}) => (
    <div  style={styles.general}>
        <div style={styles.column}>
            { board.map((item, index)=>
                (<div key={index} style={styles.row}>
                    <BoardLine line={item} onCellClick={onCellClick.bind(0, index)}/>
                </div>)
              )
            }
        </div>
    </div>
);

export default GameBoard;