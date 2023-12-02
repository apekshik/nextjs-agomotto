import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const { FirestoreCollections, GoogleCloudStorageBuckets } 
  = require('@app/lib/data.js');

if (!admin.apps.length) {
  admin.initializeApp();
}
// var serviceAccount = require("@/app/api/dashboard/fir-eris-firebase-adminsdk.json");
// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
//   });
// }

interface FirestoreOutput {
  title: string;
  databasePlatform: string;
  connectionStatus: boolean;
  link?: string;  // Optional property
}

const projectName = 'fir-eris'
const urlLinkTemplate = `https://console.firebase.google.com/
    project/${projectName}/{storageType}/{datatype}`;


const checkFirestoreConnection = async () => {
  var firestoreOutputs: FirestoreOutput[] = [];
  try {
    for (const collectionName of FirestoreCollections){
      // console.log(collectionName);
      let firestoreOutput: FirestoreOutput = {
        title: collectionName,
        databasePlatform: 'Firestore',
        connectionStatus: false
      }; 
      const snapshot = await admin.firestore()
      .collection(collectionName).limit(1).get();

      firestoreOutput.connectionStatus = !snapshot.empty;

      if (firestoreOutput.connectionStatus) {
        firestoreOutput.link = urlLinkTemplate
        .replace('{storeType}', 'Firestore').replace('{datatype}', 'data');
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

interface CloudStorageOutput {
  title: string;
  databasePlatform: string;
  connectionStatus: boolean;
  link?: string;  // Optional property
}

const checkGoogleCloudStorageConnection = async () => {
  var cloudStorageOutputs = [];
  try {
    for (const bucket of GoogleCloudStorageBuckets) {
      let cloudStorageOutput: CloudStorageOutput = {
        title: bucket,
        databasePlatform: 'Cloud Storage',
        connectionStatus: false
      };
      const [exists] = await admin.storage().bucket(bucket).exists();
      cloudStorageOutput.connectionStatus = exists;

      if (exists) {
        cloudStorageOutput.link = urlLinkTemplate.replace('{storageType}', 'storage')
        .replace('{datatype}', `${bucket}/files`);
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

exports.checkConnections = functions.https.onRequest(
  async (req, res) => {
  console.log("Check connection!");
  const firestoreConnected = await checkFirestoreConnection();
  const storageConnected = await checkGoogleCloudStorageConnection();
  var output = [...firestoreConnected, ...storageConnected];
  
  res.json(output);
});



// export const onCreatePost =
// functions.firestore.document('/posts/{id}').onCreate(async snapshot => {
//     const data = snapshot.data();
//     const { caption, classification, connectedPostImageURL, imageURL } = data

//     let expirationAtSeconds: number | undefined
//     if (expiresIn && expiresIn > 0) {
//         expirationAtSeconds = Date.now() / 1000 + expiresIn
//     }
//     else if (expiresAt) {
//         expirationAtSeconds = expiresAt.seconds
//     }

//     if (!expirationAtSeconds) {
//         // No expiration set on this document, nothing to do
//         return
//     }

//     // Get the project ID from the FIREBASE_CONFIG env var
//     const project = JSON.parse(process.env.FIREBASE_CONFIG!).projectId
//     const location = 'us-central1'
//     const queue = 'firestore-ttl'

//     const tasksClient = new CloudTasksClient()
//     const queuePath: string = tasksClient.queuePath(project, location, queue)

//     const url = `https://${location}-${project}.cloudfunctions.net/firestoreTtlCallback`
//     const docPath = snapshot.ref.path
//     const payload: ExpirationTaskPayload = { docPath }

//     const task = {
//         httpRequest: {
//             httpMethod: 'POST',
//             url,
//             body: Buffer.from(JSON.stringify(payload)).toString('base64'),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         },
//         scheduleTime: {
//             seconds: expirationAtSeconds
//         }
//     }

//     const [ response ] = await tasksClient.createTask({ parent: queuePath, task })

//     const expirationTask = response.name
//     const update: ExpiringDocumentData = { expirationTask }
//     await snapshot.ref.update(update)
// })


export const onPostCreate = functions.database
.ref('/Posts/{postId}')
.onCreate((snapshot, context) => {
  const postId = context.params.postId;
  console.log(`New post id:${postId}`);

  const metaData = snapshot.val();
  const caption = metaData.caption;
  const connectedPostImageURL = metaData.connectedPostImageURL;
  const imageURL =  metaData.imageURL;

  const ret = {caption: caption, 
    connectedPostImageURL: connectedPostImageURL, 
    imageURL: imageURL
  };

  console.log('New post created:', ret);
})




