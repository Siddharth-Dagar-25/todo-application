import React from 'react';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import App from './App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Mocking modules
jest.mock('axios');
jest.mock('./components/UserContext.jsx', () => ({
  useUser: () => ({ isLoggedIn: true, setIsLoggedIn: jest.fn() }),
}));

describe('App Component', () => {
  // Example test for initial render and API call
  it('fetches to-dos on initial render', async () => {
    const mockToDos = [{ _id: '1', toDo: 'Test ToDo' }];
    axios.get.mockResolvedValueOnce({ data: mockToDos });

    render(<App />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(`${baseURL}/get`);
    });
  });

  // Test for adding a to-do
  it('allows the user to add a to-do', () => {
    axios.post.mockResolvedValueOnce({ data: 'ToDo Added' });
    render(<App />);

    const inputElement = screen.getByPlaceholderText('Add ToDo...');
    const addButton = screen.getByText('Add');

    fireEvent.change(inputElement, { target: { value: 'New ToDo' } });
    fireEvent.click(addButton);

    expect(axios.post).toHaveBeenCalledWith(`${baseURL}/save`, { toDo: 'New ToDo' });

  });

});
