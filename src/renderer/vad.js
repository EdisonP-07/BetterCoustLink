"use strict";
exports.__esModule = true;
function clamp(value, min, max) {
    return min < max ? (value < min ? min : value > max ? max : value) : value < max ? max : value > min ? min : value;
}
// https://github.com/Jam3/audio-frequency-to-index
function frequencyToIndex(frequency, sampleRate, frequencyBinCount) {
    var nyquist = sampleRate / 2;
    var index = Math.round((frequency / nyquist) * frequencyBinCount);
    return clamp(index, 0, frequencyBinCount);
}
// https://github.com/Jam3/analyser-frequency-average
function analyserFrequency(analyser, frequencies, minHz, maxHz) {
    var sampleRate = analyser.context.sampleRate;
    var binCount = analyser.frequencyBinCount;
    var start = frequencyToIndex(minHz, sampleRate, binCount);
    var end = frequencyToIndex(maxHz, sampleRate, binCount);
    var count = end - start;
    var sum = 0;
    for (; start < end; start++) {
        sum += frequencies[start] / 255;
    }
    return count === 0 ? 0 : sum / count;
}
function default_1(audioContext, source, destination, opts) {
    opts = opts || {};
    var defaults = {
        fftSize: 1024,
        bufferLen: 1024,
        smoothingTimeConstant: 0.2,
        minCaptureFreq: 85,
        maxCaptureFreq: 255,
        noiseCaptureDuration: 1000,
        minNoiseLevel: 0.15,
        maxNoiseLevel: 0.7,
        avgNoiseMultiplier: 1.2,
        onVoiceStart: function () {
            /* DO NOTHING */
        },
        onVoiceStop: function () {
            /* DO NOTHING */
        },
        onUpdate: function () {
            /* DO NOTHING */
        },
        stereo: true
    };
    var options = Object.assign({}, defaults, opts);
    var baseLevel = 0;
    var voiceScale = 1;
    var activityCounter = 0;
    var activityCounterMin = 0;
    var activityCounterMax = 30;
    var activityCounterThresh = 5;
    var envFreqRange = [];
    var isNoiseCapturing = true;
    var prevVadState = undefined;
    var vadState = false;
    var captureTimeout = null;
    // var source = audioContext.createMediaStreamSource(stream);
    var analyser = audioContext.createAnalyser();
    analyser.smoothingTimeConstant = options.smoothingTimeConstant;
    analyser.fftSize = options.fftSize;
    var channels = options.stereo ? 2 : 1;
    var scriptProcessorNode = audioContext.createScriptProcessor(options.bufferLen, channels, channels);
    connect();
    scriptProcessorNode.onaudioprocess = monitor;
    if (isNoiseCapturing) {
        captureTimeout = setTimeout(init, options.noiseCaptureDuration);
    }
    function init() {
        isNoiseCapturing = false;
        envFreqRange = envFreqRange
            .filter(function (val) {
            return val;
        })
            .sort();
        var averageEnvFreq = envFreqRange.length
            ? envFreqRange.reduce(function (p, c) {
                return Math.min(p, c);
            }, 1)
            : options.minNoiseLevel || 0.1;
        baseLevel = averageEnvFreq * options.avgNoiseMultiplier;
        if (options.minNoiseLevel && baseLevel < options.minNoiseLevel)
            baseLevel = options.minNoiseLevel;
        if (options.maxNoiseLevel && baseLevel > options.maxNoiseLevel)
            baseLevel = options.maxNoiseLevel;
        voiceScale = 1 - baseLevel;
    }
    function connect() {
        source.connect(analyser);
        analyser.connect(scriptProcessorNode);
        if (destination)
            scriptProcessorNode.connect(destination);
        else
            scriptProcessorNode.connect(audioContext.destination);
    }
    function disconnect() {
        scriptProcessorNode.disconnect();
        analyser.disconnect();
        source.disconnect();
        if (destination) {
            destination.disconnect();
            source.connect(destination);
        }
    }
    function destroy() {
        captureTimeout && clearTimeout(captureTimeout);
        disconnect();
        scriptProcessorNode.onaudioprocess = null;
    }
    function monitor(event) {
        if (destination) {
            for (var channel = 0; channel < event.outputBuffer.numberOfChannels; channel++) {
                var inputData = event.inputBuffer.getChannelData(channel);
                var outputData = event.outputBuffer.getChannelData(channel);
                for (var sample = 0; sample < event.inputBuffer.length; sample++) {
                    // make output equal to the same as the input
                    outputData[sample] = inputData[sample];
                }
            }
        }
        var frequencies = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(frequencies);
        var average = analyserFrequency(analyser, frequencies, options.minCaptureFreq, options.maxCaptureFreq);
        if (isNoiseCapturing) {
            envFreqRange.push(average);
            return;
        }
        if (average >= baseLevel && activityCounter < activityCounterMax) {
            activityCounter++;
        }
        else if (average < baseLevel && activityCounter > activityCounterMin) {
            activityCounter--;
        }
        vadState = activityCounter > activityCounterThresh;
        if (prevVadState !== vadState) {
            vadState ? onVoiceStart() : onVoiceStop();
            prevVadState = vadState;
        }
        options.onUpdate(Math.max(0, average - baseLevel) / voiceScale);
    }
    function onVoiceStart() {
        options.onVoiceStart();
    }
    function onVoiceStop() {
        options.onVoiceStop();
    }
    return { destination: analyser, connect: connect, destroy: destroy, options: options, init: init };
}
exports["default"] = default_1;
