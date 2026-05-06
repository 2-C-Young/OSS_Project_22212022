## Plan: ALCOHOLIC 프로토타입 구현 계획 (DB 도입 버전)

초보자가 빠르게 모바일 반응형 프로토타입을 구축하면서도 실제 서버-클라이언트 통신 구조를 갖추기 위해 **React (Vite) + Tailwind CSS** (프론트엔드)와 **json-server 또는 SQLite** (백엔드/로컬DB)를 조합하여 시작합니다.

**Steps**
1. **프로젝트 초기화 및 기본 설정**: 
   - React + Vite 프로젝트 생성 및 Tailwind CSS 세팅.
   - 모바일 중심 레이아웃 컨테이너(Mobile-first) 퍼블리싱.
2. **로컬 DB 및 Mock Data 서버 구축**: 
   - 회원 정보(users) 및 주종별 데이터(drinks, 10개 내외)를 포함한 DB 스키마/JSON 작성.
   - `json-server` 등을 이용해 로컬 환경(예: `localhost:4000`)에 목업 API 서버 띄우기.
3. **핵심 UI 컴포넌트 개발**: 
   - 10개 내외의 주요 컴포넌트 (`NavBar`, `DrinkCard`, `FilterModal` 등) 및 페이지 구조(`Home`, `Login`, `Search`, `Profile`) 제작.
4. **추천 및 필터링 검색 로직 통신 구현**: 
   - 프론트엔드에서 사용자가 입력한 태그를 정리하여 백엔드(로컬 DB)로 데이터 요청(GET).
   - 일치도를 계산해 점수가 높은 순(추천 알고리즘)으로 정렬하여 UI에 렌더링.
5. **상태 관리 및 연동**: 
   - 회원가입, 로그인 세션 처리 및 즐겨찾기(POST/DELETE) 데이터베이스 연동.

**Component & Data Structure (10개 내외 핵심 구조)**
- **Pages**: 
  - `HomePage` (메인/추천 결과)
  - `LoginPage` (인증/회원가입)
  - `ProfilePage` (유저 닉네임, 내 즐겨찾기)
  - `SearchPage` (이름/태그 필터 검색)
  - `DrinkDetailPage` (술 상세 정보)
- **Shared Components**: 
  - `NavBar` (하단 네비게이션)
  - `DrinkCard` (목록용 술 아이템)
  - `FilterModal` (추천/검색을 위한 조건 입력 모달 팝업)
- **DB (Data Models)**: 
  - `User`: { id, nickname, password, favorites: [drinkIds] }
  - `Drink`: { id, name, category, sweetness_level, abv_range, scents: [], price, tastes: [], atmospheres: [] }

**Verification**
1. 백엔드(로컬 DB 서버, 예: `json-server`)를 실행하여 `GET /drinks`, `GET /users` 등이 잘 응답하는지 API 테스트.
2. 프론트엔드 개발 서버(`npm run dev`)를 실행하고 크롬 모바일 뷰로 반응형 화면 정상 출력 확인.
3. 웹페이지에서 로그인, 검색, 추천, 즐겨찾기 버튼을 눌렀을 때 실제 로컬 DB에 데이터가 기록되고 수정되는지 확인.

**Decisions**
- **로컬 DB 서버 도입**: HTTP 네트워크 요청 기반의 실제 서비스에 가까운 아키텍처 도입(`json-server` 활용).
- **추천 시스템**: 카테고리와 태그 일치도(Score)를 더해 내림차순 정렬하는 형태로 1차 구현.