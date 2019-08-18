export class ResponseJSON {
  public static successResponse(
    message: string,
    data: Array<object> | object = null,
    status: number = 200
  ): Promise<object> {
    return new Promise<any>(resolve => {
      resolve({
        status: status,
        message: message,
        data: data
      });
    });
  }

  public static failureResponse(
    message: string,
    status: number = 400
  ): Promise<object> {
    return new Promise<any>(resolve => {
      resolve({
        status: status,
        message: message
      });
    });
  }
}
