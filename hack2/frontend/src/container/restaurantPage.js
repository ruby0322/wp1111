/****************************************************************************
  FileName      [ restaurantPage.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ Implement the restaurant page ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React, { useState, useEffect } from "react";
import "../css/restaurantPage.css";
import Information from "./information";
import Comment from "./comment";
import { useParams } from "react-router-dom";

import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:4000/api",
});

const RestaurantPage = () => {
  const { id } = useParams();
  const [info, setInfo] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const getInfo = async () => {
    // TODO Part III-2: get a restaurant's info
    const { data } = await instance.get("getInfo", { params: { id } });
    setInfo(data.contents);
  };
  const getComments = async () => {
    // TODO Part III-3: get a restaurant's comments
    const { data } = await instance.get("getCommentsByRestaurantId",
      { params: { restaurantId: id } }
    );
    setComments(data.contents);
  };
  useEffect(() => {
    if (Object.keys(info).length === 0) {
      getInfo();
      getComments();
    }
  }, []);

  useEffect(() => {
    // TODO Part III-3-c: update the comment display immediately after submission
    
  }, [comments]);

  /* V TODO Part III-2-b: calculate the average rating of the restaurant */

  const average = (arr) => {
    let s = 0;
    for (let i = 0; i < arr.length; ++i) 
      s += arr[i];
    return s / arr.length;
  };
  let rating = average(comments.map((c) => c.rating));

  return (
    <div className="restaurantPageContainer">
      {Object.keys(info).length === 0 ? (
        <></>
      ) : (
        <Information info={info} rating={rating} />
      )}
      <Comment
        restaurantId={id}
        comments={comments}
        setComments={setComments}
        setLoad={setLoading}
      />
    </div>
  );
};
export default RestaurantPage;
