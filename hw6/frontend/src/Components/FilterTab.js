import { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "../api";
import styled from "styled-components";
import BasicTable from "./BasicTable";

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1em;
  gap: 1rem;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const FilterTab = (props) => {
  // const [queryType, setQueryType] = useState("name");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");

  const [cards, setCards] = useState([]);
  const [results, setResults] = useState([]);
        
  const handleNameChange = (event) => {
    handleQuery(event.target.value, subject);
    setName(event.target.value);
  };

  const handleSubjectChange = (event) => {
    handleQuery(name, event.target.value);
    setSubject(event.target.value);
  };
  
  const handleQuery = async (name, subject) => {
    let res = cards.filter(card => 
     (!name || card.name.includes(name)) && (!subject || card.subject.includes(subject))
    );
    setResults(res);
  };

  const fetchCards = async () => {
    const { data: { results: res } } = await axios.get("/");
    setCards(res.map((r, i) => {
      r.id = i;
      return r;
    }));
    setResults(res);
    console.log(res);
  };

  useEffect(() => {
    (async () => {
      await fetchCards();
    })();
  }, []);

  return (
    <Flex>
      <Row>
        <TextField
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          variant="standard"
          style={{ flex: 1 }}
        />
        <TextField
          placeholder="Subject"
          value={subject}
          variant="standard"
          onChange={handleSubjectChange}
          style={{ flex: 1 }}
        />
      </Row>
      {/* <div style={{ height: '250px', width: '100%' }}>
        <DataGrid
          rows={results}
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[100]}
        />
      </div> */}
      <BasicTable key={results} rows={results}></BasicTable>
    </Flex>
  );
};

export default FilterTab;
