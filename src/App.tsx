import React, {useState, useEffect} from 'react';
import Home from './Home/index';
import chevron from './assets/chevron.svg';
import syndioLogo from './assets/syndioLogo.svg';
// import { Routes, Route } from 'react-router-dom';
import './App.css';

function groupButtonClicked() {
  const btn = document.querySelector('.App-group-picker');
  const dropMenu = document.querySelector('.drop-menu');
  btn?.classList.add('active');
  console.log('btn: ', btn)
  // btn.addEventListena.log('clicked!')
}

function App() {
  const [groupByNamesIds, setGroupByNamesIds] = useState<any[]>([]);
  const [groupByFunction, setGroupByFunction] = useState<any[]>([]);
  const [groupByRole, setGroupByRole] = useState('');
  const [getDataError, setGetDataError] = useState('');
  const [dropdownGroup, setDropdownGroup] = useState('');

  useEffect(() => {
    Promise.all([
      fetch('https://run.mocky.io/v3/9e343425-c47c-4c7f-a1ac-972c099be0ed'),  // ○ Get `Group Names & IDs` (for header dropdown):
      fetch('https://run.mocky.io/v3/a9f6a4b7-d03c-4a45-b64b-791e054f36b8'),  // ○ Get `Group by Function` (for page content):
      fetch('https://run.mocky.io/v3/f1b01b57-3147-476a-a632-0c10ad2a3c1a'),  // ○ Get `Group by Role` (for page content):
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
          console.log('??', apiRes)
          setGroupByRole(apiRes);
        }
      });
    }).catch(function(error) {
      setGetDataError('There was an issue getting data - please refresh the page to try again.')
    });
  }, []);

console.log('!!!', groupByRole);
  // WOULD BE BETTER TO CHECK ID OR NOT SET A CONST
  const dataForPage = (dropdownGroup === 'Group by Function') ? groupByFunction : groupByRole;
  const dropdown = (
    <div className='drop-wrapper'>
      <button className='App-group-picker' data-target='#dropdown' onClick={groupButtonClicked}>
        {dropdownGroup}
        <img src={chevron} height={15} alt='Down chevron' />
      </button>
      <div className='drop-menu dropdown' id='dropdown'>
        <span onClick={() => setDropdownGroup('Group by Function')}>Group by Function</span>
        <span onClick={() => setDropdownGroup('Group by Role')}>Group by Role</span>
      </div>
    </div>
  );

  const header =
    <div className='App-header'>
      <img className={'App-syndio-logo'} src={syndioLogo} height={30} alt='Syndio logo' />
      {/* this needs an active state */}
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
