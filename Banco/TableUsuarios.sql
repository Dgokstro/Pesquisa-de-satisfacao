CREATE TABLE usuario (
 id int NOT NULL AUTO_INCREMENT,
 Empresa int ,
 email varchar(60) ,
 status int ,
 senha varchar(20) ,
 tipo int ,
 departamento int ,
 nome varchar(60) ,
 PRIMARY KEY (id),
UNIQUE KEY usuariounico (email),
 KEY FK_usuario_empresa (Empresa),
 KEY FK_usuario_departamento (departamento),
 CONSTRAINT FK_usuario_departamento FOREIGN KEY
 (departamento) REFERENCES departamento (id),
 CONSTRAINT FK_usuario_empresa FOREIGN KEY (Empresa)
 REFERENCES empresas (id)
);