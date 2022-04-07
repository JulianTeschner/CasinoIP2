import * as React from 'react';

function Register() {
  return (
    <div className="Register">
      <div className="Register-Content">
        <h2>Register</h2>
        <div>
          <form className="form-horizental">
            <label>Firstname</label><input className="mb-3 form-control" type="text" name="firstname" data-testid="register-firstname" required />
            <label>Lastname</label><input className="mb-3 form-control" type="text" name="lastname" data-testid="register-lastname" required />
            <label>Birthday</label><input className="mb-3 form-control" type="date" name="birthday" data-testid="register-birthday" required />
		        <label>Username</label><input className="mb-3 form-control" type="text" name="username" data-testid="register-username" required />
   		      <label>Password</label> <input className="mb-3 form-control" type="password" name="password" data-testid="register-password" required />
            <label>Repeat Password</label><input className="mb-3 form-control" type="password" name="password-repeat" data-testid="register-password-repeat" required />
  		      <button className="mb-3 btn-block">Submit</button>
		      </form>
        </div>
      </div>
    </div>
  );
}

export default Register;