import React from 'react';

export function AddUpdate({setData}){

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

  async function update() {
    const item = document.querySelector('#num');
    const num = document.querySelector('#num').value;
    if(document.getElementById(num).nextSibling.style.color === 'red') {
      document.getElementById(num).style.color = '#493548';
      document.getElementById(num).nextSibling.style.color = '#493548';
      document.getElementById(num).style.textDecoration = 'none';
      document.getElementById(num).nextSibling.style.textDecoration = 'none';
    }
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

  return (
<div id='addUpdate'>
        <div id='addDiv'>
          <label for='add'>Add a new item:</label>
          <input id='add'></input>
          <button id='addButton' onClick={add}>
            Add Item
          </button>
        </div>
        <div>
          <label for='num'>Enter #:</label>
          <input id='num'></input>
          <label class="update" for='update'>New item:</label>
          <input id='update'></input>
          <button id='updateButton' onClick={update}>
            Update item
          </button>
        </div>
      </div>
  )
}

export default AddUpdate;