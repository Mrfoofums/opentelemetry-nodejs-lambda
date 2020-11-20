import { 
    APIGatewayProxyEvent, 
    APIGatewayProxyResult 
  } from "aws-lambda";
import {tracer} from './tracing'

export const Handler = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    
    const queries = JSON.stringify(event.queryStringParameters);
    const span = tracer.startSpan('Test Span');
    span.setAttribute("body", event.body);
    span.setAttribute("headers",event.headers)
    span.end();

    return {
      statusCode: 200,
      body: `A working typescript Lambda response`
    }
  }