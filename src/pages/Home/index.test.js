import React from 'react';
import Home from './index';
// import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

// const data = {
//     data: {
//         gender: {
//             budget: {
//                 label: 'Budget',
//                 data: {
//                     value: '$109,887'
//                 }
//             },
//             employeeComparison: {
//                 label: 'Employees in Comparison',
//                 data: {
//                     label: 'Women',
//                     value: '13.5%'
//                 }
//             },
//             payEquityGap: {
//                 label: 'Pay Equity Gap',
//                 data: {
//                     majority: {
//                         label: 'Men',
//                         value: '$1'
//                     },
//                     minority: {
//                         label: 'Women',
//                         value: '89¢'
//                     }
//                 }
//             }
//         },
//         race: {
//             budget: {
//                 label: 'Budget',
//                 data: {
//                     value: '$345,001'
//                 }
//             },
//             employeeComparison: {
//                 label: 'Employees in Comparison',
//                 data: {
//                     label: 'Hispanics',
//                     value: '30%'
//                 }
//             },
//             payEquityGap: {
//                 label: 'Pay Equity Gap',
//                 data: {
//                     majority: {
//                         label: 'Whites',
//                         value: '$1'
//                     },
//                     minority: {
//                         label: 'Hispanics',
//                         value: '89¢'
//                     }
//                 }
//             }
//         },
//         id: 'groupByFunction',
//         label: 'Group by Function'
//     }
// };
const errorMsg = 'There was an issue getting data - please refresh the page to try again.';

// test('renders the gender data on initial load with pageData passed in props', async () => {
//   render(<Home pageData={data} error={''} />, {wrapper: MemoryRouter});
//   const animalsList = screen.getByTestId('animalsList');
//   expect(animalsList).toBeInTheDocument();
//   const animalNames = await screen.findAllByTestId('oneAnimalName');
//   expect(animalNames).toHaveLength(2);
// });

test('renders error when API call error is passed in props', () => {
  render(<Home pageData={[]} error={errorMsg} />);
  const errorMessage = screen.getByTestId('errorDisplay');
  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).toHaveTextContent(errorMsg);
});

//clicking other tab changes data