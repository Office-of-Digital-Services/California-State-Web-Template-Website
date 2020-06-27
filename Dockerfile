FROM httpd:latest

COPY ./httpd.conf /usr/local/apache2/conf
COPY . /usr/local/apache2/htdocs/

RUN rm /usr/local/apache2/htdocs/httpd.conf
