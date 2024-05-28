export async function sendAuthCode(phoneNumber) {
  //users are allowed 5 login requests per day
  var client = new TelegramClient(
    new StringSession(''),
    apiId,
    apiHash
  );
  try {
    await client.connect();
    const { phoneCodeHash, isCodeViaApp } =
      await client.sendCode(
        {
          apiId,
          apiHash,
        },
        phoneNumber
      );
    let data = {
      phoneCodeHash,
      isCodeViaApp,
      sessionString: client.session.save(),
    };

    logger.info(
      `Phone code sent on ${phoneNumber} with response ${JSON.stringify(
        data
      )}`
    );
    return data;
  } catch (error) {
    logger.error(`tg failed to send auth code ${error}`);
    throw error;
  } finally {
    if (client?.connected) {
      await client.disconnect();
    }
  }
}
