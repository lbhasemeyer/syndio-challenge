import React, {useState} from 'react';
import Parser from 'html-react-parser';
import './index.css';

function Home(props) {
    console.log(props)
    const [selectedTab, setSelectedTab] = useState('Gender');

    const errorDisplay = (props.error !== '') ? (<div data-testid="errorDisplay">Error: {props.error}</div>) : null;

    // Need to bold the data points
    const loadedData = (selectedTab === 'Race') ? props?.pageData?.data?.race : props?.pageData?.data?.gender;
    const payEquityGapText = loadedData ? (`${loadedData.payEquityGap.data.minority.label} earn <strong>${loadedData.payEquityGap.data.minority.value}</strong> for every <strong>${loadedData.payEquityGap.data.majority.value}</strong> earned by comparable ${loadedData.payEquityGap.data.majority.label.toLowerCase()}`): null;
    const employeesComparison = loadedData ? (`${loadedData.employeeComparison.data.label} make up <strong>${loadedData.employeeComparison.data.value}</strong> of employees`): null;
    const budgetRequired = loadedData ? (`<strong>${loadedData.budget.data.value}</strong> minimum recommended budget to reduce pay equity gap`): null;

    const boxData = {'Pay Equity Gap': Parser(payEquityGapText), 'Employees in Comparison': Parser(employeesComparison), 'Budget': Parser(budgetRequired)};
    const boxes: any[] = [];
    for(const [key, value] of Object.entries(boxData)){
        boxes.push(
            <div key={key} className={'Home-box'}>
                <div className='Home-box-label'>{key.toUpperCase()}</div>
                <div className='Home-box-data'>{value}</div>
            </div>
        );
    }

    // This could be better
    const genderClassName = (selectedTab === 'Gender') ? 'Home-tab active' : 'Home-tab';
    const raceClassName = (selectedTab === 'Race') ? 'Home-tab active' : 'Home-tab';

    return (
        <div className='Home'>
            <div className='Home-tabs'>
                {/* Can I populate these dynamically from the data? */}
                <div className={genderClassName} onClick={() => setSelectedTab('Gender')}>Gender</div>
                <div className={raceClassName} onClick={() => setSelectedTab('Race')}>Race</div>
            </div>
            {errorDisplay}
            <div className='Home-boxes'>
                {boxes}
            </div>
        </div>
    );
}

export default Home;