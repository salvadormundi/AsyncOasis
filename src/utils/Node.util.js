/**
 * Sends a response to the client with a specified status code, message, data, and cookies.
 *
 * @param {http.ServerResponse} res - The response object
 * @param {number} statusCode - The HTTP status code to send (e.g. 200, 404, 500)
 * @param {string} message - The response message to send (optional)
 * @param {object} data - The response data to send (optional)
 * @param {object} meta - Additional metadata to include in the response (optional)
 * @param {object} cookies - An object containing cookie names and values to set (optional)
 * @param {boolean} isJson - Whether to send the response as JSON (default: true)
 */

export function sendResponse(
  res,
  statusCode,
  message,
  data,
  meta,
  cookies = {},
  isJson = true
) {
  const response = {
    message,
    data,
    meta,
  };

  if (Object.keys(cookies).length) {
    for (const [name, value] of Object.entries(cookies)) {
      res.cookie(name, value);
    }
  }

  if (isJson) {
    res.setHeader('Content-Type', 'application/json');
    res.status(statusCode).json(response);
  } else {
    res.status(statusCode).send(response.message);
  }

  // Log the response for debugging purposes
  console.log(
    `Sent response with status code ${statusCode}: ${response.message}`
  );
}
