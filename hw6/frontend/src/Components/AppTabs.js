import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import FilterTab from './FilterTab';
import AddTab from './AddTab';
import DeleteTab from './DeleteTab';
import QueryTab from './QueryTab';

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = index => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AppTabs = () => {
  const [value, setValue] = useState(0);
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChangeTab} aria-label='basic tabs example'>
          {
            ['QUERY', 'FILTER', 'ADD/UPDATE', 'DELETE'].map((tab, idx) => (
              <Tab key={'tab'+idx} label={tab} {...a11yProps(idx)} />
            ))
          }
        </Tabs>
      </Box>
      {
        [<QueryTab />, <FilterTab />, <AddTab />, <DeleteTab />].map((tab, idx) => (
          <TabPanel key={'tabpanel'+idx} value={value} index={idx}>{tab}</TabPanel>
        ))
      }
    </Box>
  );
}

export default AppTabs;