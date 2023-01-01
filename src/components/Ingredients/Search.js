import React, { useState, useEffect } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState("");

  useEffect(() => {
    const query = enteredFilter.length === 0 ? "" : enteredFilter;
    console.log("query");
    console.log(query);
    fetch(`http://172.20.10.2:8088/ingredienst/api/v1/${query}`)
      .then((response) => response.json())
      .then((responseData) => {
        const loadedIngredients = [];
        const data = responseData.data;

        for (const key in data) {
          loadedIngredients.push({
            id: key,
            title: data[key].title,
            amount: data[key].amount,
          });
        }
        console.log("here we are");
        console.log(loadedIngredients);
        onLoadIngredients(loadedIngredients);
      });
  }, [enteredFilter, onLoadIngredients]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
