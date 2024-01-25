const post = async (req, res) => {
  const { username, password } = req.body;

  // Log the received username and password
  console.log(`Username: ${username}, Password: ${password}`);

  try {
    // Find a user in the login table that matches the username and password
    const user = await req.context.models.Login.findOne({
      where: { username, password },
    });

    if (user) {
      // If a user is found, send a success response
      res.status(200).send({ message: 'Login successful' });
    } else {
      // If no user is found, send an error response
      res.status(401).send({ message: 'Invalid username or password' });
    }
  } catch (error) {
    // Log the error and send a 500 status code with a message
    console.error(error);
    res
      .status(500)
      .send({ message: 'An error occurred while processing your request.' });
  }
};

module.exports = {
  post,
};
