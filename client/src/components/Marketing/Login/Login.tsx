import React from 'react';

import Section from 'components/Marketing/Section';

function Login() {
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputs: HTMLInputElement[] = Array.from(
      event.currentTarget.getElementsByTagName('input')
    );
    const formData = { email: '', password: '' };
    inputs.forEach((input) => {
      const { name, value } = input;
      (formData as any)[name] = value;
    });
    console.log(`email: ${formData.email}, password: ${formData.password}`);
  };

  return (
    <Section title="Log In" subtitle="Log in to get started with Horae">
      <div>
        <form onSubmit={handleFormSubmit}>
          <input type="email" name="email" placeholder="username" />
          <input type="password" name="password" placeholder="password" />
          <input type="submit" />
        </form>
      </div>
    </Section>
  );
}

export default Login;
