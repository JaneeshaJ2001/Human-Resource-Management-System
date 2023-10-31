drop database if exists hrms;

create database hrms;

use hrms;

-- || adding tables || --
-- uncomment to drop previous tables if exists
-- drop table if exists company;
-- drop table if exists user_roll;
-- drop table if exists department;
-- drop table if exists Role;
-- drop table if exists address;
-- drop table if exists Branches;
-- drop table if exists leave_type_names;
-- drop table if exists emp_status;
-- drop table if exists custom_Attributes;
-- drop table if exists number_of_leaves;
-- drop table if exists Employee;
-- drop table if exists Emergency_details;
-- drop table if exists Account;
-- drop table if exists leave_application;
-- drop table if exists dependent;
-- drop table if exists contact;
-- drop table if exists leave_record;
-- creating tables
CREATE TABLE company (
    reg_num varchar(10),
    name varchar(50) NOT NULL,
    updated_at timestamp,
    created_at timestamp,
    PRIMARY KEY (reg_num)
);

CREATE TABLE department (
    dept_id varchar(10),
    dept_name varchar(50) NOT NULL,
    no_of_employees int,
    updated_at timestamp,
    created_at timestamp,
    PRIMARY KEY (dept_id)
);

CREATE TABLE user_role (
    role_id VARCHAR(20),
    role_name VARCHAR(50),
    updated_at timestamp,
    created_at timestamp,
    PRIMARY KEY (role_id)
);

CREATE TABLE Role (
    job_id varchar(10),
    job_title varchar(50) NOT NULL,
    pay_grade int,
    updated_at timestamp,
    created_at timestamp,
    PRIMARY KEY (job_id),
    check(
        job_title in (
            'HRManager',
            'Accountant',
            'Software Engineer',
            'QA Engineer',
            'Supervisor'
        )
    ),
    check(pay_grade in (1, 2, 3, 4))
);

CREATE TABLE address (
    address_id varchar(10),
    PB_number varchar(50),
    street_name varchar(50),
    city_name varchar(50),
    country varchar(50) NOT NULL,
    updated_at timestamp,
    created_at timestamp,
    PRIMARY KEY (address_id)
);

CREATE TABLE Branches (
    branch_id varchar(10),
    branch_name varchar(50) NOT NULL,
    reg_num varchar(10) NOT NULL,
    Hotline varchar(15) NOT NULL,
    address_id varchar(10) NOT NULL,
    updated_at timestamp,
    created_at timestamp,
    PRIMARY KEY (branch_id),
    FOREIGN KEY (reg_num) REFERENCES company(reg_num),
    FOREIGN KEY (address_id) REFERENCES address(address_id)
);

CREATE TABLE leave_type_names (
    leave_type_id varchar(10),
    leave_type_name varchar(50) NOT NULL,
    updated_at timestamp,
    created_at timestamp,
    PRIMARY KEY (leave_type_id),
    check(
        leave_type_name in ('Annual', 'Casual', 'Maternity', 'No-pay')
    )
);

CREATE TABLE emp_status (
    emp_status_id varchar(10),
    status_name varchar(50) NOT NULL,
    updated_at timestamp,
    created_at timestamp,
    PRIMARY KEY (emp_status_id),
    check(
        status_name in (
            'Intern-ft',
            'Intern-pt',
            'Contract-ft',
            'Contract-pt',
            'Permanent',
            'Freelance'
        )
    )
);

CREATE TABLE custom_Attributes (
    attribute_id varchar(10),
    attribute_name varchar(50) NOT NULL,
    data_type varchar(50) NOT NULL,
    description varchar(100),
    updated_date date NOT NULL,
    updated_at timestamp,
    created_at timestamp,
    PRIMARY KEY (attribute_id)
);

CREATE TABLE number_of_leaves (
    pay_grade int,
    leave_type_id varchar(10),
    default_days int NOT NULL,
    updated_at timestamp,
    created_at timestamp,
    PRIMARY KEY (pay_grade, leave_type_id),
    FOREIGN KEY (leave_type_id) REFERENCES leave_type_names(leave_type_id),
    check(pay_grade in (1, 2, 3, 4))
);

CREATE TABLE Employee (
    emp_id varchar(10),
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    birth_date date,
    address_id varchar(10),
    branch_id varchar(10) NOT NULL,
    job_id varchar(10) NOT NULL,
    dept_id varchar(10),
    emp_status_id varchar(10) NOT NULL,
    SupervisorId varchar(10),
    marital_status varchar(50),
    updated_at timestamp,
    created_at timestamp,
    PRIMARY KEY (emp_id),
    FOREIGN KEY (dept_id) REFERENCES department(dept_id),
    FOREIGN KEY (SupervisorId) REFERENCES Employee(emp_id),
    FOREIGN KEY (job_id) REFERENCES Role(job_id),
    FOREIGN KEY (branch_id) REFERENCES Branches(branch_id),
    FOREIGN KEY (emp_status_id) REFERENCES emp_status(emp_status_id),
    FOREIGN KEY (address_id) REFERENCES address(address_id),
    check(marital_status in ('Married', 'Single', 'Other'))
);

CREATE TABLE Emergency_details (
    emp_id varchar(10),
    contact_name varchar(50) NOT NULL,
    relationship varchar(50) NOT NULL,
    address_id varchar(10),
    Mobile_phone varchar(15),
    Home_phone varchar(15),
    updated_at timestamp,
    created_at timestamp,
    PRIMARY KEY (emp_id),
    FOREIGN KEY (address_id) REFERENCES address(address_id) on delete cascade,
    FOREIGN KEY (emp_id) REFERENCES Employee(emp_id) ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE Account (
    username varchar(50),
    password varchar(255) NOT NULL,
    emp_id varchar(10) UNIQUE,
    role_id varchar(20),
    -- admin
    updated_at timestamp,
    created_at timestamp,
    PRIMARY KEY (username),
    FOREIGN KEY (role_id) REFERENCES user_role(role_id),
    FOREIGN KEY (emp_id) REFERENCES Employee(emp_id) ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE leave_application (
    req_id varchar(10),
    leave_type_id varchar(10) NOT NULL,
    reason varchar(100),
    start_date date NOT NULL,
    end_date date NOT NULL,
    supervisor_id varchar(10),
    req_status varchar(10) NOT NULL DEFAULT 'Pending',
    emp_id varchar(10) NOT NULL,
    updated_at timestamp,
    created_at timestamp,
    PRIMARY KEY (req_id),
    FOREIGN KEY (emp_id) REFERENCES Employee(emp_id) ON DELETE CASCADE ON UPDATE NO ACTION,
    FOREIGN KEY (supervisor_id) REFERENCES Employee(SupervisorId) on delete cascade on update cascade,
    FOREIGN KEY (leave_type_id) REFERENCES number_of_leaves(leave_type_id),
    check (req_status in('Accepted', 'Declined', 'Pending'))
);

CREATE TABLE dependent (
    name varchar(50) NOT NULL,
    b_date date,
    gender varchar(50) NOT NULL,
    relationship varchar(50) NOT NULL,
    emp_id varchar(10),
    dependent_id varchar(10),
    address_id varchar(10) NOT NULL,
    updated_at timestamp,
    created_at timestamp,
    PRIMARY KEY (dependent_id, emp_id),
    FOREIGN KEY (emp_id) REFERENCES Employee(emp_id) ON DELETE CASCADE ON UPDATE NO ACTION,
    FOREIGN KEY (address_id) REFERENCES address(address_id) on delete cascade on update cascade,
    check(gender in ('Male', 'Female', 'Other'))
);

CREATE TABLE contact (
    emp_id varchar(10),
    contact_number varchar(15),
    updated_at timestamp,
    created_at timestamp,
    PRIMARY KEY (emp_id, contact_number),
    FOREIGN KEY (emp_id) REFERENCES Employee(emp_id) on delete cascade on update cascade
);

CREATE TABLE leave_record (
    emp_id varchar(10),
    no_of_annual_leaves_taken int NOT NULL DEFAULT 0,
    no_of_casual_leaves_taken int NOT NULL DEFAULT 0,
    no_of_maternity_leaves_taken int NOT NULL DEFAULT 0,
    no_of_nopay_leaves_taken int NOT NULL DEFAULT 0,
    updated_at timestamp,
    created_at timestamp,
    PRIMARY KEY (emp_id),
    FOREIGN KEY (emp_id) REFERENCES Employee(emp_id) ON DELETE CASCADE ON UPDATE NO ACTION
);


-- || adding triggers for auto incrementing IDs || --

-- Trigger one_employee

DROP TRIGGER IF EXISTS tg_employee_auto_increment;
DELIMITER $$
CREATE TRIGGER tg_employee_auto_increment
BEFORE INSERT ON Employee
FOR EACH ROW
BEGIN
  DECLARE next_emp_id INT;

  -- Find the maximum emp_id in the table and increment it by 1
  SELECT IFNULL(MAX(CAST(SUBSTRING(emp_id,3,3) AS SIGNED)), 0) + 1 INTO next_emp_id FROM Employee;
  
  -- Set the NEW emp_id to the calculated next_emp_id
  SET NEW.emp_id = CONCAT('e-',LPAD(next_emp_id, 3, '0'));
END$$
DELIMITER ;


-- Trigger 2 Account

DROP TRIGGER IF EXISTS tg_user_auto_increment;
DELIMITER $$
CREATE TRIGGER tg_user_auto_increment
BEFORE INSERT ON Account
FOR EACH ROW
BEGIN
  DECLARE next_user_id INT;

  -- Find the maximum emp_id in the table and increment it by 1
  SELECT IFNULL(MAX(CAST(SUBSTRING(username,3,3) AS SIGNED)), 0) + 1 INTO next_user_id FROM Account;
  
  -- Set the NEW emp_id to the calculated next_emp_id
  SET NEW.username = CONCAT('u-',LPAD(next_user_id, 3, '0'));
END$$
DELIMITER ;



-- Trigger 3 Address

DROP TRIGGER IF EXISTS tg_address_auto_increment;
DELIMITER $$
CREATE TRIGGER tg_address_auto_increment
BEFORE INSERT ON address
FOR EACH ROW
BEGIN
  DECLARE next_address_id INT;

  -- Find the maximum emp_id in the table and increment it by 1
  SELECT IFNULL(MAX(CAST(SUBSTRING(address_id,4,3) AS SIGNED)), 0) + 1 INTO next_address_id FROM address;
  
  -- Set the NEW emp_id to the calculated next_emp_id
  SET NEW.address_id = CONCAT('ad-',LPAD(next_address_id, 3, '0'));
END$$
DELIMITER ;



-- Trigger 4 Branches

DROP TRIGGER IF EXISTS tg_branches_auto_increment;
DELIMITER $$
CREATE TRIGGER tg_branches_auto_increment
BEFORE INSERT ON branches
FOR EACH ROW
BEGIN
  DECLARE next_branch_id INT;

  -- Find the maximum emp_id in the table and increment it by 1
  SELECT IFNULL(MAX(CAST(SUBSTRING(branch_id,4,3) AS SIGNED)), 0) + 1 INTO next_branch_id FROM branches;
  
  -- Set the NEW emp_id to the calculated next_emp_id
  SET NEW.branch_id = CONCAT('br-',LPAD(next_branch_id, 3, '0'));
END$$
DELIMITER ;



-- Trigger 5 Company

DROP TRIGGER IF EXISTS tg_company_auto_increment;
DELIMITER $$
CREATE TRIGGER tg_company_auto_increment
BEFORE INSERT ON company
FOR EACH ROW
BEGIN
  DECLARE next_company_id INT;

  -- Find the maximum emp_id in the table and increment it by 1
  SELECT IFNULL(MAX(CAST(SUBSTRING(reg_num,5,3) AS SIGNED)), 0) + 1 INTO next_company_id FROM company;
  
  -- Set the NEW emp_id to the calculated next_emp_id
  SET NEW.reg_num = CONCAT('com-',LPAD(next_company_id, 3, '0'));
END$$
DELIMITER ;


-- trigger 7  Customm_attributes

DROP TRIGGER IF EXISTS tg_custom_attributes_auto_increment;
DELIMITER $$
CREATE TRIGGER tg_custom_attributes_auto_increment
BEFORE INSERT ON custom_attributes
FOR EACH ROW
BEGIN
  DECLARE next_attribute_id INT;

  -- Find the maximum emp_id in the table and increment it by 1
  SELECT IFNULL(MAX(CAST(SUBSTRING(attribute_id,4,3) AS SIGNED)), 0) + 1 INTO next_attribute_id FROM custom_attributes;
  
  -- Set the NEW emp_id to the calculated next_emp_id
  SET NEW.attribute_id = CONCAT('at-',LPAD(next_attribute_id, 3, '0'));
END$$
DELIMITER ;



-- Trigger 8 Department

DROP TRIGGER IF EXISTS tg_custom_department_auto_increment;
DELIMITER $$
CREATE TRIGGER tg_custom_department_auto_increment
BEFORE INSERT ON department
FOR EACH ROW
BEGIN
  DECLARE next_dept_id INT;

  -- Find the maximum emp_id in the table and increment it by 1
  SELECT IFNULL(MAX(CAST(SUBSTRING(dept_id,5,3) AS SIGNED)), 0) + 1 INTO next_dept_id FROM department;
  
  -- Set the NEW emp_id to the calculated next_emp_id
  SET NEW.dept_id = CONCAT('dep-',LPAD(next_dept_id, 3, '0'));
END$$
DELIMITER ;


-- Trigger 9 Dependent

DROP TRIGGER IF EXISTS tg_custom_dependent_auto_increment;
DELIMITER $$
CREATE TRIGGER tg_custom_dependent_auto_increment
BEFORE INSERT ON dependent
FOR EACH ROW
BEGIN
  DECLARE next_dependent_id INT;

  -- Find the maximum emp_id in the table and increment it by 1
  SELECT IFNULL(MAX(CAST(SUBSTRING(dependent_id,3,3) AS SIGNED)), 0) + 1 INTO next_dependent_id FROM dependent;
  
  -- Set the NEW emp_id to the calculated next_emp_id
  SET NEW.dependent_id = CONCAT('d-',LPAD(next_dependent_id, 3, '0'));
END$$
DELIMITER ;


-- Trigger 10 EMp_status

DROP TRIGGER IF EXISTS tg_emp_status_auto_increment;
DELIMITER $$
CREATE TRIGGER tg_emp_status_auto_increment
BEFORE INSERT ON emp_status
FOR EACH ROW
BEGIN
  DECLARE next_emp_status_id INT;

  -- Find the maximum emp_id in the table and increment it by 1
  SELECT IFNULL(MAX(CAST(SUBSTRING(emp_status_id,4,3) AS SIGNED)), 0) + 1 INTO next_emp_status_id FROM emp_status;
  
  -- Set the NEW emp_id to the calculated next_emp_id
  SET NEW.emp_status_id = CONCAT('es-',LPAD(next_emp_status_id, 3, '0'));
END$$
DELIMITER ;


-- Trigger 11 Leave Application

DROP TRIGGER IF EXISTS tg_leave_application_auto_increment;
DELIMITER $$
CREATE TRIGGER tg_leave_application_auto_increment
BEFORE INSERT ON leave_application
FOR EACH ROW
BEGIN
  DECLARE next_req_id INT;

  -- Find the maximum emp_id in the table and increment it by 1
  SELECT IFNULL(MAX(CAST(SUBSTRING(req_id,4,3) AS SIGNED)), 0) + 1 INTO next_req_id FROM leave_application;
  
  -- Set the NEW emp_id to the calculated next_emp_id
  SET NEW.req_id = CONCAT('rq-',LPAD(next_req_id, 3, '0'));
END$$
DELIMITER ;


-- Trigger 12 Leave type names

DROP TRIGGER IF EXISTS tg_leave_type_name_auto_increment;
DELIMITER $$
CREATE TRIGGER tg_leave_type_name_auto_increment
BEFORE INSERT ON leave_type_names
FOR EACH ROW
BEGIN
  DECLARE next_leave_type_id INT;

  -- Find the maximum emp_id in the table and increment it by 1
  SELECT IFNULL(MAX(CAST(SUBSTRING(leave_type_id,4,3) AS SIGNED)), 0) + 1 INTO next_leave_type_id FROM leave_type_names;
  
  -- Set the NEW emp_id to the calculated next_emp_id
  SET NEW.leave_type_id = CONCAT('lv-',LPAD(next_leave_type_id, 3, '0'));
END$$
DELIMITER ;


-- Trigger 13 Role

DROP TRIGGER IF EXISTS tg_job_id_auto_increment;
DELIMITER $$
CREATE TRIGGER tg_job_id_auto_increment
BEFORE INSERT ON role
FOR EACH ROW
BEGIN
  DECLARE next_job_id INT;

  -- Find the maximum emp_id in the table and increment it by 1
  SELECT IFNULL(MAX(CAST(SUBSTRING(job_id,3,3) AS SIGNED)), 0) + 1 INTO next_job_id FROM role;
  
  -- Set the NEW emp_id to the calculated next_emp_id
  SET NEW.job_id = CONCAT('j-',LPAD(next_job_id, 3, '0'));
END$$
DELIMITER ;


-- Trigger 14 User_Role

DROP TRIGGER IF EXISTS tg_user_role_auto_increment;
DELIMITER $$
CREATE TRIGGER tg_user_role_auto_increment
BEFORE INSERT ON user_role
FOR EACH ROW
BEGIN
  DECLARE next_role_id INT;
  
  -- Find the maximum numeric portion of role_id and increment it by 1
  SELECT IFNULL(MAX(CAST(SUBSTRING(role_id, 3,3) AS SIGNED)), 0) + 1 INTO next_role_id FROM user_role;
  
  -- Set the NEW role_id to the calculated next_role_id in 'r-XXX' format
  SET NEW.role_id = CONCAT('r-', LPAD(next_role_id, 3, '0'));
END$$
DELIMITER ;  


-- || adding triggers to auto fill created_at and updated_at attributes in each relation || --

DROP TRIGGER IF EXISTS timestamp_after_insertion_company;
DELIMITER ;;
CREATE TRIGGER timestamp_after_insertion_company
BEFORE INSERT
ON company
FOR EACH ROW
BEGIN
   SET new.created_at = now();
   set new.updated_at = now();
END;;
DELIMITER ;

DROP TRIGGER IF EXISTS timestamp_after_update_company;
DELIMITER ;;
CREATE TRIGGER timestamp_after_update_company
BEFORE UPDATE
ON company
FOR EACH ROW
BEGIN
   set new.updated_at = now();
END;;
DELIMITER ;

-- account

DROP TRIGGER IF EXISTS timestamp_after_insertion_account;
DELIMITER ;;
CREATE TRIGGER timestamp_after_insertion_account
BEFORE INSERT
ON account
FOR EACH ROW
BEGIN
   SET new.created_at = now();
   set new.updated_at = now();
END;;
DELIMITER ;

drop trigger if exists timestamp_after_update_account;
DELIMITER ;;
CREATE TRIGGER timestamp_after_update_account
BEFORE UPDATE
ON account
FOR EACH ROW
BEGIN
   set new.updated_at = now();
END;;
DELIMITER ;

-- address

DROP TRIGGER IF EXISTS timestamp_after_insertion_address;
DELIMITER ;;
CREATE TRIGGER timestamp_after_insertion_address
BEFORE INSERT
ON address
FOR EACH ROW
BEGIN
   SET new.created_at = now();
   set new.updated_at = now();
END;;
DELIMITER ;

drop trigger if exists timestamp_after_update_address;
DELIMITER ;;
CREATE TRIGGER timestamp_after_update_address
BEFORE UPDATE
ON address
FOR EACH ROW
BEGIN
   set new.updated_at = now();
END;;
DELIMITER ;


-- branches

DROP TRIGGER IF EXISTS timestamp_after_insertion_branches;
DELIMITER ;;
CREATE TRIGGER timestamp_after_insertion_branches
BEFORE INSERT
ON branches
FOR EACH ROW
BEGIN
   SET new.created_at = now();
   set new.updated_at = now();
END;;
DELIMITER ;

drop trigger if exists timestamp_after_update_branches;
DELIMITER ;;
CREATE TRIGGER timestamp_after_update_branches
BEFORE UPDATE
ON branches
FOR EACH ROW
BEGIN
   set new.updated_at = now();
END;;
DELIMITER ;

-- contact

DROP TRIGGER IF EXISTS timestamp_after_insertion_contact;
DELIMITER ;;
CREATE TRIGGER timestamp_after_insertion_contact
BEFORE INSERT
ON contact
FOR EACH ROW
BEGIN
   SET new.created_at = now();
   set new.updated_at = now();
END;;
DELIMITER ;

drop trigger if exists timestamp_after_update_contact;
DELIMITER ;;
CREATE TRIGGER timestamp_after_update_contact
BEFORE UPDATE
ON contact
FOR EACH ROW
BEGIN
   set new.updated_at = now();
END;;
DELIMITER ;

-- custom_attributes

DROP TRIGGER IF EXISTS timestamp_after_insertion_custom_attributes;
DELIMITER ;;
CREATE TRIGGER timestamp_after_insertion_custom_attributes
BEFORE INSERT
ON custom_attributes
FOR EACH ROW
BEGIN
   SET new.created_at = now();
   set new.updated_at = now();
END;;
DELIMITER ;

drop trigger if exists timestamp_after_update_custom_attributes;
DELIMITER ;;
CREATE TRIGGER timestamp_after_update_custom_attributes
BEFORE UPDATE
ON custom_attributes
FOR EACH ROW
BEGIN
   set new.updated_at = now();
END;;
DELIMITER ;

-- department

DROP TRIGGER IF EXISTS timestamp_after_insertion_department;
DELIMITER ;;
CREATE TRIGGER timestamp_after_insertion_department
BEFORE INSERT
ON department
FOR EACH ROW
BEGIN
   SET new.created_at = now();
   set new.updated_at = now();
END;;
DELIMITER ;

drop trigger if exists timestamp_after_update_department;
DELIMITER ;;
CREATE TRIGGER timestamp_after_update_department
BEFORE UPDATE
ON department
FOR EACH ROW
BEGIN
   set new.updated_at = now();
END;;
DELIMITER ;

-- dependent

DROP TRIGGER IF EXISTS timestamp_after_insertion_dependent;
DELIMITER ;;
CREATE TRIGGER timestamp_after_insertion_dependent
BEFORE INSERT
ON dependent
FOR EACH ROW
BEGIN
   SET new.created_at = now();
   set new.updated_at = now();
END;;
DELIMITER ;

drop trigger if exists timestamp_after_update_dependent;
DELIMITER ;;
CREATE TRIGGER timestamp_after_update_dependent
BEFORE UPDATE
ON dependent
FOR EACH ROW
BEGIN
   set new.updated_at = now();
END;;
DELIMITER ;

-- emergency_details

DROP TRIGGER IF EXISTS timestamp_after_insertion_emergency_details;
DELIMITER ;;
CREATE TRIGGER timestamp_after_insertion_emergency_details
BEFORE INSERT
ON emergency_details
FOR EACH ROW
BEGIN
   SET new.created_at = now();
   set new.updated_at = now();
END;;
DELIMITER ;

drop trigger if exists timestamp_after_update_emergency_details;
DELIMITER ;;
CREATE TRIGGER timestamp_after_update_emergency_details
BEFORE UPDATE
ON emergency_details
FOR EACH ROW
BEGIN
   set new.updated_at = now();
END;;
DELIMITER ;

-- emp_status

DROP TRIGGER IF EXISTS timestamp_after_insertion_emp_status;
DELIMITER ;;
CREATE TRIGGER timestamp_after_insertion_emp_status
BEFORE INSERT
ON emp_status
FOR EACH ROW
BEGIN
   SET new.created_at = now();
   set new.updated_at = now();
END;;
DELIMITER ;

drop trigger if exists timestamp_after_update_emp_status;
DELIMITER ;;
CREATE TRIGGER timestamp_after_update_emp_status
BEFORE UPDATE
ON emp_status
FOR EACH ROW
BEGIN
   set new.updated_at = now();
END;;
DELIMITER ;

-- employee

DROP TRIGGER IF EXISTS timestamp_after_insertion_employee;
DELIMITER ;;
CREATE TRIGGER timestamp_after_insertion_employee
BEFORE INSERT
ON employee
FOR EACH ROW
BEGIN
   SET new.created_at = now();
   set new.updated_at = now();
END;;
DELIMITER ;

drop trigger if exists timestamp_after_update_employee;
DELIMITER ;;
CREATE TRIGGER timestamp_after_update_employee
BEFORE UPDATE
ON employee
FOR EACH ROW
BEGIN
   set new.updated_at = now();
END;;
DELIMITER ;

-- leave_application

DROP TRIGGER IF EXISTS timestamp_after_insertion_leave_application;
DELIMITER ;;
CREATE TRIGGER timestamp_after_insertion_leave_application
BEFORE INSERT
ON leave_application
FOR EACH ROW
BEGIN
   SET new.created_at = now();
   set new.updated_at = now();
END;;
DELIMITER ;

drop trigger if exists timestamp_after_update_leave_application;
DELIMITER ;;
CREATE TRIGGER timestamp_after_update_leave_application
BEFORE UPDATE
ON leave_application
FOR EACH ROW
BEGIN
   set new.updated_at = now();
END;;
DELIMITER ;


-- leave_record

DROP TRIGGER IF EXISTS timestamp_after_insertion_leave_record;
DELIMITER ;;
CREATE TRIGGER timestamp_after_insertion_leave_record
BEFORE INSERT
ON leave_record
FOR EACH ROW
BEGIN
   SET new.created_at = now();
   set new.updated_at = now();
END;;
DELIMITER ;

drop trigger if exists timestamp_after_update_leave_record;
DELIMITER ;;
CREATE TRIGGER timestamp_after_update_leave_record
BEFORE UPDATE
ON leave_record
FOR EACH ROW
BEGIN
   set new.updated_at = now();
END;;
DELIMITER ;


-- leave_type_names

DROP TRIGGER IF EXISTS timestamp_after_insertion_leave_type_names;
DELIMITER ;;
CREATE TRIGGER timestamp_after_insertion_leave_type_names
BEFORE INSERT
ON leave_type_names
FOR EACH ROW
BEGIN
   SET new.created_at = now();
   set new.updated_at = now();
END;;
DELIMITER ;

drop trigger if exists timestamp_after_update_leave_type_names;
DELIMITER ;;
CREATE TRIGGER timestamp_after_update_leave_type_names
BEFORE UPDATE
ON leave_type_names
FOR EACH ROW
BEGIN
   set new.updated_at = now();
END;;
DELIMITER ;

-- number_of_leaves

DROP TRIGGER IF EXISTS timestamp_after_insertion_number_of_leaves;
DELIMITER ;;
CREATE TRIGGER timestamp_after_insertion_number_of_leaves
BEFORE INSERT
ON number_of_leaves
FOR EACH ROW
BEGIN
   SET new.created_at = now();
   set new.updated_at = now();
END;;
DELIMITER ;

drop trigger if exists timestamp_after_update_number_of_leaves;
DELIMITER ;;
CREATE TRIGGER timestamp_after_update_number_of_leaves
BEFORE UPDATE
ON number_of_leaves
FOR EACH ROW
BEGIN
   set new.updated_at = now();
END;;
DELIMITER ;

-- role

DROP TRIGGER IF EXISTS timestamp_after_insertion_role;
DELIMITER ;;
CREATE TRIGGER timestamp_after_insertion_role
BEFORE INSERT
ON role
FOR EACH ROW
BEGIN
   SET new.created_at = now();
   set new.updated_at = now();
END;;
DELIMITER ;

drop trigger if exists timestamp_after_update_role;
DELIMITER ;;
CREATE TRIGGER timestamp_after_update_role
BEFORE UPDATE
ON role
FOR EACH ROW
BEGIN
   set new.updated_at = now();
END;;
DELIMITER ;

-- user_role

DROP TRIGGER IF EXISTS timestamp_after_insertion_user_role;
DELIMITER ;;
CREATE TRIGGER timestamp_after_insertion_user_role
BEFORE INSERT
ON user_role
FOR EACH ROW
BEGIN
   SET new.created_at = now();
   set new.updated_at = now();
END;;
DELIMITER ;

drop trigger if exists timestamp_after_update_user_role;
DELIMITER ;;
CREATE TRIGGER timestamp_after_update_user_role
BEFORE UPDATE
ON user_role
FOR EACH ROW
BEGIN
   set new.updated_at = now();
END;;
DELIMITER ;


-- || trigger to update address table|| --

DROP TRIGGER IF EXISTS address_delete_after_employee_delete
DELIMITER $$
create trigger address_delete_after_employee_delete
after delete on employee
for each row

begin
	delete from address
    where address.address_id= old.address_id;
end $$
DELIMITER ;


DROP TRIGGER IF EXISTS address_delete_after_branch_delete
DELIMITER $$
create trigger address_delete_after_branch_delete
after delete on Branches
for each row

begin
	delete from address
    where address.address_id= old.address_id;
end $$
DELIMITER ;


DROP TRIGGER IF EXISTS address_delete_after_emergency_delete
DELIMITER $$
create trigger address_delete_after_emergency_delete
after delete on Emergency_details
for each row

begin
	delete from address
    where address.address_id= old.address_id;
end $$
DELIMITER ;


DROP TRIGGER IF EXISTS address_delete_after_dependent_delete
DELIMITER $$
create trigger address_delete_after_dependent_delete
after delete on dependent
for each row

begin
	delete from address
    where address.address_id= old.address_id;
end $$
DELIMITER ;



-- || trigger to auto update values in leave_record table after update on leave_application table || --

drop trigger if exists update_num_of_leaves1;
Delimiter $$
CREATE TRIGGER update_num_of_leaves1
AFTER UPDATE ON leave_application
FOR EACH ROW
BEGIN
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
END $$

Delimiter ;


-- trigger to create new row in leave_record table after insertion in employee table --
DROP TRIGGER IF EXISTS create_leave_record_after_employee_insert;

DELIMITER $$ 
CREATE TRIGGER create_leave_record_after_employee_insert
AFTER INSERT ON employee 
FOR EACH ROW 
BEGIN
INSERT INTO
    leave_record (emp_id) VALUE (new.emp_id);

END $$ 
DELIMITER ;


-- || Procedures || --

-- procedure to add new employee --

DROP PROCEDURE IF EXISTS add_employee;
DELIMITER $$
CREATE PROCEDURE add_employee(
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
END $$
DELIMITER ;



-- procedure to update employee details --

DROP PROCEDURE IF EXISTS update_employee;
DELIMITER $$
CREATE PROCEDURE update_employee(
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
END $$
DELIMITER ;


-- procedure to add dependents --

DROP PROCEDURE IF EXISTS add_dependent;
DELIMITER $$
CREATE PROCEDURE add_dependent(
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
END $$
DELIMITER ;



-- procedure to update dependent details --

DROP PROCEDURE IF EXISTS update_dependent;
DELIMITER $$
CREATE PROCEDURE update_dependent(
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
END $$
DELIMITER ;



-- procedure to add emergency contacts --


DROP PROCEDURE IF EXISTS add_emergency_contact;
DELIMITER $$
CREATE PROCEDURE add_emergency_contact(
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
END $$
DELIMITER ;


-- procedure to update emergency contact --


DROP PROCEDURE IF EXISTS update_emergency_contact;
DELIMITER $$
CREATE PROCEDURE update_emergency_contact(
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
END $$
DELIMITER ;


-- procedure to add leave application --
DROP PROCEDURE IF EXISTS add_leave_application;

DELIMITER $ $ 
CREATE PROCEDURE add_leave_application(
    in emp_id varchar(10),
    in leave_type_name varchar(50),
    in reason varchar(100),
    in start_date date,
    in end_date date
) BEGIN -- declare variables to store values --
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

END $ $ 
DELIMITER ;


-- || indexes || --

create index contact_idx on contact(emp_id,contact_number);
create index num_of_leaves_idx on number_of_leaves (pay_grade, leave_type_id);
create index dependent_idx on dependent (dependent_id,emp_id); 


-- || views || --

create view user_info_view as
select account.username,account.password,employee.emp_id,employee.first_name,employee.last_name,employee.birth_date,employee.SupervisorId,employee.marital_status,
concat(address.PB_number,',',address.street_name,',',address.city_name,',',address.country) as address,
branches.branch_name,role.job_title,department.dept_name,emp_status.status_name
from employee
left join account on employee.emp_id=account.emp_id
left join address on employee.address_id=address.address_id
left join branches on employee.branch_id=branches.branch_id
left join role on employee.job_id=role.job_id
left join department on employee.dept_id=department.dept_id
left join emp_status on employee.emp_status_id=emp_status.emp_status_id;


drop view if exists employee_info_view;
create view employee_info_view as
select employee.emp_id,employee.first_name,employee.last_name,employee.birth_date,employee.SupervisorId,employee.marital_status,
address.PB_number,address.street_name,address.city_name,address.country,branches.branch_name,role.job_title,role.pay_grade,department.dept_name,emp_status.status_name,employee.created_at,employee.updated_at
from employee
left join address on employee.address_id=address.address_id
left join branches on employee.branch_id=branches.branch_id
left join role on employee.job_id=role.job_id
left join department on employee.dept_id=department.dept_id
left join emp_status on employee.emp_status_id=emp_status.emp_status_id;


drop view if exists department_view;
create view department_view as
select department.dept_id, department.dept_name, (count(emp_id)) as current_no_of_employees, 
department.no_of_employees as max_no_of_employees, 
department.updated_at, 
department.created_at
from department 
left join employee on department.dept_id= employee.dept_id
group by dept_name,dept_id;


drop view if exists leave_application_view;
create view leave_application_view as
select 
leave_application.req_id, leave_type_names.leave_type_name, 
leave_application.reason, leave_application.start_date, leave_application.end_date, 
leave_application.supervisor_id, leave_application.req_status, leave_application.emp_id,
employee.first_name, employee.last_name, 
leave_application.created_at, leave_application.updated_at 
from (leave_application left join leave_type_names 
on (leave_application.leave_type_id = leave_type_names.leave_type_id)) left join employee on (employee.emp_id = leave_application.emp_id) ;


drop view if exists leave_app_set;
create view leave_app_set as
select 
leave_application.req_id,leave_application.leave_type_id,leave_type_names.leave_type_name,leave_application.reason,
leave_application.start_date,leave_application.end_date, datediff(leave_application.end_date,leave_application.start_date) as no_of_days ,leave_application.supervisor_id,
leave_application.req_status, leave_application.emp_id, role.pay_grade, number_of_leaves.default_days, leave_application.created_at, leave_application.updated_at
from leave_application left join employee on (leave_application.emp_id = employee.emp_id) left join role on (employee.job_id = role.job_id) left join number_of_leaves on (leave_application.leave_type_id = number_of_leaves.leave_type_id
 and role.pay_grade = number_of_leaves.pay_grade) left join leave_type_names on (leave_application.leave_type_id = leave_type_names.leave_type_id);


drop view if exists leave_count_set;
create view leave_count_set as 
select emp_id, leave_type_id, leave_type_name, sum(no_of_days) as total_no_of_leaves_taken, default_days from leave_app_set where req_status = "Accepted" group by emp_id,leave_type_id; 


drop view if exists leave_count_per_employee_view;
create view leave_count_per_employee_view as
select
employee.emp_id, number_of_leaves.leave_type_id, leave_type_names.leave_type_name, ifnull(leave_count_set.total_no_of_leaves_taken,0) as total_no_of_leaves_taken, number_of_leaves.default_days
from employee left join role on (employee.job_id = role.job_id) join number_of_leaves on (role.pay_grade = number_of_leaves.pay_grade) left join leave_type_names on (number_of_leaves.leave_type_id = leave_type_names.leave_type_id)  left join leave_count_set on (employee.emp_id = leave_count_set.emp_id and number_of_leaves.leave_type_id = leave_count_set.leave_type_id) order by employee.emp_id, number_of_leaves.leave_type_id;