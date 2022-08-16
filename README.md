# 콩고물

`콩고물`은 만화와 장르소설 리뷰와 별점을 남기고, 관련도 높은 책을 추천해주는 서비스입니다.

[https://kong20220725.tk/](https://kong20220725.tk/)

테스트 계정:

아이디: test\_account

비밀번호: test!1234

[https://github.com/milmilkim/kong-gomul](https://github.com/milmilkim/kong-gomul)

## 개발 기간

2022.06.01~2022.07.28

## Stack

### Language

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

프론트엔드와 백앤드 모두 자바스크립트로 개발했습니다.

### Front-End

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)

프론트엔드는 `React.js`를 사용해 SPA로 개발되었으며 `Redux`로 일부 상태값을 관리합니다. `Styled Components` 로 컴포넌트를 스타일링합니다.

### Back-End

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

백엔드는 `Node.js`와 `Express.js`기반입니다. `RDBMS`로 `MySQL`을 사용하였으며 `ORM`은 `Sequelize`를 사용했습니다.  
로그인은 `JWT` 토큰 인증 방식이며, `OAuth.2.0` 기반의 소셜(카카오, 구글)로그인 또한 지원합니다.

책 데이터는 RIDI에서 장르별로 약 1000권씩 `axios`와 `cheerio`로 스크랩했습니다. 

### Deploy

![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

이미지 업로드와 정적 호스팅은 `S3`, 데이터베이스는 `RDS`, 서버는 `EC2`를 이용하여 배포했습니다. `AWS Certificate Manager`를 통해 인증서를 발급해 https를 적용했고 `Elastic Load Balancer`와 `Cloud Front`를 연동했습니다.

<div align="center">


![image](https://user-images.githubusercontent.com/65494214/181287776-b21c2bc1-7812-4c4d-b654-7351b7489f03.png)
![image](https://user-images.githubusercontent.com/65494214/181289158-7b96c917-d976-4498-adc1-f45dd49e996d.png)
![image](https://user-images.githubusercontent.com/65494214/184814511-6d89acc9-3ab4-406c-ae3d-9eb3f4a25d96.png)



</div>
