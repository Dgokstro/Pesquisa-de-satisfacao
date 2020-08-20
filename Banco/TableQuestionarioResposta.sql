CREATE TABLE questionario_respostas (
 id int NOT NULL AUTO_INCREMENT,
 questionario_item int ,
 usuario int ,
valor int ,
 PRIMARY KEY (id),
 KEY FK_quest_resposta_itens (questionario_item),
 KEY FK_quest_resposta_user (usuario),
 CONSTRAINT FK_quest_resposta_itens FOREIGN KEY
 (questionario_item) REFERENCES questionario_itens (id),
 CONSTRAINT FK_quest_resposta_user FOREIGN KEY (usuario)
 REFERENCES usuario (id)
);