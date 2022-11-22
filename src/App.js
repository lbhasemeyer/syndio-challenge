import React, {useState, useEffect} from 'react';
import Home from './pages/Home/index';
import syndioLogo from './assets/syndioLogo.svg';
// import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  const [groupByNamesIds, setGroupByNamesIds] = useState([]);
  const [groupByFunction, setGroupByFunction] = useState({});
  const [groupByRole, setGroupByRole] = useState({});
  const [getDataError, setGetDataError] = useState('');
  const [dropdownGroup, setDropdownGroup] = useState('');
  const [dropdownFocused, setDropdownFocused] = useState(false);

  // Get data
  useEffect(() => {
    Promise.all([
      fetch('https://run.mocky.io/v3/9e343425-c47c-4c7f-a1ac-972c099be0ed'),  // Get `Group Names & IDs` (for header dropdown):
      fetch('https://run.mocky.io/v3/a9f6a4b7-d03c-4a45-b64b-791e054f36b8'),  // Get `Group by Function` (for page content):
      fetch('https://run.mocky.io/v3/f1b01b57-3147-476a-a632-0c10ad2a3c1a'),  // Get `Group by Role` (for page content):
    ]).then(function(responses) {
      return Promise.all(responses.map(function (response) {
        return response.json();
      }));
    }).then(function(data) {
      data.forEach((apiRes, index) => {
        if(index === 0){
          setGroupByNamesIds(apiRes);
          setDropdownGroup(apiRes[0].label);
        } else if(index === 1){
          setGroupByFunction(apiRes);
        } else {
          setGroupByRole(apiRes);
        }
      });
    }).catch(function(error) {
      setGetDataError('There was an issue getting data - please refresh the page to try again.')
    });
  }, []);

  // WOULD BE BETTER TO CHECK ID OR NOT SET A CONST
  const dataForPage = (dropdownGroup === 'Group by Function') ? groupByFunction : groupByRole;
  const dropdownButtonClass = (dropdownFocused ? 'App-group-picker active' : 'App-group-picker');
  const dropdown = (
    <label className='drop-wrapper'>
      <select className='drop-menu' value={dropdownGroup} id='dropdown' onChange={e => setDropdownGroup(e.target.value)}>
        <option value='Group by Function'>Group by Function</option>
        <option value='Group by Role'>Group by Role</option>
      </select>
    </label>
  );

  const header =
    <div className='App-header'>
      <img className={'App-syndio-logo'} src={syndioLogo} height={30} alt='Syndio logo' />
      {dropdown}
    </div>

  return (
    <>
      {header}
      <Home pageData={dataForPage} error={getDataError} />
    </ >
  )
}

export default App;
