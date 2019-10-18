import React, { useState } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";


const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
 
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [create, setCreate] = useState({color:"", code:{}, id:""})





  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    console.log(color)
    console.log(color.id)
  };
  console.log(`colorToEdit`, colorToEdit)
  console.log(updateColors)





  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    // Make a put request to save your updated color
    .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit )
    // think about where will you get the id from...
    // where is is saved right now?
    .then(res => {
      console.log(`axios res.data`, res.data)
      updateColors([...colors, res.data])
    })
    window.location = "/bubblepage"
  };
  



  const deleteColor = color => {
    console.log(color)
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(res => console.log(res.data))
    .catch(err => console.log(err.response));
    window.location = "/bubblepage"
  };

// const createChanges = e => {
//   setCreate = ({...create, [e.target.name] : e.target.value })
// }

const addColor = e => {
  e.preventDefault();
  setCreate( 
    {
      color: "",
      code: "",
      id: Math.random()
    },
  )
  postColor()
}

const postColor = () => {
  console.log(create)
  axiosWithAuth()
  .post(`http://localhost:5000/api/colors`, create)
  .then(res => console.log(res.data))
  .catch(err => console.log(err))
  window.location = "/bubblepage"
}


  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={addColor}>
      <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setCreate({ ...create, color: e.target.value })
              }
              value={create.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setCreate({
                  ...create,
                  code: { hex: e.target.value }
                })
              }
              value={create.code.hex}
            />
          </label>

        <button onClick={addColor}>
            <h4>Add Color</h4>
        </button>

      </form>
    </div>
  );
};

export default ColorList;
