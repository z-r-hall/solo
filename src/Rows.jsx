import React from 'react';
import { useEffect, useState } from 'react';
import { quotes, Rewards } from './Rewards.jsx';

export function Rows({ data, setData }) {
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

  async function deleteItem(e) {
    if (e.target.style.color !== 'red') {
      e.target.style.textDecoration = 'line-through';
      e.target.style.color = 'red';
      e.target.nextSibling.style.color = 'red';
      e.target.nextSibling.style.textDecoration = 'line-through';
    } else {
      if (
        e.target.parentNode.nextSibling.firstChild !== null &&
        e.target.parentNode.nextSibling.firstChild.style.color !== 'red'
      ) {
        e.target.style.color = '#493548';
        e.target.style.textDecoration = 'none';
        e.target.nextSibling.style.color = '#493548';
        e.target.nextSibling.style.textDecoration = 'none';
      }
      const item = e.target.nextSibling.innerText;
      await fetch(`http://localhost:3000/api/delete/${item}`, {
        method: 'DELETE',
      })
        .then((data) => data.json())
        .then((data) => {
          setData([...data]);
          const random = Math.floor(Math.random() * quotes.length);
          let quote = quotes[random];
          document.querySelector('.reward').innerHTML = quote;
          setTimeout(() => {
            document.querySelector('.reward').innerText = '';
          }, 1500);
        });
    }
  }

  function undo(e) {
    e.target.style.textDecoration = 'none';
    e.target.style.color = '#493548';
    e.target.parentNode.firstChild.style.color = '#493548';
    e.target.parentNode.firstChild.style.textDecoration = 'none';
  }

  return (
    <div>
      <tr>
        <th>#</th>
        <th>Your list:</th>
      </tr>
      {!isLoaded && <p>Loading...</p>}
      {isLoaded &&
        data.map((val, index) => {
          return (
            <tr key={index + 1}>
              <button id={index + 1} onClick={(e) => deleteItem(e)}>
                {index + 1}
              </button>
              <td onClick={(e) => undo(e)}>{val.item}</td>
            </tr>
          );
        })}
      <Rewards />
    </div>
  );
}

export default Rows;
