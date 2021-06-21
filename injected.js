
xhrIntercept();
wsIntercept();

function xhrIntercept() {
    var XHR = XMLHttpRequest.prototype;
    var open = XHR.open;
    var send = XHR.send;
    var setRequestHeader = XHR.setRequestHeader;

    XHR.open = function(method, url) {
        this._method = method;
        this._url = url;
        this._requestHeaders = {};
        this._startTime = (new Date()).toISOString();

        return open.apply(this, arguments);
    };

    XHR.setRequestHeader = function(header, value) {
        this._requestHeaders[header] = value;
        return setRequestHeader.apply(this, arguments);
    };

    XHR.send = function(postData) {
        if(this._url.includes("firestore.googleapis.com/google.firestore.v1.Firestore")) {
            this.addEventListener('readystatechange', function() { 
                parseRequest(this.response);
            }, false); 
        }
        return send.apply(this, arguments);
    };
}

function wsIntercept() {
    var OrigWebSocket = window.WebSocket;
    var wsSend = OrigWebSocket.prototype.send;
    wsSend = wsSend.apply.bind(wsSend);
    OrigWebSocket.prototype.send = function(data) {
        if(this.addedListener == undefined){
            this.addEventListener("message", function(event) {
                var request = JSON.parse(event.data).d.b;
                var jsonData = request.d;
                var messageIntent = request.p;

                //check that the data is what is needed
                try{
                    if(messageIntent.search(/_uid\//) !== -1){
                        //data is char names, send it to inject.js
                        var send = new CustomEvent("PassCharNameToInject", {detail: jsonData});
                        window.dispatchEvent(send);
                    }else if(messageIntent.search(/_guild\/[a-zA-Z0-9]*\/m$/) !== -1){
                        //data is guild member information
                        var send = new CustomEvent("PassGuildInfoToInject", {detail: jsonData});
                        window.dispatchEvent(send);
                    }
                }catch(e){
                    //ignore
                }
            });
            this.addedListener = true;
        }
        return wsSend(this, arguments);
    };
}

function parseRequest(request) {
    //remove up to and including new line
    var data = request.substring(request.indexOf("\n") + 1); 
    
    //divide each request into a list of JSON strings (some cleanup is still needed)
    data = data.split(/\]\][0-9]*[\s]*[\n]?\[\[/g);
    
    for(let i in data){
        //take off the first  "#,[" where # is any integer
        //take off a ] at the end (last char)
        data[i] = data[i].replace(/[0-9]*,\[/,"").slice(0,-1);

        //try to parse the data. If it fails in any way, skip it.
        try{
            var jsonData = JSON.parse(data[i]);
            if(jsonData["documentChange"]["document"]["name"].includes("projects/idlemmo/databases/(default)/documents/_data/")){
                //the data is needed, so pass it on to inject.js
                var event = new CustomEvent("PassSaveToInject", {detail: jsonData});
                window.dispatchEvent(event);
            }
        }catch(e){
            continue;
        }
    }
}