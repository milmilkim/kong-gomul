# 리드미

## 컨벤션

- 카멜 케이스 사용 camelCase
- 생성자는 파스칼 케이스 PascalCase
- 상수는 대문자 스네이크 SYMBOLIC_NAME
- 변수는 명사, 함수/메소드는 현재형 동사로 시작
- url은 대시 케이스 dash-case

## 폴더

- root
  - client: 리액트 프로젝트
    - src
      - assets
        - json
          - book.json: 샘플 json
    - .prettierrc: 이 프로젝트의 프리티어 설정 파일
  - server: 노드 익스프레스 서버(가 될 예정...)

```
$ yarn install
```

### client 폴더에서

하던대로...

### server 폴더에서

```
$ yarn dev
```

서버와 클라이언트를 모두 실행

```
$ yarn server
```

서버만 실행

```
$ yarn client
```

클라이언트만 실행

## .prettierrc

```JSON
{
  "singleQuote": false,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 120
}
```
