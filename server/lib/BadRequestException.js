class BadRequestException extends Error {
  constructor(msg = '잘못된 요청입니다.', field = null) {
    super(msg);
    // 멤버변수 추가
    this._field = field;
  }
}

export default BadRequestException;
