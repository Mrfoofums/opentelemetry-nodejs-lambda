import { LogLevel, B3Propagator } from "@opentelemetry/core";
import { CollectorTraceExporter } from "@opentelemetry/exporter-collector/build/src/platform/node/CollectorTraceExporter";
import { NodeTracerProvider } from "@opentelemetry/node/build/src/NodeTracerProvider";
import { SimpleSpanProcessor } from "@opentelemetry/tracing";
import { opentelemetry } from "lightstep-opentelemetry-launcher-node";

declare var process : {
    env: {
      ACCESS_TOKEN: string
    }
  }
    const exporter = new CollectorTraceExporter({
        serviceName: 'lambda-otel',
        headers:{
            'Lightstep-Access-Token':process.env.ACCESS_TOKEN
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

 export const tracer = opentelemetry.trace.getTracer('tracer');
