import * as React from 'react';

function Register() {
  return (
    <div className="Register">
      <div className="Register-Content">
        <h2>Register</h2>
        <div>
          <form className="form-horizental">
            Name: <input className="mt-3 form-control" type="text" name="name" data-testid="register-name" required />
            Birthday: <input className="mt-3 form-control" type="date" name="birthday" data-testid="register-birthday" required />
		    Username: <input className="mt-3 form-control" type="text" name="username" data-testid="register-username" required />
   		    Password: <input className="mt-3 form-control" type="password" name="password" data-testid="register-password" required />
            Repeat Password: <input className="mt-3 form-control" type="password" name="password-repeat" data-testid="register-password-repeat" required />
		    <button className="mt-3 btn-block">Submit</button>
		  </form>
        </div>
      </div>
    </div>
  );
}

export default Register;