import { 
    APIGatewayProxyEvent, 
    APIGatewayProxyResult 
  } from "aws-lambda";
import {tracer} from './tracing'

export const handler = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    
    const queries = JSON.stringify(event.queryStringParameters);
    const span = tracer.startSpan('handler');
    tracer.withSpan(span, ()=>{
      someWork();
      span.setAttribute("body", event.body);
      span.setAttribute("headers",event.headers)
      span.end();
    })
    return {
      statusCode: 200,
      body: `A working typescript Lambda response`
    }
  }

const someWork= () =>{
  const span = tracer.startSpan('someWork');
  tracer.withSpan(span, ()=>{
    moreWork()
    span.end()
  })
}

const moreWork= () =>{
  const span = tracer.startSpan('moreWork');
  span.end()
}

