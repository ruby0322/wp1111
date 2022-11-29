// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Info from "../models/info";

exports.GetSearch = async (req, res) => {
  /*******    NOTE: DO NOT MODIFY   *******/
  const priceFilter = req.query.priceFilter;
  const mealFilter = req.query.mealFilter;
  const typeFilter = req.query.typeFilter;
  const sortBy = req.query.sortBy;
  /****************************************/

  // NOTE Hint:
  // use `db.collection.find({condition}).exec(err, data) {...}`
  // When success,
  //   do `res.status(200).send({ message: 'success', contents: ... })`
  // When fail,
  //   do `res.status(403).send({ message: 'error', contents: ... })`

  // V TODO Part I-3-a: find the information to all restaurants
  // V TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter
  // V TODO Part II-2-b: revise the route so that the result is sorted by sortBy
  try {
    console.log(priceFilter, mealFilter, typeFilter, sortBy);
    let sort = {};
    sort[sortBy] = 1;
    let restaurants = await Info.find();

    if (priceFilter && priceFilter.length > 0) {
      restaurants = restaurants.filter(x => priceFilter.includes(`${x.price}`));
    }

    if (mealFilter && mealFilter.length > 0) {
      restaurants = restaurants.filter(x => {
        for (let i = 0; i < x.tag.length; ++i) {
          if (mealFilter.includes(x.tag[i]))
            return true;  
        }
        return false;
      });
    }
    
    if (typeFilter && typeFilter.length > 0) {
      restaurants = restaurants.filter(x => {
        for (let i = 0; i < x.tag.length; ++i) {
          if (typeFilter.includes(x.tag[i]))
            return true;
        }
        return false;
      })
    }

    restaurants.sort((a, b) => (a[sortBy]-b[sortBy]));

    res.status(200).send({
      message: 'success',
      contents: restaurants
    });
  } catch (e) {
    console.log(e);
    res.status(403).send({
      message: 'error',
      contents: []
    });
  }
};

exports.GetInfo = async (req, res) => {
  /*******    NOTE: DO NOT MODIFY   *******/
  const id = req.query.id;
  /****************************************/

  // NOTE USE THE FOLLOWING FORMAT. Send type should be
  // if success:
  // {
  //    message: 'success'
  //    contents: the data to be sent. Hint: A dictionary of the restaruant's information.
  // }
  // else:
  // {
  //    message: 'error'
  //    contents: []
  // }

  // TODO Part III-2: find the information to the restaurant with the id that the user requests
  try {
    const info = await Info.findOne({ id });
    res.status(200).send({
      message: 'success',
      contents: info
    });
    console.log('getInfo success, contents:', info);
  } catch (e) {
    res.status(403).send({
      message: 'error',
      contents: []
    });
  }
};
