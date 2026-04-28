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
- JPA
- Validation

### 데이터베이스

- PostgreSQL

### 외부 연동

- Firebase Cloud Messaging for push
- LLM API for AI 상담
- 제품 검색용 제휴 또는 수집 데이터 소스

## 2. 도메인 모델

### User

- id
- email
- password_hash
- nickname
- birth_year nullable
- gender nullable
- health_goal
- created_at

### SupplementProduct

- id
- name
- brand
- form
- serving_per_day
- caution_text

### Ingredient

- id
- name
- unit
- category

### SupplementIngredient

- id
- supplement_product_id
- ingredient_id
- amount

제품과 성분은 다대다 구조이므로 연결 테이블이 필요합니다.

### UserSupplement

- id
- user_id
- supplement_product_id nullable
- custom_name nullable
- intake_count_per_day
- memo nullable
- active
- created_at

직접 입력 제품도 받을 수 있도록 `supplement_product_id`는 nullable로 두고, 수동 입력명 `custom_name`을 허용합니다.

### RoutineSlot

- id
- user_id
- slot_code
- notify_time
- enabled

`slot_code`는 `MORNING_EMPTY`, `MORNING_AFTER_MEAL`, `LUNCH_AFTER_MEAL`, `DINNER_AFTER_MEAL`, `BEFORE_SLEEP` 같은 enum 성격으로 관리합니다.

### RoutineItem

- id
- routine_slot_id
- user_supplement_id

### IntakeLog

- id
- user_id
- user_supplement_id
- routine_slot_id
- intake_date
- taken
- taken_at nullable

## 3. 분석 로직 MVP 기준

### 중복 체크

- 사용자가 등록한 전체 영양제의 성분 목록을 합친다.
- 동일 성분이 2개 이상 제품에 포함되면 중복 후보로 표시한다.

### 부족 가능성

- 온보딩에서 선택한 건강 목표와 등록 영양제를 비교한다.
- 목표별 핵심 성분 템플릿과 대조해 빠진 성분군을 보여 준다.

예시:

- 피로 관리: 비타민 B군, 마그네슘, 비타민 C
- 수면 관리: 마그네슘, 테아닌
- 피부 관리: 비오틴, 비타민 C, 콜라겐

### 주의사항

- 카페인, 철분, 마그네슘, 오메가3 등 주요 성분에 대해 기본 복용 가이드를 룰 기반으로 제공한다.
- 의료 판단이 필요한 조합은 일반 경고 문구만 노출한다.

## 4. API 설계 초안

### 인증

- `POST /auth/signup`
- `POST /auth/login`
- `POST /auth/refresh`
- `GET /me`

### 영양제

- `GET /supplements/search?query=`
- `POST /user-supplements`
- `GET /user-supplements`
- `PATCH /user-supplements/{id}`
- `DELETE /user-supplements/{id}`

### 분석

- `GET /analysis/summary`

응답 예시 항목:

- duplicateIngredients
- missingCandidates
- cautions

### 루틴

- `POST /routines/generate`
- `GET /routines`
- `PATCH /routines/slots/{id}`

### 복용 체크

- `POST /intake-logs`
- `GET /intake-logs?date=2026-04-28`

### 구매

- `GET /products/recommendations`

## 5. API 응답 예시

```json
{
  "duplicateIngredients": [
    {
      "ingredientName": "Vitamin C",
      "products": ["A 멀티비타민", "C 비타민 1000"]
    }
  ],
  "missingCandidates": [
    {
      "ingredientName": "Magnesium",
      "reason": "수면 관리 목표 대비 등록 제품에 포함되지 않음"
    }
  ],
  "cautions": [
    {
      "title": "철분은 공복 복용 시 속이 불편할 수 있어요",
      "severity": "LOW"
    }
  ]
}
```

## 6. 구현 우선순위

1. 인증과 세션 유지
2. 영양제 등록과 목록
3. 성분 데이터 모델
4. 분석 API
5. 루틴 생성 API
6. 알림 스케줄링
7. AI 상담

## 7. 리스크와 대응

- 제품 데이터 부족
- 초기에는 직접 입력 허용으로 해결
- 분석 정확도 한계
- MVP에서는 룰 기반 분석으로 범위 제한
- 알림 이탈
- 오늘 루틴 화면과 체크 피드백 강화
- 의료 오해 가능성
- 안내 문구와 제한 고지 필수
