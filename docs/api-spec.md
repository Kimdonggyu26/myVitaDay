# API 명세서

## 1. 목적

이 문서는 VitaDay MVP에서 먼저 구현할 API의 요청 형식과 응답 구조를 정리한 문서입니다.

이 문서의 목표는 다음과 같습니다.

- 프론트엔드와 백엔드가 같은 응답 구조를 기준으로 개발한다.
- 검색, 상세, 비교, 저장 흐름을 끊김 없이 구현한다.
- 나중에 기능이 늘어나도 P0 API 범위를 흔들리지 않게 유지한다.

## 2. 기본 원칙

- 기준 Base URL 예시: `/api`
- 인증이 필요한 API는 `Authorization: Bearer {token}` 헤더 사용
- 응답은 JSON 기준
- 날짜/시간은 ISO-8601 문자열 기준
- 가격은 숫자로 내려주고, 통화 표시는 프론트에서 처리

## 3. 공통 응답 규칙

### 성공 응답 예시

```json
{
  "data": {
    "id": 1
  }
}
```

### 목록 응답 예시

```json
{
  "data": [
    {
      "id": 1
    }
  ],
  "meta": {
    "page": 1,
    "pageSize": 20,
    "total": 120
  }
}
```

### 에러 응답 예시

```json
{
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "존재하지 않는 제품입니다."
  }
}
```

## 4. 인증 API

### `POST /auth/signup`

#### 목적

- 회원가입

#### 요청 예시

```json
{
  "email": "user@example.com",
  "password": "password1234",
  "nickname": "vitauser"
}
```

#### 응답 예시

```json
{
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "nickname": "vitauser"
    },
    "accessToken": "jwt-access-token",
    "refreshToken": "jwt-refresh-token"
  }
}
```

### `POST /auth/login`

#### 목적

- 로그인

#### 요청 예시

```json
{
  "email": "user@example.com",
  "password": "password1234"
}
```

#### 응답 예시

```json
{
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "nickname": "vitauser"
    },
    "accessToken": "jwt-access-token",
    "refreshToken": "jwt-refresh-token"
  }
}
```

### `GET /me`

#### 목적

- 현재 로그인 사용자 조회

#### 응답 예시

```json
{
  "data": {
    "id": 1,
    "email": "user@example.com",
    "nickname": "vitauser"
  }
}
```

## 5. 카테고리 API

### `GET /categories`

#### 목적

- 검색 화면 추천 카테고리 조회

#### 응답 예시

```json
{
  "data": [
    {
      "id": 1,
      "name": "멀티비타민",
      "slug": "multivitamin"
    },
    {
      "id": 2,
      "name": "오메가3",
      "slug": "omega3"
    }
  ]
}
```

## 6. 제품 검색 API

### `GET /products/search?q={query}&category={slug}&page=1&pageSize=20`

#### 목적

- 제품명, 브랜드명 기준 검색
- 카테고리 필터링

#### 쿼리 파라미터

- `q`: 검색어, optional
- `category`: 카테고리 slug, optional
- `page`: 페이지 번호
- `pageSize`: 페이지 크기

#### 응답 예시

```json
{
  "data": [
    {
      "id": 101,
      "name": "트리플 오메가 밸런스",
      "brand": {
        "id": 11,
        "name": "VitaLabs"
      },
      "category": {
        "id": 2,
        "name": "오메가3",
        "slug": "omega3"
      },
      "summary": "오메가3와 비타민E를 함께 담은 제품",
      "keyIngredients": [
        {
          "name": "EPA + DHA",
          "amount": 600,
          "unit": "mg"
        }
      ],
      "lowestPrice": 21900,
      "saved": false,
      "compareSelected": false,
      "imageUrl": "https://example.com/product-101.png"
    }
  ],
  "meta": {
    "page": 1,
    "pageSize": 20,
    "total": 57
  }
}
```

#### 비고

- `saved`는 로그인 시에만 정확히 채워진다.
- `compareSelected`는 서버 응답보다 클라이언트 상태로 처리해도 된다.

## 7. 제품 상세 API

### `GET /products/{id}`

#### 목적

- 제품 상세 정보 조회

#### 응답 예시

```json
{
  "data": {
    "id": 101,
    "name": "트리플 오메가 밸런스",
    "brand": {
      "id": 11,
      "name": "VitaLabs"
    },
    "category": {
      "id": 2,
      "name": "오메가3",
      "slug": "omega3"
    },
    "summary": "오메가3와 비타민E를 함께 담은 제품",
    "servingPerDay": 2,
    "cautionText": "특정 질환이 있거나 약을 복용 중이면 전문가와 상담하세요.",
    "imageUrl": "https://example.com/product-101.png",
    "ingredients": [
      {
        "id": 301,
        "name": "EPA + DHA",
        "amount": 600,
        "unit": "mg",
        "displayText": "600 mg"
      },
      {
        "id": 302,
        "name": "Vitamin E",
        "amount": 11,
        "unit": "mg",
        "displayText": "11 mg a-TE"
      }
    ],
    "saved": false,
    "inMyRegimen": false
  }
}
```

## 8. 판매처 가격 API

### `GET /products/{id}/offers`

#### 목적

- 제품별 판매처 가격 조회

#### 응답 예시

```json
{
  "data": [
    {
      "id": 9001,
      "retailer": {
        "id": 1,
        "name": "쿠팡",
        "siteUrl": "https://www.coupang.com"
      },
      "price": 21900,
      "productUrl": "https://example.com/offer/9001",
      "available": true,
      "updatedAt": "2026-04-29T10:30:00Z"
    },
    {
      "id": 9002,
      "retailer": {
        "id": 2,
        "name": "네이버 스토어",
        "siteUrl": "https://smartstore.naver.com"
      },
      "price": 22800,
      "productUrl": "https://example.com/offer/9002",
      "available": true,
      "updatedAt": "2026-04-29T09:00:00Z"
    }
  ]
}
```

## 9. 제품 비교 API

### `GET /products/compare?ids=101,102`

#### 목적

- 2개 이상 제품 비교 데이터 조회

#### 규칙

- 최소 2개
- 최대 3개

#### 응답 예시

```json
{
  "data": {
    "products": [
      {
        "id": 101,
        "name": "트리플 오메가 밸런스",
        "brandName": "VitaLabs",
        "imageUrl": "https://example.com/product-101.png",
        "servingPerDay": 2,
        "summary": "오메가3와 비타민E를 함께 담은 제품",
        "lowestPrice": 21900
      },
      {
        "id": 102,
        "name": "퓨어 오메가1000",
        "brandName": "NutriCore",
        "imageUrl": "https://example.com/product-102.png",
        "servingPerDay": 1,
        "summary": "고함량 오메가3 집중 제품",
        "lowestPrice": 24500
      }
    ],
    "comparisonRows": [
      {
        "type": "price",
        "label": "최저가",
        "values": [
          "21900",
          "24500"
        ]
      },
      {
        "type": "ingredient",
        "label": "EPA + DHA",
        "values": [
          "600 mg",
          "1000 mg"
        ]
      }
    ]
  }
}
```

#### 비고

- `comparisonRows`는 프론트가 표로 바로 그리기 쉽게 만든 구조
- 가격은 실제 구현 시 문자열 대신 숫자와 포맷 필드를 분리해도 됨

## 10. 저장한 제품 API

### `POST /saved-products`

#### 목적

- 관심 제품 저장

#### 요청 예시

```json
{
  "productId": 101
}
```

#### 응답 예시

```json
{
  "data": {
    "id": 5001,
    "productId": 101,
    "createdAt": "2026-04-29T10:00:00Z"
  }
}
```

### `GET /saved-products`

#### 목적

- 저장한 제품 목록 조회

#### 응답 예시

```json
{
  "data": [
    {
      "id": 5001,
      "product": {
        "id": 101,
        "name": "트리플 오메가 밸런스",
        "brandName": "VitaLabs",
        "summary": "오메가3와 비타민E를 함께 담은 제품",
        "lowestPrice": 21900,
        "imageUrl": "https://example.com/product-101.png"
      },
      "createdAt": "2026-04-29T10:00:00Z"
    }
  ]
}
```

### `DELETE /saved-products/{id}`

#### 목적

- 저장 해제

#### 응답 예시

```json
{
  "data": {
    "deleted": true
  }
}
```

## 11. 내 영양제 API

### `POST /regimen-items`

#### 목적

- 제품을 현재 복용 중인 내 영양제로 등록

#### 요청 예시

```json
{
  "productId": 101,
  "intakeCountPerDay": 2,
  "memo": "아침 식후 복용"
}
```

#### 응답 예시

```json
{
  "data": {
    "id": 7001,
    "productId": 101,
    "intakeCountPerDay": 2,
    "memo": "아침 식후 복용",
    "active": true,
    "createdAt": "2026-04-29T10:10:00Z"
  }
}
```

### `GET /regimen-items`

#### 목적

- 현재 복용 중인 제품 목록 조회

#### 응답 예시

```json
{
  "data": [
    {
      "id": 7001,
      "product": {
        "id": 101,
        "name": "트리플 오메가 밸런스",
        "brandName": "VitaLabs",
        "imageUrl": "https://example.com/product-101.png"
      },
      "intakeCountPerDay": 2,
      "memo": "아침 식후 복용",
      "active": true,
      "createdAt": "2026-04-29T10:10:00Z"
    }
  ]
}
```

### `PATCH /regimen-items/{id}`

#### 목적

- 복용 횟수, 메모, 활성 상태 수정

#### 요청 예시

```json
{
  "intakeCountPerDay": 1,
  "memo": "저녁으로 변경",
  "active": true
}
```

#### 응답 예시

```json
{
  "data": {
    "id": 7001,
    "intakeCountPerDay": 1,
    "memo": "저녁으로 변경",
    "active": true
  }
}
```

### `DELETE /regimen-items/{id}`

#### 목적

- 내 영양제 목록에서 제거

#### 응답 예시

```json
{
  "data": {
    "deleted": true
  }
}
```

## 12. P1 분석 API 초안

### `GET /analysis/duplicates`

#### 목적

- 내 영양제 기준 중복 성분 분석

#### 응답 예시

```json
{
  "data": [
    {
      "ingredientName": "Vitamin C",
      "products": [
        {
          "productId": 201,
          "productName": "멀티비타민A"
        },
        {
          "productId": 202,
          "productName": "비타민C 1000"
        }
      ]
    }
  ]
}
```

## 13. 구현 우선순위

1. `POST /auth/signup`
2. `POST /auth/login`
3. `GET /categories`
4. `GET /products/search`
5. `GET /products/{id}`
6. `GET /products/{id}/offers`
7. `GET /products/compare`
8. `POST /saved-products`
9. `GET /saved-products`
10. `POST /regimen-items`
11. `GET /regimen-items`

## 14. 아직 고정하지 않은 항목

- 페이지네이션 방식: page 기반 또는 cursor 기반
- 비교 응답에서 성분 행 구조를 얼마나 일반화할지
- 가격 정보를 어느 판매처까지 보여줄지
- 토큰 재발급 정책 상세

## 15. 다음 단계

- 이 문서 기준으로 DTO 구조 정의
- Spring Boot 컨트롤러와 서비스 인터페이스 생성
- Expo 앱에서 API 클라이언트 타입 정의
