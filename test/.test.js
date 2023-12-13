import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ToDo from '../src/components/ToDo.jsx';
import axios from 'axios';

jest.mock('axios');

describe('ToDo Component', () => {
  const mockSetUpdateUI = jest.fn();
  const mockSetShowPopup = jest.fn();
  const mockSetPopupContent = jest.fn();
  const toDoProps = {
    text: 'Test ToDo',
    id: '1',
    setUpdateUI: mockSetUpdateUI,
    setShowPopup: mockSetShowPopup,
    setPopupContent: mockSetPopupContent,
  };

  it('renders ToDo text', () => {
    const { getByText } = render(<ToDo {...toDoProps} />);
    expect(getByText('Test ToDo')).toBeInTheDocument();
  });

  it('calls deleteTodo function on delete icon click', async () => {
    axios.delete.mockResolvedValue({ data: 'Deleted' });
    
    const { getByTestId } = render(<ToDo {...toDoProps} />);
    const deleteButton = getByTestId('delete-todo');

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(`${baseURL}/delete/1`);
      expect(mockSetUpdateUI).toHaveBeenCalled();
    });
  });

  it('calls updateToDo function on edit icon click', () => {
    const { getByTestId } = render(<ToDo {...toDoProps} />);
    const editButton = getByTestId('edit-todo');

    fireEvent.click(editButton);

    expect(mockSetPopupContent).toHaveBeenCalledWith({ text: 'Test ToDo', id: '1' });
    expect(mockSetShowPopup).toHaveBeenCalledWith(true);
  });
});

export default api