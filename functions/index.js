const functions = require('firebase-functions')
const admin = require('firebase-admin')
const config = functions.config()
//Initializing firebase admin to read from another node.
admin.initializeApp(config.firebase)

//Function that duplicate the current post to all followers
exports.duplicatePost = functions.database.ref('/social/post/matheus-1250')
    .onWrite(event => {
        const post = event.data.val()

        //Get the followers
        return admin.database().ref('social/followers/matheus-1250').once('value')
            .then(snapshot => {
                const followersMap = snapshot.val()
                console.log(followersMap)

                //Transform the Map of keys into a JSON with the data to update.
                var multiUpdate = {}
                for (var k in followersMap) {
                    multiUpdate[k] = post
                }
                console.log(multiUpdate)

                //Update all childrens in multiUpdate JSON
                return event.data.ref.root.child('social/timeline/').update(multiUpdate)
            }).catch(error => {
                console.error(error)
            })
    })
    //TODO: change event Reference to get all users