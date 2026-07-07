import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders to-do heading', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /to-do/i })).toBeInTheDocument();
});

test('adds a task and shows it in the list', async () => {
  render(<App />);

  await userEvent.type(screen.getByPlaceholderText(/add a task/i), 'Buy milk');
  await userEvent.click(screen.getByRole('button', { name: /^add$/i }));

  expect(screen.getByText('Buy milk')).toBeInTheDocument();
});

test('logs the bigger boat message when the button is clicked', async () => {
  const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  render(<App />);
  await userEvent.click(screen.getByRole('button', { name: /bigger boat/i }));

  expect(logSpy).toHaveBeenCalledWith("You're gonna need a bigger boat.");

  logSpy.mockRestore();
});
