import React, { Component } from 'react';
const { useEffect } = React;
const { useState } = React;

const quotes = [
  'You badass!',
  'Hell yeah!',
  'Get it now!',
  'You\'re a monster!',
  'Yee-haw!',
  'Woo hoo!',
  'Giddy-up!',
  'Kill-er!',
];

function Table() {
  async function handleClick(e) {
    if (e.target.style.color !== 'red') {
      e.target.style.textDecoration = 'line-through';
      e.target.style.color = 'red';
      e.target.nextSibling.style.color = 'red';
      e.target.nextSibling.style.textDecoration = 'line-through';
    } else {
      const item = e.target.nextSibling.innerText;
      await fetch(`http://localhost:3000/api/delete/${item}`, {
        method: 'DELETE',
      })
        .then((data) => data.json())
        .then((data) => {
          setData([...data]);
          e.target.style.textDecoration = 'none';
          e.target.style.color = '#493548';
          e.target.nextSibling.style.color = '#493548';
          e.target.nextSibling.style.textDecoration = 'none';
          const random = Math.floor(Math.random() * quotes.length);
          let quote = quotes[random];
          const reward = (document.querySelector('.reward').innerHTML = quote);
          // e.target.nextSibling.style.fontSize = 'x-large';
          // e.target.nextSibling.innerText = quote;
          // const id = Number(e.target.id);
          setTimeout(() => {
            document.querySelector('.reward').innerText = '';
          }, 1500);
        });
    }
  }

  async function update() {
    const num = document.querySelector('#num').value;
    const newItem = document.querySelector('#update').value;
    document.querySelector('#num').value = '';
    document.querySelector('#update').value = '';
    const oldItem = document.getElementById(num).nextSibling.innerText;
    await fetch(`http://localhost:3000/api/update/${oldItem}/${newItem}`, {
      method: 'PUT',
      body: newItem,
      headers: {
        'Content-type': 'plain/text',
      },
    })
      .then((data) => data.json())
      .then((data) => setData([...data]))
      .catch((err) => console.log(err));
  }

  function undo(e) {
    e.target.style.textDecoration = 'none';
          e.target.style.color = '#493548';
          e.target.parentNode.firstChild.style.color = '#493548';
          e.target.parentNode.firstChild.style.textDecoration = 'none';
  }

  async function add() {
    const item = document.querySelector('#add').value;
    document.querySelector('#add').value = '';
    await fetch(`http://localhost:3000/api/submit/${item}`, {
      method: 'POST',
      body: item,
      headers: {
        'Content-type': 'plain/text',
      },
    })
      .then((data) => data.json())
      .then((data) => setData([...data]))
      .catch((err) => console.log(err));
  }

  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(
    () =>
      fetch('http://localhost:3000/api')
        .then((info) => info.json())
        .then((info) => {
          setData([...info]);
          setIsLoaded(true);
        })
        .catch((err) => console.log(err)),
    []
  );

  return (
    <div>
      <div id='addUpdate'>
        <div id='addDiv'>
          <label for='add'>Add a new item:</label>
          <input id='add'></input>
          <button id='addButton' onClick={add}>
            Add Item
          </button>
        </div>
        <div>
          <label for='update num'>Enter # to update & new item name:</label>
          <input id='num'></input>
          <input id='update'></input>
          <button id='updateButton' onClick={update}>
            Update item
          </button>
        </div>
      </div>
      <div className='Table'>
        <table>
          <tr>
            <th id='numHead'>#</th>
            <th>Your list:</th>
          </tr>
          {!isLoaded && <p>Loading...</p>}
          {isLoaded &&
            data.map((val, index) => {
              return (
                <tr key={index + 1}>
                  <button id={index + 1} onClick={(e) => handleClick(e)}>
                    {index + 1}
                  </button>
                  <td onClick={(e) => undo(e)} >{val.item}</td>
                </tr>
              );
            })}
        </table>
      </div>
      <h2 class='reward'></h2>
    </div>
  );
}

export default Table;
