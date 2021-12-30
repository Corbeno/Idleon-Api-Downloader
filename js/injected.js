queryFirebaseWithRetry();

async function queryFirebaseWithRetry() {
    let count = 0;
    let maxTimeout = 60;
    while (true) {
        if (count > maxTimeout) {
            console.error("Reached max timeout to check variables. Did their names change?");
            break;
        }
        await sleep(1000);

        //grab globally accessable variables from other scripts (mainly Z.js and firebase.js)
        //it is configured this way to be easy to change when the minified variable names possibly change
        let external = {
            usernameList: v,
            database: d,
            userId: l,
            guildId: ae
        }
        //verify all variables have been obtained
        let isBadData = false;
        for (const key in external) {
            if (external[key] == null || external[key] == undefined) {
                isBadData = true;
                break;
            }
        }
        if (isBadData) {
            count++;
            continue;
        };

        var send = new CustomEvent("PassCharNameToInject", { detail: external.usernameList });
        window.dispatchEvent(send);

        external.database.collection("_data").doc(external.userId).get().then(doc => {
            var event = new CustomEvent("PassSaveToInject", { detail: doc.data() });
            window.dispatchEvent(event);
        });

        external.database.collection("_guildStat").doc(external.guildId).get().then(doc => {
            var send = new CustomEvent("PassGuildInfoToInject", { detail: doc.data() });
            window.dispatchEvent(send);
        });

        //TESTING - This is a lot of data so it shouldn't be grabbed every time...
        //maybe make this data be grabbed when a button is clicked?
        // r.child(Ge).once("value", function(dataSnapshot){
        //     try{
        //         console.log(dataSnapshot.exportVal()[0]);
        //     }catch(e){
        //         //ignore
        //     }
        // });

        break;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}