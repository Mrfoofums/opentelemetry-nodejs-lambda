import { 
    APIGatewayProxyEvent, 
    APIGatewayProxyResult 
  } from "aws-lambda";
import {tracer} from './tracing'
import axios from 'axios'

export const handler = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    
    const span = tracer.startSpan('handler');
    tracer.withSpan(span, ()=>{
      transformingData();
      span.setAttribute("body", event.body);
      span.setAttribute("headers",event.headers)
      span.end();
    })

    return {
      statusCode: 200,
      body: `A working typescript Lambda response`
    }
  }

const transformingData = () => {
  const span = tracer.startSpan('transformingData');
   tracer.withSpan(span, ()=>{
    requestToApiWrapper()
    span.end()
  })
}

const requestToApiWrapper = async ()  =>{
  const apiSpan = tracer.startSpan('requestToApiWrapper');
  try{
    let response = await axios.get('http://jsonplaceholder.typicode.com/todos/1');
    apiSpan.addEvent('response', response.data);
  } catch(error){
    apiSpan.addEvent('error', error)
    apiSpan.setAttribute('error', true);
  } finally{
    apiSpan.end();
  }
}





