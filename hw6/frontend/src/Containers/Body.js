import styled from 'styled-components';
import AppTabs from '../Components/AppTabs';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Body = () => {
  return (
    <Wrapper>
      <AppTabs>
      </AppTabs>
    </Wrapper>
  );
};

export default Body;
