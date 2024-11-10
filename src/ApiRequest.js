const ApiRequest = async (url = "", optionObj = {}) => {
  try {
    const response = await fetch(url, optionObj);
    if (!response.ok) {
      // Throw an error with the status code in case of a non-OK response
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Assuming the response should be JSON. Adjust this line if expecting different response types.
    return await response.json(); // Return the response data
  } catch (error) {
    // Log the error or handle it as needed
    console.error("ApiRequest error:", error.message);
    // Return or throw the error message or object depending on your error handling strategy
    throw error; // Rethrow the error if you want calling code to handle it
    // Alternatively, return a custom error object or message here if you don't want to throw
  }
};

export default ApiRequest;
