import * as React from 'react';
import { updateShorthandPropertyAssignment } from 'typescript';

const initialFormData = Object.freeze({
  username: "",
  password: ""
});

function SignIn() {

  const [formData, updateFormData] = React.useState(initialFormData);
  
  function handleChange(e:any) {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  }

  function handleSignInSubmit(e:any) {
    e.preventDefault();
    console.log(formData)
  }

  return (
    <div className="SignIn">
      <div className="SignIn-Content">
        <h2>Sign In</h2>
        <div>
          <form>
		        <label>Username</label>
            <input type="text" name="username" data-testid="signIn-username" onChange={handleChange} />
   		      <label>Password</label>
            <input type="password" name="password" data-testid="signIn-password" onChange={handleChange}/>
		        <button onClick={handleSignInSubmit}>Submit</button>
            <button>Register</button>
		      </form>
        </div>
      </div>
    </div>
  );
  
}

export default SignIn;