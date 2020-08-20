CREATE TABLE empresas (
    nome varchar(60),
    endereco varchar(180),
    CNPJ varchar(18) unique,
    cidade varchar(60),
    uf varchar(2),
    id int NOT NULL AUTO_INCREMENT,
    telefone varchar(15),
    email varchar(6),
    primary key (id)
);


