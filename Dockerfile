FROM openjdk:17

MAINTAINER Tizian tizianappler@yahoo.de

ADD backend/target/shoppingcart-cart.jar shopping-cart.jar

CMD [ "sh", "-c", "java -Dserver.port=$PORT -Dspring.data.mongodb.uri=$URI -jar /shopping-cart.jar" ]

EXPOSE 8080