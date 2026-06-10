# VitaDay

VitaDay is a mobile-first supplement search and comparison app prototype.
Users can search products, compare ingredients and prices, save what they take,
and later expand into routine management and intake tracking.

## Product Direction

- Main value: supplement search, detail, comparison, and price check
- Next layer: personal recommendations, duplicate analysis, routine, and alerts
- Long-term vision: a trusted supplement catalog and comparison experience

## Core User Flow

1. Search for a supplement or browse by category, goal, or brand.
2. Check product details such as ingredients, dosage, and price.
3. Compare multiple products side by side.
4. Save products or register current supplements for tracking.
5. Review routine and intake-related guidance.

## Tech Stack

- Mobile: Expo + React Native
- Backend API: Spring Boot
- Database: PostgreSQL
- Auth: JWT + Refresh Token
- Notifications: Firebase Cloud Messaging

## Repository Structure

- `apps/mobile`: Expo mobile app prototype
- `apps/backend`: Spring Boot backend scaffold
- `docs`: planning, screen specs, API specs, and technical docs

## Documents

- [MVP Spec](./docs/mvp-spec.md)
- [PRD](./docs/prd.md)
- [Screen Spec](./docs/screen-spec.md)
- [API Spec](./docs/api-spec.md)
- [User Flows](./docs/user-flows.md)
- [Feature Priority](./docs/feature-priority.md)
- [Data Strategy](./docs/data-strategy.md)
- [Risk Checklist](./docs/risk-checklist.md)
- [Technical Design](./docs/technical-design.md)
- [Schema](./docs/schema.sql)

## Current Scope

### Phase 1

- Product search
- Product detail
- Product comparison
- Marketplace price view
- Saved products
- Current supplement registration

### Phase 2

- Duplicate ingredient analysis
- Deficiency guidance
- Intake routine
- Notifications and check tracking

## Not Included Yet

- Full real-time price crawling from every marketplace
- Medical diagnosis features
- Pharmacist consultation operations
- Subscription commerce operations
- OCR-based supplement registration

