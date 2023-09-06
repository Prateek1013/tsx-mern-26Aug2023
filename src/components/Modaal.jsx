import { Modal } from 'antd';
import { useEffect, useState } from 'react';

const Modaal = (props) => {
    var num=[];
    if(props.open) {
        num=props.item.films;
    }
    const URL=props.item.homeworld;
    const [planet,setplanet]=useState({});
    const [residents,setresidents]=useState('');
    useEffect(()=>{
        const func=async ()=>{
            const res=await fetch(URL);
            const data=await res.json();
            setplanet(data);
            setresidents(data.residents.length);
            // console.log('modal api call');
        }
        func();
    },[props.open,URL])
    return ( 
        <Modal
        title={props.item.name}
         open={props.open}
         centered
         onOk={()=>props.setopen(false)}
         onCancel={()=>props.setopen(false)}
        >
            <p>height is {props.item.height}</p>
            <p>mass is {props.item.mass}</p>
            <p>birthday is {props.item.birth_year}</p>
            <p>Number films appeared are {num.length}</p>
            <p>planet name is {planet.name}</p>
            <p>Planet terrain is {planet.terrain}</p>
            <p>Planet climate is {planet.climate}</p>
            <p>Number of residents are {residents}</p>
        </Modal>
     );
}
 
export default Modaal;