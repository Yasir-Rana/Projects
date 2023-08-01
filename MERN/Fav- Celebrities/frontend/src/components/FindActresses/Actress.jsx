import React, { useEffect, useState } from "react";
import ReactSwitch from "react-switch";
import DisplayActress from "../DisplayActresses/DisplayActress";
import "./Actress.css";
import axios from "axios";

const Actress = () => {
  const [actressesData, setActressesData] = useState([]);
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("black");

  const categories = [
    { value: "Choose Category" },
    { value: "Pakistani" },
    { value: "Punjabi" },
    { value: "Bollywood" },
    { value: "Hollywood" },
    { value: "Turkish" },
    { value: "My Favourite" },
  ];

  useEffect(() => {
    const fetchData = () => {
      axios.get("http://127.0.0.1:3000/api/celebrity").then((res) => {
          setActressesData(res.data);
          setLoading(false);
        }).catch((ex) => {
          alert(`Error in Fetching Data ${ex}`);
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  // Filtering Actresses on the Basis of Category and Name :: .includes
  const filteredActresses = actressesData.filter((actress) => {
    if (category === "Choose Category") {
      return actress.name.toLowerCase().startsWith(searchTerm.toLowerCase());
    } else {
      return (
        actress.category.includes(category) &&
        actress.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
    }
  });

  // Changing the Theme
  const toggleTheme = () => {
    const newColor = color === "black" ? "#E5E0DE" : "black";
    setColor(newColor);
    document.querySelector(":root").style.backgroundColor = newColor;
    document.querySelector(":root").style.color = color;
    document.querySelector('input[type="text"]').style.color = color;
  };

  const handleInputSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectCategory = (e) => {
    setCategory(e.target.value);
  };

  return (
    <>
      <div className='switch-wrapper'><ReactSwitch onChange={toggleTheme} checked={color === "black"} /></div>
      <h1>My Favourite Actresses</h1>
      <select name='actresses' onChange={handleSelectCategory}>
        {categories.map((item, index) => (<option value={item.value} key={index}>{item.value}</option>))}
      </select>
      <input type='text' placeholder='Search Your Actress' onChange={handleInputSearch} />

      {/* DisplayActresses  */}
      <DisplayActress actresses={filteredActresses} loading={loading} />
    </>
  );
};

export default Actress;
