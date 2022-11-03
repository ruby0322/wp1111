import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import axios from '../api';
import BasicTable from './BasicTable';

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1em;
  gap: 1rem;
`;

const ContentPaper = styled(Paper)`
  height: 250px;
  width: 100%;
  overflow: auto;
`;

const QueryTab = () => {
  const [cards, setCards] = useState([]);
  const [results, setResults] = useState([]);

  const [queryType, setQueryType] = useState('name');
  const [queryString, setQueryString] = useState('');

  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const handleQuery = async () => {
    setResults(cards.filter(res => res[queryType] === queryString))
  };

  const fetchCards = async () => {
    const { data: { results: res } } = await axios.get("/");
    setCards(res);
    setResults(res);
    console.log(res);
  };

  useEffect(() => {
    (async () => {
      await fetchCards();
    })();
  }, []);

  return (
    <Box>
      <Row>
        <FormControl component="fieldset">
        <RadioGroup
            row
            value={queryType}
            onChange={handleChange(setQueryType)}
        >
            <FormControlLabel
            value="name"
            control={<Radio color="default" />}
            label="Name"
            />
            <FormControlLabel
            value="subject"
            control={<Radio color="default" />}
            label="Subject"
            />
        </RadioGroup>
        </FormControl>
        <TextField
          placeholder="Query String"
          value={queryString}
          variant="standard"
          onChange={handleChange(setQueryString)}
          style={{ flex: 1 }}
        />
        <Button
          variant="text"
          color="primary"
          disabled={!queryString}
          onClick={handleQuery}
        >
          Query
        </Button>
      </Row>
      <BasicTable key={results} rows={results} />
    </Box>
  );
};

export default QueryTab;
