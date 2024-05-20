FROM openjdk:17-jdk-alpine
EXPOSE 8760
ADD target/gateway-3.2.2.jar gateway.jar
ENTRYPOINT ["java","-jar","/gateway.jar"]

