import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';


test("fetches all data from successful API call on component load", async () => {

});

// passes correct data from dropdown


// import React from 'react';
// import App from './App';
// import { MemoryRouter } from 'react-router-dom';
// import { act, render, screen } from '@testing-library/react';

// test("fetches animals data from successful API call on component load", async () => {
//     const fakeResponse = [ { id: 12, name: 'Sparklemuffin' }, { id: 201, name: 'Strange-tailed Tyrant' } ];

//     const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
//     const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
//     global.fetch = mockedFetch;
//     await act(() => {
//       render(<App />, {wrapper: MemoryRouter});
//     });
//     expect(global.fetch).toHaveBeenCalledTimes(1);
//     const animalsList = screen.getByTestId('animalsList');
//     expect(animalsList).toBeInTheDocument();
//     const animalNames = await screen.findAllByTestId('oneAnimalName');
//     expect(animalNames).toHaveLength(2);
// });

// test("returns an error from failed API call on component load", async () => {
//   const fakeError = 'SyntaxError: Unexpected token, "Error: Una"... is not valid JSON';

//   const mRes = { json: jest.fn().mockRejectedValueOnce(fakeError) };
//   const mockedFetch = jest.fn().mockRejectedValueOnce(mRes);
//   global.fetch = mockedFetch;
//   await act(() => {
//     render(<App />, {wrapper: MemoryRouter});
//   });
//   expect(global.fetch).toHaveBeenCalledTimes(1);
//   const errorMessage = screen.getByTestId('animalsError');
//   expect(errorMessage).toBeInTheDocument();
//   expect(errorMessage).toHaveTextContent('Something went wrong while herding the animals - please refresh page to try again.')
// });