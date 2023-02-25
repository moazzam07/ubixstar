/* eslint-disable no-undef */
/* eslint-disable react/style-prop-object */
import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [widgets, setWidgets] = useState([]);
  const [btn, setBtn] = useState(false);
  const [Txt, setTxt] = useState(false);
  const [data, setData] = useState({
    buttonName: "",
    buttonRadius: "",
    textBox: "",
  });
  
  const InputChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async  (e) => {
    e.preventDefault();
    console.log(data);
    await axios.post("http://localhost:8000/result", { data })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      })
  };

  function handleOnDrag(e , object) {
    e.dataTransfer.setData("widgetType", object);
  }

  function handleOnDrop(e) {
    const widgetType = e.dataTransfer.getData("widgetType");
    console.log("type", widgetType);
    if(widgetType === "Button"){
      setBtn(true);
    }

    if(widgetType === "TextBox"){
      setTxt(true);
    }

    setWidgets([...widgets, widgetType]);
  }

  function handleDragOver(e){
    e.preventDefault();
  }

  return (
      <div className="App">

      <div className="rows">
        <div className='column'>
        <h2>Widgets</h2>
        <div className="btn-div widget" draggable 
          onDragStart={(e) => handleOnDrag(e, "Button")}
        >
          <button className='btn'>Button</button>
        </div>
        <div className="textbox-div widget" 
          draggable 
          onDragStart={(e) => handleOnDrag(e, "TextBox")}>
          <input type="text" name="name" className='txt' placeholder="TextBox" />
        </div>
      </div>

      <div className="column div-1" onDrop={handleOnDrop} onDragOver={handleDragOver}>
        {widgets.map((object, index) => (
          <div className='dropped-widget' key={index}>
            <div className='div-margin'>
              <div className='border drop'>
              {object}
              </div>                  
            </div>
          </div>
        ))}        
      </div>
      
      <div className="column">
        <h2>Properties</h2>
        
          {btn && 
          <><div className='prop-div'>
              <div>
                <label className='label-1'>
                  Button text
                </label>
              </div>
              <div>
                <input 
                type="text" 
                name="buttonName" 
                className='txt-1' 
                placeholder="Enter your Text"
                onChange={InputChange}
                value={data.buttonName}
                />
              </div>
            </div>
            <div className='prop-div'>
              <div>
                <label className='label-2'>
                  Button Radius
                </label>
                <div>
                  <input 
                  type="text" 
                  name="buttonRadius" 
                  className='txt-1' 
                  placeholder="Enter Radius(%)"
                  onChange={InputChange}
                  value={data.buttonRadius} />
                </div>
              </div>
            </div></>
          }
          {Txt &&
          <div className='prop-div'>
            <div>
              <label className='label-3'>
                Text box
              </label>
            </div>
            <div>
              <input 
              type="text" 
              name="textBox" 
              className='txt-1' 
              placeholder="Enter your Text"
              onChange={InputChange}
              value={data.TextBox}
              />
            </div>
          </div>
          }
          <div className='save'>
            <button 
            className='btn'
            onClick={(e) => {                              
              handleSubmit(e)                                                      
            }}> 
            Save</button>
          </div>

              </div>
      </div>
      </div>
        
          
      
  );
}

export default App;
