const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.duplicatePost = functions.database.ref('/social/post/matheus-1250')
    .onWrite(event => {
        const post = event.data.val();
        return functions.database.ref('/social/duplicate/').set(post);
    });