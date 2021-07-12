const signinFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const username = document.querySelector('#username-signin').value.trim();
    const password = document.querySelector('#password-signin').value.trim();
  
    if (username && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/signin', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/userlanding');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  const signupButtonHandler = async () => {
    document.location.replace('/signup');

  document
    .querySelector('.signin-form')
    .addEventListener('submit', signinFormHandler);

    document
    .querySelector('#btn-signup')
    .addEventListener('submit', signupButtonHandler);
  
