document.addEventListener('DOMContentLoaded', () => {
    const fetchProfileData = async () => {
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');
  
      if (!username || !password) {
        console.error('Username or password is missing');
        return;
      }
  
      try {
        const response = await fetch('/api/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        document.getElementById('username').value = data.username;
        // document.getElementById('password').value = data.password;
        document.getElementById('first-name').value = data.firstname;
        document.getElementById('last-name').value = data.lastname;
        document.getElementById('email').value = data.email;
        document.getElementById('phone').value = data.phone;
        document.getElementById('postal-code').value = data.zipcode;
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
  
    fetchProfileData();
  });

/*document.addEventListener('DOMContentLoaded', async () => {
    try {
        const token = localStorage.getItem('token'); // Assuming you store your JWT token in localStorage

        const response = await fetch('/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const userData = await response.json();

            document.getElementById('username').value = userData.username;
            document.getElementById('password').value = userData.password
            document.getElementById('first-name').value = userData.firstname;
            document.getElementById('last-name').value = userData.lastname;
            document.getElementById('email').value = userData.email;
            document.getElementById('phone').value = userData.phone;
            document.getElementById('postal-code').value = userData.zipcode;
        } 

    } catch (error) {
        console.error('Error loading profile data:', error);
    }
});*/

/*document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
  
    try {
      const response = await fetch(`/api/profile/${username}`);
  
      if (response.ok) {
        const userData = await response.json();
  
        document.getElementById('username').value = userData.username;
        document.getElementById('password').value = userData.password;
        document.getElementById('first-name').value = userData.firstname;
        document.getElementById('last-name').value = userData.lastname;
        document.getElementById('email').value = userData.email;
        document.getElementById('phone').value = userData.phone;
        document.getElementById('postal-code').value = userData.zipcode;
      } 
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
  });*/