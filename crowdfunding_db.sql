-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: crowdfunding_db
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Dumping data for table `category`
--

LOCK TABLES category WRITE;
/*!40000 ALTER TABLE category DISABLE KEYS */;
INSERT INTO category VALUES ('LJ01','Legal and Justice'),('MH01','Mental Health'),('ND01','Natural Disaster');
/*!40000 ALTER TABLE category ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `fundraiser`
--

LOCK TABLES fundraiser WRITE;
/*!40000 ALTER TABLE fundraiser DISABLE KEYS */;
INSERT INTO fundraiser VALUES (1,'GetHelp Foundation','Mental Health Awareness Group',20000.00,18000.00,'Brisbane',1,'MH01'),(2,'ProvideHelp Foundation','Medical Professional Group for Mental Health',10000.00,28000.00,'Brisbane',0,'MH01'),(3,'JusticeLeague','Help a whistleblower out!',100000.00,98000.00,'Sydney',1,'LJ01'),(4,'TheNeedForSpeed','Help us establishing Australia first Autobahn',100000.00,1098000.00,'Logan City',1,'LJ01'),(5,'DisasterHelper','Help Flooding victim',20000.00,20000.00,'Brisbane',0,'ND01'),(6,'GreenEarth Initiative','Legal action for environmental protection',15000.00,12000.00,'Melbourne',1,'LJ01'),(7,'HealthyMinds Network','Mental health support for youth',25000.00,22000.00,'Cairns',1,'MH01'),(8,'TechForChange','Mental health tech solutions for schools',50000.00,40000.00,'Perth',0,'MH01'),(9,'DisasterRescue','Aid for flood victims in Victoria',30000.00,29000.00,'Geelong',1,'ND01'),(10,'WaterIsLife','Legal advocacy for clean water access',20000.00,15000.00,'Rockhampton',1,'LJ01'),(11,'SaveTheKoalas','Support for wildlife during disasters',35000.00,32000.00,'Gold Coast',1,'ND01'),(12,'TheLegalGuardians','Free legal aid for disaster victims',45000.00,43000.00,'Canberra',1,'LJ01'),(13,'EcoWarriors','Mental health support for environmental volunteers',18000.00,16000.00,'Adelaide',1,'MH01'),(14,'ChildhoodDreams','Disaster relief fund for terminally ill children',50000.00,45000.00,'Darwin',0,'ND01'),(15,'HopeForTomorrow','Legal services for unemployed youth',30000.00,28000.00,'Hobart',1,'LJ01'),(16,'TheNeedForSpeed','Help us establishing Australia first Autobahn this time in Brisbane',100000.00,2098000.00,'Brisbane',1,'LJ01'),(17,'TheNeedForSpeed','Help us establishing Australia first Autobahn this time in Sydney',100000.00,2098000.00,'Sydney',0,'LJ01');
/*!40000 ALTER TABLE fundraiser ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-25 20:49:02
