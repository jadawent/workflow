import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Ooga Booga</h1>
      <div className="mainDiv">
        <button onClick={() => {
           async function getData(){
               const textArea = document.getElementById("textArea");
               let capturedString;

               try{
                   capturedString = await fetch("http://localhost:8080/api/HelloWorld")
                   .then(response => response.text())
                   .then((response) => {
                        console.log(response);
                        textArea.innerHTML = `<p>${response}</p>`
                    });
               } catch (error) {
                    console.log(error);
               }
           }
           getData();
        }}>
          click me!
        </button>
        <div id="textArea"></div>
      </div>
    </>
  )
}

export default App
