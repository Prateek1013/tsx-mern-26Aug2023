import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import { Card } from 'antd';
import Loader from './Loader/Loader';
import { Col, Row } from 'antd';
import Modaal from './components/Modaal';
import { useEffect, useState } from 'react';
function App() {
  const [loading ,setloading]=useState(false);
  const [chars,setchars]=useState([]);
  const [data,setdata]=useState([]);
  const [open,setopen]=useState(false);
  const [item,setitem]=useState({});
  const [pagecount,setpagecount]=useState(0);
  const [currpage,setcurrpage]=useState(1);
  useEffect(()=>{
  const func=async ()=>{
    const res= await fetch(`https://swapi.dev/api/people?page=1`);
    const data=await res.json();
    setloading(false);
    setpagecount(Math.ceil(data.count/10));
    setchars(data.results);
    setdata(data.results);
  }
  setloading(true);
  func();
  },[])
  const func=async (url)=>{
    console.log(url);
    const res=await fetch(url);
    const data=await res.json();
    setloading(false);
    setchars(data.results);
    setdata(data.results);
  }
  const handleprev=()=>{
    if(currpage>1){
      setcurrpage(currpage-1);
      const URL=`https://swapi.dev/api/people/?page=${currpage-1}`;
      setloading(true);
      func(URL);
    }
  }
  const handlenext=()=>{
    if(currpage<9){
      setcurrpage(currpage+1);
      const URL=`https://swapi.dev/api/people/?page=${currpage+1}`;
      setloading(true);
      func(URL);
    }
  }
  
 const handlemodal=(item)=>{
  setopen(true);
  setitem(item);
 }
  return (
    <>
  { loading ? <Loader/> :
    <div>
    <div style={{textAlign:'center', background:'cyan'}}>
      <h1>Star Wars</h1>
    </div>
    <div>
      <input type="text" placeholder='Search name...' onChange={(e)=>{
        setchars(data.filter(item=>item.name.toLowerCase().includes(e.target.value)));
      }}/>
      
    </div>
    <div style={{marginTop:'10px'}}>
    <Modaal item={item} open={open} setopen={setopen} />
    <Row gutter={[24, 24]}>
      {
        chars.map(item=>{
          return(
    <Col
      xs={{
        span: 8,
        offset: 1,
      }}
      lg={{
        span: 6,
        offset: 2,
      }}
    >
     <Card
     onClick={()=>handlemodal(item)}
    hoverable
    style={{
      width: 240,
    }}
    cover={<img alt="example" src="https://picsum.photos/200/300" />}
  >
    <h2>{item.name}</h2>
  </Card>
  
  </Col>
          )
        })
      }
      </Row>

    </div> 
    <div style={{marginTop:'10px',textAlign:"center"}}>
      <button onClick={handleprev}>Prev</button> Page {currpage} of {pagecount} <button onClick={handlenext}>Next</button>
    </div>
    </div>
    }
    
    </>
  )
}

export default App;
