document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Perform client-side validations
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var mobile = document.getElementById('mobile').value;
  
    if (!name || !email || !password || !mobile) {
      alert('Please fill in all fields.');
      return;
    }
  
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    if (!validateMobile(mobile)) {
      alert('Please enter a valid mobile number.');
      return;
    }
  
    // Send AJAX request to the server for user signup
    var formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('mobile', mobile);
  
    // Replace "signup-endpoint" with your actual signup endpoint URL
    fetch('signup-endpoint', {
      method: 'POST',
      body: formData
    })
    .then(function(response) {
      if (response.ok) {
        alert('Signup successful! Please check your email for verification.');
      } else {
        alert('Signup failed. Please try again.');
      }
    })
   
  });
  
  function validateEmail(email) {
    
    return true;
  }
  
  function validateMobile(mobile) {
    
    return true;
  }
  