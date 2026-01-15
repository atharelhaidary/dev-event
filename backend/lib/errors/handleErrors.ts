import { NextResponse } from 'next/server';

// /**
//  * Handle all errors in a consistent format
//  * @param error - unknown error object
//  * @returns NextResponse
//  */
export function handleError(error: unknown): NextResponse {
  // console.log('error,',error)

  // Handle other known Error instances
  if (error instanceof Error) {
    // MongoDB connection errors
    if (error.message.includes('mongodb')) {
      return NextResponse.json(
        { message: 'Database connection error' , error : error.message, status:500},
        { status: 500 }
      );
    }

    // Any other runtime error
    return NextResponse.json(
      { message: error.message, status:false },
      { status: 500 }
    );
  }

  // Catch-all for unknown error types
  return NextResponse.json(
    { message: 'Unknown error occurred' },
    { status: 500 }
  );
}
