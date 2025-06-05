FROM gradle:8.7.0-jdk17-alpine AS builder

WORKDIR /workspace
COPY gradle /workspace/gradle
COPY gradlew /workspace/gradlew
COPY build.gradle /workspace/build.gradle
COPY settings.gradle /workspace/settings.gradle
RUN ./gradlew --no-daemon build -x test || return 0

COPY . .
RUN ./gradlew --no-daemon build -x test

FROM openjdk:17-alpine
WORKDIR /app
COPY --from=builder /workspace/build/libs/shorturl.jar /app/shorturl.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","shorturl.jar"]