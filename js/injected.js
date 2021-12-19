queryFirebaseWithRetry();

async function queryFirebaseWithRetry() {
    let count = 0;
    let maxTimeout = 20;
    while (true) {
        await sleep(1000);
        try {
            let usernameList = Q.getUserNameList();
            if (usernameList == null) {
                count++;
                continue;
            }

            var send = new CustomEvent("PassCharNameToInject", { detail: usernameList });
            window.dispatchEvent(send);

            //doc(l) is a variable that holds the user id of the logged in user for firebase
            d.collection("_data").doc(l).get().then(doc => {
                //send save data to extension
                var event = new CustomEvent("PassSaveToInject", { detail: doc.data() });
                window.dispatchEvent(event);
            });

            //TODO ADD GUILD DATA
            var send = new CustomEvent("PassGuildInfoToInject", { detail: {} });
            window.dispatchEvent(send);

            break;
        } catch (e) {
            if (count > maxTimeout) {
                console.e("Max timeout of " + maxTimeout + " reached for getting firebase object! Please retry. If loading idleon takes longer then this time, ")
                break;
            }
            count++;
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}