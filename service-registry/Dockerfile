FROM openjdk:17-jdk-alpine
EXPOSE 8761
ADD target/service-registry-0.0.1-SNAPSHOT.jar registry-service.jar
ENTRYPOINT ["java","-jar","/registry-service.jar"]