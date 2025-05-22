# Etapa 1: build com Maven
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests && find /app -type f -name "*.jar"

# Etapa 2: imagem final para rodar o JAR do módulo ms-auth
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=builder /app/ms-cliente/target/ms-cliente-1.0-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
