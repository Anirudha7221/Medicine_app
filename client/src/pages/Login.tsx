import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css?v=1'; 

const Login: React.FC = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const history = useHistory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    history.push('/admin');
  };

 return(
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <label className="login-label">Email:</label>
            <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="login-input" />
          </div>  
          <div>
            <label className="login-label">Password:</label>
            <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="login-input" />
          </div>
          <button type="submit" className="login-button">Submit</button>
        </form>
      </div>
    );
};

export default Login;