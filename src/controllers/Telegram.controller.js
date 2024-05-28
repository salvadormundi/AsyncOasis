import { sendAuthCode } from '../services/Telegram.service.js';

export const sendAuthCode = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    let { sessionString } =
      await TelegramUserIntegrationManager.sendAuthCode(
        phoneNumber
      );
    if (!sessionString)
      utils.sendResponse(
        res,
        500,
        false,
        null,
        'Failed to send otp'
      );
    utils.sendResponse(res, 200, true, {
      success: true,
      sessionString,
    });
  } catch (err) {
    console.log('error in otp', err);
    logger.error(`tg otp fail ${err}`);
    utils.sendResponse(res, 500, false, null, err);
  }
};
