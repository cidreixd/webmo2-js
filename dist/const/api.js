export var API = {
    stop: {
        uri: '/rotate/stop',
        method: 'POST',
    },
    lock: {
        uri: '/rotate/lock',
        method: 'POST',
    },
    rotate: {
        uri: '/rotate',
        method: 'POST',
    },
    rotateBy: {
        uri: '/rotate/by',
        method: 'POST',
    },
    rotateTo: {
        uri: '/rotate/to',
        method: 'POST',
    },
    getRotation: {
        uri: '/rotation',
        method: 'GET',
    },
    resetRotation: {
        uri: '/rotation/reset',
        method: 'POST',
    },
};
