// src/setupTests.js
import '@testing-library/jest-dom';
import 'whatwg-fetch';

// TextEncoder / TextDecoder
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// BroadcastChannel mock
class BroadcastChannel {
    constructor(name) {
        this.name = name;
    }
    postMessage() { }
    close() { }
    set onmessage(fn) { this._onmessage = fn; }
}
global.BroadcastChannel = BroadcastChannel;

// WritableStream / ReadableStream mocks
class WritableStreamMock {
    constructor() { }
    getWriter() {
        return {
            write: () => { },
            close: () => { },
            releaseLock: () => { },
        };
    }
}
class ReadableStreamMock {
    constructor() { }
}
global.WritableStream = WritableStreamMock;
global.ReadableStream = ReadableStreamMock;
