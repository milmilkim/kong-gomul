import BadRequestException from './BadRequestException.js';

class RegexHelper {
  /**
   * 값의 존재 여부 검사
   * @param {string} field 검사할 대상
   * @param {string} msg   값이 없을 경우 표시할 메시지 내용
   */

  value(field, msg) {
    const content = field;

    if (
      content === false ||
      content === undefined ||
      content === null ||
      (typeof content === 'string' && content.trim().length === 0)
    ) {
      throw new BadRequestException(msg);
    }

    return true;
  }

  /**
   * 입력값이 지정된 글자수를 초과했는지 검사
   * @param {string}  field  검사할 대상
   * @param {int}     length    최대 글자수
   * @param {string}  msg       값이 없을 경우 표시될 메시지
   */
  maxLength(field, len, msg) {
    this.value(field, msg);

    const content = field;

    if (content.trim().length > len) {
      throw new BadRequestException(msg, field);
    }

    return true;
  }

  /**
   * 입력값이 지정된 글자수 미만인지 검사
   * @param {string}  field  검사할 대상
   * @param {int}     len       최소 글자수
   * @param {string}  msg       값이 없을 경우 표시될 메시지
   */
  minLength(field, len, msg) {
    this.value(field, msg);

    let content = field;

    if (content.trim().length < len) {
      throw new BadRequestException(msg, field);
    }

    return true;
  }

  /**
   * 출생연도 유효성 검사
   */

  birthYear(field, msg) {
    const content = parseInt(field);

    const nowYear = new Date().getFullYear();

    if (content > nowYear || content < nowYear - 100 || typeof content !== 'number') {
      throw new BadRequestException(msg, field);
    }
  }

  /**
   * 입력값이 'F'와 'M'중 하나인지 검사
   */

  gender(field, msg) {
    const content = field;

    if (content !== 'F' && field !== 'M') {
      throw new BadRequestException(msg, field);
    }
  }

  /**
   * 입력값이 정규표현식을 충족하는지 검사
   * @param {string}  field  검사할 대상
   * @param {string}  msg       표시할 메시지
   * @param {object}  regexExpr 검사할 정규표현식
   */

  field(field, msg, regexExpr) {
    this.value(field, msg);

    const content = field;
    const src = content.trim();

    // 입력값에 대한 정규표현식 검사가 실패하면?
    if (!regexExpr.test(src)) {
      throw new BadRequestException(msg, field);
    }

    return true;
  }

  /**
   * 최소 8, 최대16자, 문자 특수문자 숫자 포함
   * */

  password(field, msg) {
    return this.field(field, msg, /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/);
  }

  /**
   * 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)
   */
  id(field, msg) {
    return this.field(field, msg, /^[A-Za-z0-9-_]{5,20}$/);
  }

  /**
   * 숫자로만 이루어졌는지 검사하기 위해 field()를 간접적으로 호출한다.
   * @param {string}  field  검사할 대상
   * @param {string}  msg       표시할 메시지
   */
  num(field, msg) {
    return this.field(field, msg, /^[0-9]*$/);
  }

  /**
   * 영문으로만 이루어졌는지 검사하기 위해 field()를 간접적으로 호출한다.
   * @param {string}  field  검사할 대상
   * @param {string}  msg       표시할 메시지
   */
  eng(field, msg) {
    return this.field(field, msg, /^[a-zA-Z]*$/);
  }

  /**
   * 한글로만 이루어졌는지 검사하기 위해 field()를 간접적으로 호출한다.
   * @param {string}  field  검사할 대상
   * @param {string}  msg       표시할 메시지
   */
  kor(field, msg) {
    return this.field(field, msg, /^[ㄱ-ㅎ가-힣]*$/);
  }

  /**
   * 영문과 숫자로 이루어졌는지 검사하기 위해 field()를 간접적으로 호출한다.
   * @param {string}  field  검사할 대상
   * @param {string}  msg       표시할 메시지
   */
  engNum(field, msg) {
    return this.field(field, msg, /^[a-zA-Z0-9]*$/);
  }

  /**
   * 한글과 숫자로만 이루어졌는지 검사하기 위해 field()를 간접적으로 호출한다.
   * @param {string}  field  검사할 대상
   * @param {string}  msg       표시할 메시지
   */
  korNum(field, msg) {
    return this.field(field, msg, /^[ㄱ-ㅎ가-힣0-9]*$/);
  }

  /**
   * 이메일주소 형식인지 검사하기 위해 field()를 간접적으로 호출한다.
   * @param {string}  field  검사할 대상
   * @param {string}  msg       표시할 메시지
   */
  email(field, msg) {
    return this.field(field, msg, /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[az]{2})?)$/i);
  }

  /**
   * 핸드폰번호 형식인지 검사하기 위해 field()를 간접적으로 호출한다.
   * @param {string}  field  검사할 대상
   * @param {string}  msg       표시할 메시지
   */
  cellphone(field, msg) {
    return this.field(field, msg, /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/);
  }

  /**
   * 집전화 형식인지 검사하기 위해 field()를 간접적으로 호출한다.
   * @param {string}  field  검사할 대상
   * @param {string}  msg       표시할 메시지
   */
  tellphone(field, msg) {
    return this.field(field, msg, /^\d{2,3}\d{3,4}\d{4}$/);
  }

  /**
   * 핸드폰번호 형식과 집전화 형식 중 하나를 충족하는지 검사하기 위해 field()를 간접적으로 호출한다.
   * @param {string}  field  검사할 대상
   * @param {string}  msg       표시할 메시지
   */
  phone(field, msg) {
    this.value(field, msg);

    const content = field.value.trim();
    let check1 = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/; // 핸드폰 형식
    let check2 = /^\d{2,3}\d{3,4}\d{4}$/; //집전화 형식

    //둘 다 아니라면
    if (!check1.test(content) && !check2.test(content)) {
      throw new BadRequestException(msg, field);
    }
    return true; // 성공했음을 리턴
  }

  /**
   * 두 값이 동일한지 검사
   * @param {string}  origin  원본에 대한 CSS 선택자
   * @param {string}  compare 검사 대상에 대한 CSS 선택자
   * @param {string}  msg     검사에 실패할 경우 표시할 메시지
   */
  compareTo(origin, compare, msg) {
    this.value(origin, msg);
    this.value(compare, msg);

    let src = origin.trim(); // 원본값을 가져온다.
    let dsc = compare.trim(); // 비교할 값을 가져온다.

    if (src !== dsc) {
      throw new BadRequestException(msg, origin);
    }

    return true; // 성공했음을 리턴
  }
}

export default new RegexHelper();
