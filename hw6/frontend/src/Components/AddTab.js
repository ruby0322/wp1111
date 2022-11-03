import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { useScoreCard } from "../hooks/useScoreCard";
import axios from "../api";
import styled from "styled-components";

const ContentPaper = styled(Paper)`
  height: 250px;
  width: 100%;
  padding: 2em;
  overflow: auto;
`;

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

const AddTab = (props) => {
  const { messages, addCardMessage, addErrorMessage, clearMessages } = useScoreCard();

  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState(0);

  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const handleAdd = async () => {
    const {
      data: { message, card },
    } = await axios.post('/', {
      name,
      subject,
      score,
    });

    if (!card) addErrorMessage(message);
    else addCardMessage(message);
  };

  return (
    <Flex>
      <Row>
        {/* Could use a form & a library for handling form data here such as Formik, but I don't really see the point... */}
        <TextField
          placeholder="Name"
          value={name}
          variant="standard"
          onChange={handleChange(setName)}
        />
        <TextField
          placeholder="Subject"
          style={{ width: 240 }}
          value={subject}
          variant="standard"
          onChange={handleChange(setSubject)}
        />
        <TextField
          placeholder="Score"
          value={score}
          variant="standard"
          onChange={handleChange(setScore)}
          type="number"
        />
        <Button
          variant="text"
          color="primary"
          disabled={!name || !subject}
          onClick={handleAdd}
        >
          Add
        </Button>
      </Row>
      <ContentPaper variant="outlined">
        {
          messages.map((m, i) => (
          <Typography variant="body2" key={m + i} style={{ color: m.color }}>
            {m.message}
          </Typography>
          ))
        }
      </ContentPaper>
    </Flex>
  );
};

export default AddTab;
