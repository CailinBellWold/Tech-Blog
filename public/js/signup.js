  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/userlanding');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  const signinButtonHandler = async () => {
    document.location.replace('/signin');

    document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);

    document
    .querySelector('#btn-signin')
    .addEventListener('submit', signinButtonHandler);
  
