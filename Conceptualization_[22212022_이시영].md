# 1. Conceptualization
<img width="1024" height="1024" alt="Image" src="https://github.com/user-attachments/assets/ac44be7f-73d3-4630-9934-ba0847f7048d" />

|||
| --- | --- |
| **Title** | **ALCOHOLIC** |
| **Student No** | **22212022** |
| **Name** | **이시영** |
| **E-mail** | **dder1998@naver.com** |

---

## Revision History

| Revision date | Version # | Description | Author |
|---|---|---|---|
| 03/26/2026 | v.1.00 | 초안 | 이시영 |

---

## Contents

1. [Business purpose](#1-business-purpose)
2. [System context diagram](#2-system-context-diagram)
3. [Use case list](#3-use-case-list)
4. [Concept of operation](#4-concept-of-operation)
5. [Problem statement](#5-problem-statement)
6. [Glossary](#6-glossary)
7. [References](#7-references)

---

## 1. Business purpose

### **1-1 Background:**

* 세상에는 술의 종류가 정말 많다. 한국에서 제일 많이 마시는 소주, 맥주, 요즘들어 인기가 더욱 많아진 위스키, 와인, 항상 아저씨들의 사랑을 받는 막걸리 등 정말 많은 종류의 술들이 세상에 있다. 심지어 같은 희석식 소주임에도 가게에서 볼 수 있는 종류가 최소 5가지이고, 편의점에서 파는 맥주의 종류만 보아도 20가지는 훌쩍 넘는다.

* 하지만 문제는 대부분의 사람들이 이 모든 술들을 접해보지 않는다는 것이다. 가게에 가면 늘 먹던 종류의 희석식 소주, 국내산 맥주만 먹게 된다. 집에서 혼술을 하더라도 편의점에 가면 너무나도 많은 종류의 맥주들과 증류식 소주들이 있다. 주량이 적거나 시간이 없어 다양한 술들을 많이 먹어보기 힘든 이들에게는 그 많은 종류의 술들을 모두 시도해본다는 것 자체가 재정적, 시간적 부담이 된다. 위스키나 고량주, 전통주같은 경우에는 도수가 굉장히 높고 가격도 매우 비싸다보니 쉽사리 손이 가기 힘들다. 칵테일도 위스키 바에 가지 않는 이상 집에서 만들어 먹기 힘들기 때문에 결국 쉽고 편한 소주와 맥주로 돌아가는 것이 현실이다.

* 이렇게나 많은 술들이 있지만 시간적, 비용적 측면에서 어려움을 겪는 사람들에게 쉽고 정확한 선택을 할 수 있도록 도와주고자 이 웹사이트를 개발하게 되었다.

### **1-2 Goals:**

* 사용자가 자신의 취향을 입력하면 그에 맞는 여러 가지 술들을 추천해준다. 맛, 향, 금액, 안주 등 여러 가지를 입력하여 저장되어있는 술 중 가장 정확도가 높은 술을 추천해준다. 또 그 술들을 자신의 리스트에 저장해두었다가 나중에 다시 열어볼 수 있게 한다.

### **1-3Target:**

* 술자리에서 매일 똑같은 소주와 맥주만 먹어 술에 질린 사람.
* 시간적, 비용적 여유가 부족하여 다양한 술을 시도해보기 힘든 사람.
* 술에 대한 경험이 부족하여 술의 다양한 종류에 대해 모르는 사람.

---

## 2. System context diagram

<img width="647" height="361" alt="Image" src="https://github.com/user-attachments/assets/826373a7-cc64-4883-8108-8a4d17379080" />

**User <-> System**
* Login / Logout
* Sign up
* Save favorite drink
* Delete favorite drink
* Search drink by type
* Search drink by name
* Show profile
* Show drink
* Recommend drink
  
**System <-> Database**
* Save profile
* Load profile
* Load drink's information

---

## 3. Use case list

### 1) Sign up

| 항목 | 내용 |
|---|---|
| Actor | User |
| Description | 사용자가 자신의 프로필을 만든다. |

### 2) Log in

| 항목 | 내용 |
|---|---|
| Actor | User |
| Description | 사용자가 자신의 아이디로 로그인 한다. |

### 3) Log out

| 항목 | 내용 |
|---|---|
| Actor | User |
| Description | 사용자가 로그아웃한다. |

### 4) Save favorite drink

| 항목 | 내용 |
|---|---|
| Actor | User |
| Description | 사용자가 자신이 좋아하는 술을 프로필에 저장한다. |

### 5) Delete favorite drink

| 항목 | 내용 |
|---|---|
| Actor | User |
| Description | 사용자가 자신의 프로필에 저장된 술을 삭제한다. |

### 6) Search drink by type

| 항목 | 내용 |
|---|---|
| Actor | User |
| Description | 사용자가 자신의 취향에 맞는 술을 검색한다. |

### 7) Search drink by name

| 항목 | 내용 |
|---|---|
| Actor | User |
| Description | 사용자가 자신이 찾고싶은 술을 이름으로 검색한다. |

### 8) Show profile

| 항목 | 내용 |
|---|---|
| Actor | System |
| Description | 사용자의 이름, 선호하는 술 리스트를 사용자에게 보여준다. |

### 9) Show drink

| 항목 | 내용 |
|---|---|
| Actor | System |
| Description | 사용자가 이름으로 찾는 술의 정보를 사용자에게 보여준다. |

### 10) Recommend drink

| 항목 | 내용 |
|---|---|
| Actor | System |
| Description | 사용자의 취향에 맞는 술의 정보를 사용자에게 보여준다. |

---

## 4. Concept of operation

### 1) Sign up

| 항목 | 내용 |
|---|---|
| Purpose | 등록되어있지 않은 회원의 경우 새로 프로필을 만들기 위함. |
| Approach | 웹에 들어와서 회원가입 버튼을 누르면 이름, ID, PW를 입력 후 확인 버튼을 누르면 등록되어있는 회원인지 확인 후 등록이 되어있지 않다면 새로 profile을 만들어준다. 등록되어있는 경우 이미 등록된 회원임을 보여준다. |
| Dynamics | 사용자가 처음 자신의 프로필을 생성하는 경우. |
| Goals | 회원가입 기능을 구현한다. |

### 2) Log in

| 항목 | 내용 |
|---|---|
| Purpose | 등록된 사용자인지 확인하고 회원정보를 불러온다. |
| Approach | 사용자가 로그인 시, ID, PW를 입력 후 로그인을 요청하면 서버에서 회원 정보를 조회 후 로그인에 성공하면 회원정보를 보여주고, 실패할 경우 왜 실패했는지 알려준다. |
| Dynamics | 웹에서 자신의 프로필로 로그인 하는 경우. |
| Goals | 로그인 기능을 구현한다. |

### 3) Log out

| 항목 | 내용 |
|---|---|
| Purpose | 로그인 되어있는 사용자가 로그아웃을 하기 위함. |
| Approach | 로그인 되어있는 사용자가 로그아웃 버튼을 누르면 로그아웃을 하게 함. |
| Dynamics | 로그인 되어있는 프로필에서 로그아웃 하는 경우. |
| Goals | 로그아웃 기능을 구현한다. |

### 4) Save favorite drink

| 항목 | 내용 |
|---|---|
| Purpose | 등록되어있는 사용자의 선호하는 술 리스트에 등록되지 않은 술을 추가할 수 있게 함. |
| Approach | 로그인 되어 있는 사용자가 추천받거나 검색하여 찾은 술에 추가버튼을 누르면 자신의 리스트에 저장되게 데이터베이스에 최신화한다. |
| Dynamics | 사용자가 자신의 술 리스트에 술을 추가하는 경우. |
| Goals | 사용자가 자신이 선호하는 술들을 자신의 프로필에 저장할 수 있도록 한다. |

### 5) Delete favorite drink

| 항목 | 내용 |
|---|---|
| Purpose | 등록되어있는 사용자의 선호하는 술 리스트에서 술을 삭제할 수 있게 한다. |
| Approach | 로그인 되어 있는 사용자가 자신의 선호하는 술 리스트에서 삭제하고 싶은 술의 삭제버튼을 누르면 리스트에서 제외시키고 데이터베이스에 최신화한다. |
| Dynamics | 사용자가 자신의 술 리스트에서 술을 삭제하는 경우. |
| Goals | 사용자가 자신이 더 이상 선호하지 않는 술을 자신의 프로필에서 삭제할 수 있도록 한다. |

### 6) Search drink by type

| 항목 | 내용 |
|---|---|
| Purpose | 사용자가 자신의 취향에 맞는 술을 추천받을 수 있도록 한다. |
| Approach | 술의 당도, 산미, 향, 도수, 술을 마시는 상황, 금액대를 입력하여 사용자의 술에대한 취향을 받아온다. |
| Dynamics | 사용자가 취향에 맞는 술을 추천받는 경우. |
| Goals | 술의 종류에따라 구분가능한 태그를 만들어 사용자의 취향을 분석한다. |

### 7) Search drink by name

| 항목 | 내용 |
|---|---|
| Purpose | 사용자가 술의 이름으로 술을 검색할 수 있게 한다. |
| Approach | 사용자가 술을 이름으로 검색할 때 술의 이름을 시스템에 전달한다. |
| Dynamics | 사용자가 술의 이름으로 술을 검색하는 경우. |
| Goals | 사용자가 입력한 술의 이름을 받고 비슷한 이름의 술들을 모두 검색하게 한다. |

### 8) Show profile

| 항목 | 내용 |
|---|---|
| Purpose | 사용자가 자신의 이름과 술 리스트를 확인할 수 있게 한다. |
| Approach | 사용자가 로그인을 성공하였을 때 자신의 닉네임과 선호하는 술 리스트를 볼 수 있게 데이터베이스에서 사용자의 정보를 불러온다. |
| Dynamics | 사용자가 자신의 프로필을 확인하려고 하는 경우. |
| Goals | 로그인되어있는 사용자의 프로필을 데이터베이스에서 가져오고 사용자에게 보여준다. |

### 9) Show drink

| 항목 | 내용 |
|---|---|
| Purpose | 사용자가 술을 이름으로 검색하였을 때 검색된 술들을 보여줌. |
| Approach | 데이터베이스에서 검색한 이름과 유사한 술들의 정보를 모두 가져와 사용자의 화면에 띄워준다. |
| Dynamics | 사용자가 검색한 이름에 맞는 술을 보는 경우. |
| Goals | 이름이 유사한 순서부터 차례대로 술들을 보여주는 기능을 구현한다. |

### 10) Recommend drink

| 항목 | 내용 |
|---|---|
| Purpose | 사용자가 추천받을 술들을 보여줌. |
| Approach | 데이터베이스에서 사용자의 취향에 가장 잘 맞는 일부 술들의 정보를 가져와 사용자의 화면에 띄워준다. |
| Dynamics | 사용자가 취향을 입력하고 술을 추천받는 경우. |
| Goals | 데이터베이스에서 태그와 가장 많이 일치하는 술부터 순서대로 사용자에 화면에 띄워준다. |

---

## 5. Problem statement

**문제 1. 취향의 다양성 문제**
술의 경우 쓴맛, 단맛 정도가 아니라 바닐라, 견과류, 타는 나무 등 맛과 향의 종류가 너무 많기 때문에 사용자의 취향에 정확하게 맞지 않는 술들이 추천될 수 있다.

**문제 2. 술의 많은 종류**
술의 종류가 너무 많기 때문에 추천해주는 술의 종류가 너무 많아져 정확하지 않을 수 있다.

---

## 6. Glossary

- **태그** – 술이 가지고있는 당도, 향, 도수, 가격, 술의 종류, 술을 마시는 상황, 같이 먹으면 좋은 안주 등 술의 특성을 의미함.
- **술 리스트** – 사용자가 검색하거나 추천받은 술을 저장하는 리스트.

---

## 7. References

1. 20세이상 1인당 알코올 소비 종류 통계 (출처: 국세통계연보, 국세청. 인구추계, 통계청)
   - https://www.khepi.or.kr/acs/acsStat/result?menuId=MENU01189&tableGubun=DATA040204
