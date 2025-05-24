import dotenv from 'dotenv';

dotenv.config();

const {
  FIREBASE_API,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGE_SENDER,
  FIREBASE_APP_ID,
  FIREBASE_MEASURE_ID,
  SERVER_PORT,
  SERVER_ADDRESS,
  USER_ACCESS_TOKEN,
  USER_REFRESH_TOKEN,
} = process.env;

export const Firebase = {
    api_key         : FIREBASE_API,
    auth_domain     : FIREBASE_AUTH_DOMAIN,
    project_id      : FIREBASE_PROJECT_ID,
    storage_bucket  : FIREBASE_STORAGE_BUCKET,
    message_sender  : FIREBASE_MESSAGE_SENDER,
    app_id          : FIREBASE_APP_ID,
    measure_id      : FIREBASE_MEASURE_ID,
};
export const Server = {
    port    : SERVER_PORT || 8080,
    address : SERVER_ADDRESS || "localhost",
};
export const User = {
    access_token  : USER_ACCESS_TOKEN,
    refresh_token : USER_REFRESH_TOKEN, 
}
