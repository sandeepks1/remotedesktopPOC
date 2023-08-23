function craeteAnswer() {

    let servers = {
        iceServers: [{
            urls: "stun:stun.relay.metered.ca:80"
        }, {
            urls: "turn:a.relay.metered.ca:80",
            username: "835c5389b98d89346569c234",
            credential: "TFEyZVKp00MJOBNJ",
        }, {
            urls: "turn:a.relay.metered.ca:80?transport=tcp",
            username: "835c5389b98d89346569c234",
            credential: "TFEyZVKp00MJOBNJ",
        }, {
            urls: "turn:a.relay.metered.ca:443",
            username: "835c5389b98d89346569c234",
            credential: "TFEyZVKp00MJOBNJ",
        }, {
            urls: "turn:a.relay.metered.ca:443?transport=tcp",
            username: "835c5389b98d89346569c234",
            credential: "TFEyZVKp00MJOBNJ",
        }, ],
    }


    var remoteConnection = new RTCPeerConnection(servers)


    offer = document.getElementById('offer-sdp').value
    remoteConnection.onicecandidate = e => {
        console.log(" NEW ice candidnat!! on localconnection reprinting SDP ")
        console.log(JSON.stringify(remoteConnection.localDescription))
        document.getElementById('answer-sdp').value = JSON.stringify(remoteConnection.localDescription)
    }


    remoteConnection.ondatachannel = e => {

        const receiveChannel = e.channel;
        receiveChannel.onmessage = async e => {
            console.log("messsage received!!!" + e.data);
            if ((e.data).toString() == "connecttodesktop") {
                console.log("share screen")
                    // navigator.mediaDevices.getDisplayMedia({ video: true, audio: false })
                    //     .then(screenStream => {
                    //         const localVideo = document.getElementById('user-1');
                    //         localVideo.srcObject = screenStream;




                //         screenStream.getTracks().forEach(track => {
                //             console.log("adding track")
                //             remoteConnection.addTrack(track, screenStream);
                //         });
                //     })
                //     .catch(error => {
                //         console.error('Error starting screen sharing:', error);
                //     });
                localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
                document.getElementById('user-1').srcObject = localStream;
                remoteStream = new MediaStream()

                localStream.getTracks().forEach((track) => {
                    console.log("adding track")
                    remoteConnection.addTrack(track, localStream)
                })


            }
        }
        receiveChannel.onopen = e => console.log("open!!!!");
        receiveChannel.onclose = e => console.log("closed!!!!!!");
        remoteConnection.channel = receiveChannel;

    };


    remoteConnection.setRemoteDescription(JSON.parse(offer)).then(a => console.log("done"))

    //create answer
    remoteConnection.createAnswer().then(a => remoteConnection.setLocalDescription(a)).then(a =>
        console.log(JSON.stringify(remoteConnection.localDescription)))
}

//create answer