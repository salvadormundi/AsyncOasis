export const errorHandlerMiddleware = (req, res, next) => {
  try {
    next();
  } catch (error) {
    return sendResponse(res, 404, error.message);
  }
};
