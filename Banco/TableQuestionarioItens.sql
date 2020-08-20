CREATE TABLE questionario_itens (
 id int NOT NULL AUTO_INCREMENT,
 questionario int ,
 sequencia int ,
 descricao varchar(200) ,
 tipo int ,
 PRIMARY KEY (id),
 KEY FK_quest_Itens_dados (questionario),
 CONSTRAINT FK_quest_Itens_dados FOREIGN KEY (questionario)
REFERENCES questionario_dados (id)
) ;