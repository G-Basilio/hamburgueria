-- Bebidas
INSERT INTO bebida (descricao, preco_unitario, contem_acucar) VALUES ('Coca-Cola 350ml', 5.50, true);
INSERT INTO bebida (descricao, preco_unitario, contem_acucar) VALUES ('Guaraná Antarctica', 4.00, true);
INSERT INTO bebida (descricao, preco_unitario, contem_acucar) VALUES ('Água Mineral sem Gás', 3.00, false);

-- Ingredientes
INSERT INTO ingrediente (descricao, preco_unitario, adicional) VALUES ('Bacon em Tiras', 3.00, true);
INSERT INTO ingrediente (descricao, preco_unitario, adicional) VALUES ('Hambúrguer Bovino 180g', 0.00, false);
INSERT INTO ingrediente (descricao, preco_unitario, adicional) VALUES ('Pão Brioche', 0.00, false);

-- Hambúrgueres
INSERT INTO hamburguer (descricao, valor) VALUES ('X-Bacon Duplo', 35.50);
INSERT INTO hamburguer (descricao, valor) VALUES ('Cheeseburger Simples', 22.00);