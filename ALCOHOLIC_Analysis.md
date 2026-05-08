# ALCOHOLIC — Analysis Document

**Title:** ALCOHOLIC  
**Student No:** 22212022  
**Name:** 이시영  
**E-mail:** dder1998@naver.com  
**University:** Yeungnam University

---

## Revision History

| Revision Date | Version # | Description | Author |
|---|---|---|---|
| 05/02/2026 | 1.00 | 초안 | 이시영 |

---

## Contents

1. Introduction
2. Use Case Analysis
3. Domain Analysis
4. User Interface Prototype
5. Glossary
6. References

---

## 1. Introduction

### 1) Executive Summary

세상에는 수많은 종류의 주류가 존재하지만, 많은 사람들이 익숙한 소주나 맥주만을 소비하며 자신에게 맞는 다양한 술을 접할 기회가 부족합니다. 직접 마셔보지 않고서는 취향을 찾기 힘들고 주량이 적은 사람들에게는 많은 시도가 부담이 될 수 있습니다. 이러한 문제를 해결하고 사람들에게 다양한 주류 경험을 제공하기 위해, 개인의 취향과 마시는 상황에 맞춰 술을 추천해주는 웹 시스템인 **"ALCOHOLIC"** 을 개발하게 되었습니다.

### 2) Business Goals

"ALCOHOLIC" 시스템의 주된 목적은 사용자가 자신의 취향(맛, 향, 당도, 금액, 안주 등)과 상황을 입력하면 그에 맞는 가장 정확도 높은 주류를 추천해주는 것입니다. 추천받은 술이나 직접 검색한 술을 자신만의 리스트에 저장하여 지속적으로 관리할 수 있게 함으로써, 입맛에 맞는 술을 찾지 못했거나 경험이 부족한 타겟층에게 훌륭한 주류 가이드 역할을 제공합니다.

### 3) Technical Goals

이 시스템은 웹 기반으로 동작하며, 사용자의 계정과 '선호하는 술 리스트'를 연동하기 위한 회원가입 및 로그인 기능을 포함합니다. 술의 특성을 나타내는 '태그(당도, 향, 도수 등)'를 기반으로 사용자의 취향을 분석하는 알고리즘과 검색 기능을 구현해야 합니다. 이를 위해 데이터베이스에서 사용자 정보와 주류 정보를 효율적으로 조회하고 화면에 띄워주는 시스템 처리가 요구됩니다.

---

## 2. Use Case Analysis

### 2.1 Use Case Diagram

> 사용자(User) 액터와 시스템 간의 상호작용을 나타낸 다이어그램.  
> 포함된 유스케이스: Log out, Sign up, Log in, Save favorite drink, Delete favorite drink, Show favorite drinks, Search drink by type, Search drink by name, Show drink

### 2.2 Use Case List

| Use Case Name | Use Case ID | Korean Name | Actor |
|---|---|---|---|
| Sign up | #1 | 회원가입 | User |
| Log in | #2 | 로그인 | User |
| Log out | #3 | 로그아웃 | User |
| Save favorite drink | #4 | 선호 주류 저장 | User |
| Delete favorite drink | #5 | 선호 주류 삭제 | User |
| Search drink by type | #6 | 취향별 주류 검색 | User |
| Search drink by name | #7 | 이름별 주류 검색 | User |
| Show profile | #8 | 프로필 표시 | System |
| Show drink | #9 | 주류 정보 표시 | System |
| Recommend drink | #10 | 주류 추천 표시 | System |

### 2.3 Use Case Description

---

#### Use Case #1: Sign up

| 항목 | 내용 |
|---|---|
| **Summary** | 등록되어있지 않은 회원의 경우 새로 프로필을 만들기 위함. |
| **Scope** | ALCOHOLIC |
| **Level** | User level |
| **Author** | 이시영 |
| **Last Update** | 05/02/2026 |
| **Status** | Under Review |
| **Primary Actor** | User |
| **Secondary Actors** | Server |
| **Preconditions** | 시스템에 처음 접속한 상태. |
| **Trigger** | 사용자가 회원가입 버튼을 누르는 경우 |
| **Success Post Condition** | 사용자의 프로필이 서버에 등록되지 않은 경우. |
| **Failed Post Condition** | 등록되어있는 경우 같은 프로필을 재생성할 수 없다. |

**Main Success Scenario**

| Step | Action |
|---|---|
| 1 | 웹에 들어와서 회원가입 버튼을 누른다. |
| 2 | 이름, ID, PW를 입력 후 확인 버튼을 누른다. |
| 3 | 등록되어있는 회원인지 확인한다. |
| 4 | 등록이 되어있지 않다면 데이터베이스에 새로 profile을 생성한다. |

**Extension Scenarios**

| Step | Branching Action |
|---|---|
| 3 | 3a. 이미 시스템에 등록되어있는 회원인 경우. → 3a1. 화면에 이미 등록된 회원임을 보여준다. |

**Related Information:** Performance ≤ 3 Seconds / Due Date: 2026-06-20

---

#### Use Case #2: Log in

| 항목 | 내용 |
|---|---|
| **Summary** | 등록된 사용자인지 확인하고 회원정보를 불러온다. |
| **Scope** | ALCOHOLIC |
| **Level** | User level |
| **Author** | 이시영 |
| **Last Update** | 05/02/2026 |
| **Status** | Under Review |
| **Primary Actor** | User |
| **Secondary Actors** | Server |
| **Preconditions** | 회원가입(프로필 생성)을 마친 상태. |
| **Trigger** | 로그인 버튼을 누르는 경우. |
| **Success Post Condition** | 로그인에 성공하면 회원 기능 이용 가능. |
| **Failed Post Condition** | 서버에 회원의 정보가 등록되어있지 않은 경우 로그인 불가. |

**Main Success Scenario**

| Step | Action |
|---|---|
| 1 | 사용자가 로그인 시, ID, PW를 입력한다. |
| 2 | 로그인을 요청한다. |
| 3 | 서버에서 회원 정보를 조회한다. |
| 4 | 로그인에 성공하면 사용자 화면에 회원정보를 보여준다. |

**Extension Scenarios**

| Step | Branching Action |
|---|---|
| 3 | 3a. 아이디나 비밀번호가 틀려 로그인에 실패할 경우. → 3a1. 왜 실패했는지 안내 메시지를 보여준다. |

**Related Information:** Performance ≤ 1 Seconds / Due Date: 2026-06-20

---

#### Use Case #3: Log out

| 항목 | 내용 |
|---|---|
| **Summary** | 로그인 되어있는 사용자가 로그아웃을 하기 위함. |
| **Scope** | ALCOHOLIC |
| **Level** | User level |
| **Author** | 이시영 |
| **Last Update** | 05/02/2026 |
| **Status** | Under Review |
| **Primary Actor** | User |
| **Secondary Actors** | Server |
| **Preconditions** | 시스템에 정상적으로 로그인 되어 있는 상태. |
| **Trigger** | 로그인 되어있는 프로필에서 로그아웃 하는 경우. |
| **Success Post Condition** | 사용자가 로그아웃을 하게 함. |
| **Failed Post Condition** | 인터넷 연결이 끊긴 경우 로그아웃 처리가 지연될 수 있음. |

**Main Success Scenario**

| Step | Action |
|---|---|
| 1 | 로그인 되어있는 사용자가 로그아웃 버튼을 누른다. |
| 2 | 시스템에서 세션을 종료하고 로그아웃을 하게 함. |

**Extension Scenarios**

| Step | Branching Action |
|---|---|
| 2 | 2a. 인터넷 연결에 문제가 있는 경우. → 2a1. 로그아웃 실패 메시지를 보여준다. |

**Related Information:** Performance ≤ 1 Seconds / Due Date: 2026-06-20

---

#### Use Case #4: Save Favorite Drink

| 항목 | 내용 |
|---|---|
| **Summary** | 등록되어있는 사용자의 선호하는 술 리스트에 등록되지 않은 술을 추가할 수 있게 함. |
| **Scope** | ALCOHOLIC |
| **Level** | User level |
| **Author** | 이시영 |
| **Last Update** | 05/02/2026 |
| **Status** | Under Review |
| **Primary Actor** | User |
| **Secondary Actors** | Server |
| **Preconditions** | 시스템에 로그인 되어 있는 상태. |
| **Trigger** | 사용자가 자신의 술 리스트에 술을 추가하는 경우. |
| **Success Post Condition** | 자신의 리스트에 저장되게 데이터베이스에 최신화한다. |
| **Failed Post Condition** | 이미 리스트에 존재하는 술일 경우 저장이 취소된다. |

**Main Success Scenario**

| Step | Action |
|---|---|
| 1 | 로그인 되어 있는 사용자가 추천받거나 검색하여 찾은 술에 접근한다. |
| 2 | 해당 술의 추가버튼을 누른다. |
| 3 | 시스템이 자신의 리스트에 저장되게 데이터베이스에 최신화한다. |

**Extension Scenarios**

| Step | Branching Action |
|---|---|
| 3 | 3a. 이미 리스트에 등록된 주류인 경우. → 3a1. 이미 저장된 술이라는 알림을 보여준다. |

**Related Information:** Performance ≤ 1 Seconds / Due Date: 2026-06-20

---

#### Use Case #5: Delete Favorite Drink

| 항목 | 내용 |
|---|---|
| **Summary** | 등록되어있는 사용자의 선호하는 술 리스트에서 술을 삭제할 수 있게 한다. |
| **Scope** | ALCOHOLIC |
| **Level** | User level |
| **Author** | 이시영 |
| **Last Update** | 05/02/2026 |
| **Status** | Under Review |
| **Primary Actor** | User |
| **Secondary Actors** | Server |
| **Preconditions** | 로그인 상태이며 리스트에 하나 이상의 술이 등록되어 있는 상태. |
| **Trigger** | 사용자가 자신의 술 리스트에서 술을 삭제하는 경우. |
| **Success Post Condition** | 리스트에서 제외시키고 데이터베이스에 최신화한다. |
| **Failed Post Condition** | 데이터베이스 통신 오류 시 삭제가 반영되지 않는다. |

**Main Success Scenario**

| Step | Action |
|---|---|
| 1 | 로그인 되어 있는 사용자가 자신의 선호하는 술 리스트에 들어간다. |
| 2 | 삭제하고 싶은 술의 삭제버튼을 누른다. |
| 3 | 시스템이 해당 술을 리스트에서 제외시키고 데이터베이스에 최신화한다. |

**Extension Scenarios**

| Step | Branching Action |
|---|---|
| 3 | 3a. 인터넷과 연결되어 있지 않은 경우. → 3a1. 작업이 실패했다는 메시지를 띄워준다. |

**Related Information:** Performance ≤ 1 Seconds / Due Date: 2026-06-20

---

#### Use Case #6: Search Drink by Type

| 항목 | 내용 |
|---|---|
| **Summary** | 사용자가 자신의 취향에 맞는 술을 추천받을 수 있도록 한다. |
| **Scope** | ALCOHOLIC |
| **Level** | User level |
| **Author** | 이시영 |
| **Last Update** | 05/02/2026 |
| **Status** | Under Review |
| **Primary Actor** | User |
| **Secondary Actors** | Server |
| **Preconditions** | 검색을 위한 취향 태그 정보가 시스템에 준비되어 있어야 함. |
| **Trigger** | 사용자가 취향에 맞는 술을 추천받는 경우. |
| **Success Condition** | 술의 종류에 따라 구분가능한 태그를 만들어 사용자의 취향을 분석한다. |
| **Failed Condition** | 조건에 부합하는 술이 하나도 없을 경우 결과가 없음을 알림. |

**Main Success Scenario**

| Step | Action |
|---|---|
| 1 | 술의 당도, 산미, 향, 도수, 술을 마시는 상황, 금액대를 입력한다. |
| 2 | 시스템이 입력된 정보를 바탕으로 사용자의 술에 대한 취향을 받아온다. |

**Extension Scenarios**

| Step | Branching Action |
|---|---|
| 2 | 2a. 일치하는 데이터가 없는 경우. → 2a1. 가장 유사도가 높은 차선책의 주류를 추천한다. |

**Related Information:** Performance ≤ 3 Seconds / Due Date: 2026-06-20

---

#### Use Case #7: Search Drink by Name

| 항목 | 내용 |
|---|---|
| **Summary** | 사용자가 술의 이름으로 술을 검색할 수 있게 한다. |
| **Scope** | ALCOHOLIC |
| **Level** | User level |
| **Author** | 이시영 |
| **Last Update** | 05/02/2026 |
| **Status** | Under Review |
| **Primary Actor** | User |
| **Secondary Actors** | Server |
| **Preconditions** | 시스템에 검색창이 활성화되어 있어야 함. |
| **Trigger** | 사용자가 술의 이름으로 술을 검색하는 경우. |
| **Success Condition** | 사용자가 입력한 술의 이름을 받고 비슷한 이름의 술들을 모두 검색하게 한다. |
| **Failed Condition** | 검색된 이름이 없을 경우 결과 없음 화면 출력. |

**Main Success Scenario**

| Step | Action |
|---|---|
| 1 | 사용자가 술을 이름으로 검색창에 입력한다. |
| 2 | 입력한 술의 이름을 시스템에 전달한다. |
| 3 | 시스템이 데이터베이스에서 비슷한 이름의 술들을 검색한다. |

**Extension Scenarios**

| Step | Branching Action |
|---|---|
| 3 | 3a. 정확히 일치하는 이름이 없는 경우. → 3a1. 오타를 교정하거나 부분적으로 이름이 일치하는 술들을 대신 검색한다. |

**Related Information:** Performance ≤ 3 Seconds / Due Date: 2026-06-20

---

#### Use Case #8: Show Favorite Drinks

| 항목 | 내용 |
|---|---|
| **Summary** | 사용자가 자신의 이름과 술 리스트를 확인할 수 있게 한다. |
| **Scope** | ALCOHOLIC |
| **Level** | User level |
| **Author** | 이시영 |
| **Last Update** | 05/02/2026 |
| **Status** | Under Review |
| **Primary Actor** | System |
| **Secondary Actors** | Server |
| **Preconditions** | 시스템에 로그인 되어 있는 상태. |
| **Trigger** | 사용자가 자신의 프로필을 확인하려고 하는 경우. |
| **Success Condition** | 로그인되어있는 사용자의 프로필을 데이터베이스에서 가져오고 사용자에게 보여준다. |
| **Failed Condition** | 서버 접속 실패 시 프로필 정보를 불러올 수 없음. |

**Main Success Scenario**

| Step | Action |
|---|---|
| 1 | 사용자가 로그인을 성공하거나 프로필 페이지로 이동한다. |
| 2 | 자신의 닉네임과 선호하는 술 리스트를 볼 수 있게 데이터베이스에서 사용자의 정보를 확인한다. |
| 3 | 불러온 정보를 화면에 보여준다. |

**Extension Scenarios**

| Step | Branching Action |
|---|---|
| 2 | 2a. 인터넷 연결에 문제가 있는 경우. → 2a1. 데이터베이스 접근 오류 메시지를 띄워준다. |

**Related Information:** Performance ≤ 3 Seconds / Due Date: 2026-06-20

---

#### Use Case #9: Show Drink

| 항목 | 내용 |
|---|---|
| **Summary** | 사용자가 술을 이름으로 검색하였을 때 검색된 술들을 보여줌. |
| **Scope** | ALCOHOLIC |
| **Level** | User level |
| **Author** | 이시영 |
| **Last Update** | 05/02/2026 |
| **Status** | Under Review |
| **Primary Actor** | System |
| **Secondary Actors** | Server |
| **Preconditions** | 검색 결과(이름 검색)가 도출된 상태. |
| **Trigger** | 사용자가 검색한 이름에 맞는 술을 보는 경우. |
| **Success Condition** | 이름이 유사한 순서부터 차례대로 술들을 보여주는 기능을 구현한다. |
| **Failed Condition** | 검색 결과가 화면에 렌더링되지 않음. |

**Main Success Scenario**

| Step | Action |
|---|---|
| 1 | 데이터베이스에서 검색한 이름과 유사한 술들의 정보를 모두 가져온다. |
| 2 | 시스템이 이름 유사도가 높은 순서대로 정보를 정렬한다. |
| 3 | 결과값을 사용자의 화면에 띄워준다. |

**Extension Scenarios**

| Step | Branching Action |
|---|---|
| 1 | 1a. 서버 통신에 실패하는 경우. → 1a1. 결과를 가져오지 못했다는 경고창을 표시한다. |

**Related Information:** Performance ≤ 3 Seconds / Due Date: 2026-06-20

---

#### Use Case #10: Recommend Drink

| 항목 | 내용 |
|---|---|
| **Summary** | 사용자가 추천받을 술들을 보여줌. |
| **Scope** | ALCOHOLIC |
| **Level** | User level |
| **Author** | 이시영 |
| **Last Update** | 05/02/2026 |
| **Status** | Under Review |
| **Primary Actor** | System |
| **Secondary Actors** | Server |
| **Preconditions** | 사용자가 취향 태그 입력을 완료한 상태. |
| **Trigger** | 사용자가 취향을 입력하고 술을 추천받는 경우. |
| **Success Condition** | 데이터베이스에서 태그와 가장 많이 일치하는 술부터 순서대로 사용자 화면에 띄워준다. |
| **Failed Condition** | 추천 시스템 알고리즘 에러 발생 시 결과를 띄우지 못함. |

**Main Success Scenario**

| Step | Action |
|---|---|
| 1 | 데이터베이스에서 사용자의 취향에 가장 잘 맞는 일부 술들의 정보를 가져온다. |
| 2 | 태그와 가장 많이 일치하는 술부터 순서대로 정렬한다. |
| 3 | 사용자의 화면에 추천 결과를 띄워준다. |

**Extension Scenarios**

| Step | Branching Action |
|---|---|
| 2 | 2a. 태그 일치도가 낮아 추천의 정확성이 떨어지는 경우. → 2a1. 안내 메시지를 보여준다. |

**Related Information:** Performance ≤ 3 Seconds / Due Date: 2026-06-20

---

## 3. Domain Analysis

| # | Class | 설명 |
|---|---|---|
| 1 | **User** | 사용자의 id, password, nickname, favorite drinks를 저장하고 관리하는 클래스. |
| 2 | **Drinks** | 술의 id, name, category, 당도, 도수, 맛, 향, 가격, 분위기 등을 저장하는 클래스. |
| 3 | **Auth** | 사용자의 id 및 password를 등록하고 저장되어있는 정보를 바탕으로 로그인/로그아웃하는 클래스. |
| 4 | **DrinkService** | Drinks에 저장된 데이터를 바탕으로 고객에게 정보를 제공하는 클래스. |
| 5 | **Searchdrink** | DrinkService의 기능을 사용하여 술을 이름이나 취향으로 검색한 후 사용자에게 정보를 보여주는 클래스. 찾은 술을 favorite drink list에 저장 가능. |
| 6 | **SearchdrinkByName** | Searchdrink를 상속받아 이름으로 술을 검색하는 클래스. |
| 7 | **SearchdrinkByType** | Searchdrink를 상속받아 취향으로 술을 검색하는 클래스. 가격, 당도, 도수 등의 상세 정보를 기입하면 점수로 환산하여 가장 알맞은 술을 추천한다. |

---

## 4. User Interface Prototype

### 4.1 Homepage

처음 웹에 들어오면 나오는 페이지. 상단에는 홈, 즐겨찾기 버튼과 로그인, 회원가입 버튼이 있다. 중단에는 추천을 받을 수 있는 버튼, 하단에는 인기 주류를 카드 형태로 보여준다.

### 4.2 Log in

로그인 버튼을 누르면 등록되어있는 아이디와 비밀번호를 입력하여 로그인을 할 수 있다.

### 4.3 Sign up

회원가입 버튼을 누르면 이름, 아이디, 비밀번호를 입력하여 새로운 회원을 만들 수 있다.

### 4.4 Recommendation

추천받기 버튼을 누르면 가격대, 도수, 당도, 맛 태그를 이용하여 취향에 맞는 추천을 받을 수 있다. 선택한 것과 가장 가까운 것부터 보여준다.

### 4.5 Information

술 실물을 클릭하면 술의 상세정보를 볼 수 있는 페이지가 나온다. 술의 이름, 가격, 도수, 당도, 향과 맛의 태그, 추천 분위기를 보여준다.

### 4.6 Search Drink

검색하고 싶은 술의 이름을 입력하고 확인 버튼을 누를 수 있는 팝업. 예시: `참이슬`, `발베니`…

### 4.7 Show Drink

술을 검색하면 나오는 페이지. 이름이 포함되는 술을 화면에 띄워주고, 술을 클릭하면 상세정보 페이지로 넘어간다.

---

## 5. Glossary

| 용어 | 설명 |
|---|---|
| **tag (태그)** | 술이 가지고 있는 맛, 향, 분위기 등의 특성. |
| **즐겨찾기** | 사용자가 본인의 취향에 맞아 저장해둔 주류 목록. |
| **atmospheres (분위기)** | 술에 어울리는 상황이나 분위기. 예: 소주 → "삼겹살", "친구와" 등의 태그. |

---

## 6. References

1. 20세 이상 1인당 알코올 소비 종류 통계  
   출처: 국세통계연보(국세청), 인구추계(통계청)  
   https://www.khepi.or.kr/acs/acsStat/result?menuId=MENU01189&tableGubun=DATA040204
