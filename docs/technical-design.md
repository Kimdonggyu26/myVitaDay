# 기술 설계

## 1. 아키텍처 제안

### 모바일 앱

- Expo React Native
- React Navigation
- TanStack Query
- Zustand 또는 Context 기반 세션 상태

### 백엔드

- Spring Boot
- Spring Security + JWT
- Spring Data JPA
- Validation

### 데이터베이스

- PostgreSQL

### 검색

- 초기에는 PostgreSQL Full Text 또는 Trigram 검색
- 카탈로그가 커지면 Elasticsearch 검토

### 외부 연동

- 가격 데이터 입력 소스
- 구매 링크 제휴 소스
- P2 이후 Firebase Cloud Messaging

## 2. 핵심 시스템 구조

### Catalog

- 제품, 브랜드, 카테고리, 성분, 함량 관리

### Search

- 제품명과 브랜드명 검색
- 카테고리 탐색

### Comparison

- 제품 간 성분, 함량, 가격 비교

### Offers

- 판매처별 가격과 구매 링크 관리

### User Library

- 관심 제품 저장
- 현재 복용 제품 등록

### Analysis and Routine

- P1 이후 중복 성분 분석
- P2 이후 루틴과 알림

## 3. 도메인 모델

### User

- id
- email
- password_hash
- nickname
- created_at

### Brand

- id
- name

### ProductCategory

- id
- name
- slug

### Product

- id
- brand_id
- category_id
- name
- summary
- serving_per_day
- caution_text
- image_url
- active
- created_at

### Ingredient

- id
- name
- unit
- category

### ProductIngredient

- id
- product_id
- ingredient_id
- amount
- display_text

### Retailer

- id
- name
- site_url

### ProductOffer

- id
- product_id
- retailer_id
- price
- product_url
- updated_at
- available

### UserSavedProduct

- id
- user_id
- product_id
- created_at

### UserRegimenItem

- id
- user_id
- product_id
- intake_count_per_day
- memo
- active
- created_at

### RoutineSlot

- id
- user_id
- slot_code
- notify_time
- enabled

### RoutineItem

- id
- routine_slot_id
- user_regimen_item_id

## 4. API 설계 초안

### 인증

- `POST /auth/signup`
- `POST /auth/login`
- `POST /auth/refresh`
- `GET /me`

### 제품 카탈로그

- `GET /products/search?q=`
- `GET /products/{id}`
- `GET /products/{id}/offers`
- `GET /products/compare?ids=1,2`
- `GET /categories`

### 저장

- `POST /saved-products`
- `GET /saved-products`
- `DELETE /saved-products/{id}`

### 내 영양제

- `POST /regimen-items`
- `GET /regimen-items`
- `PATCH /regimen-items/{id}`
- `DELETE /regimen-items/{id}`

### 분석

- `GET /analysis/duplicates`

### 루틴

- `POST /routines/generate`
- `GET /routines`

## 5. 검색 MVP 기준

- 제품명 우선 검색
- 브랜드명 보조 검색
- 정확도보다 빠른 탐색 경험을 우선
- 인기 제품 가중치 정렬은 추후 적용 가능

## 6. 가격 데이터 MVP 기준

- 일부 판매처만 운영
- 가격과 링크는 별도 테이블로 관리
- 갱신 시각을 반드시 저장

## 7. 리스크와 대응

- 데이터가 부족하면 검색 가치가 떨어진다
- 초기에는 카테고리와 대표 제품 집중 전략으로 대응
- 가격이 오래되면 신뢰가 깨진다
- 갱신 시각 표시와 운영 점검 필요
- 성분 정규화가 무너지면 비교 품질이 떨어진다
- 표준 성분명 관리 필요
