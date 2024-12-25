import React, { useState } from "react";

const AddList = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false); 
  const [editIndex, setEditIndex] = useState(null); 

  const handleAddToList = () => {
    if (isEditing) {
        const updatedList = [...list];
        updatedList[editIndex].text = inputValue;
        setList(updatedList);
        setIsEditing(false);
        setEditIndex(null);
      } else {
     
        setList([...list, { text: inputValue, isStriked: false }]);
      }
      setInputValue(""); 
  };

  const handleEdit = (index,e) => {
    e.stopPropagation();
    setInputValue(list[index].text); 
    setIsEditing(true); 
    setEditIndex(index); 
  };


  const handleDelete = (index,e) => {
    e.stopPropagation();
    setList(list.filter((_, i) => i !== index));
   //setList(updatedList);
  };


  const toggleStrike = (index) => {
    const updatedList = [...list];
    updatedList[index].isStriked = !updatedList[index].isStriked;
    setList(updatedList);
  };


  const filteredList = list.filter((item) =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter text here"

      />
       <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search items"
        />

       <button onClick={handleAddToList}>
          {isEditing ? "Edit" : "Add"}
        </button>

      <ul>
      {filteredList.map((item, index) => (
          <li
          key={index}
          onClick={() => toggleStrike(index)}
          style={{
            textDecoration: item.isStriked ? "line-through" : "none",
            textUnderlinePosition: item.isStriked ? "under" : "none",
            cursor: "pointer",
          }}
        >

              <span>{item.text}</span>&nbsp;&nbsp;
              <button onClick={(e) => handleEdit(index,e)}>Edit</button>
              <button onClick={(e) => handleDelete(index,e)}>Delete</button>
              
          </li>
        ))}
      </ul>

    </div>
  );
};

export default AddList;
