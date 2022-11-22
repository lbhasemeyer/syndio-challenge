import React, {useState} from 'react';
import Parser from 'html-react-parser';
import { PropTypes } from "prop-types";
import './index.css';

function Home(props) {
    const [selectedTab, setSelectedTab] = useState('Gender');

    const errorDisplay = (props.error !== '') ? (<div data-testid="errorDisplay">Error: {props.error}</div>) : null;

    const loadedData = (selectedTab === 'Race') ? props?.pageData?.data?.race : props?.pageData?.data?.gender;
    const payEquityGapText = loadedData ? (`${loadedData.payEquityGap.data.minority.label} earn <strong>${loadedData.payEquityGap.data.minority.value}</strong> for every <strong>${loadedData.payEquityGap.data.majority.value}</strong> earned by comparable ${loadedData.payEquityGap.data.majority.label.toLowerCase()}`): '';
    const employeesComparison = loadedData ? (`${loadedData.employeeComparison.data.label} make up <strong>${loadedData.employeeComparison.data.value}</strong> of employees`): '';
    const budgetRequired = loadedData ? (`<strong>${loadedData.budget.data.value}</strong> minimum recommended budget to reduce pay equity gap`): '';
    const boxData = {'Pay Equity Gap': Parser(payEquityGapText), 'Employees in Comparison': Parser(employeesComparison), 'Budget': Parser(budgetRequired)};
    const boxes = [];
    for(const [key, value] of Object.entries(boxData)){
        boxes.push(
            <div key={key} className={'Home-box'} data-testid="dataBox">
                <div className='Home-box-label'>{key.toUpperCase()}</div>
                <div className='Home-box-data' data-testid="dataBoxValue">{value}</div>
            </div>
        );
    }

    const genderClassName = (selectedTab === 'Gender') ? 'Home-tab active' : 'Home-tab';
    const raceClassName = (selectedTab === 'Race') ? 'Home-tab active' : 'Home-tab';

    return (
        <div className='Home'>
            <div className='Home-tabs'>
                <div className={genderClassName} onClick={() => setSelectedTab('Gender')}>Gender</div>
                <div className={raceClassName} data-testid="raceTab" onClick={() => setSelectedTab('Race')}>Race</div>
            </div>
            {errorDisplay}
            <div className='Home-boxes'>
                {boxes}
            </div>
        </div>
    );
}

Home.propTypes = {
    error: PropTypes.string,
    pageData: PropTypes.object
}

export default Home;