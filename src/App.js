import React, {useState, useEffect} from 'react';
import Home from './pages/Home/index';
import syndioLogo from './assets/syndioLogo.svg';
// import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  const [groupByFunction, setGroupByFunction] = useState({});
  const [groupByRole, setGroupByRole] = useState({});
  const [getDataError, setGetDataError] = useState('');
  const [dropdownGroup, setDropdownGroup] = useState('');
  const [dropdownFocused, setDropdownFocused] = useState(false);

  useEffect(() => {
    Promise.all([
      // Get `Group Names & IDs` (for header dropdown)
      fetch('https://run.mocky.io/v3/9e343425-c47c-4c7f-a1ac-972c099be0ed'),
      // Get `Group by Function` (for page content)
      fetch('https://run.mocky.io/v3/a9f6a4b7-d03c-4a45-b64b-791e054f36b8'),
      // Get `Group by Role` (for page content)
      fetch('https://run.mocky.io/v3/f1b01b57-3147-476a-a632-0c10ad2a3c1a'),
    ]).then(function(responses) {
      return Promise.all(responses.map(function (response) {
        return response.json();
      }));
    }).then(function(data) {
      data.forEach((apiRes, index) => {
        if(index === 0){
          //initially set dropdown group to first option
          setDropdownGroup(apiRes[0]);
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

  const dataForPage = (dropdownGroup.id === 'a9f6a4b7-d03c-4a45-b64b-791e054f36b8') ? groupByFunction : groupByRole;
  // laura, need to use this
  const dropdownButtonClass = (dropdownFocused ? 'drop-wrapper active' : 'drop-wrapper');
  const dropdown = (
    <label className={dropdownButtonClass} onClick={() => setDropdownFocused(true)} onBlur={() => setDropdownFocused(false)}>
      <select className='drop-menu' value={dropdownGroup.label} id='dropdown' onChange={e => setDropdownGroup(e.target.value)}>
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
    <React.Fragment>
      {header}
      <Home pageData={dataForPage} error={getDataError} />
    </ React.Fragment>
  )
}

export default App;
