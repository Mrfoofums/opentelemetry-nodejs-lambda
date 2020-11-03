const {tracing } = require("./tracing.js");

exports.handler = async (event, context, callback) => {

    const tracer = tracing;
    const span = tracer.startSpan('Test Span');
    span.setAttribute("body", event.body);
    span.setAttribute("headers",event.headers)
    span.end();
    return 'A returned value'
};