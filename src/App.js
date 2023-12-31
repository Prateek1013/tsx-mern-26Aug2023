import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import { Card } from 'antd';
import { Col, Row } from 'antd';
import Modaal from './components/Modaal';
import { useEffect, useState } from 'react';
import { useStyleRegister } from 'antd/es/theme/internal';
const LIMIT=9;
function App() {
  const [loading, setloading] = useState(false);
  const [chars, setchars] = useState([]);
  const [data,setdata]=useState([]);
  const [open, setopen] = useState(false);
  const [item, setitem] = useState({});
  const [pagecount, setpagecount] = useState(0);
  const [currpage, setcurrpage] = useState(1);
  
  
  useEffect(() => {
    const func =  () => {
      fetch(`http://localhost:4000/getall`)
            .then(response => response.json())
            .then(jsonData => {
              let datas=[]
              jsonData.forEach(element => {
                datas.push(JSON.parse(element))
              });
              setdata(datas);
              setchars(datas.slice(0,LIMIT));
              console.log(datas);
              setloading(false);
      setpagecount(Math.ceil(datas.length / LIMIT -1));
            })
    }
    setloading(true);
    func();
  }, [])

  const func = async (url) => {
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    setloading(false);
    // setchars(data.results);
  }
  const handleprev = () => {
    if (currpage > 1) {
      setcurrpage(currpage - 1);
      // const URL = `https://swapi.dev/api/people/?page=${currpage - 1}`;
      // setloading(true);
      // func(URL);
      setchars(data.slice((currpage-2)*LIMIT,LIMIT*(currpage-1)));
    }
  }
  const handlenext = () => {
    if (currpage < 9) {
      setcurrpage(currpage + 1);
      // const URL = `https://swapi.dev/api/people/?page=${currpage + 1}`;
      // setloading(true);
      // func(URL);
      setchars(data.slice((currpage)*LIMIT,LIMIT*(currpage+1)));
    }
  }

  const handlemodal = (item) => {
    setopen(true);
    setitem(item);
  }
  return (
    <>
      <div>
        <div style={{ textAlign: 'center', background: 'cyan' }}>
          <h1>Star Wars</h1>
        </div>
        <div style={{ marginTop: '8px', textAlign: 'center' }}>
          <input type="text" placeholder='Search name...' onChange={(e) => {
          //   if(e.target.value)
          //   setchars(data.filter(item => item.name.toLowerCase().includes(e.target.value)));
          // else setchars(data.slice((currpage-1)*LIMIT,LIMIT*currpage));
           if(e.target.value)
            fetch(`http://localhost:4000/getall/?q=${e.target.value}`)
            .then(response => response.json())
            .then(jsonData => {
              let datas=[]
              console.log(jsonData)
              jsonData.forEach(element => {
                datas.push(JSON.parse(element))
              });
              setchars(datas)
            })
            else setchars(data.slice((currpage-1)*LIMIT,LIMIT*currpage))
          }} />

        </div>
        <div style={{ marginTop: '10px' }}>
          <Modaal item={item} open={open} setopen={setopen} />
          <Row gutter={[24, 24]}>
            {
              chars.map(item => {
                return (
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
                      onClick={() => handlemodal(item)}
                      hoverable
                      style={{
                        width: 240,
                      }}
                      cover={<img alt="example" src={`https://picsum.photos/200/300?${item.name}`}/>}
                    >
                      <h2>{item.name}</h2>
                    </Card>

                  </Col>
                )
              })
            }
          </Row>

        </div>
        <div style={{ marginTop: '10px', textAlign: "center" }}>
          <button onClick={handleprev}>Prev</button> Page {currpage} of {pagecount} <button onClick={handlenext}>Next</button>
        </div>
      </div>


    </>
  )
}

export default App;
