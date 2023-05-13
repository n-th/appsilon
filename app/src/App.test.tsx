import { render, screen } from '@testing-library/react';
import App from './App';

test('renders appsilon', () => {
  render(<App />);
  const linkElement = screen.getByText(/appsilon/i);
  expect(linkElement).toBeInTheDocument();
});
