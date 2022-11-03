import Button from "@material-ui/core/Button";
import { useScoreCard } from "../hooks/useScoreCard";
import axios from "../api";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

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

const DeleteTab = (props) => {
  const { clearMessages } = useScoreCard();

  const handleClear = async () => {
    const {
      data: { message },
    } = await axios.delete('/');
    clearMessages(message);
  };
    
  return (
    <Flex>
      <Row>
        <Typography color='error' fontWeight='bold'>
          [Dangerous]
        </Typography>      
      </Row>
      <Row>
        <Button variant="text" color="error" onClick={handleClear}>
          Clear
        </Button>
      </Row>
    </Flex>
  );
};

export default DeleteTab;
