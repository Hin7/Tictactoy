/**
 * Author: HIN
 * Date:   22.10.2021
 */


import React from "react";

const styles = {
    general:{
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        padding: 20
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

//типы игроков
export const playerTypes = ["игрок", "компьютер"];
//комбобокс выбора типа игрока
const PlayerTypeChoose = ({initValue, selectType}) => (

    <select value={playerTypes[initValue]}
            onChange={selectType}>
        { playerTypes.map((item, index)=>
            (<option key={index}>{item}</option>))
        }
    </select>

);

const StatusHeader = ({Player1, Player2, onChange, children})=> (
    <div style={styles.general}>
        <div style={styles.row}>
            <PlayerTypeChoose initValue={Player1}
                              selectType={onChange.bind(0, 0)} />
            -- X --  -- { children } -- -- O --
            <PlayerTypeChoose initValue={Player2}
                              selectType={onChange.bind(0, 1)} />
        </div>
    </div>
);

export default StatusHeader;