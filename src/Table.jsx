import React, { Component } from 'react';
const { useEffect } = React;
const { useState } = React;

const quotes = [
  'You bad!',
  'Hell yeah!',
  'Get it now!',
  'You monster!',
  'Yee-haw!',
  'Grab a cold one!',
  'Giddy-up!',
];

function Table() {

  async function handleClick(e) {
    if (e.target.style.color !== 'red') {
      e.target.style.textDecoration = 'line-through';
      e.target.style.color = 'red';
      e.target.nextSibling.style.color = 'red';
      e.target.nextSibling.style.textDecoration = 'line-through';
    } else {
      //delete the button and the list item
      e.target.style.textDecoration = 'none';
      e.target.style.color = 'green';
      e.target.nextSibling.style.color = 'green';
      e.target.nextSibling.style.textDecoration = 'none';
      const random = Math.floor(Math.random() * quotes.length);
      let quote = quotes[random];
      e.target.nextSibling.style.fontSize = 'x-large';
      const item = e.target.nextSibling.innerText;
      e.target.nextSibling.innerText = quote;
      const id = Number(e.target.id);
      setTimeout(() => {
        document.getElementById(id).parentNode.innerText = '';
      }, 1000)
      await fetch(`http://localhost:3000/api/delete/${item}`, {
        method: 'DELETE',
      })
    }
  }

  async function add() {
    const item = document.querySelector('#add').value;
    document.querySelector('#add').value = '';
    await fetch('http://localhost:3000/api/submit', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    })
    .then(data => data.json())
    .then(data => setData([...data]))
    .catch(err => console.log(err))
  }

  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() =>
    fetch('http://localhost:3000/api').then((info) => info.json())
    .then((info) => {
      setData([...info])
      setIsLoaded(true)
    }).catch((err) => console.log(err)),[]);

  return (
    <div>
      <div id='addUpdate'>
        <div id='addDiv'>
          <label for='add'>Add a new item:</label>
          <input id='add'></input>
          <button id='addButton' onClick={add} >Add Item</button>
        </div>
        <div>
          <label for='update'>Update an item:</label>
          <input id='update'></input>
          <button id='updateButton'>Update item</button>
        </div>
      </div>
      <div className='Table'>
        <table>
          <tr>
            <th>#</th>
            <th>Item</th>
          </tr>
          {!isLoaded && <p>Loading...</p>}
          {isLoaded && data.map((val, index) => {
            return (
              <tr key={index}>
                <button id={index} onClick={(e) => handleClick(e)}>
                  {index + 1}
                </button>
                <td>{val.item}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default Table;
