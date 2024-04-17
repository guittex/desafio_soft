-- MySQL dump 10.13  Distrib 5.7.39, for osx11.0 (x86_64)
--
-- Host: localhost    Database: desafio_soft
-- ------------------------------------------------------
-- Server version	5.7.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `imposto_produtos`
--

DROP TABLE IF EXISTS `imposto_produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `imposto_produtos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_produto_id` int(11) DEFAULT NULL,
  `imposto_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `imposto_produtos_produtos_FK` (`tipo_produto_id`),
  KEY `imposto_produtos_impostos_FK` (`imposto_id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imposto_produtos`
--

LOCK TABLES `imposto_produtos` WRITE;
/*!40000 ALTER TABLE `imposto_produtos` DISABLE KEYS */;
INSERT INTO `imposto_produtos` VALUES (30,1,44,'2024-04-17 14:14:23','2024-04-17 14:14:23'),(31,2,44,'2024-04-17 14:14:23','2024-04-17 14:14:23'),(32,10,44,'2024-04-17 14:14:23','2024-04-17 14:14:23'),(56,11,45,'2024-04-17 16:52:13','2024-04-17 16:52:13'),(57,12,45,'2024-04-17 16:52:13','2024-04-17 16:52:13'),(58,13,45,'2024-04-17 16:52:13','2024-04-17 16:52:13'),(59,14,45,'2024-04-17 16:52:13','2024-04-17 16:52:13'),(60,15,45,'2024-04-17 16:52:13','2024-04-17 16:52:13'),(62,1,46,'2024-04-17 18:24:38','2024-04-17 18:24:38');
/*!40000 ALTER TABLE `imposto_produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `impostos`
--

DROP TABLE IF EXISTS `impostos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `impostos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(240) NOT NULL,
  `valor` float(10,2) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `impostos`
--

LOCK TABLES `impostos` WRITE;
/*!40000 ALTER TABLE `impostos` DISABLE KEYS */;
INSERT INTO `impostos` VALUES (44,'IR',25.00,'2024-04-17 14:06:36','2024-04-17 14:14:23'),(45,'IRPF',50.00,'2024-04-17 14:06:50','2024-04-17 16:52:13');
/*!40000 ALTER TABLE `impostos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `produtos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(240) NOT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `modified_at` varchar(100) DEFAULT NULL,
  `tipo_produto_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `produtos_tipo_produtos_FK` (`tipo_produto_id`),
  CONSTRAINT `produtos_tipo_produtos_FK` FOREIGN KEY (`tipo_produto_id`) REFERENCES `tipo_produtos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES (1,'Chocolate',10.00,'2024-04-12 17:21:00','2024-04-17 12:42:15',2),(2,'Café',5.00,'2024-04-12 17:58:00','2024-04-17 12:41:10',12),(3,'Arroz',6.00,'2024-04-12 22:42:57','2024-04-17 12:41:19',12),(4,'Escova',3.50,'2024-04-12 22:43:31','2024-04-17 12:41:23',14),(7,'Creme dental',5.50,'2024-04-12 22:45:50','2024-04-17 12:41:27',10),(15,'TV',1500.00,'2024-04-12 23:36:47','2024-04-17 12:42:11',13),(16,'Miojo de Carne',3.00,'2024-04-13 04:28:17','2024-04-17 12:42:21',11),(17,'Cadeira',30.00,'2024-04-13 22:03:14','2024-04-17 12:42:26',15),(33,'Vassoura',6.50,'2024-04-16 11:02:59','2024-04-17 12:42:03',1);
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_produtos`
--

DROP TABLE IF EXISTS `tipo_produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_produtos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(240) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_produtos`
--

LOCK TABLES `tipo_produtos` WRITE;
/*!40000 ALTER TABLE `tipo_produtos` DISABLE KEYS */;
INSERT INTO `tipo_produtos` VALUES (1,'Limpeza','2024-04-14 02:00:14','2024-04-16 23:25:15'),(2,'Doce','2024-04-14 02:02:30','2024-04-14 02:02:30'),(10,'Higiene','2024-04-16 10:21:15','2024-04-16 10:21:15'),(11,'Carne','2024-04-16 10:21:25','2024-04-16 10:21:25'),(12,'Comida','2024-04-16 11:26:20','2024-04-16 11:26:20'),(13,'Eletrônicos','2024-04-16 11:26:49','2024-04-16 11:26:49'),(14,'Eletrodomestico','2024-04-16 11:26:55','2024-04-16 11:26:55'),(15,'Móveis','2024-04-16 11:27:20','2024-04-16 11:27:20');
/*!40000 ALTER TABLE `tipo_produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venda_itens`
--

DROP TABLE IF EXISTS `venda_itens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `venda_itens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `produto_id` int(11) DEFAULT NULL,
  `valor_liquido` decimal(10,2) DEFAULT NULL,
  `valor_imposto` decimal(10,2) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  `venda_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `venda_itens_produtos_FK` (`produto_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venda_itens`
--

LOCK TABLES `venda_itens` WRITE;
/*!40000 ALTER TABLE `venda_itens` DISABLE KEYS */;
INSERT INTO `venda_itens` VALUES (1,1,7.50,2.50,'2024-04-17 17:20:54','2024-04-17 17:20:54',8),(2,2,2.50,2.50,'2024-04-17 17:20:54','2024-04-17 17:20:54',8),(3,1,7.50,2.50,'2024-04-17 17:36:27','2024-04-17 17:36:27',9),(4,2,2.50,2.50,'2024-04-17 17:36:27','2024-04-17 17:36:27',9),(5,15,750.00,750.00,'2024-04-17 17:36:27','2024-04-17 17:36:27',9),(6,4,1.75,1.75,'2024-04-17 18:20:40','2024-04-17 18:20:40',10),(7,7,4.13,1.38,'2024-04-17 18:20:40','2024-04-17 18:20:40',10),(8,7,4.13,1.38,'2024-04-17 18:20:40','2024-04-17 18:20:40',10),(9,7,4.13,1.38,'2024-04-17 18:20:51','2024-04-17 18:20:51',11),(10,17,15.00,15.00,'2024-04-17 18:20:51','2024-04-17 18:20:51',11),(11,15,750.00,750.00,'2024-04-17 18:21:06','2024-04-17 18:21:06',12),(12,33,4.88,1.63,'2024-04-17 18:21:14','2024-04-17 18:21:14',13),(13,1,7.50,2.50,'2024-04-17 18:21:30','2024-04-17 18:21:30',14),(14,1,7.50,2.50,'2024-04-17 18:21:30','2024-04-17 18:21:30',14),(15,2,2.50,2.50,'2024-04-17 18:21:40','2024-04-17 18:21:40',15),(16,4,1.75,1.75,'2024-04-17 18:21:40','2024-04-17 18:21:40',15),(17,16,1.50,1.50,'2024-04-17 18:21:49','2024-04-17 18:21:49',16),(18,16,1.50,1.50,'2024-04-17 18:21:49','2024-04-17 18:21:49',16),(19,15,750.00,750.00,'2024-04-17 18:22:00','2024-04-17 18:22:00',17),(20,1,7.50,2.50,'2024-04-17 18:22:25','2024-04-17 18:22:25',18);
/*!40000 ALTER TABLE `venda_itens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendas`
--

DROP TABLE IF EXISTS `vendas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vendas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `valor_total_venda` decimal(10,2) DEFAULT NULL,
  `valor_total_imposto` decimal(10,2) DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendas`
--

LOCK TABLES `vendas` WRITE;
/*!40000 ALTER TABLE `vendas` DISABLE KEYS */;
INSERT INTO `vendas` VALUES (8,15.00,5.00,'2024-04-17 17:20:54','2024-04-17 17:20:54'),(9,1515.00,755.00,'2024-04-17 17:36:27','2024-04-17 17:36:27'),(10,14.50,4.50,'2024-04-17 18:20:40','2024-04-17 18:20:40'),(11,35.50,16.38,'2024-04-17 18:20:51','2024-04-17 18:20:51'),(12,1500.00,750.00,'2024-04-17 18:21:06','2024-04-17 18:21:06'),(13,6.50,1.63,'2024-04-17 18:21:14','2024-04-17 18:21:14'),(14,20.00,5.00,'2024-04-17 18:21:30','2024-04-17 18:21:30'),(15,8.50,4.25,'2024-04-17 18:21:40','2024-04-17 18:21:40'),(16,6.00,3.00,'2024-04-17 18:21:49','2024-04-17 18:21:49'),(17,1500.00,750.00,'2024-04-17 18:22:00','2024-04-17 18:22:00'),(18,10.00,2.50,'2024-04-17 18:22:25','2024-04-17 18:22:25');
/*!40000 ALTER TABLE `vendas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'desafio_soft'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-17 18:54:07
