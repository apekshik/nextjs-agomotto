import { NextResponse } from "next/server";
import { FirestoreCollections, GoogleCloudStorageBuckets } from "@/app/lib/data";

var admin = require("firebase-admin");
var serviceAccount = require("./fir-eris-firebase-adminsdk.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const projectName = serviceAccount["project_id"]
const urlLinkTemplate = `https://console.firebase.google.com/project/${projectName}/{storageType}/{datatype}`;


const checkFirestoreConnection = async () => {
  var firestoreOutputs = [];
  try {
    for (const collectionName of FirestoreCollections){
      // console.log(collectionName);
      var firestoreOutput = {}; 
      const snapshot = await admin.firestore().collection(collectionName).limit(1).get();
      firestoreOutput.title = collectionName; 
      firestoreOutput.databasePlatform = 'Firestore'; 
      const connected = !snapshot.empty;
      firestoreOutput.connectionStatus = connected; 
      if (connected) {
        firestoreOutput.link = urlLinkTemplate.replace('{storeType}', 'Firestore').replace('{datatype}', 'data');
      }
      firestoreOutputs.push(firestoreOutput); 
    }
    // console.log(firestoreOutputs);
    return firestoreOutputs;
  } catch (error) {
    console.log("error happened in check firestore");
    console.log(error);
    return firestoreOutputs;
  }
};

const checkGoogleCloudStorageConnection = async () => {
  var cloudStorageOutputs = [];
  try {
    for (const bucket of GoogleCloudStorageBuckets) {
      var cloudStorageOutput = {};
      const snapshot = await admin.storage().bucket(bucket).exists();
      cloudStorageOutput.title = bucket;
      cloudStorageOutput.databasePlatform = 'Cloud Storage'; 
      cloudStorageOutput.connectionStatus = snapshot[0]; 
      if (snapshot) {
        cloudStorageOutput.link = urlLinkTemplate.replace('{storageType}', 'storage').replace('{datatype}', `${bucket}/files`);
      } 
      cloudStorageOutputs.push(cloudStorageOutput);
    }
    // console.log(cloudStorageOutputs);
    return cloudStorageOutputs;
  } catch (error) {
    console.log("error happened in check google cloud");
    console.log(error);
    return cloudStorageOutputs;
  }
};

export async function GET(req) {
  console.log("Check connection!");
  const firestoreConnected = await checkFirestoreConnection();
  const storageConnected = await checkGoogleCloudStorageConnection();
  var output = [...firestoreConnected, ...storageConnected];
  // console.log(output)

  return NextResponse.json(output)
}
