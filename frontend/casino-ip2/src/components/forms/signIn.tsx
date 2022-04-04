import * as React from 'react';

function SignIn() {
  return (
    <div className="SignIn">
      <div className="SignIn-Content">
        <h2>Sign In</h2>
        <div>
          <form className="form-horizental">
		    Username: <input className="mt-3 form-control" type="text" name="username" data-testid="signIn-username" />
   		    Password: <input className="mt-3 form-control" type="password" name="password" data-testid="signIn-password" />
		    <button className="mt-3 btn-block">Submit</button>
		  </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;