FROM openjdk:17

MAINTAINER Tizian tizianappler@yahoo.de

ADD target/shopping-cart.jar shopping-cart.jar

CMD [ "sh", "-c", "java -Dserver.port=$PORT -Dspring.data.mongodb.uri=$URI -jar /shopping-cart.jar" ]

EXPOSE 8080