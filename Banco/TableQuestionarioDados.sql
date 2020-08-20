CREATE TABLE questionario_dados (
 id int NOT NULL AUTO_INCREMENT,
 usuario int ,
 descricao varchar(200) ,
 status int ,
 usuariosolicitante int ,
 datainicio date ,
 sigilo tinyint ,
 datafinal date ,
 departamento int ,
 PRIMARY KEY (id),
 KEY FK_quest_dpt (departamento),
 KEY FK_quest_user (usuariosolicitante)
);