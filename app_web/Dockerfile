FROM ubuntu/apache2:2.4-22.04_beta

ENV FILE_VERSION=0002

LABEL maintainer="Rafael Dantas Fortes | Dockerfile configuration - v ${FILE_VERSION}"

ENV GRADLE_VERSION=6.3

ENV PHP_VERSION=8.2

ENV SYSTEM_INFORMATION="ubuntu"

ENV SYSTEM_VERSION=22.04

ENV ANDROID_BUILD_TOOLS_LEVEL=34.0.0

ARG APACHE_PORT=7230

ARG NODE_VERSION=18

ENV ANDROID_HOME="/opt/Android"

#COPY . /var/www/html

# Standard installations.


RUN apt-get update
RUN apt-get install software-properties-common -y && apt-get install apt-utils curl gnupg2 openssl nano wget  apt-utils curl software-properties-common libldap2-dev gnupg2  \
    libmcrypt-dev zip unzip libbz2-dev php-pear  -y

# Php installation acordlly version.

RUN  add-apt-repository ppa:ondrej/php -y  \
    && apt update && apt install libapache2-mod-php$PHP_VERSION php$PHP_VERSION php$PHP_VERSION-xml  \
    php$PHP_VERSION-cli php$PHP_VERSION-dev php$PHP_VERSION-common \
    php$PHP_VERSION-zip php$PHP_VERSION-gd php$PHP_VERSION-curl \
    php$PHP_VERSION-xml php$PHP_VERSION-bcmath php$PHP_VERSION-pdo libxml2-dev php$PHP_VERSION-soap \
    php$PHP_VERSION-xmlrpc php$PHP_VERSION-imagick \
    php$PHP_VERSION-mbstring php$PHP_VERSION-opcache \
    php$PHP_VERSION-intl php$PHP_VERSION-ldap php$PHP_VERSION-mysql php$PHP_VERSION-pdo -y


# Node and NPM installation.

RUN curl -sL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash - && apt install nodejs && npm install -g cordova && npm install -g ionic -y

# Android environment installation.

RUN apt-get install -y openjdk-17-jdk && \
apt-get install -y ant && \
apt-get clean && \
apt-get update && apt-get install -y wget && \
apt-get install ca-certificates-java && \
apt-get clean && \
update-ca-certificates \
echo ANDROID_HOME="${ANDROID_HOME}" >> /etc/environment 
ENV PATH $PATH:$JAVA_HOME/bin/
COPY ./dockerconf/apache2.conf /etc/apache2/apache2.conf
COPY ./dockerconf/ports.conf /etc/apache2/ports.conf
RUN  service apache2 stop && service apache2 start 
RUN yes Y | wget 'https://dl.google.com/android/repository/commandlinetools-linux-6200805_latest.zip' -P /tmp && yes Y | unzip -d /opt/Android /tmp/commandlinetools-linux-6200805_latest.zip 
RUN yes Y | /opt/Android/tools/bin/sdkmanager --sdk_root=/opt/Android "build-tools;${ANDROID_BUILD_TOOLS_LEVEL}" 
#RUN yes Y | /opt/Android/tools/bin/sdkmanager --licenses
WORKDIR /var/www/html/platforms/browser/www
RUN npm install -g @angular/cli
#RUN ng add @ionic/cordova-builders
RUN apt-get install gradle -y 
RUN export PATH=${PATH}:${ANDROID_HOME}/tools:${ANDROID_HOME}/platform-tools
RUN npm i -g native-run -y
#RUN cd /opt/Android/build-tools/${ANDROID_BUILD_TOOLS_LEVEL} \
# && mv d8 dx \
# && cd lib  \
#  && mv d8.jar dx.jar


RUN a2dismod php* && a2enmod php$PHP_VERSION && a2enmod rewrite && service apache2 restart
#RUN rm -rf composer.lock
#RUN composer update
EXPOSE 80
CMD ["apachectl", "-D", "FOREGROUND"]







