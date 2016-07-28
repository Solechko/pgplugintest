var app = new Framework7();
var $$ = Dom7;

var mainView = app.addView('.view-main', {
    dynamicNavbar: true
});

var compassWatchID = -1;

$$(document).on('pageInit', function (e) {
    var page = e.detail.page;
    if (page.name === 'device') {
        deviceTest();
    }
    else if (page.name === 'network') {
        connectionTest();
    }
})

$$(document).on('pageBack', function (e) {
    var page = e.detail.page;
    if (page.name === 'compass') {
        compassClearWatch();
    }
})

function deviceTest() {
    var platformElement = document.getElementById('device-platform-content');
    var manufacturerElement = document.getElementById('device-manufacturer-content');
    var modelElement = document.getElementById('gdevice-model-content');
    var versionElement = document.getElementById('gdevice-version-content');

    platformElement.innerHTML = device.platform;
    manufacturerElement.innerHTML = device.manufacturer;
    modelElement.innerHTML = device.model;
    versionElement.innerHTML = device.version
}

function vibrationTest() {
    if (checkIsDeviceReady()) {
        console.log('Vibrating');
        navigator.vibrate(3000);
    }
}

function connectionTest() {
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown';
    states[Connection.ETHERNET] = 'Ethernet';
    states[Connection.WIFI]     = 'WiFi';
    states[Connection.CELL_2G]  = 'Cellular 2G';
    states[Connection.CELL_3G]  = 'Cellular 3G';
    states[Connection.CELL_4G]  = 'Cellular 4G';
    states[Connection.CELL]     = 'Cellular';
    states[Connection.NONE]     = 'No network connection';

    var conectionElement = document.getElementById('connection-content');
    conectionElement.innerHTML = states[networkState];
}

function geolocationTest() {
    var onSuccess = function(position) {
        var latitudeElement = document.getElementById('geolocation-latitude-content');
        var longitudeElement = document.getElementById('geolocation-longitude-content');

        latitudeElement.innerHTML = position.coords.latitude;
        longitudeElement.innerHTML = position.coords.longitude;
    };

    function onError(error) {
        app.alert('Geolocation error ' + error.code + ': ' + error.message);
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

function compassWatchTest() {
    function onSuccess(heading) {
        var element = document.getElementById('compass-content');
        element.innerHTML = heading.magneticHeading;
    };

    function onError(compassError) {
        app.alert('Compass error: ' + compassError.code);
    };

    var options = {
        frequency: 1000
    };

    compassWatchID = navigator.compass.watchHeading(onSuccess, onError, options);
}

function compassClearWatch() {
    navigator.compass.clearWatch(compassWatchID);
    compassWatchID = -1;
}

function notificationConfirmTest() {
    var buttons = [];
    buttons.push('Apply Now');
    buttons.push('Skip');

    function onConfirm(buttonIndex) {
        app.alert('You selected ' + buttons[buttonIndex - 1]);
    }

    navigator.notification.confirm('Do you want to apply now?', onConfirm, 'Confirmation', buttons);
}

function notificationPromptTest() {
    var buttons = [];
    buttons.push('Login');
    buttons.push('Cancel');

    function onPrompt(results) {
        if (results.buttonIndex === 1)
            app.alert('Hi ' + results.input1 + '!');
    }

    navigator.notification.prompt('Please enter your login', onPrompt, 'Login', buttons);
}

function notificationBeepTest() {
    navigator.notification.beep(2);
}

function cameraTest() {
    function onSuccess(imageURI) {
        var image = document.getElementById('camera-img-content');
        image.src = imageURI;
    }

    function onFail(message) {
        app.alert('Camera error: ' + message);
    }

    var options = {
        quality: 95,
        destinationType: Camera.DestinationType.FILE_URI
    };

    navigator.camera.getPicture(onSuccess, onFail, options);    
}  
