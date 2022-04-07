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
      [e.target.name]: e.target.value
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
          <form className="form-horizental">
		        <label>Username</label>
            <input className="mb-3 form-control" type="text" name="username" data-testid="signIn-username" onChange={handleChange} />
   		      <label>Password</label>
            <input className="mb-3 form-control" type="password" name="password" data-testid="signIn-password" onChange={handleChange}/>
		        <button className="mb-3 btn-block" onClick={handleSignInSubmit}>Submit</button>
		      </form>
        </div>
      </div>
    </div>
  );
  
}

export default SignIn;