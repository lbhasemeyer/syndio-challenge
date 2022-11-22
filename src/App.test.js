import React from 'react';
import App from './App';
import { groupByFunctionData, groupByLabelAndIdData, groupByRoleData } from './constants.js';
import { act, fireEvent, render, screen } from '@testing-library/react';

test("fetches data from 3 successful API calls on component load", async () => {
    const fakeResponse = [ groupByLabelAndIdData, groupByFunctionData, groupByRoleData ];

    const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
    global.fetch = mockedFetch;
    await act(() => {
      render(<App />);
    });
    expect(global.fetch).toHaveBeenCalledTimes(3);
    const dataBoxes = await screen.findAllByTestId('dataBox');
    expect(dataBoxes).toHaveLength(3);
});

test('returns an error from failed API call on component load', async () => {
    const fakeError = 'SyntaxError: Unexpected token, "Error: Una"... is not valid JSON';

    const mRes = { json: jest.fn().mockRejectedValueOnce(fakeError) };
    const mockedFetch = jest.fn().mockRejectedValueOnce(mRes);
    global.fetch = mockedFetch;
    await act(() => {
      render(<App />);
    });
    expect(global.fetch).toHaveBeenCalledTimes(3);
    const errorMessage = screen.getByTestId('errorDisplay');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent('There was an issue getting data - please refresh the page to try again.')
});