CREATE TABLE questionario_respondido (
 id int NOT NULL AUTO_INCREMENT,
 questionario int ,
 usuario int ,
 dataresposta datetime ,
 obs varchar(200) ,
 PRIMARY KEY (id),
 KEY FK_quest_respondido_dados (questionario),
 KEY FK_quest_respondido_user (usuario),
 CONSTRAINT FK_quest_respondido_dados FOREIGN KEY
 (questionario) REFERENCES questionario_dados (id),
 CONSTRAINT FK_quest_respondido_user FOREIGN KEY (usuario)
 REFERENCES usuario (id)
);