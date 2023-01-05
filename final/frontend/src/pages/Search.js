import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
//import { Checkbox, Layout, Tabs, Button, Input} from 'antd'
import { AutoCenter, Button, Selector, SearchBar, List } from 'antd-mobile'
import PostReel from '../components/PostReel';
import { useFetch } from '../hooks/FetchContext';

//const { Search } = Input;

const SearchPage = () => {

    const [filterVal, setFilterVal] = useState("");
    const [smallFilterVal, setSmallFilterVal] = useState("");
    const [keyword, setKeyword] = useState("");

    const [posts, setPosts] = useState([]);

    const { getPostsWithKeywords, getPostsWithFilter, getPosts } = useFetch();
  
    const queryPost = (filterVal, smallFilterVal, keyword) => {
      return [1, 2];
    }
  
    const queryPostsByKeyword = (keyword) => {
      //console.log(keyword)
      return getPostsWithKeywords(keyword);
      //return [1];
    }

    const queryPostsByFilter = (filterVal, smallFilterVal) => {
      if(filterVal === "" && smallFilterVal === ""){
        return getPosts(1);
      }else if(smallFilterVal !== ""){
        return getPostsWithFilter(smallFilterVal);
      }else if(filterVal !== ""){
        console.log(getPostsWithFilter(filterVal))
        return getPostsWithFilter(filterVal);
      }else{
        return [];
      }
      //return getPosts(1);
    }

    const onChange = (value) => setKeyword(value);
    const onSearch = () => {
      // fetch results
      const results = queryPostsByKeyword(keyword);
      setPosts(results);
    }

    const filters = [{label:"吃飯", value:"吃飯"}, {label:"運動", value:"運動"}, {label:"讀書", value:"讀書"}, {label:"遊戲", value:"遊戲"}];

    const smallFilters = {
      "吃飯": [{label:"早餐", value:"早餐"}, {label:"午餐", value:"午餐"}, {label:"晚餐", value:"晚餐"}],
      "運動": [{label:"籃球", value:"籃球"}, {label:"羽球", value:"羽球"}, {label:"排球", value:"排球"}, {label:"棒球", value:"棒球"}],
      "讀書": [],
      "遊戲": [],
    }

    // useEffect(() => {
    //   console.log(filterVal, smallFilterVal)
    //   setPosts(queryPostsByFilter(filterVal, smallFilterVal));
    // }, [setFilterVal, setSmallFilterVal])

    return (
        <div>
          {/* <Search
            placeholder="搜尋揪卡"
            allowClear
            enterButton="搜尋"
            size="large"
            onSearch={onSearch}
            onChange={onChange}
          /> */}
            <div style={{width: '94%', padding: '3%'}}>
              <SearchBar
                placeholder='搜尋揪卡'
                onSearch={onSearch}
                onChange={onChange}
                />
        </div>
        <List header='活動類別'>
          <List.Item>
          <Selector
              options={filters}
              columns={2}
              onChange={(arr, extend) => {
                if(arr.length === 0){
                  setPosts(queryPostsByFilter("", ""));
                  setFilterVal("");
                }else{
                  setPosts(queryPostsByFilter(arr[0], ""));
                  setFilterVal(arr[0]);
                }
                
                // arr.length === 0 ? setFilterVal("") : setFilterVal(arr[0])
              }}
              style={{
                '--border-radius': '100px',
                '--border': 'solid transparent 1px',
                '--checked-border': 'solid var(--adm-color-primary) 1px',
                '--padding': '8px 24px',
              }}
              showCheckMark={false}
            />
          </List.Item>
        </List>
        {
          filterVal ?
            <List header='活動項目'>
              <List.Item>
                <Selector
                  columns={4}
                  options={smallFilters[filterVal]}
                  onChange={(arr, extend) => {
                    if(arr.length === 0){
                      setPosts(queryPostsByFilter(filterVal, ""));
                    }else{
                      setPosts(queryPostsByFilter("", arr[0]));
                    }
                    
                    // arr.length === 0 ? setFilterVal("") : setFilterVal(arr[0])
                  }}
                  style={{
                    '--border-radius': '100px',
                    '--border': 'solid transparent 1px',
                    '--checked-border': 'solid var(--adm-color-primary) 1px',
                    '--padding': '8px 24px',
                    marginBottom: '.5rem',
                  }}
                  showCheckMark={false}
                /> 
              </List.Item>
              {/* arr: the value of filter selected */}
            </List>
            :
              <></>
          }

          <div className='result'>
            <PostReel posts={posts} />
          </div>
        </div>
    )
}

export default SearchPage;