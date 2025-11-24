import React, { useState, useRef } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', passwordRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '10px', border: '1px solid #ccc', margin: '10px' }}>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            ref={passwordRef}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;
