"use client"
import ErrorComp from "@/frontend/shared/components/feedback/ErrorComp";

type  TErrorProps = {
  error: Error
  onRetry: () => void
}

const Error = ({error, onRetry}: TErrorProps ) => {
  
  return (
     <ErrorComp message={ error.message } onClick={()=>onRetry()}/>
  )
}
export default Error;