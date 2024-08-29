create database postgres;
create user postgres with encrypted password '1234';
alter user postgres createdb;
grant all privileges on database postgres to postgres;