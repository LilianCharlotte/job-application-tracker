FROM openjdk:19

ENV ENVIRONMENT=prod

MAINTAINER Lilian Krieg Carreño <lilian.krieg@live.de>

EXPOSE 8080

ADD backend/target/app.jar app.jar

CMD [ "sh", "-c", "java -jar /app.jar" ]