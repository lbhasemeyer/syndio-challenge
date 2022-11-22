import React from 'react';
import Home from './index';
// import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

const data = {
    data: {
        gender: {
            budget: {
                label: 'Budget',
                data: {
                    value: '$109,887'
                }
            },
            employeeComparison: {
                label: 'Employees in Comparison',
                data: {
                    label: 'Women',
                    value: '13.5%'
                }
            },
            payEquityGap: {
                label: 'Pay Equity Gap',
                data: {
                    majority: {
                        label: 'Men',
                        value: '$1'
                    },
                    minority: {
                        label: 'Women',
                        value: '89¢'
                    }
                }
            }
        },
        race: {
            budget: {
                label: 'Budget',
                data: {
                    value: '$345,001'
                }
            },
            employeeComparison: {
                label: 'Employees in Comparison',
                data: {
                    label: 'Hispanics',
                    value: '30%'
                }
            },
            payEquityGap: {
                label: 'Pay Equity Gap',
                data: {
                    majority: {
                        label: 'Whites',
                        value: '$1'
                    },
                    minority: {
                        label: 'Hispanics',
                        value: '87¢'
                    }
                }
            }
        },
        id: 'groupByFunction',
        label: 'Group by Function'
    }
};
const errorMsg = 'There was an issue getting data - please refresh the page to try again.';

test('renders tdata by Gender on initial load when pageData is passed in props', async () => {
  render(<Home pageData={data} error={''} />);
  const animalNames = await screen.findAllByTestId('dataBox');
  expect(animalNames).toHaveLength(3);
  const boxValues = await screen.findAllByTestId('dataBoxValue');
  expect(boxValues[0].textContent).toBe('Women earn 89¢ for every $1 earned by comparable men');
  expect(boxValues[1].textContent).toBe('Women make up 13.5% of employees');
  expect(boxValues[2].textContent).toBe('$109,887 minimum recommended budget to reduce pay equity gap');
});

test('renders error when API error is passed in props', () => {
  render(<Home pageData={{}} error={errorMsg} />);
  const errorMessage = screen.getByTestId('errorDisplay');
  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).toHaveTextContent(errorMsg);
});

test('renders data by Race when the Race tab is clicked', async() => {
    render(<Home pageData={data} error={''} />);
    const raceButton = screen.getByTestId('raceTab');
    fireEvent.click(raceButton);
    const boxValues = await screen.findAllByTestId('dataBoxValue');
    expect(boxValues[0].textContent).toBe('Hispanics earn 87¢ for every $1 earned by comparable whites');
    expect(boxValues[1].textContent).toBe('Hispanics make up 30% of employees');
    expect(boxValues[2].textContent).toBe('$345,001 minimum recommended budget to reduce pay equity gap');    
});