CREATE DATABASE  IF NOT EXISTS `hrms` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hrms`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: hrms
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `emp_id` varchar(10) DEFAULT NULL,
  `role_id` varchar(20) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `emp_id` (`emp_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `account_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `user_role` (`role_id`),
  CONSTRAINT `account_ibfk_2` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES ('admin','$2b$10$5KeDVxgQq/gVznAJ50VgXO14Ssg.khH4ryRyJcEGgTPkwEY0b7eQa',NULL,'r-001','2023-10-27 18:49:39','2023-10-27 18:48:37'),('u-001','$2b$10$jPPYDEvwf43IeaSPg9fXk.wLuTdGT1t1q9LDM.Y.GYMLGQaNTEb3m','e-001','r-002','2023-10-27 18:55:07','2023-10-27 18:55:07'),('u-002','$2b$10$xFKfM6Cl2h93JFvzt4Uac.geBjLWScZAeOVmQ3lcLvf3ZgxGpYE7u','e-002','r-003','2023-10-27 21:22:34','2023-10-27 21:22:34'),('u-003','$2b$10$EaggrS580FdaWf7f79QUCOrCzbGgmD9xW4JBOGEiPZjVD6rS5xARW','e-003','r-004','2023-10-27 21:24:40','2023-10-27 21:24:40'),('u-004','$2b$10$HmjigEJaG3LSj77WbNi2fuDR1Poy9SKKW0QrNXMRSpAEORiK.tMne','e-004','r-004','2023-10-30 06:47:40','2023-10-30 06:47:40'),('u-005','$2b$10$Ed29xFKP9FDtHUFmUUMituqVhgtC.QiWmEaSgm3kaJRWT.IOGQUKS','e-005','r-003','2023-10-30 06:53:41','2023-10-30 06:53:41'),('u-006','$2b$10$4ejdy983AQ7FWMtiA8DOIOd2GMy8t6ri4Cqri1VbJSWSDIIgYSwm6','e-007','r-003','2023-10-30 12:42:25','2023-10-30 12:42:25'),('u-007','$2b$10$4feCvqzOEGGVnlcGG/i0A.QMcbos6yZjFFW47qV4DEeWM/WMfOq7u','e-006','r-004','2023-10-30 14:27:36','2023-10-30 14:27:36'),('u-008','$2b$10$tSoTwPaQeKdEQcHF0aXYFOkz/UfROb5bsms5N..xGMf6gKV7GVC.y','e-010','r-004','2023-11-01 14:18:17','2023-11-01 14:18:17');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `tg_user_auto_increment` BEFORE INSERT ON `account` FOR EACH ROW BEGIN
  DECLARE next_user_id INT;

  -- Find the maximum emp_id in the table and increment it by 1
  SELECT IFNULL(MAX(CAST(SUBSTRING(username,3,3) AS SIGNED)), 0) + 1 INTO next_user_id FROM Account;
  
  -- Set the NEW emp_id to the calculated next_emp_id
  SET NEW.username = CONCAT('u-',LPAD(next_user_id, 3, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `timestamp_after_insertion_account` BEFORE INSERT ON `account` FOR EACH ROW BEGIN
   SET new.created_at = now();
   set new.updated_at = now();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `timestamp_after_update_account` BEFORE UPDATE ON `account` FOR EACH ROW BEGIN
   set new.updated_at = now();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `address_id` varchar(10) NOT NULL,
  `PB_number` varchar(50) DEFAULT NULL,
  `street_name` varchar(50) DEFAULT NULL,
  `city_name` varchar(50) DEFAULT NULL,
  `country` varchar(50) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`address_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES ('ad-001','24/26','deniyaya','matara','srilanka','2023-10-27 18:42:50','2023-10-27 18:42:50'),('ad-002','24/27','Nikanjia','daka','bangladesh','2023-10-27 18:42:50','2023-10-27 18:42:50'),('ad-003','24/28','karachchi','islamabad','pakistan','2023-10-27 18:42:50','2023-10-27 18:42:50'),('ad-004','25/1A','bundings ln','batticaloa','srilanka','2023-10-27 18:52:20','2023-10-27 18:52:20'),('ad-005','25/2','pansala rd','batticaloa','srilanka','2023-10-27 20:55:28','2023-10-27 20:55:28'),('ad-006','25/2','pansala rd','batticaloa','srilanka','2023-10-27 21:20:27','2023-10-27 21:20:27'),('ad-007','25/1A','bundings ln','batticaloa','srilanka','2023-10-27 21:22:07','2023-10-27 21:22:07'),('ad-008','25/1A','bundings ln','batticaloa','srilanka','2023-10-27 21:24:32','2023-10-27 21:24:32'),('ad-009','49','Raja Mawatha','batticaloa','srilanka','2023-10-30 14:13:39','2023-10-29 10:39:07'),('ad-010','49','pansala rd','batticaloa','srilanka','2023-10-29 11:06:22','2023-10-29 11:06:22'),('ad-011','25/1A','Buntings ln','Batticaloa','Sri Lanka','2023-10-29 20:52:36','2023-10-29 20:52:36'),('ad-012','25/1A','Storner\'s ln','moratuwa','Sri Lanka','2023-10-30 03:13:50','2023-10-30 03:13:50'),('ad-013','30','Mill rd','Moratuwa','Sri Lanka','2023-10-30 04:34:25','2023-10-30 04:34:10'),('ad-014','30','main rd','ratmalana','Sri Lanka','2023-10-30 05:57:52','2023-10-30 05:57:52'),('ad-015','25/1A','25/1A','Batticaloa','Sri Lanka','2023-10-30 08:37:10','2023-10-30 08:37:10'),('ad-016','25/1A','main','Batticaloa','Sri Lanka','2023-10-30 08:44:08','2023-10-30 08:44:08'),('ad-018','ad','Raja Mawatha','Colombo','Sri Lanka','2023-10-30 12:37:07','2023-10-30 12:37:07'),('ad-019','12','25/1A','Batticaloa','Sri Lanka','2023-10-30 12:43:35','2023-10-30 12:43:35'),('ad-020','12','Raja Mawatha','ratmalana','Sri Lanka','2023-10-30 14:17:21','2023-10-30 14:17:21'),('ad-021','25/1A','Storner\'s ln','Batticaloa','Sri Lanka','2023-11-01 10:09:49','2023-11-01 10:09:49'),('ad-022','12','molpe road','moratuwa','Sri Lanka','2023-11-01 14:17:27','2023-11-01 14:17:27'),('ad-023','12','street','batto','Sri Lanka','2023-11-01 14:19:47','2023-11-01 14:19:47');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `tg_address_auto_increment` BEFORE INSERT ON `address` FOR EACH ROW BEGIN
  DECLARE next_address_id INT;

  -- Find the maximum emp_id in the table and increment it by 1
  SELECT IFNULL(MAX(CAST(SUBSTRING(address_id,4,3) AS SIGNED)), 0) + 1 INTO next_address_id FROM address;
  
  -- Set the NEW emp_id to the calculated next_emp_id
  SET NEW.address_id = CONCAT('ad-',LPAD(next_address_id, 3, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `timestamp_after_insertion_address` BEFORE INSERT ON `address` FOR EACH ROW BEGIN
   SET new.created_at = now();
   set new.updated_at = now();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `timestamp_after_update_address` BEFORE UPDATE ON `address` FOR EACH ROW BEGIN
   set new.updated_at = now();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `branches`
--

DROP TABLE IF EXISTS `branches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branches` (
  `branch_id` varchar(10) NOT NULL,
  `branch_name` varchar(50) NOT NULL,
  `reg_num` varchar(10) NOT NULL,
  `Hotline` varchar(15) NOT NULL,
  `address_id` varchar(10) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`branch_id`),
  KEY `reg_num` (`reg_num`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `branches_ibfk_1` FOREIGN KEY (`reg_num`) REFERENCES `company` (`reg_num`),
  CONSTRAINT `branches_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branches`
--

LOCK TABLES `branches` WRITE;
/*!40000 ALTER TABLE `branches` DISABLE KEYS */;
INSERT INTO `branches` VALUES ('br-001','srilanka','com-001','77234567','ad-001','2023-10-27 18:42:50','2023-10-27 18:42:50'),('br-002','bangladesh','com-001','77636737','ad-002','2023-10-27 18:42:50','2023-10-27 18:42:50'),('br-003','pakistan','com-001','77339394','ad-003','2023-10-27 18:42:50','2023-10-27 18:42:50');
/*!40000 ALTER TABLE `branches` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `tg_branches_auto_increment` BEFORE INSERT ON `branches` FOR EACH ROW BEGIN
  DECLARE next_branch_id INT;

  -- Find the maximum emp_id in the table and increment it by 1
  SELECT IFNULL(MAX(CAST(SUBSTRING(branch_id,4,3) AS SIGNED)), 0) + 1 INTO next_branch_id FROM branches;
  
  -- Set the NEW emp_id to the calculated next_emp_id
  SET NEW.branch_id = CONCAT('br-',LPAD(next_branch_id, 3, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `timestamp_after_insertion_branches` BEFORE INSERT ON `branches` FOR EACH ROW BEGIN
   SET new.created_at = now();
   set new.updated_at = now();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `timestamp_after_update_branches` BEFORE UPDATE ON `branches` FOR EACH ROW BEGIN
   set new.updated_at = now();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `address_delete_after_branch_delete` AFTER DELETE ON `branches` FOR EACH ROW begin
	delete from address
    where address.address_id= old.address_id;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `reg_num` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`reg_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES ('com-001','Jupiter','2023-10-27 18:39:48','2023-10-27 18:39:48');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `tg_company_auto_increment` BEFORE INSERT ON `company` FOR EACH ROW BEGIN
  DECLARE next_company_id INT;

  -- Find the maximum emp_id in the table and increment it by 1
  SELECT IFNULL(MAX(CAST(SUBSTRING(reg_num,5,3) AS SIGNED)), 0) + 1 INTO next_company_id FROM company;
  
  -- Set the NEW emp_id to the calculated next_emp_id
  SET NEW.reg_num = CONCAT('com-',LPAD(next_company_id, 3, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `timestamp_after_insertion_company` BEFORE INSERT ON `company` FOR EACH ROW BEGIN
   SET new.created_at = now();
   set new.updated_at = now();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `timestamp_after_update_company` BEFORE UPDATE ON `company` FOR EACH ROW BEGIN
   set new.updated_at = now();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact` (
  `emp_id` varchar(10) NOT NULL,
  `contact_number` varchar(15) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`emp_id`,`contact_number`),
  KEY `contact_idx` (`emp_id`,`contact_number`),
  CONSTRAINT `contact_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES ('e-001','0766945925','2023-10-29 09:09:28','2023-10-29 09:09:28'),('e-001','0779788442','2023-10-29 20:21:21','2023-10-29 20:21:21'),('e-001','1234567890','2023-10-30 13:28:22','2023-10-30 13:28:09'),('e-002','0123456789','2023-10-29 20:21:55','2023-10-29 20:21:55'),('e-003','0011223344','2023-10-29 20:23:39','2023-10-29 20:23:39'),('e-010','0779788442','2023-11-01 14:20:22','2023-11-01 14:20:22');
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `timestamp_after_insertion_contact` BEFORE INSERT ON `contact` FOR EACH ROW BEGIN
   SET new.created_at = now();
   set new.updated_at = now();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `timestamp_after_update_contact` BEFORE UPDATE ON `contact` FOR EACH ROW BEGIN
   set new.updated_at = now();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `custom_attribute_value`
--

DROP TABLE IF EXISTS `custom_attribute_value`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `custom_attribute_value` (
  `attribute_id` varchar(10) NOT NULL,
  `emp_id` varchar(10) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`attribute_id`,`emp_id`),
  KEY `emp_id` (`emp_id`),
  CONSTRAINT `custom_attribute_value_ibfk_1` FOREIGN KEY (`attribute_id`) REFERENCES `custom_attributes` (`attribute_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `custom_attribute_value_ibfk_2` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `custom_attribute_value`
--

LOCK TABLES `custom_attribute_value` WRITE;
/*!40000 ALTER TABLE `custom_attribute_value` DISABLE KEYS */;
INSERT INTO `custom_attribute_value` VALUES ('at-001','e-003','indian'),('at-001','e-010','indian'),('at-002','e-003','200116600105'),('at-002','e-010','20011234567'),('at-003','e-010','12345');
/*!40000 ALTER TABLE `custom_attribute_value` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `custom_attributes`
--

DROP TABLE IF EXISTS `custom_attributes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `custom_attributes` (
  `attribute_id` varchar(10) NOT NULL,
  `attribute_name` varchar(50) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`attribute_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `custom_attributes`
--

LOCK TABLES `custom_attributes` WRITE;
/*!40000 ALTER TABLE `custom_attributes` DISABLE KEYS */;
INSERT INTO `custom_attributes` VALUES ('at-001','Nationality','nationality of a person'),('at-002','NIC','national identity number of a person'),('at-003','Driving License','driving license of a person');
/*!40000 ALTER TABLE `custom_attributes` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `tg_custom_attributes_auto_increment` BEFORE INSERT ON `custom_attributes` FOR EACH ROW BEGIN
  DECLARE next_attribute_id INT;

  -- Find the maximum emp_id in the table and increment it by 1
  SELECT IFNULL(MAX(CAST(SUBSTRING(attribute_id,4,3) AS SIGNED)), 0) + 1 INTO next_attribute_id FROM custom_attributes;
  
  -- Set the NEW emp_id to the calculated next_emp_id
  SET NEW.attribute_id = CONCAT('at-',LPAD(next_attribute_id, 3, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `dept_id` varchar(10) NOT NULL,
  `dept_name` varchar(50) NOT NULL,
  `no_of_employees` int DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`dept_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES ('dep-001','Human Resource',15,'2023-11-01 12:51:00','2023-10-27 18:39:48'),('dep-002','Finance',20,'2023-11-01 12:51:00','2023-10-27 18:39:48'),('dep-003','Software Engineering',100,'2023-10-27 18:39:48','2023-10-27 18:39:48'),('dep-004','Quantity Surveying',30,'2023-10-27 18:39:48','2023-10-27 18:39:48'),('dep-005','Marketing',10,'2023-10-29 17:41:03','2023-10-29 17:41:03'),('dep-006','Cooking',5,'2023-10-29 18:17:08','2023-10-29 18:17:08');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `tg_custom_department_auto_increment` BEFORE INSERT ON `department` FOR EACH ROW BEGIN
  DECLARE next_dept_id INT;

  -- Find the maximum emp_id in the table and increment it by 1
  SELECT IFNULL(MAX(CAST(SUBSTRING(dept_id,5,3) AS SIGNED)), 0) + 1 INTO next_dept_id FROM department;
  
  -- Set the NEW emp_id to the calculated next_emp_id
  SET NEW.dept_id = CONCAT('dep-',LPAD(next_dept_id, 3, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `timestamp_after_insertion_department` BEFORE INSERT ON `department` FOR EACH ROW BEGIN
   SET new.created_at = now();
   set new.updated_at = now();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `timestamp_after_update_department` BEFORE UPDATE ON `department` FOR EACH ROW BEGIN
   set new.updated_at = now();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary view structure for view `department_view`
--

DROP TABLE IF EXISTS `department_view`;
/*!50001 DROP VIEW IF EXISTS `department_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `department_view` AS SELECT 
 1 AS `dept_id`,
 1 AS `dept_name`,
 1 AS `current_no_of_employees`,
 1 AS `max_no_of_employees`,
 1 AS `updated_at`,
 1 AS `created_at`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `dependent`
--

DROP TABLE IF EXISTS `dependent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dependent` (
  `name` varchar(50) NOT NULL,
  `b_date` date DEFAULT NULL,
  `gender` varchar(50) NOT NULL,
  `relationship` varchar(50) NOT NULL,
  `emp_id` varchar(10) NOT NULL,
  `dependent_id` varchar(10) NOT NULL,
  `address_id` varchar(10) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`dependent_id`,`emp_id`),
  KEY `emp_id` (`emp_id`),
  KEY `address_id` (`address_id`),
  KEY `dependent_idx` (`dependent_id`,`emp_id`),
  CONSTRAINT `dependent_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`) ON DELETE CASCADE,
  CONSTRAINT `dependent_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `dependent_chk_1` CHECK ((`gender` in (_utf8mb4'Male',_utf8mb4'Female',_utf8mb4'Other')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dependent`
--

LOCK TABLES `dependent` WRITE;
/*!40000 ALTER TABLE `dependent` DISABLE KEYS */;
INSERT INTO `dependent` VALUES ('thulajah','2001-06-14','Female','friend','e-001','d-001','ad-005','2023-10-29 11:06:52','2023-10-27 20:55:28'),('abineyan','2001-06-14','Male','friend','e-002','d-002','ad-006','2023-10-29 11:06:52','2023-10-27 21:20:27'),('Aarushi','2016-12-12','Female','Sister','e-003','d-003','ad-011','2023-10-29 20:52:36','2023-10-29 20:52:36'),('damitha','2023-11-01','Male','Brother','e-001','d-004','ad-015','2023-10-30 08:37:10','2023-10-30 08:37:10');
/*!40000 ALTER TABLE `dependent` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `tg_custom_dependent_auto_increment` BEFORE INSERT ON `dependent` FOR EACH ROW BEGIN
  DECLARE next_dependent_id INT;

  -- Find the maximum emp_id in the table and increment it by 1
  SELECT IFNULL(MAX(CAST(SUBSTRING(dependent_id,3,3) AS SIGNED)), 0) + 1 INTO next_dependent_id FROM dependent;
  
  -- Set the NEW emp_id to the calculated next_emp_id
  SET NEW.dependent_id = CONCAT('d-',LPAD(next_dependent_id, 3, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `timestamp_after_insertion_dependent` BEFORE INSERT ON `dependent` FOR EACH ROW BEGIN
   SET new.created_at = now();
   set new.updated_at = now();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `timestamp_after_update_dependent` BEFORE UPDATE ON `dependent` FOR EACH ROW BEGIN
   set new.updated_at = now();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `address_delete_after_dependent_delete` AFTER DELETE ON `dependent` FOR EACH ROW begin
	delete from address
    where address.address_id= old.address_id;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `emergency_details`
--

DROP TABLE IF EXISTS `emergency_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emergency_details` (
  `emp_id` varchar(10) NOT NULL,
  `contact_name` varchar(50) NOT NULL,
  `relationship` varchar(50) NOT NULL,
  `address_id` varchar(10) DEFAULT NULL,
  `Mobile_phone` varchar(15) DEFAULT NULL,
  `Home_phone` varchar(15) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`emp_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `emergency_details_ibfk_1` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`) ON DELETE CASCADE,
  CONSTRAINT `emergency_details_ibfk_2` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emergency_details`
--

LOCK TABLES `emergency_details` WRITE;
/*!40000 ALTER TABLE `emergency_details` DISABLE KEYS */;
INSERT INTO `emergency_details` VALUES ('e-001','thulajah','friend','ad-009','0762966289','0112719748','2023-10-30 14:13:39','2023-10-29 10:39:07'),('e-002','abineyan','friend','ad-010','0766945925','0652223745','2023-10-29 11:06:22','2023-10-29 11:06:22'),('e-003','Krishna','Brother','ad-013','0776653899','0651234567','2023-10-30 04:34:25','2023-10-30 04:34:10'),('e-007','Sajeev Kugarajah','hubby','ad-019','0766945925','0766945925','2023-10-30 12:43:35','2023-10-30 12:43:35'),('e-010','Prabaharan','father','ad-023','111111111','22222222','2023-11-01 14:19:47','2023-11-01 14:19:47');
/*!40000 ALTER TABLE `emergency_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `timestamp_after_insertion_emergency_details` BEFORE INSERT ON `emergency_details` FOR EACH ROW BEGIN
   SET new.created_at = now();
   set new.updated_at = now();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `timestamp_after_update_emergency_details` BEFORE UPDATE ON `emergency_details` FOR EACH ROW BEGIN
   set new.updated_at = now();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `address_delete_after_emergency_delete` AFTER DELETE ON `emergency_details` FOR EACH ROW begin
	delete from address
    where address.address_id= old.address_id;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `emp_status`
--

DROP TABLE IF EXISTS `emp_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emp_status` (
  `emp_status_id` varchar(10) NOT NULL,
  `status_name` varchar(50) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`emp_status_id`),
  CONSTRAINT `emp_status_chk_1` CHECK ((`status_name` in (_utf8mb4'Intern-ft',_utf8mb4'Intern-pt',_utf8mb4'Contract-ft',_utf8mb4'Contract-pt',_utf8mb4'Permanent',_utf8mb4'Freelance')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emp_status`
--

LOCK TABLES `emp_status` WRITE;
/*!40000 ALTER TABLE `emp_status` DISABLE KEYS */;
INSERT INTO `emp_status` VALUES ('es-001','Intern-ft','2023-10-27 18:41:29','2023-10-27 18:41:29'),('es-002','Intern-pt','2023-10-27 18:41:29','2023-10-27 18:41:29'),('es-003','Contract-ft','2023-10-27 18:41:29','2023-10-27 18:41:29'),('es-004','Contract-pt','2023-10-27 18:41:29','2023-10-27 18:41:29'),('es-005','Permanent','2023-10-27 18:41:29','2023-10-27 18:41:29'),('es-006','Freelance','2023-10-27 18:41:29','2023-10-27 18:41:29');
/*!40000 ALTER TABLE `emp_status` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `tg_emp_status_auto_increment` BEFORE INSERT ON `emp_status` FOR EACH ROW BEGIN
  DECLARE next_emp_status_id INT;

  -- Find the maximum emp_id in the table and increment it by 1
  SELECT IFNULL(MAX(CAST(SUBSTRING(emp_status_id,4,3) AS SIGNED)), 0) + 1 INTO next_emp_status_id FROM emp_status;
  
  -- Set the NEW emp_id to the calculated next_emp_id
  SET NEW.emp_status_id = CONCAT('es-',LPAD(next_emp_status_id, 3, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `timestamp_after_insertion_emp_status` BEFORE INSERT ON `emp_status` FOR EACH ROW BEGIN
   SET new.created_at = now();
   set new.updated_at = now();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `timestamp_after_update_emp_status` BEFORE UPDATE ON `emp_status` FOR EACH ROW BEGIN
   set new.updated_at = now();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `emp_id` varchar(10) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `birth_date` date DEFAULT NULL,
  `address_id` varchar(10) DEFAULT NULL,
  `branch_id` varchar(10) NOT NULL,
  `job_id` varchar(10) NOT NULL,
  `dept_id` varchar(10) DEFAULT NULL,
  `emp_status_id` varchar(10) NOT NULL,
  `SupervisorId` varchar(10) DEFAULT NULL,
  `marital_status` varchar(50) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`emp_id`),
  KEY `dept_id` (`dept_id`),
  KEY `SupervisorId` (`SupervisorId`),
  KEY `job_id` (`job_id`),
  KEY `branch_id` (`branch_id`),
  KEY `emp_status_id` (`emp_status_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`dept_id`) REFERENCES `department` (`dept_id`),
  CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`SupervisorId`) REFERENCES `employee` (`emp_id`),
  CONSTRAINT `employee_ibfk_3` FOREIGN KEY (`job_id`) REFERENCES `role` (`job_id`),
  CONSTRAINT `employee_ibfk_4` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`branch_id`),
  CONSTRAINT `employee_ibfk_5` FOREIGN KEY (`emp_status_id`) REFERENCES `emp_status` (`emp_status_id`),
  CONSTRAINT `employee_ibfk_6` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`),
  CONSTRAINT `employee_chk_1` CHECK ((`marital_status` in (_utf8mb4'Married',_utf8mb4'Single',_utf8mb4'Other')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('e-001','Sajeev','Kanth','2001-06-14','ad-004','br-001','j-004','dep-001','es-005',NULL,'Single','2023-10-29 17:40:41','2023-10-27 18:52:20'),('e-002','Sajeev','Kumar','2001-06-14','ad-007','br-001','j-017','dep-002','es-005',NULL,'Single','2023-10-27 21:22:07','2023-10-27 21:22:07'),('e-003','Sajeev','Krishna','2001-06-14','ad-008','br-001','j-014','dep-002','es-005','e-002','Single','2023-10-27 21:24:32','2023-10-27 21:24:32'),('e-004','Kheen','Niththi','2023-10-19','ad-012','br-003','j-014','dep-006','es-006','e-001','Single','2023-10-30 06:23:30','2023-10-30 03:13:50'),('e-005','Thulajah','Uthayasunthar','2023-10-01','ad-014','br-001','j-017','dep-001','es-005',NULL,'Single','2023-10-30 05:57:52','2023-10-30 05:57:52'),('e-006','Nipuni','jayathilage','2023-10-09','ad-016','br-003','j-010','dep-006','es-006','e-005','Single','2023-10-30 08:44:08','2023-10-30 08:44:08'),('e-007','Thulaja','Sajeev','2023-10-04','ad-018','br-003','j-017','dep-006','es-005',NULL,'Married','2023-10-30 12:37:07','2023-10-30 12:37:07'),('e-008','Uthaya','Uruthiran','2023-10-02','ad-020','br-002','j-014','dep-004','es-003','e-005','Married','2023-10-30 14:17:21','2023-10-30 14:17:21'),('e-009','damitha','udhesh','2023-11-13','ad-021','br-001','j-010','dep-005','es-002','e-005','Single','2023-11-01 10:09:49','2023-11-01 10:09:49'),('e-010','Shangari','Prabaharan','2023-02-24','ad-022','br-003','j-011','dep-003','es-003','e-005','Married','2023-11-01 14:17:27','2023-11-01 14:17:27');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `tg_employee_auto_increment` BEFORE INSERT ON `employee` FOR EACH ROW BEGIN
  DECLARE next_emp_id INT;

  -- Find the maximum emp_id in the table and increment it by 1
  SELECT IFNULL(MAX(CAST(SUBSTRING(emp_id,3,3) AS SIGNED)), 0) + 1 INTO next_emp_id FROM Employee;
  
  -- Set the NEW emp_id to the calculated next_emp_id
  SET NEW.emp_id = CONCAT('e-',LPAD(next_emp_id, 3, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `timestamp_after_insertion_employee` BEFORE INSERT ON `employee` FOR EACH ROW BEGIN
   SET new.created_at = now();
   set new.updated_at = now();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `timestamp_after_update_employee` BEFORE UPDATE ON `employee` FOR EACH ROW BEGIN
   set new.updated_at = now();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `address_delete_after_employee_delete` AFTER DELETE ON `employee` FOR EACH ROW begin
	delete from address
    where address.address_id= old.address_id;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary view structure for view `employee_info_view`
--

DROP TABLE IF EXISTS `employee_info_view`;
/*!50001 DROP VIEW IF EXISTS `employee_info_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `employee_info_view` AS SELECT 
 1 AS `emp_id`,
 1 AS `first_name`,
 1 AS `last_name`,
 1 AS `birth_date`,
 1 AS `SupervisorId`,
 1 AS `marital_status`,
 1 AS `PB_number`,
 1 AS `street_name`,
 1 AS `city_name`,
 1 AS `country`,
 1 AS `branch_name`,
 1 AS `job_title`,
 1 AS `pay_grade`,
 1 AS `dept_name`,
 1 AS `status_name`,
 1 AS `created_at`,
 1 AS `updated_at`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `leave_app_set`
--

DROP TABLE IF EXISTS `leave_app_set`;
/*!50001 DROP VIEW IF EXISTS `leave_app_set`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `leave_app_set` AS SELECT 
 1 AS `req_id`,
 1 AS `leave_type_id`,
 1 AS `leave_type_name`,
 1 AS `reason`,
 1 AS `start_date`,
 1 AS `end_date`,
 1 AS `no_of_days`,
 1 AS `supervisor_id`,
 1 AS `req_status`,
 1 AS `emp_id`,
 1 AS `pay_grade`,
 1 AS `default_days`,
 1 AS `created_at`,
 1 AS `updated_at`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `leave_application`
--

DROP TABLE IF EXISTS `leave_application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leave_application` (
  `req_id` varchar(10) NOT NULL,
  `leave_type_id` varchar(10) NOT NULL,
  `reason` varchar(100) DEFAULT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `supervisor_id` varchar(10) DEFAULT NULL,
  `req_status` varchar(10) NOT NULL DEFAULT 'Pending',
  `emp_id` varchar(10) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`req_id`),
  KEY `emp_id` (`emp_id`),
  KEY `supervisor_id` (`supervisor_id`),
  KEY `leave_type_id` (`leave_type_id`),
  CONSTRAINT `leave_application_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`) ON DELETE CASCADE,
  CONSTRAINT `leave_application_ibfk_2` FOREIGN KEY (`supervisor_id`) REFERENCES `employee` (`SupervisorId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `leave_application_ibfk_3` FOREIGN KEY (`leave_type_id`) REFERENCES `number_of_leaves` (`leave_type_id`),
  CONSTRAINT `leave_application_chk_1` CHECK ((`req_status` in (_utf8mb4'Accepted',_utf8mb4'Declined',_utf8mb4'Pending')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leave_application`
--

LOCK TABLES `leave_application` WRITE;
/*!40000 ALTER TABLE `leave_application` DISABLE KEYS */;
INSERT INTO `leave_application` VALUES ('rq-001','lv-002','Sick','2023-10-31','2023-11-09','e-002','Accepted','e-003','2023-10-30 12:41:23','2023-10-29 21:35:27'),('rq-002','lv-004','going abroad for studies','2023-11-01','2023-11-03','e-002','Accepted','e-003','2023-10-31 05:47:01','2023-10-29 21:57:33'),('rq-003','lv-003','Lover pregnant','2023-11-01','2023-11-08','e-002','Declined','e-003','2023-10-30 12:41:14','2023-10-30 03:15:24'),('rq-004','lv-004','Temple','2023-10-30','2023-11-02','e-002','Accepted','e-003','2023-10-30 12:41:37','2023-10-30 08:47:18'),('rq-005','lv-003','I\'m pregnant','2023-10-30','2023-10-30','e-002','Declined','e-003','2023-10-30 12:40:55','2023-10-30 12:39:19'),('rq-006','lv-003','wife pregnant','2023-10-30','2023-11-02','e-002','Accepted','e-003','2023-10-30 14:23:19','2023-10-30 14:21:47'),('rq-007','lv-001','fun','2023-11-01','2023-11-07','e-002','Accepted','e-003','2023-11-01 00:01:24','2023-11-01 00:01:03'),('rq-008','lv-003','I\'m pregnant','2023-06-11','2023-06-20','e-002','Accepted','e-003','2023-11-01 00:47:00','2023-11-01 00:46:35'),('rq-009','lv-003','I\'m pregnant','2023-02-01','2023-02-15','e-002','Accepted','e-003','2023-11-01 07:56:11','2023-11-01 07:55:40'),('rq-010','lv-003','I\'m pregnant','2023-11-01','2023-11-15','e-005','Accepted','e-010','2023-11-01 14:23:15','2023-11-01 14:21:21');
/*!40000 ALTER TABLE `leave_application` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `tg_leave_application_auto_increment` BEFORE INSERT ON `leave_application` FOR EACH ROW BEGIN
  DECLARE next_req_id INT;

  -- Find the maximum emp_id in the table and increment it by 1
  SELECT IFNULL(MAX(CAST(SUBSTRING(req_id,4,3) AS SIGNED)), 0) + 1 INTO next_req_id FROM leave_application;
  
  -- Set the NEW emp_id to the calculated next_emp_id
  SET NEW.req_id = CONCAT('rq-',LPAD(next_req_id, 3, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `timestamp_after_insertion_leave_application` BEFORE INSERT ON `leave_application` FOR EACH ROW BEGIN
   SET new.created_at = now();
   set new.updated_at = now();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `timestamp_after_update_leave_application` BEFORE UPDATE ON `leave_application` FOR EACH ROW BEGIN
   set new.updated_at = now();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_num_of_leaves1` AFTER UPDATE ON `leave_application` FOR EACH ROW BEGIN
    IF NEW.req_status = 'Accepted' THEN
		IF new.leave_type_id='lv-001' then 
			UPDATE leave_record
			SET no_of_annual_leaves_taken = no_of_annual_leaves_taken + 1
			WHERE leave_record.emp_id = new.emp_id;
		end if;
        IF new.leave_type_id='lv-002' then 
			UPDATE leave_record
			SET no_of_casual_leaves_taken = no_of_casual_leaves_taken + 1
			WHERE leave_record.emp_id = new.emp_id;
		end if;
        IF new.leave_type_id='lv-003' then 
			UPDATE leave_record
			SET no_of_maternity_leaves_taken = no_of_maternity_leaves_taken + 1
			WHERE leave_record.emp_id = new.emp_id;
		end if;
        IF new.leave_type_id='lv-004' then 
			UPDATE leave_record
			SET no_of_nopay_leaves_taken = no_of_nopay_leaves_taken + 1
			WHERE leave_record.emp_id = new.emp_id;
		end if;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary view structure for view `leave_application_view`
--

DROP TABLE IF EXISTS `leave_application_view`;
/*!50001 DROP VIEW IF EXISTS `leave_application_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `leave_application_view` AS SELECT 
 1 AS `req_id`,
 1 AS `leave_type_name`,
 1 AS `reason`,
 1 AS `start_date`,
 1 AS `end_date`,
 1 AS `supervisor_id`,
 1 AS `req_status`,
 1 AS `emp_id`,
 1 AS `first_name`,
 1 AS `last_name`,
 1 AS `dept_name`,
 1 AS `created_at`,
 1 AS `updated_at`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `leave_count_per_employee_view`
--

DROP TABLE IF EXISTS `leave_count_per_employee_view`;
/*!50001 DROP VIEW IF EXISTS `leave_count_per_employee_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `leave_count_per_employee_view` AS SELECT 
 1 AS `emp_id`,
 1 AS `leave_type_id`,
 1 AS `leave_type_name`,
 1 AS `total_no_of_leaves_taken`,
 1 AS `total_no_of_permitted_days`,
 1 AS `percentage_leaves_taken`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `leave_count_set`
--

DROP TABLE IF EXISTS `leave_count_set`;
/*!50001 DROP VIEW IF EXISTS `leave_count_set`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `leave_count_set` AS SELECT 
 1 AS `emp_id`,
 1 AS `leave_type_id`,
 1 AS `leave_type_name`,
 1 AS `total_no_of_leaves_taken`,
 1 AS `default_days`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `leave_type_names`
--

DROP TABLE IF EXISTS `leave_type_names`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leave_type_names` (
  `leave_type_id` varchar(10) NOT NULL,
  `leave_type_name` varchar(50) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`leave_type_id`),
  CONSTRAINT `leave_type_names_chk_1` CHECK ((`leave_type_name` in (_utf8mb4'Annual',_utf8mb4'Casual',_utf8mb4'Maternity',_utf8mb4'No-pay')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leave_type_names`
--

LOCK TABLES `leave_type_names` WRITE;
/*!40000 ALTER TABLE `leave_type_names` DISABLE KEYS */;
INSERT INTO `leave_type_names` VALUES ('lv-001','Annual','2023-10-27 18:41:29','2023-10-27 18:41:29'),('lv-002','Casual','2023-10-27 18:41:29','2023-10-27 18:41:29'),('lv-003','Maternity','2023-10-27 18:41:29','2023-10-27 18:41:29'),('lv-004','No-pay','2023-10-27 18:41:29','2023-10-27 18:41:29');
/*!40000 ALTER TABLE `leave_type_names` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `tg_leave_type_name_auto_increment` BEFORE INSERT ON `leave_type_names` FOR EACH ROW BEGIN
  DECLARE next_leave_type_id INT;

  -- Find the maximum emp_id in the table and increment it by 1
  SELECT IFNULL(MAX(CAST(SUBSTRING(leave_type_id,4,3) AS SIGNED)), 0) + 1 INTO next_leave_type_id FROM leave_type_names;
  
  -- Set the NEW emp_id to the calculated next_emp_id
  SET NEW.leave_type_id = CONCAT('lv-',LPAD(next_leave_type_id, 3, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `timestamp_after_insertion_leave_type_names` BEFORE INSERT ON `leave_type_names` FOR EACH ROW BEGIN
   SET new.created_at = now();
   set new.updated_at = now();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `timestamp_after_update_leave_type_names` BEFORE UPDATE ON `leave_type_names` FOR EACH ROW BEGIN
   set new.updated_at = now();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `number_of_leaves`
--

DROP TABLE IF EXISTS `number_of_leaves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `number_of_leaves` (
  `pay_grade` int NOT NULL,
  `leave_type_id` varchar(10) NOT NULL,
  `default_days` int NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`pay_grade`,`leave_type_id`),
  KEY `leave_type_id` (`leave_type_id`),
  KEY `num_of_leaves_idx` (`pay_grade`,`leave_type_id`),
  CONSTRAINT `number_of_leaves_ibfk_1` FOREIGN KEY (`leave_type_id`) REFERENCES `leave_type_names` (`leave_type_id`),
  CONSTRAINT `number_of_leaves_chk_1` CHECK ((`pay_grade` in (1,2,3,4)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `number_of_leaves`
--

LOCK TABLES `number_of_leaves` WRITE;
/*!40000 ALTER TABLE `number_of_leaves` DISABLE KEYS */;
INSERT INTO `number_of_leaves` VALUES (1,'lv-001',5,'2023-10-27 18:41:29','2023-10-27 18:41:29'),(1,'lv-002',10,'2023-10-27 18:41:29','2023-10-27 18:41:29'),(1,'lv-003',300,'2023-10-27 18:41:29','2023-10-27 18:41:29'),(1,'lv-004',5,'2023-10-27 18:41:29','2023-10-27 18:41:29'),(2,'lv-001',10,'2023-10-27 18:41:29','2023-10-27 18:41:29'),(2,'lv-002',15,'2023-10-27 18:41:29','2023-10-27 18:41:29'),(2,'lv-003',300,'2023-10-27 18:41:29','2023-10-27 18:41:29'),(2,'lv-004',15,'2023-10-27 18:41:29','2023-10-27 18:41:29'),(3,'lv-001',20,'2023-10-27 18:41:29','2023-10-27 18:41:29'),(3,'lv-002',10,'2023-10-27 18:41:29','2023-10-27 18:41:29'),(3,'lv-003',300,'2023-10-27 18:41:29','2023-10-27 18:41:29'),(3,'lv-004',15,'2023-10-27 18:41:29','2023-10-27 18:41:29'),(4,'lv-001',20,'2023-10-27 18:41:29','2023-10-27 18:41:29'),(4,'lv-002',20,'2023-10-27 18:41:29','2023-10-27 18:41:29'),(4,'lv-003',300,'2023-10-27 18:41:29','2023-10-27 18:41:29'),(4,'lv-004',20,'2023-10-27 18:41:29','2023-10-27 18:41:29');
/*!40000 ALTER TABLE `number_of_leaves` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `timestamp_after_insertion_number_of_leaves` BEFORE INSERT ON `number_of_leaves` FOR EACH ROW BEGIN
   SET new.created_at = now();
   set new.updated_at = now();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `timestamp_after_update_number_of_leaves` BEFORE UPDATE ON `number_of_leaves` FOR EACH ROW BEGIN
   set new.updated_at = now();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `job_id` varchar(10) NOT NULL,
  `job_title` varchar(50) NOT NULL,
  `pay_grade` int DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`job_id`),
  CONSTRAINT `role_chk_1` CHECK ((`job_title` in (_utf8mb4'HRManager',_utf8mb4'Accountant',_utf8mb4'Software Engineer',_utf8mb4'QA Engineer',_utf8mb4'Supervisor'))),
  CONSTRAINT `role_chk_2` CHECK ((`pay_grade` in (1,2,3,4)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES ('j-001','HRManager',1,'2023-10-27 18:41:29','2023-10-27 18:41:29'),('j-002','HRManager',2,'2023-10-27 18:41:29','2023-10-27 18:41:29'),('j-003','HRManager',3,'2023-10-27 18:41:29','2023-10-27 18:41:29'),('j-004','HRManager',4,'2023-10-27 18:41:29','2023-10-27 18:41:29'),('j-005','Accountant',1,'2023-10-27 18:41:29','2023-10-27 18:41:29'),('j-006','Accountant',2,'2023-10-27 18:41:29','2023-10-27 18:41:29'),('j-007','Accountant',3,'2023-10-27 18:41:29','2023-10-27 18:41:29'),('j-008','Accountant',4,'2023-10-27 18:41:29','2023-10-27 18:41:29'),('j-009','Software Engineer',1,'2023-10-27 18:41:29','2023-10-27 18:41:29'),('j-010','Software Engineer',2,'2023-10-27 18:41:29','2023-10-27 18:41:29'),('j-011','Software Engineer',3,'2023-10-27 18:41:29','2023-10-27 18:41:29'),('j-012','Software Engineer',4,'2023-10-27 18:41:29','2023-10-27 18:41:29'),('j-013','QA Engineer',1,'2023-10-27 18:41:29','2023-10-27 18:41:29'),('j-014','QA Engineer',2,'2023-10-27 18:41:29','2023-10-27 18:41:29'),('j-015','QA Engineer',3,'2023-10-27 18:41:29','2023-10-27 18:41:29'),('j-016','QA Engineer',4,'2023-10-27 18:41:29','2023-10-27 18:41:29'),('j-017','Supervisor',4,'2023-10-27 18:41:29','2023-10-27 18:41:29');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `tg_job_id_auto_increment` BEFORE INSERT ON `role` FOR EACH ROW BEGIN
  DECLARE next_job_id INT;

  -- Find the maximum emp_id in the table and increment it by 1
  SELECT IFNULL(MAX(CAST(SUBSTRING(job_id,3,3) AS SIGNED)), 0) + 1 INTO next_job_id FROM role;
  
  -- Set the NEW emp_id to the calculated next_emp_id
  SET NEW.job_id = CONCAT('j-',LPAD(next_job_id, 3, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `timestamp_after_insertion_role` BEFORE INSERT ON `role` FOR EACH ROW BEGIN
   SET new.created_at = now();
   set new.updated_at = now();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `timestamp_after_update_role` BEFORE UPDATE ON `role` FOR EACH ROW BEGIN
   set new.updated_at = now();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary view structure for view `user_info_view`
--

DROP TABLE IF EXISTS `user_info_view`;
/*!50001 DROP VIEW IF EXISTS `user_info_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `user_info_view` AS SELECT 
 1 AS `username`,
 1 AS `password`,
 1 AS `emp_id`,
 1 AS `first_name`,
 1 AS `last_name`,
 1 AS `birth_date`,
 1 AS `SupervisorId`,
 1 AS `marital_status`,
 1 AS `address`,
 1 AS `branch_name`,
 1 AS `job_title`,
 1 AS `dept_name`,
 1 AS `status_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `role_id` varchar(20) NOT NULL,
  `role_name` varchar(50) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES ('r-001','Admin','2023-10-27 18:44:16','2023-10-27 18:44:16'),('r-002','HRmanager','2023-10-27 18:44:16','2023-10-27 18:44:16'),('r-003','supervisor','2023-10-27 18:44:16','2023-10-27 18:44:16'),('r-004','employee','2023-10-27 18:44:16','2023-10-27 18:44:16');
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `tg_user_role_auto_increment` BEFORE INSERT ON `user_role` FOR EACH ROW BEGIN
  DECLARE next_role_id INT;
  
  -- Find the maximum numeric portion of role_id and increment it by 1
  SELECT IFNULL(MAX(CAST(SUBSTRING(role_id, 3,3) AS SIGNED)), 0) + 1 INTO next_role_id FROM user_role;
  
  -- Set the NEW role_id to the calculated next_role_id in 'r-XXX' format
  SET NEW.role_id = CONCAT('r-', LPAD(next_role_id, 3, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `timestamp_after_insertion_user_role` BEFORE INSERT ON `user_role` FOR EACH ROW BEGIN
   SET new.created_at = now();
   set new.updated_at = now();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `timestamp_after_update_user_role` BEFORE UPDATE ON `user_role` FOR EACH ROW BEGIN
   set new.updated_at = now();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary view structure for view `yearly_leave_count_view`
--

DROP TABLE IF EXISTS `yearly_leave_count_view`;
/*!50001 DROP VIEW IF EXISTS `yearly_leave_count_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `yearly_leave_count_view` AS SELECT 
 1 AS `emp_id`,
 1 AS `jan`,
 1 AS `feb`,
 1 AS `mar`,
 1 AS `apr`,
 1 AS `may`,
 1 AS `jun`,
 1 AS `jul`,
 1 AS `aug`,
 1 AS `sep`,
 1 AS `oct`,
 1 AS `nov`,
 1 AS `dece`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'hrms'
--

--
-- Dumping routines for database 'hrms'
--
/*!50003 DROP PROCEDURE IF EXISTS `add_dependent` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_dependent`(
	in name varchar(50),
	in birth_date date,
    in gender varchar(50),
    in relationship varchar(50),
    in emp_id varchar(10),
	in PB_number varchar(50),
	in street_name varchar(50),
	in city_name varchar(50),
	in country varchar(50)
)
BEGIN

	-- declare variables to store values --
	DECLARE address_id_variable varchar(10);

	-- declaring exit handler for transaction --
	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
		BEGIN
			ROLLBACK;
			RESIGNAL;
		END;

	-- starting transaction --
	START TRANSACTION;

	-- inserting datas to address table --
	INSERT 
	INTO 
	address
	(
		PB_number,
		street_name,
		city_name,
		country
	)
	VALUES
	(
		PB_number,
		street_name,
		city_name,
		country
	);

	-- passing retrieved value from sql query to defined variable --
	select address.address_id from address order by address.address_id desc limit 1 into address_id_variable; 

	-- inserting datas to dependent table using address_id value --
	INSERT 
	INTO dependent 
	( 
		name,
		b_date,
        gender,
        relationship,
        emp_id,
		address_id
	) 
	VALUES 
	(
		name,
		birth_date,
        gender,
        relationship,
        emp_id,
		address_id_variable          
	);

	-- commiting transaction --
	COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_emergency_contact` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_emergency_contact`(
	in emp_id varchar(10),
    in contact_name varchar(50),
    in relationship varchar(50),
	in PB_number varchar(50),
	in street_name varchar(50),
	in city_name varchar(50),
	in country varchar(50),
    in Mobile_phone varchar(15),
    in Home_phone varchar(15)
)
BEGIN

	-- declare variables to store values --
	DECLARE address_id_variable varchar(10);

	-- declaring exit handler for transaction --
	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
		BEGIN
			ROLLBACK;
			RESIGNAL;
		END;

	-- starting transaction --
	START TRANSACTION;

	-- inserting datas to address table --
	INSERT 
	INTO 
	address
	(
		PB_number,
		street_name,
		city_name,
		country
	)
	VALUES
	(
		PB_number,
		street_name,
		city_name,
		country
	);

	-- passing retrieved value from sql query to defined variable --
	select address.address_id from address order by address.address_id desc limit 1 into address_id_variable; 

	-- inserting datas to dependent table using address_id value --
	INSERT 
	INTO emergency_details 
	( 
		emp_id,
		contact_name,
		relationship,
		address_id,
		Mobile_phone,
		Home_phone
	) 
	VALUES 
	(
		emp_id,
		contact_name,
		relationship,
		address_id_variable,
		Mobile_phone,
		Home_phone      
	);

	-- commiting transaction --
	COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_employee` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_employee`(
	in first_name varchar(50),
	in last_name varchar(50),
	in birth_date date,
	in PB_number varchar(50),
	in street_name varchar(50),
	in city_name varchar(50),
	in country varchar(50),
	in branch_name varchar(50),
	in job_title varchar(50),
	in pay_grade int,
	in dept_name varchar(50),
	in emp_status_name varchar(50),
	in SupervisorId varchar(10) ,
	in marital_status varchar(50),
	out emp_id_out varchar(10)
)
BEGIN

	-- declare variables to store values --
	DECLARE address_id_variable varchar(10);
	DECLARE branch_id_variable varchar(50);
	DECLARE job_id_variable varchar(10);
	DECLARE dept_id_variable varchar(10);
	DECLARE emp_status_id_variable varchar(10);

	-- declaring exit handler for transaction --
	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
		BEGIN
			ROLLBACK;
			RESIGNAL;
		END;

	-- starting transaction --
	START TRANSACTION;

	-- inserting datas to address table --
	INSERT 
	INTO 
	address
	(
		PB_number,
		street_name,
		city_name,
		country
	)
	VALUES
	(
		PB_number,
		street_name,
		city_name,
		country
	);

	-- passing retrieved value from sql query to defined variable --
	select address.address_id from address order by address.address_id desc limit 1 into address_id_variable; 
	select branches.branch_id from branches where branches.branch_name = branch_name into branch_id_variable;
	select role.job_id from role where role.job_title = job_title and role.pay_grade = pay_grade into job_id_variable;
	select department.dept_id from department where department.dept_name = dept_name into dept_id_variable;
	select emp_status.emp_status_id from emp_status where emp_status.status_name = emp_status_name into emp_status_id_variable;

	-- inserting datas to employee table using address_id value --
	INSERT 
	INTO employee 
	( 
		first_name, 
		last_name, 
		birth_date, 
		address_id, 
		branch_id, 
		job_id, 
		dept_id, 
		emp_status_id, 
		SupervisorId, 
		marital_status 
	) 
	VALUES 
	(
		first_name, 
		last_name, 
		birth_date, 
		address_id_variable, 
		branch_id_variable, 
		job_id_variable, 
		dept_id_variable, 
		emp_status_id_variable, 
		SupervisorId, 
		marital_status          
	);

	-- setting the output value to the last added emp_id --
	select employee.emp_id from employee order by employee.emp_id desc limit 1 into emp_id_out;  

	-- commiting transaction --
	COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_leave_application` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_leave_application`(
    in emp_id varchar(10),
    in leave_type_name varchar(50),
    in reason varchar(100),
    in start_date date,
    in end_date date
)
BEGIN -- declare variables to store values --
DECLARE leave_type_id_variable varchar(10);

DECLARE supervisor_id_variable varchar(10);

-- declaring exit handler for transaction --
DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN ROLLBACK;

RESIGNAL;

END;

-- starting transaction --
START TRANSACTION;

-- passing retrieved value from sql query to defined variable --
select
    leave_type_names.leave_type_id
from
    leave_type_names
where
    leave_type_names.leave_type_name = leave_type_name into leave_type_id_variable;

select
    employee.SupervisorId
from
    employee
where
    employee.emp_id = emp_id into supervisor_id_variable;

-- inserting datas to employee table using address_id value --
INSERT INTO
    leave_application (
        leave_type_id,
        reason,
        start_date,
        end_date,
        supervisor_id,
        emp_id
    )
VALUES
    (
        leave_type_id_variable,
        reason,
        start_date,
        end_date,
        supervisor_id_variable,
        emp_id
    );

-- commiting transaction --
COMMIT;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_dependent` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_dependent`(
	in dependent_id varchar(10),
    in name varchar(50),
	in birth_date date,
    in gender varchar(50),
    in relationship varchar(50),
    in emp_id varchar(10),
	in PB_number varchar(50),
	in street_name varchar(50),
	in city_name varchar(50),
	in country varchar(50)
)
BEGIN

	-- declare variables to store values --
	DECLARE address_id_variable varchar(10);

	-- declaring exit handler for transaction --
	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
		BEGIN
			ROLLBACK;
			RESIGNAL;
		END;

	-- starting transaction --
	START TRANSACTION;

	-- getting address_id value
    select dependent.address_id from dependent where dependent.dependent_id = dependent_id into address_id_variable;
    
    -- updating datas to address table --
	UPDATE address SET
		PB_number = PB_number,
		street_name = street_name,
		city_name = city_name,
		country = country
    WHERE address.address_id = address_id_variable;
    
    

	-- updating datas to dependent table using address_id value --
	UPDATE dependent SET
		name = name,
		b_date = b_date,
        gender = gender,
        relationship = relationship,
        emp_id = emp_id,
		address_id = address_id_variable
	WHERE dependent.dependent_id = dependent_id;

	-- commiting transaction --
	COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_emergency_contact` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_emergency_contact`(
	in emp_id varchar(10),
    in contact_name varchar(50),
    in relationship varchar(50),
	in PB_number varchar(50),
	in street_name varchar(50),
	in city_name varchar(50),
	in country varchar(50),
    in Mobile_phone varchar(15),
    in Home_phone varchar(15)
)
BEGIN

	-- declare variables to store values --
	DECLARE address_id_variable varchar(10);

	-- declaring exit handler for transaction --
	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
		BEGIN
			ROLLBACK;
			RESIGNAL;
		END;

	-- starting transaction --
	START TRANSACTION;

	-- getting address_id value
    select emergency_details.address_id from emergency_details where emergency_details.emp_id = emp_id into address_id_variable;
    
    -- updating datas to address table --
	UPDATE address SET
		PB_number = PB_number,
		street_name = street_name,
		city_name = city_name,
		country = country
    WHERE address.address_id = address_id_variable;

	-- inserting datas to dependent table using address_id value --
	UPDATE emergency_details SET 
		contact_name = contact_name,
		relationship = relationship,
		address_id = address_id_variable,
		Mobile_phone = Mobile_phone,
		Home_phone = Home_phone
	WHERE emergency_details.emp_id = emp_id;

	-- commiting transaction --
	COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_employee` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_employee`(
	in emp_id varchar(10),
	in first_name varchar(50),
	in last_name varchar(50),
	in birth_date date,
	in PB_number varchar(50),
	in street_name varchar(50),
	in city_name varchar(50),
	in country varchar(50),
	in branch_name varchar(50),
	in job_title varchar(50),
	in pay_grade int,
	in dept_name varchar(50),
	in emp_status_name varchar(50),
	in SupervisorId varchar(10) ,
	in marital_status varchar(50)
)
BEGIN

	-- declare variables to store values --
    DECLARE address_id_variable varchar(10);
	DECLARE branch_id_variable varchar(50);
	DECLARE job_id_variable varchar(10);
	DECLARE dept_id_variable varchar(10);
	DECLARE emp_status_id_variable varchar(10);

	-- declaring exit handler for transaction --
	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
		BEGIN
			ROLLBACK;
			RESIGNAL;
		END;

	-- starting transaction --
	START TRANSACTION;
    
    -- getting address_id --
    SELECT employee.address_id from employee WHERE employee.emp_id = emp_id into address_id_variable; 

	-- updating datas to address table --
	UPDATE address SET
		PB_number = PB_number,
		street_name = street_name,
		city_name = city_name,
		country = country
    WHERE address.address_id = address_id_variable
    ;

	-- passing retrieved value from sql query to defined variable --
	select branches.branch_id from branches where branches.branch_name = branch_name into branch_id_variable;
	select role.job_id from role where role.job_title = job_title and role.pay_grade = pay_grade into job_id_variable;
	select department.dept_id from department where department.dept_name = dept_name into dept_id_variable;
	select emp_status.emp_status_id from emp_status where emp_status.status_name = emp_status_name into emp_status_id_variable;

	-- updating datas to employee table --
	UPDATE employee SET
		first_name = first_name, 
		last_name = last_name, 
		birth_date = birth_date, 
		address_id = address_id_variable, 
		branch_id = branch_id_variable, 
		job_id = job_id_variable, 
		dept_id = dept_id_variable, 
		emp_status_id = emp_status_id_variable, 
		SupervisorId = SupervisorId, 
		marital_status  = marital_status
	WHERE employee.emp_id = emp_id;

	-- commiting transaction --
	COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `department_view`
--

/*!50001 DROP VIEW IF EXISTS `department_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `department_view` AS select `department`.`dept_id` AS `dept_id`,`department`.`dept_name` AS `dept_name`,count(`employee`.`emp_id`) AS `current_no_of_employees`,`department`.`no_of_employees` AS `max_no_of_employees`,`department`.`updated_at` AS `updated_at`,`department`.`created_at` AS `created_at` from (`department` left join `employee` on((`department`.`dept_id` = `employee`.`dept_id`))) group by `department`.`dept_name`,`department`.`dept_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `employee_info_view`
--

/*!50001 DROP VIEW IF EXISTS `employee_info_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `employee_info_view` AS select `employee`.`emp_id` AS `emp_id`,`employee`.`first_name` AS `first_name`,`employee`.`last_name` AS `last_name`,`employee`.`birth_date` AS `birth_date`,`employee`.`SupervisorId` AS `SupervisorId`,`employee`.`marital_status` AS `marital_status`,`address`.`PB_number` AS `PB_number`,`address`.`street_name` AS `street_name`,`address`.`city_name` AS `city_name`,`address`.`country` AS `country`,`branches`.`branch_name` AS `branch_name`,`role`.`job_title` AS `job_title`,`role`.`pay_grade` AS `pay_grade`,`department`.`dept_name` AS `dept_name`,`emp_status`.`status_name` AS `status_name`,`employee`.`created_at` AS `created_at`,`employee`.`updated_at` AS `updated_at` from (((((`employee` left join `address` on((`employee`.`address_id` = `address`.`address_id`))) left join `branches` on((`employee`.`branch_id` = `branches`.`branch_id`))) left join `role` on((`employee`.`job_id` = `role`.`job_id`))) left join `department` on((`employee`.`dept_id` = `department`.`dept_id`))) left join `emp_status` on((`employee`.`emp_status_id` = `emp_status`.`emp_status_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `leave_app_set`
--

/*!50001 DROP VIEW IF EXISTS `leave_app_set`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `leave_app_set` AS select `leave_application`.`req_id` AS `req_id`,`leave_application`.`leave_type_id` AS `leave_type_id`,`leave_type_names`.`leave_type_name` AS `leave_type_name`,`leave_application`.`reason` AS `reason`,`leave_application`.`start_date` AS `start_date`,`leave_application`.`end_date` AS `end_date`,(to_days(`leave_application`.`end_date`) - to_days(`leave_application`.`start_date`)) AS `no_of_days`,`leave_application`.`supervisor_id` AS `supervisor_id`,`leave_application`.`req_status` AS `req_status`,`leave_application`.`emp_id` AS `emp_id`,`role`.`pay_grade` AS `pay_grade`,`number_of_leaves`.`default_days` AS `default_days`,`leave_application`.`created_at` AS `created_at`,`leave_application`.`updated_at` AS `updated_at` from ((((`leave_application` left join `employee` on((`leave_application`.`emp_id` = `employee`.`emp_id`))) left join `role` on((`employee`.`job_id` = `role`.`job_id`))) left join `number_of_leaves` on(((`leave_application`.`leave_type_id` = `number_of_leaves`.`leave_type_id`) and (`role`.`pay_grade` = `number_of_leaves`.`pay_grade`)))) left join `leave_type_names` on((`leave_application`.`leave_type_id` = `leave_type_names`.`leave_type_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `leave_application_view`
--

/*!50001 DROP VIEW IF EXISTS `leave_application_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `leave_application_view` AS select `leave_application`.`req_id` AS `req_id`,`leave_type_names`.`leave_type_name` AS `leave_type_name`,`leave_application`.`reason` AS `reason`,`leave_application`.`start_date` AS `start_date`,`leave_application`.`end_date` AS `end_date`,`leave_application`.`supervisor_id` AS `supervisor_id`,`leave_application`.`req_status` AS `req_status`,`leave_application`.`emp_id` AS `emp_id`,`employee`.`first_name` AS `first_name`,`employee`.`last_name` AS `last_name`,`department`.`dept_name` AS `dept_name`,`leave_application`.`created_at` AS `created_at`,`leave_application`.`updated_at` AS `updated_at` from (((`leave_application` left join `leave_type_names` on((`leave_application`.`leave_type_id` = `leave_type_names`.`leave_type_id`))) left join `employee` on((`employee`.`emp_id` = `leave_application`.`emp_id`))) left join `department` on((`employee`.`dept_id` = `department`.`dept_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `leave_count_per_employee_view`
--

/*!50001 DROP VIEW IF EXISTS `leave_count_per_employee_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `leave_count_per_employee_view` AS select `employee`.`emp_id` AS `emp_id`,`number_of_leaves`.`leave_type_id` AS `leave_type_id`,`leave_type_names`.`leave_type_name` AS `leave_type_name`,ifnull(`leave_count_set`.`total_no_of_leaves_taken`,0) AS `total_no_of_leaves_taken`,`number_of_leaves`.`default_days` AS `total_no_of_permitted_days`,((ifnull(`leave_count_set`.`total_no_of_leaves_taken`,0) / `number_of_leaves`.`default_days`) * 100) AS `percentage_leaves_taken` from ((((`employee` left join `role` on((`employee`.`job_id` = `role`.`job_id`))) join `number_of_leaves` on((`role`.`pay_grade` = `number_of_leaves`.`pay_grade`))) left join `leave_type_names` on((`number_of_leaves`.`leave_type_id` = `leave_type_names`.`leave_type_id`))) left join `leave_count_set` on(((`employee`.`emp_id` = `leave_count_set`.`emp_id`) and (`number_of_leaves`.`leave_type_id` = `leave_count_set`.`leave_type_id`)))) order by `employee`.`emp_id`,`number_of_leaves`.`leave_type_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `leave_count_set`
--

/*!50001 DROP VIEW IF EXISTS `leave_count_set`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `leave_count_set` AS select `leave_app_set`.`emp_id` AS `emp_id`,`leave_app_set`.`leave_type_id` AS `leave_type_id`,`leave_app_set`.`leave_type_name` AS `leave_type_name`,sum(`leave_app_set`.`no_of_days`) AS `total_no_of_leaves_taken`,`leave_app_set`.`default_days` AS `default_days` from `leave_app_set` where (`leave_app_set`.`req_status` = 'Accepted') group by `leave_app_set`.`emp_id`,`leave_app_set`.`leave_type_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `user_info_view`
--

/*!50001 DROP VIEW IF EXISTS `user_info_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `user_info_view` AS select `account`.`username` AS `username`,`account`.`password` AS `password`,`employee`.`emp_id` AS `emp_id`,`employee`.`first_name` AS `first_name`,`employee`.`last_name` AS `last_name`,`employee`.`birth_date` AS `birth_date`,`employee`.`SupervisorId` AS `SupervisorId`,`employee`.`marital_status` AS `marital_status`,concat(`address`.`PB_number`,',',`address`.`street_name`,',',`address`.`city_name`,',',`address`.`country`) AS `address`,`branches`.`branch_name` AS `branch_name`,`role`.`job_title` AS `job_title`,`department`.`dept_name` AS `dept_name`,`emp_status`.`status_name` AS `status_name` from ((((((`employee` left join `account` on((`employee`.`emp_id` = `account`.`emp_id`))) left join `address` on((`employee`.`address_id` = `address`.`address_id`))) left join `branches` on((`employee`.`branch_id` = `branches`.`branch_id`))) left join `role` on((`employee`.`job_id` = `role`.`job_id`))) left join `department` on((`employee`.`dept_id` = `department`.`dept_id`))) left join `emp_status` on((`employee`.`emp_status_id` = `emp_status`.`emp_status_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `yearly_leave_count_view`
--

/*!50001 DROP VIEW IF EXISTS `yearly_leave_count_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `yearly_leave_count_view` AS select `s`.`emp_id` AS `emp_id`,sum(`s`.`jan`) AS `jan`,sum(`s`.`feb`) AS `feb`,sum(`s`.`mar`) AS `mar`,sum(`s`.`apr`) AS `apr`,sum(`s`.`may`) AS `may`,sum(`s`.`jun`) AS `jun`,sum(`s`.`jul`) AS `jul`,sum(`s`.`aug`) AS `aug`,sum(`s`.`sep`) AS `sep`,sum(`s`.`oct`) AS `oct`,sum(`s`.`nov`) AS `nov`,sum(`s`.`dece`) AS `dece` from (select `leave_application_view`.`req_id` AS `req_id`,`leave_application_view`.`start_date` AS `start_date`,`leave_application_view`.`end_date` AS `end_date`,greatest((to_days(least(`leave_application_view`.`end_date`,concat(year(curdate()),'-01-31'))) - to_days(greatest(`leave_application_view`.`start_date`,concat(year(curdate()),'-01-01')))),0) AS `jan`,greatest((to_days(least(`leave_application_view`.`end_date`,concat(year(curdate()),'-02-28'))) - to_days(greatest(`leave_application_view`.`start_date`,concat(year(curdate()),'-02-01')))),0) AS `feb`,greatest((to_days(least(`leave_application_view`.`end_date`,concat(year(curdate()),'-03-31'))) - to_days(greatest(`leave_application_view`.`start_date`,concat(year(curdate()),'-03-01')))),0) AS `mar`,greatest((to_days(least(`leave_application_view`.`end_date`,concat(year(curdate()),'-04-30'))) - to_days(greatest(`leave_application_view`.`start_date`,concat(year(curdate()),'-04-01')))),0) AS `apr`,greatest((to_days(least(`leave_application_view`.`end_date`,concat(year(curdate()),'-05-31'))) - to_days(greatest(`leave_application_view`.`start_date`,concat(year(curdate()),'-05-01')))),0) AS `may`,greatest((to_days(least(`leave_application_view`.`end_date`,concat(year(curdate()),'-06-30'))) - to_days(greatest(`leave_application_view`.`start_date`,concat(year(curdate()),'-06-01')))),0) AS `jun`,greatest((to_days(least(`leave_application_view`.`end_date`,concat(year(curdate()),'-07-31'))) - to_days(greatest(`leave_application_view`.`start_date`,concat(year(curdate()),'-07-01')))),0) AS `jul`,greatest((to_days(least(`leave_application_view`.`end_date`,concat(year(curdate()),'-08-31'))) - to_days(greatest(`leave_application_view`.`start_date`,concat(year(curdate()),'-08-01')))),0) AS `aug`,greatest((to_days(least(`leave_application_view`.`end_date`,concat(year(curdate()),'-09-30'))) - to_days(greatest(`leave_application_view`.`start_date`,concat(year(curdate()),'-09-01')))),0) AS `sep`,greatest((to_days(least(`leave_application_view`.`end_date`,concat(year(curdate()),'-10-31'))) - to_days(greatest(`leave_application_view`.`start_date`,concat(year(curdate()),'-10-01')))),0) AS `oct`,greatest((to_days(least(`leave_application_view`.`end_date`,concat(year(curdate()),'-11-30'))) - to_days(greatest(`leave_application_view`.`start_date`,concat(year(curdate()),'-11-01')))),0) AS `nov`,greatest((to_days(least(`leave_application_view`.`end_date`,concat(year(curdate()),'-12-31'))) - to_days(greatest(`leave_application_view`.`start_date`,concat(year(curdate()),'-12-01')))),0) AS `dece`,`leave_application_view`.`req_status` AS `req_status`,`leave_application_view`.`emp_id` AS `emp_id` from `leave_application_view` where (`leave_application_view`.`req_status` = 'Accepted')) `s` group by `s`.`emp_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-01 19:59:50
