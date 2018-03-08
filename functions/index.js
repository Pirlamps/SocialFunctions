const functions = require('firebase-functions');


exports.duplicatePost = functions.database.ref('/social/post/matheus-1250')
    .onWrite(event => {
        const post = event.data.val();
        
        const functions = require('firebase-functions');
        const admin = require('firebase-admin');
        const config = functions.config();

        admin.initializeApp(config.firebase);
        
        var followersMap
        
        const followers = admin.database().ref('/followers/matheus-1250/').once('value')
            .then(snapshot =>{
                followersMap = snapshot.data.val()//aqui ta zuado
        });
        
        
        var iterator = followersMap.keys()


        return event.data.ref.root.child(`/social/duplicate/${iterator.next().value}`).set(post);
    });

//      var post = "oie"
// new Map([['yasmin','post'],['matheus','post']]).forEach((value, key, map) => {
// 	map.set(key, post)
//     console.log(`[${key}] = ${map.get(key)}`)
// })