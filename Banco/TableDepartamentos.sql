CREATE TABLE departamento
(
    descricao varchar(60) ,
    empresa int,
    id int NOT NULL
    AUTO_INCREMENT primary key,
    CONSTRAINT FK_departamento_empresa FOREIGN KEY
    (empresa) REFERENCES empresas
    (id)
);