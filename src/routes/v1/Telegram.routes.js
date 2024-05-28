import { sendAuthCode } from '../../controllers/Telegram.controller.js';

const TelegramRouter = Router();

TelegramRouter.route('/send_auth').get(sendAuthCode);

export default TelegramRouter;
