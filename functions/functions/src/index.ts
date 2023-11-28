import * as functions from "firebase-functions";
import * as admin from "firebase-admin";


if (!admin.apps.length) {
  admin.initializeApp();
}

const checkFirestoreConnection = async () => {
  try {
    const snapshot = await admin.firestore().collection("Posts").limit(1).get();
    return !snapshot.empty;
  } catch (error) {
    console.log("Error in checking Firestore connection", error);
    return false;
  }
};

const checkGoogleCloudStorageConnection = async () => {
  try {
    const [buckets] = await admin.storage().bucket().exists();
    return buckets;
  } catch (error) {
    console.log("Error in checking Google Cloud Storage connection", error);
    return false;
  }
};

exports.checkConnections = functions.https.onRequest(async (req, res) => {
  console.log("Check connection!");
  const firestoreConnected = await checkFirestoreConnection();
  const storageConnected = await checkGoogleCloudStorageConnection();

  res.json({
    firestoreStatus: firestoreConnected,
    googleCloudStorageStatus: storageConnected,
  });
});


