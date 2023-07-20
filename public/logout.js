
async function logout(token) {
  try {
    // Send a request to the server to logout
    const response = await fetch('/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (response.ok) {
      // Clear the access token from localStorage or any other necessary cleanup
      localStorage.removeItem('accessToken');
      // Redirect or update the UI to reflect the logged-out state
      // ...
    } else {
      // Handle logout failure
      // ...
    }
  } catch (error) {
    // Handle error
    // ...
  }
}

export default logout;
