import { render, screen, fireEvent } from '@testing-library/react';
import { withWrappers } from '@/lib/testing/utils.tsx';
import LoginForm from '../login-form.tsx';

describe('<LoginForm />', () => {
  it('should render the login form with username and password fields', () => {
    render(withWrappers(<LoginForm />));

    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  it('should allow the user to type in username and password fields', () => {
    render(withWrappers(<LoginForm />));

    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    fireEvent.change(usernameInput, { target: { value: 'user123' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(usernameInput).toHaveValue('user123');
    expect(passwordInput).toHaveValue('password123');
  });

  it('should show error message if fields are empty on submit', () => {
    render(withWrappers(<LoginForm />));

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText(/fill the username/i)).toBeInTheDocument();
    expect(screen.getByText(/fill the password/i)).toBeInTheDocument();
  });

  it('should not show error messages if fields are filled on submit', () => {
    render(withWrappers(<LoginForm />));

    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    fireEvent.change(usernameInput, { target: { value: 'user123' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.queryByText(/fill the username/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/fill the password/i)).not.toBeInTheDocument();
  });
});
