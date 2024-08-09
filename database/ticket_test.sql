-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 09, 2024 at 08:44 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ticket_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `ticket_number` varchar(255) DEFAULT NULL,
  `device_ref_number` varchar(255) NOT NULL,
  `complaint` text DEFAULT NULL,
  `category` int(11) NOT NULL,
  `status` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`id`, `ticket_number`, `device_ref_number`, `complaint`, `category`, `status`, `created_date`, `updated_date`) VALUES
(1, 'TICKET-1722425219673-880', 'sdfds', 'sdfsd', 2, 2, NULL, NULL),
(2, 'TICKET-1722425337292-826', 'asdasd', 'asdas', 2, 4, NULL, NULL),
(3, 'TICKET-1722425439251-519', 'asda', 'asdasd', 2, 1, NULL, NULL),
(4, 'TICKET-1722425500916-912', 'dsadas', 'asdasd', 2, 1, NULL, NULL),
(5, 'TICKET-1722425601238-520', 'sdasd', 'asdasd', 2, 1, NULL, NULL),
(6, 'TICKET-1722425730723-93', 'sadasd', 'asdasd', 2, 1, NULL, NULL),
(7, 'TICKET-1722426205321-117', 'dasd', 'asdas', 2, 1, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
