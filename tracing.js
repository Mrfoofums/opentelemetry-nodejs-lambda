const opentelemetry = require('@opentelemetry/api');
const { LogLevel } = require("@opentelemetry/core");
const { NodeTracerProvider } = require("@opentelemetry/node");
const { SimpleSpanProcessor } = require("@opentelemetry/tracing");
const { CollectorTraceExporter} = require("@opentelemetry/exporter-collector");
const { B3Propagator } = require("@opentelemetry/core");

    const exporter = new CollectorTraceExporter({
        serviceName: 'lambda-otel',
        headers:{
            'Lightstep-Access-Token':'8EMd2HF/Pd62ZosIl8aI/mVOwoXYhvvf5bJ0OjMBpKwGwhelis9PVx15DYEEwE4NCzNNjBoEe8/J4Iiu9xtB/6vYttnpd9sB1szgB//O'
        },
        url:'https://ingest.lightstep.com:443/api/v2/otel/trace',
    });

    const provider = new NodeTracerProvider({
        logLevel: LogLevel.ERROR,
    });
    
    provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

    //Use b3 For Lightstep
    provider.register({
        propagator: new B3Propagator(), 
    });

const tracer = opentelemetry.trace.getTracer('tracer');

exports.tracing=tracer;
