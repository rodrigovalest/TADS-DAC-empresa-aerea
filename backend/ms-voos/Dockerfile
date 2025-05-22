FROM maven:3-openjdk-17-slim AS builder
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests && find /app -type f -name "*.jar"

FROM openjdk:17-jdk
WORKDIR /app
COPY --from=builder /app/ms-voos/target/ms-voos-1.0-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
