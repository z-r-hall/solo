import React, { Component } from 'react';

//would i pull this info from the back-end?
const data = [
  { num: 1, item: 'Laundry' },
  { num: 2, item: 'Dishes' },
  { num: 3, item: 'Buy Advil' },
];

const quotes = ['You bad!', 'Hell yeah!', 'Get it now!', 'You monster!', 'Yee-haw!', 'Grab a cold one!', 'Giddy-up!']

function Table() {
  function handleClick(e) {
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
      //insert api here for inspirational quotes?
      const random = Math.floor(Math.random() * quotes.length);
      let quote = quotes[random];
      e.target.nextSibling.innerText = quote;
      const id = Number(e.target.id);
      setTimeout(() => {
        document.getElementById(id).parentNode.innerText = '';
      }, 1000);
    }
  }
  return (
    <div className='Table'>
      <table>
        <tr>
          <th>#</th>
          <th>Item</th>
        </tr>
        {data.map((val, index) => {
          return (
            <tr key={val}>
              <button id={index} onClick={(e) => handleClick(e)}>
                {val.num}
              </button>
              <td>{val.item}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default Table;
