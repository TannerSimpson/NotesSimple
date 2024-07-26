document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    // get username and password variables
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // change the username and password into JSON format
        body: JSON.stringify({ username, password })
      });
  
      if (response.ok) {
        const data = await response.json();
        // Save the token in localStorage or a cookie
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
  
        // Redirect to main.html
        window.location.href = '../app/main.html';
      } else {
        const errorText = await response.text();
        alert('Login failed: ' + errorText);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    }
  });