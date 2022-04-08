import * as React from 'react';

function Register() {
  return (
    <div className="Register">
      <div className="Register-Content">
        <h2>Register</h2>
        <div>
          <form>
            <label>Firstname</label><input type="text" name="firstname" data-testid="register-firstname" required />
            <label>Lastname</label><input type="text" name="lastname" data-testid="register-lastname" required />
            <label>Birthday</label><input type="date" name="birthday" data-testid="register-birthday" required />
		        <label>Username</label><input type="text" name="username" data-testid="register-username" required />
   		      <label>Password</label> <input type="password" name="password" data-testid="register-password" required />
            <label>Repeat Password</label><input type="password" name="password-repeat" data-testid="register-password-repeat" required />
  		      <button>Submit</button>
		      </form>
        </div>
      </div>
    </div>
  );
}

export default Register;