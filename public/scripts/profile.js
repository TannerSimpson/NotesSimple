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
        document.getElementById('password').value = password || ''; // Set the password
        document.getElementById('first-name').value = data.firstname;
        document.getElementById('last-name').value = data.lastname;
        document.getElementById('email').value = data.email;
        document.getElementById('phone').value = data.phone;
        document.getElementById('postal-code').value = data.zipcode;
        if (data.profileImageUrl) {
          document.getElementById('profileImage').src = data.profileImageUrl;
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }

      document.getElementById('username').disabled = true;
      document.getElementById('email').disabled = true;
    };
  
    fetchProfileData();
  
    const profileForm = document.getElementById('profileForm');
    profileForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const formData = new FormData(profileForm);
      formData.append('username', localStorage.getItem('username'));
      formData.append('password', localStorage.getItem('password'));
  
      try {
        const response = await fetch('/api/updateProfile', {
          method: 'POST',
          body: formData
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        console.log('Profile updated successfully:', data);
  
        // Update the profile image on the page if uploaded
        if (data.profileImageUrl) {
          document.getElementById('profileImage').src = data.profileImageUrl;
        }
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    });
  
    const profileImageInput = document.getElementById('profileImageInput');
    const profileImageButton = document.getElementById('profileImageButton');
    profileImageButton.addEventListener('click', () => {
      profileImageInput.click();
    });
  
    profileImageInput.addEventListener('change', () => {
      const file = profileImageInput.files[0];
      const reader = new FileReader();
  
      reader.onloadend = () => {
        document.getElementById('profileImage').src = reader.result;
      };
  
      if (file) {
        reader.readAsDataURL(file);
      }
    });
  });