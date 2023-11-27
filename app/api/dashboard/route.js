import { NextResponse } from "next/server";

var admin = require("firebase-admin");
var serviceAccount = require("./fir-eris-firebase-adminsdk.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const checkFirestoreConnection = async () => {
  try {
    const snapshot = await admin.firestore().collection('Posts').limit(1).get();
    return !snapshot.empty;
  } catch (error) {
    console.log("error happened in check firestore");
    console.log("Error", error);
    return false;
  }
};

const checkGoogleCloudStorageConnection = async () => {
  try {
    const [buckets] = await admin.storage().bucket('fir-eris-test1').exists();
    return buckets;
  } catch (error) {
    console.log("error happened in check google cloud");
    console.log("Error", error);
    return false;
  }
};

export async function GET(req) {
  console.log("Check connection!");
  const firestoreConnected = await checkFirestoreConnection();
  // console.log(firestoreConnected);
  const storageConnected = await checkGoogleCloudStorageConnection();
  // console.log(storageConnected);

  return NextResponse.json({
    firestoreStatus: firestoreConnected,
    googleCloudStorageStatus: storageConnected,
  });
}
