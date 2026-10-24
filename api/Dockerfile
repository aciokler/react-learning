FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml ./
RUN chmod +x mvnw && ./mvnw -q dependency:go-offline
COPY src ./src
EXPOSE 9090
CMD ["./mvnw", "spring-boot:run"]
