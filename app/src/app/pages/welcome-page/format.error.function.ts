export function formatErrorForDisplay(error: any): string {
  let errorMessage = 'An error occurred.';

  if (error instanceof Error) {
    errorMessage = `Error: ${error.message}\n\nStack Trace:\n${error.stack}`;
  } else if (typeof error === 'string') {
    errorMessage = `Error: ${error}`;
  } else if (typeof error === 'object' && error.message) {
    errorMessage = `Error: ${error.message}\n\nStack Trace:\n${error.stack}`;
  }

  return errorMessage;
}
