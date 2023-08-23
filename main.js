// let APP_ID = "5c63aa7f50074ab2996c1b3b5e80d482"


// let peerConnection;
// let localStream;
// let remoteStream;

// let uid = String(Math.floor(Math.random() * 10000))
// let token = null;
// let client;

// let servers = {
//     iceServers: [{
//         urls: "stun:stun.relay.metered.ca:80"
//     }, {
//         urls: "turn:a.relay.metered.ca:80",
//         username: "835c5389b98d89346569c234",
//         credential: "TFEyZVKp00MJOBNJ",
//     }, {
//         urls: "turn:a.relay.metered.ca:80?transport=tcp",
//         username: "835c5389b98d89346569c234",
//         credential: "TFEyZVKp00MJOBNJ",
//     }, {
//         urls: "turn:a.relay.metered.ca:443",
//         username: "835c5389b98d89346569c234",
//         credential: "TFEyZVKp00MJOBNJ",
//     }, {
//         urls: "turn:a.relay.metered.ca:443?transport=tcp",
//         username: "835c5389b98d89346569c234",
//         credential: "TFEyZVKp00MJOBNJ",
//     }, ],
// }


// let init = async() => {
//     console.log("init async")
//     client = await AgoraRTM.createInstance(APP_ID)
//     await client.login({ uid, token })

//     const channel = client.createChannel('main')
//     channel.join()

//     channel.on('MemberJoined', handlePeerJoined)
//     client.on('MessageFromPeer', handleMessageFromPeer)

//     //localStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });

//     //document.getElementById('user-1').srcObject = localStream
// }

// let handlePeerJoined = async(MemberId) => {
//     console.log("handle perr joined")
//     console.log('A new peer has joined this room:', MemberId)
//     createOffer(MemberId)
// }

// let handleMessageFromPeer = async(message, MemberId) => {
//     console.log("handleMessageFromPeer")
//     message = JSON.parse(message.text)
//     console.log('Message:', message.type)

//     if (message.type === 'offer') {
//         console.log("offer")
//             if (!localStream) {
//                 localStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });

//             document.getElementById('user-1').srcObject = localStream
//         }

//         document.getElementById('offer-sdp').value = JSON.stringify(message.offer)
//         createAnswer(MemberId)
//     }

//     if (message.type === 'answer') {
//         console.log("answer")
//         document.getElementById('answer-sdp').value = JSON.stringify(message.answer)
//         addAnswer()
//     }

//     if (message.type === 'candidate') {
//         console.log("candidate")
//         if (peerConnection) {
//             peerConnection.addIceCandidate(message.candidate)
//         }
//     }
// }

// let createPeerConnection = async(sdpType, MemberId) => {
//     console.log("peerconnection")
//     peerConnection = new RTCPeerConnection(servers)

//     remoteStream = new MediaStream()
//     document.getElementById('user-2').srcObject = remoteStream

//     // localStream.getTracks().forEach((track) => {
//     //     peerConnection.addTrack(track, localStream)
//     // })

//     peerConnection.ontrack = async(event) => {
//         event.streams[0].getTracks().forEach((track) => {
//             remoteStream.addTrack(track)
//         })
//     }

//     peerConnection.onicecandidate = async(event) => {
//         console.log("on ice")
//         if (event.candidate) {
//             document.getElementById(sdpType).value = JSON.stringify(peerConnection.localDescription)
//             client.sendMessageToPeer({ text: JSON.stringify({ 'type': 'candidate', 'candidate': event.candidate }) }, MemberId)
//         }
//     }
// }

// let createOffer = async(MemberId) => {
//     console.log("craete offewer")
//     createPeerConnection('offer-sdp', MemberId)

//     let offer = await peerConnection.createOffer()
//     await peerConnection.setLocalDescription(offer)

//     document.getElementById('offer-sdp').value = JSON.stringify(offer)
//     client.sendMessageToPeer({ text: JSON.stringify({ 'type': 'offer', 'offer': offer }) }, MemberId)
// }

// let createAnswer = async(MemberId) => {
//     console.log("create answer")
//     createPeerConnection('answer-sdp', MemberId)

//     let offer = document.getElementById('offer-sdp').value
//     if (!offer) return console.log('Retrieve offer from peer first...')

//     offer = JSON.parse(offer)
//     await peerConnection.setRemoteDescription(offer)

//     let answer = await peerConnection.createAnswer()
//     await peerConnection.setLocalDescription(answer)

//     document.getElementById('answer-sdp').value = JSON.stringify(answer)
//     client.sendMessageToPeer({ text: JSON.stringify({ 'type': 'answer', 'answer': answer }) }, MemberId)
// }

// let addAnswer = async() => {
//     console.log("add answer")
//     let answer = document.getElementById('answer-sdp').value
//     if (!answer) return console.log('Retrieve answer from peer first...')

//     answer = JSON.parse(answer)

//     if (!peerConnection.currentRemoteDescription) {
//         peerConnection.setRemoteDescription(answer)
//     }

// }

// init()
// var sendChannel = peerConnection.createDataChannel("sendChannel");
// sendChannel.onmessage = (e) => console.log("message received: " + e.data);
// sendChannel.onopen = () =>
//     console.log("Channel opened");
// // Send a message when the channel is open

// sendChannel.onclose = () => console.log("channel closed");

// function connecttoPC() {
//     sendChannel.send("heeelooooo")

// }
// // document.getElementById('create-offer').addEventListener('click', createOffer)
// // document.getElementById('create-answer').addEventListener('click', createAnswer)
// // document.getElementById('add-answer').addEventListener('click', addAnswer)




//you can specify a STUN server here

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

const localConnection = new RTCPeerConnection(servers)



//const localConnection = new RTCPeerConnection()


localConnection.onicecandidate = e => {
    console.log(" NEW ice candidate!! on localconnection reprinting SDP ")
    console.log(JSON.stringify(localConnection.localDescription))
    document.getElementById('offer-sdp').value = JSON.stringify(localConnection.localDescription)
}


var sendChannel = localConnection.createDataChannel("sendChannel");
sendChannel.onmessage = e => console.log("messsage received!!!" + e.data)
sendChannel.onopen = e => console.log("open!!!!");
sendChannel.onclose = e => console.log("closed!!!!!!");

sendChannel.ontrack = event => {
    alert("screen shared on track")
    if (event.track.kind === 'video') {
        const localScreenVideo = document.getElementById('local-screen');
        localScreenVideo.srcObject = event.streams[0];
        localScreenVideo.onloadedmetadata = () => {
            localScreenVideo.play();
        };
    }
};


localConnection.ontrack = function(e) {
    alert("screen shared")
    const localScreenVideo = document.getElementById('local-screen');
    localScreenVideo.srcObject = e.streams[0];
};


localConnection.createOffer().then(o => localConnection.setLocalDescription(o))

function addAnswer() {
    answer = document.getElementById('answer-sdp').value
    localConnection.setRemoteDescription(JSON.parse(answer)).then(a => console.log("done"))
}

function connecttoPC() {
    sendChannel.send("connecttodesktop")
}