# 1단계: React 프론트엔드 빌드
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# 2단계: Spring Boot 백엔드 빌드
FROM gradle:8.7-jdk17 AS backend-builder
WORKDIR /app

# Gradle 캐시를 활용하기 위해 설정 파일 먼저 복사
COPY backend/build.gradle backend/settings.gradle* backend/gradlew ./backend/
COPY backend/gradle ./backend/gradle
RUN chmod +x ./backend/gradlew

# 백엔드 소스코드 복사
COPY backend/src ./backend/src

# 1단계에서 빌드된 React 정적 파일을 복사
# backend/build.gradle의 copyReactBuildFiles 태스크가 이 위치(../frontend/dist)를 참조하여 복사합니다.
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# 백엔드 빌드 실행
WORKDIR /app/backend
RUN ./gradlew bootJar --no-daemon -x test

# 3단계: 런타임 환경 구성
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=backend-builder /app/backend/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
