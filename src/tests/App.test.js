import {
  render,
  fireEvent,
  waitFor,
  getByText,
  screen,
} from '@testing-library/svelte';
import App from '../App.svelte';

describe('App Component Test', () => {
  test('check if component have text header', () => {
    render(App);

    const header = screen.getByText(/Empty project in Svelte!/i);
    expect(header).toBeTruthy();
  });

  test('check if component accept prop', () => {
    render(App, { prop: 2 });
    const header = screen.getByText(/Empty project in Svelte! 2/i);

    expect(header).toBeTruthy();
  });

  it('checks if counter works', async () => {
    render(App);

    const counter = screen.getByText(/Counter:0/i);
    expect(counter).toBeInTheDocument();

    const button = screen.getByText(/Click/i);
    expect(button).toBeInTheDocument();

    await fireEvent.click(button);
    expect(counter).toHaveTextContent(/Counter:1/i);

    await fireEvent.click(button);
    await fireEvent.click(button);

    expect(counter).toHaveTextContent(`Counter:3`);
  });
});
