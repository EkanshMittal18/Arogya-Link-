
const {
  initializeApp,
  cert,
  getApps,
} = require("firebase-admin/app");

const {
  getAuth,
} = require("firebase-admin/auth");

const serviceAccount = require("../serviceAccountKey.json");

// Initialize Firebase Admin only once
const firebaseApp =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert(serviceAccount),
      });

// Firebase Authentication
const auth = getAuth(firebaseApp);

module.exports = {
  auth,
  firebaseApp,
};
