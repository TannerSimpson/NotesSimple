document.addEventListener('DOMContentLoaded', async () => {
    try {
        const token = localStorage.getItem('token'); // Assuming you store your JWT token in localStorage

        const response = await fetch('/api/profile', {
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
        window.location.href = '/login.html'; // Redirect to login on error
    }
});