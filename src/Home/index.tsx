import React, {useState} from 'react';
import './index.css';

interface dataProps {
    data: {},
    id: string,
    label: string
}

function Home(props:any) {
    const [selectedTab, setSelectedTab] = useState('Gender');

    // I'm being passed data for the group.  Default tab is Gender - need to toggle tabs and toggle selectedTab to toggle data between tabs
    const errorDisplay = (props.error !== '') ? (<div>Error: {props.error}</div>) : null;

    // Need to bold the data points
    const loadedData = (selectedTab === 'Race') ? props?.pageData?.data?.race : props?.pageData?.data?.gender;
    const payEquityGapText = loadedData ? (`${loadedData.payEquityGap.data.minority.label} earn ${loadedData.payEquityGap.data.minority.value} for every ${loadedData.payEquityGap.data.majority.value} earned by comparable ${loadedData.payEquityGap.data.majority.label.toLowerCase()}`): null;
    const employeesComparison = loadedData ? (`${loadedData.employeeComparison.data.label} make up ${loadedData.employeeComparison.data.value} of employees`): null;
    const budgetRequired = loadedData ? (`${loadedData.budget.data.value} minimum recommended budget to reduce pay equity gap`): null;

    const boxData = {'Pay Equity Gap': payEquityGapText, 'Employees in Comparison': employeesComparison, 'Budget': budgetRequired};
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