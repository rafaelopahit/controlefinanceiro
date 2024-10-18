FROM ubuntu/apache2:2.4-22.04_beta

ENV FILE_VERSION=0001

LABEL maintainer="Rafael Dantas Fortes | Dockerfile configuration - v ${FILE_VERSION}"

ENV PHP_VERSION=8.2

ENV SYSTEM_INFORMATION="ubuntu"

ENV SYSTEM_VERSION=22.04

RUN apt-get update
RUN apt-get install software-properties-common -y && apt-get install apt-utils curl gnupg2 openssl nano wget  apt-utils curl software-properties-common libldap2-dev gnupg2  \
    libmcrypt-dev zip unzip libbz2-dev php-pear  -y

# Php installation acordlly version.

RUN  add-apt-repository ppa:ondrej/php -y  \
    && apt-get remove php* -y && apt update && apt install libapache2-mod-php$PHP_VERSION php$PHP_VERSION php$PHP_VERSION-xml  \
    php$PHP_VERSION-cli php$PHP_VERSION-dev php$PHP_VERSION-common \
    php$PHP_VERSION-zip php$PHP_VERSION-gd php$PHP_VERSION-curl \
    php$PHP_VERSION-xml php$PHP_VERSION-bcmath php$PHP_VERSION-pdo libxml2-dev php$PHP_VERSION-soap \
    php$PHP_VERSION-xmlrpc php$PHP_VERSION-imagick \
    php$PHP_VERSION-mbstring php$PHP_VERSION-opcache \
    php$PHP_VERSION-intl php$PHP_VERSION-ldap php$PHP_VERSION-mysql php$PHP_VERSION-pdo -y

WORKDIR /var/www/html

RUN a2dismod php* && a2enmod php$PHP_VERSION && a2enmod rewrite && service apache2 restart

RUN apt-get install -y composer

EXPOSE 80

CMD ["apachectl", "-D", "FOREGROUND"]







