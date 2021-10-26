/**
 * Author: HIN
 * Date:   21.10.2021
 */


import React, { Component } from 'react';

import StatusHeader from './StatusHeader';
import GameBoard from "./GameBoard";

const styles = {
    header: {
        display: 'flex',
        fontSize: "30pt",
        color: "darkgreen",
        justifyContent: 'center'
    }
};

//типы игроков
//дублируются в StatusHeader.js потом разберусь, как оставить один
const playerTypes = ["игрок", "компьютер"];

class App extends Component {
 constructor(props) {
     super(props);

     this.state = {
         //выбор типа игроков 0 - человек, 1 - компьютер
         player1Type: 0,
         player2Type: 0,
         //чья очередь ходить. -1 - игра не начата, 0- 1й игрок, 1 - 2й игрок
         playerTurn: -1,
         //побеитель -1 - пока никто, 0 - 1й игрок, 1 - 2й игрок
         winner: -1,
         //игровое поле
         board: [['', '', ''],
                 ['', '', ''],
                 ['', '', '']]
     };

     //структура-модель данных, из идеологии MVC
     this.model = {
         playerTurn: -1,
         winner: -1,
         board: [['', '', ''],
                 ['', '', ''],
                 ['', '', '']]
     };

     //выигрышные комбинации для проверки победы
     this.winVariants = [[[0, 0], [0 ,1], [0, 2]],
                         [[1, 0], [1, 1], [1, 2]],
                         [[2, 0], [2, 1], [2, 2]],
                         [[0, 0], [1, 0], [2, 0]],
                         [[0, 1], [1, 1], [2, 1]],
                         [[0, 2], [1, 2], [2, 2]],
                         [[0, 0], [1, 1], [2, 2]],
                         [[0, 2], [1, 1], [2, 0]]];
     //лучшие ходы в орядке убывания успешности
     this.bestSteps = [[1, 1],
                       [0, 0], [0, 2], [2, 0], [2, 2],
                       [0, 1], [1, 0], [1, 2], [2, 1]];
 }
//
 selectPlayerType(key, event){
    if(this.model.playerTurn>-1) return;
     const val = playerTypes.indexOf(event.target.value);
     if(this.checkSelectPlyerType(key, val))
         this.setState(key===0 ? {player1Type: val} :
                                      {player2Type: val} );
 }
//проверка правильность
//можно задать только одного игрока типа "компьютер"
 checkSelectPlyerType(key, type){
     const player1 = key===0 ? type : this.state.player1Type;
     const player2 = key===1 ? type : this.state.player2Type;
     return !(player1 & player2);
 }

 onStartGameClick(){
     this.model.playerTurn = 0;
     this.takeMachineTurnIfNeeded();
     this.setState(this.model);
 }
 onCellClick(lineN, columnN){
     console.log("Вызов onCellClick(" + lineN + " ," + columnN + ")");

     if(this.model.playerTurn < 0 ) {
         console.log("Игра не начата");
         return;
     }

     if(this.model.winner !== -1) {
         console.log("Игра окончена! Есть победитель.");
         return;
     }

     if(this.model.board[lineN][columnN] !== '') {
         console.log("Занято!");
         return;
     }
     let currentSign = this.model.playerTurn === 0 ? 'X' : 'O';
     this.model.board[lineN][columnN] = currentSign;
     if(this.isWinner(this.model.board, currentSign, true)) {
         this.model.winner = this.model.playerTurn;
     } else this.swapTurn();
     if(this.isTie(this.model.board))
         this.model.winner = 2;

     //ответный ход машины, если надо
     this.takeMachineTurnIfNeeded();

     this.setState(this.model);
 }

 swapTurn() {
     if(this.model.playerTurn <0 ) retrn;
     this.model.playerTurn = this.model.playerTurn === 0  ? 1 : 0;
 };

 isWinner(board, sign, mark = false){
     for(var i = 0; i < this.winVariants.length; i++) {
         const item = this.winVariants[i];
         if(board[item[0][0]][item[0][1]] === sign &&
            board[item[1][0]][item[1][1]] === sign &&
            board[item[2][0]][item[2][1]] === sign){
            if(mark) {
                board[item[0][0]][item[0][1]] = '.' + board[item[0][0]][item[0][1]] + '.';
                board[item[1][0]][item[1][1]] = '.' + board[item[1][0]][item[1][1]] + '.';
                board[item[2][0]][item[2][1]] = '.' + board[item[2][0]][item[2][1]] + '.';
            }
            return true;
         }


     }
     return false;
 }

 isTie(board){
     for(var i = 0; i < 3; i++)
         for (var j = 0; j < 3; j++)
             if(board[i][j] === '')
                 return false;
     return true;
 }
 //если один из игроков-компьютер, и сейчас его ход, то сделать ответный ход
 takeMachineTurnIfNeeded(){
     console.log("Вызов takeMachineTurnIfNeeded()")
     if(this.model.winner !== -1) return;
     if(this.model.playerTurn === 0 && this.state.player1Type === 0 ) return;
     if(this.model.playerTurn === 1 && this.state.player2Type === 0 ) return;
     console.log("Начали ходить");
     //теперь, собственно, делаем ход
     let mySign = '';
     let oponentSign = '';
     if(this.model.playerTurn === 0) { mySign = 'X'; oponentSign = 'O';  }
     else                            { mySign = 'O'; oponentSign = 'X';  }
     const testBoard = this.model.board;
     //проверяем, есть ли победный ход у нас
     for (var i = 0; i < 3; i++)
         for (var j = 0; j < 3; j++){
             if(testBoard[i][j] === '') {
                 testBoard[i][j] = mySign;
                 if(this.isWinner(testBoard, mySign, true)) {
                     this.model.winner = this.model.playerTurn;
                     return;
                 } else {
                     testBoard[i][j] = '';
                 }
             }
         }
     //проверяем, есть ли победный ход у соперника
     //если находим, то занимаем клетку
     for (var i = 0; i < 3; i++)
         for(var j = 0; j < 3; j++) {
             if(testBoard[i][j] === '') {
                 testBoard[i][j] = oponentSign;
                 if(this.isWinner(testBoard, oponentSign)) {
                     testBoard[i][j]=mySign;
                     this.swapTurn()
                     return;
                 } else {
                     testBoard[i][j] = '';
                 }
             }
         }
     //перебираем лучшие ходы
     //если есть свободная клетка, ходим
     for (var i = 0; i < this.bestSteps.length; i++)
         if(testBoard[this.bestSteps[i][0]][this.bestSteps[i][1]] === '') {
             testBoard[this.bestSteps[i][0]][this.bestSteps[i][1]]=mySign;
             this.swapTurn();
             if(this.isTie(this.model.board))
                 this.model.winner = 2;
             return;
         }
 }

    getStatusString(){
        let statusString = ' ';
        // определяем текущий статус игры
        if(this.state.winner >= 0)
            //если кто-то выиграл
            statusString = this.state.winner === 2 ? "Ничья!!!" :
                  'Победил ' + (this.state.winner === 0 ? '1-й' : '2-й') + ' игрок!!!';
        else
            //иначе - ещё идет игра
            statusString = 'Следующий ход ' + (this.state.playerTurn === 0 ? '1-го' : '2-го') + ' игрока';
        return statusString;
    }

 render(){


     return <div>
                <div style = { styles.header }>Игра "Крестики-нолики"</div>

                <StatusHeader Player1={this.state.player1Type}
                              Player2={this.state.player2Type}
                              onChange={this.selectPlayerType.bind(this)}>
                    { this.state.playerTurn < 0 ?
                        <button onClick={this.onStartGameClick.bind(this)}>Начать игру</button> :
                        this.getStatusString()
                    }
                </StatusHeader>

                <GameBoard board={this.state.board} onCellClick={this.onCellClick.bind(this)} />

                <div>Created by HIN 2021</div>
            </div>
    }
}

export default App;