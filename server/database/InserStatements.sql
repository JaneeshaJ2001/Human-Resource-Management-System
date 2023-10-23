use hrms;

INSERT INTO
    company (name)
VALUES
    ('Jupiter');

INSERT INTO
    user_role (role_name)
VALUES
    ('HRmanager');

INSERT INTO
    user_role (role_name)
VALUES
    ('supervisor');

INSERT INTO
    user_role (role_name)
VALUES
    ('employee');

INSERT INTO
    department (dept_name, no_of_employees)
VALUES
    ('Human Resource', '15');

INSERT INTO
    department (dept_name, no_of_employees)
VALUES
    ('Finance', '20');

INSERT INTO
    department (dept_name, no_of_employees)
VALUES
    ('Software Engineering', '100');

INSERT INTO
    department (dept_name, no_of_employees)
VALUES
    ('Quantity Surveying', '30');

INSERT INTO
    address(PB_number, street_name, city_name, country)
VALUES
    ('24/7', 'pannipitiya', 'colombo', 'srilanka');

INSERT INTO
    address(PB_number, street_name, city_name, country)
VALUES
    ('24/8', 'molpe', 'colombo', 'srilanka');

INSERT INTO
    address(PB_number, street_name, city_name, country)
VALUES
    (
        '24/9',
        'rawathawaththa',
        'colombo',
        'srilanka'
    );

INSERT INTO
    address(PB_number, street_name, city_name, country)
VALUES
    ('24/10', 'akuressa', 'matara', 'srilanka');

INSERT INTO
    address(PB_number, street_name, city_name, country)
VALUES
    ('24/11', 'kotapola', 'matara', 'srilanka');

INSERT INTO
    address(PB_number, street_name, city_name, country)
VALUES
    ('24/12', 'deniyaya', 'matara', 'srilanka');

INSERT INTO
    address(PB_number, street_name, city_name, country)
VALUES
    ('24/13', 'panideniya', 'kandy', 'srilanka');

INSERT INTO
    address(PB_number, street_name, city_name, country)
VALUES
    ('24/14', 'galaha', 'kandy', 'srilanka');

INSERT INTO
    address(PB_number, street_name, city_name, country)
VALUES
    ('24/15', 'kadugannawa', 'kandy', 'srilanka');

INSERT INTO
    address(PB_number, street_name, city_name, country)
VALUES
    ('24/16', 'kirindiwela', 'gampaha', 'srilanka');

INSERT INTO
    address(PB_number, street_name, city_name, country)
VALUES
    ('24/17', 'sirikurusa', 'gampaha', 'srilanka');

INSERT INTO
    address(PB_number, street_name, city_name, country)
VALUES
    ('24/18', 'batalanda', 'gampaha', 'srilanka');

INSERT INTO
    address(PB_number, street_name, city_name, country)
VALUES
    ('24/19', 'waragoda', 'gampaha', 'srilanka');

INSERT INTO
    address(PB_number, street_name, city_name, country)
VALUES
    (
        '24/20',
        'kovilkulam',
        'Batticoloa',
        'srilanka'
    );

INSERT INTO
    address(PB_number, street_name, city_name, country)
VALUES
    (
        '24/21',
        'Ethirmannasingam',
        'Batticoloa',
        'srilanka'
    );

INSERT INTO
    address(PB_number, street_name, city_name, country)
VALUES
    (
        '24/22',
        'stationRD',
        'Batticoloa',
        'srilanka'
    );

INSERT INTO
    address(PB_number, street_name, city_name, country)
VALUES
    (
        '24/23',
        'lunugamwehera',
        'katharagama',
        'srilanka'
    );

INSERT INTO
    address(PB_number, street_name, city_name, country)
VALUES
    ('24/24', 'pilana', 'galle', 'srilanka');

INSERT INTO
    address(PB_number, street_name, city_name, country)
VALUES
    (
        '24/25',
        'palmadulla',
        'rathnapura',
        'srilanka'
    );

INSERT INTO
    address(PB_number, street_name, city_name, country)
VALUES
    ('24/26', 'deniyaya', 'matara', 'srilanka');

INSERT INTO
    address(PB_number, street_name, city_name, country)
VALUES
    ('24/27', 'Nikanjia', 'daka', 'bangladesh');

INSERT INTO
    address(PB_number, street_name, city_name, country)
VALUES
    ('24/28', 'karachchi', 'islamabad', 'pakistan');

INSERT INTO
    leave_type_names (leave_type_name)
VALUES
    ('Annual');

INSERT INTO
    leave_type_names (leave_type_name)
VALUES
    ('Casual');

INSERT INTO
    leave_type_names (leave_type_name)
VALUES
    ('Maternity');

INSERT INTO
    leave_type_names (leave_type_name)
VALUES
    ('No-pay');

INSERT INTO
    emp_status (status_name)
VALUES
    ('Intern-ft');

INSERT INTO
    emp_status (status_name)
VALUES
    ('Intern-pt');

INSERT INTO
    emp_status (status_name)
VALUES
    ('Contract-ft');

INSERT INTO
    emp_status (status_name)
VALUES
    ('Contract-pt');

INSERT INTO
    emp_status (status_name)
VALUES
    ('Permanent');

INSERT INTO
    emp_status (status_name)
VALUES
    ('Freelance');

INSERT INTO
    custom_Attributes (
        attribute_name,
        data_type,
        description,
        updated_date
    )
VALUES
    (
        'nationality',
        'varchar(15)',
        'includes nationalities',
        '2023-04-21'
    );

INSERT INTO
    number_of_leaves (pay_grade, leave_type_id, default_days)
VALUES
    ('1', 'lv-001', '5');

INSERT INTO
    number_of_leaves (pay_grade, leave_type_id, default_days)
VALUES
    ('1', 'lv-002', '10');

INSERT INTO
    number_of_leaves (pay_grade, leave_type_id, default_days)
VALUES
    ('1', 'lv-003', '300');

INSERT INTO
    number_of_leaves (pay_grade, leave_type_id, default_days)
VALUES
    ('1', 'lv-004', '5');

INSERT INTO
    number_of_leaves (pay_grade, leave_type_id, default_days)
VALUES
    ('2', 'lv-001', '10');

INSERT INTO
    number_of_leaves (pay_grade, leave_type_id, default_days)
VALUES
    ('2', 'lv-002', '15');

INSERT INTO
    number_of_leaves (pay_grade, leave_type_id, default_days)
VALUES
    ('2', 'lv-003', '300');

INSERT INTO
    number_of_leaves (pay_grade, leave_type_id, default_days)
VALUES
    ('2', 'lv-004', '15');

INSERT INTO
    number_of_leaves (pay_grade, leave_type_id, default_days)
VALUES
    ('3', 'lv-001', '20');

INSERT INTO
    number_of_leaves (pay_grade, leave_type_id, default_days)
VALUES
    ('3', 'lv-002', '10');

INSERT INTO
    number_of_leaves (pay_grade, leave_type_id, default_days)
VALUES
    ('3', 'lv-003', '300');

INSERT INTO
    number_of_leaves (pay_grade, leave_type_id, default_days)
VALUES
    ('3', 'lv-004', '15');

INSERT INTO
    number_of_leaves (pay_grade, leave_type_id, default_days)
VALUES
    ('4', 'lv-001', '20');

INSERT INTO
    number_of_leaves (pay_grade, leave_type_id, default_days)
VALUES
    ('4', 'lv-002', '20');

INSERT INTO
    number_of_leaves (pay_grade, leave_type_id, default_days)
VALUES
    ('4', 'lv-003', '300');

INSERT INTO
    number_of_leaves (pay_grade, leave_type_id, default_days)
VALUES
    ('4', 'lv-004', '20');

INSERT INTO
    role (job_title, pay_grade)
VALUES
    ('HRManager', '1');

INSERT INTO
    role (job_title, pay_grade)
VALUES
    ('HRManager', '2');

INSERT INTO
    role (job_title, pay_grade)
VALUES
    ('HRManager', '3');

INSERT INTO
    role (job_title, pay_grade)
VALUES
    ('HRManager', '4');

INSERT INTO
    role (job_title, pay_grade)
VALUES
    ('Accountant', '1');

INSERT INTO
    role (job_title, pay_grade)
VALUES
    ('Accountant', '2');

INSERT INTO
    role (job_title, pay_grade)
VALUES
    ('Accountant', '3');

INSERT INTO
    role (job_title, pay_grade)
VALUES
    ('Accountant', '4');

INSERT INTO
    role (job_title, pay_grade)
VALUES
    ('Software Engineer', '1');

INSERT INTO
    role (job_title, pay_grade)
VALUES
    ('Software Engineer', '2');

INSERT INTO
    role (job_title, pay_grade)
VALUES
    ('Software Engineer', '3');

INSERT INTO
    role (job_title, pay_grade)
VALUES
    ('Software Engineer', '4');

INSERT INTO
    role (job_title, pay_grade)
VALUES
    ('QA Engineer', '1');

INSERT INTO
    role (job_title, pay_grade)
VALUES
    ('QA Engineer', '2');

INSERT INTO
    role (job_title, pay_grade)
VALUES
    ('QA Engineer', '3');

INSERT INTO
    role (job_title, pay_grade)
VALUES
    ('QA Engineer', '4');

INSERT INTO
    role (job_title, pay_grade)
VALUES
    ('Supervisor', '4');

INSERT INTO
    branches (branch_name, reg_num, hotline, address_id)
VALUES
    ('srilanka', 'com-001', '77234567', 'ad-020');

INSERT INTO
    branches (branch_name, reg_num, hotline, address_id)
VALUES
    (
        'bangladesh',
        'com-001',
        '77636737',
        'ad-021'
    );

INSERT INTO
    branches (branch_name, reg_num, hotline, address_id)
VALUES
    ('pakistan', 'com-001', '77339394', 'ad-022');

INSERT INTO
    employee (
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
        'janeesha',
        'wickremasinghe',
        '2000-02-03',
        'ad-001',
        'br-001',
        'j-017',
        'dep-001',
        'es-001',
        null,
        'Married'
    );

INSERT INTO
    employee (
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
        'sajeev',
        'sajeev',
        '2000-02-04',
        'ad-002',
        'br-001',
        'j-017',
        'dep-002',
        'es-002',
        null,
        'Single'
    );

INSERT INTO
    employee (
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
        'dulmi',
        'pabasara',
        '2000-02-05',
        'ad-003',
        'br-001',
        'j-017',
        'dep-003',
        'es-003',
        null,
        'Married'
    );

INSERT INTO
    employee (
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
        'nipuni',
        'jayathilake',
        '2000-02-06',
        'ad-004',
        'br-001',
        'j-016',
        'dep-004',
        'es-004',
        'e-001',
        'Single'
    );

INSERT INTO
    employee (
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
        'damitha',
        'udesh',
        '2000-02-07',
        'ad-005',
        'br-001',
        'j-015',
        'dep-004',
        'es-005',
        'e-002',
        'Married'
    );

INSERT INTO
    employee (
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
        'pabasara',
        'dulmi',
        '2000-02-08',
        'ad-006',
        'br-001',
        'j-001',
        'dep-001',
        'es-006',
        'e-001',
        'Single'
    );

INSERT INTO
    employee (
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
        'udesh',
        'damitha',
        '2000-02-09',
        'ad-007',
        'br-001',
        'j-007',
        'dep-002',
        'es-001',
        'e-001',
        'Married'
    );

INSERT INTO
    employee (
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
        'srimal',
        'sasindu',
        '2000-02-10',
        'ad-008',
        'br-001',
        'j-009',
        'dep-003',
        'es-002',
        'e-002',
        'Single'
    );

INSERT INTO
    employee (
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
        'haritha',
        'mihimal',
        '2000-02-11',
        'ad-009',
        'br-001',
        'j-012',
        'dep-003',
        'es-003',
        'e-003',
        'Married'
    );

INSERT INTO
    employee (
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
        'mineth',
        'banula',
        '2000-02-12',
        'ad-010',
        'br-001',
        'j-014',
        'dep-004',
        'es-004',
        'e-001',
        'Single'
    );

INSERT INTO
    Emergency_details (
        emp_id,
        contact_name,
        relationship,
        address_id,
        Mobile_phone,
        Home_phone
    )
VALUES
    (
        'e-001',
        'palitha',
        'father',
        'ad-001',
        '7725366727',
        '417332832'
    );

INSERT INTO
    Emergency_details (
        emp_id,
        contact_name,
        relationship,
        address_id,
        Mobile_phone,
        Home_phone
    )
VALUES
    (
        'e-002',
        'ananda',
        'father',
        'ad-002',
        '7635376236',
        '119378627'
    );

INSERT INTO
    Emergency_details (
        emp_id,
        contact_name,
        relationship,
        address_id,
        Mobile_phone,
        Home_phone
    )
VALUES
    (
        'e-003',
        'dammika',
        'father',
        'ad-003',
        '7537273366',
        '432879277'
    );

INSERT INTO
    Emergency_details (
        emp_id,
        contact_name,
        relationship,
        address_id,
        Mobile_phone,
        Home_phone
    )
VALUES
    (
        'e-004',
        'sanath',
        'father',
        'ad-004',
        '3498322798',
        '116873863'
    );

INSERT INTO
    Emergency_details (
        emp_id,
        contact_name,
        relationship,
        address_id,
        Mobile_phone,
        Home_phone
    )
VALUES
    (
        'e-005',
        'arjuna',
        'father',
        'ad-005',
        '3672763872',
        '913762682'
    );

INSERT INTO
    Emergency_details (
        emp_id,
        contact_name,
        relationship,
        address_id,
        Mobile_phone,
        Home_phone
    )
VALUES
    (
        'e-006',
        'aravinda',
        'father',
        'ad-006',
        '3287374676',
        '403272791'
    );

INSERT INTO
    Emergency_details (
        emp_id,
        contact_name,
        relationship,
        address_id,
        Mobile_phone,
        Home_phone
    )
VALUES
    (
        'e-007',
        'kumar',
        'father',
        'ad-007',
        '7862533421',
        '378318817'
    );

INSERT INTO
    Emergency_details (
        emp_id,
        contact_name,
        relationship,
        address_id,
        Mobile_phone,
        Home_phone
    )
VALUES
    (
        'e-008',
        'mahela',
        'father',
        'ad-008',
        '7751636576',
        '278236386'
    );

INSERT INTO
    Emergency_details (
        emp_id,
        contact_name,
        relationship,
        address_id,
        Mobile_phone,
        Home_phone
    )
VALUES
    (
        'e-009',
        'prasanna',
        'father',
        'ad-009',
        '7423982792',
        '238266286'
    );

INSERT INTO
    Emergency_details (
        emp_id,
        contact_name,
        relationship,
        address_id,
        Mobile_phone,
        Home_phone
    )
VALUES
    (
        'e-010',
        'jayasooriya',
        'father',
        'ad-010',
        '7827637682',
        '298737297'
    );

INSERT INTO
    account (password, emp_id, role_id)
VALUES
    ('2ph5245', 'e-001', 'r-002');

INSERT INTO
    account (password, emp_id, role_id)
VALUES
    ('2ph5246', 'e-002', 'r-002');

INSERT INTO
    account (password, emp_id, role_id)
VALUES
    ('2ph5247', 'e-003', 'r-002');

INSERT INTO
    account (password, emp_id, role_id)
VALUES
    ('2ph5248', 'e-004', 'r-003');

INSERT INTO
    account (password, emp_id, role_id)
VALUES
    ('2ph5249', 'e-005', 'r-003');

INSERT INTO
    account (password, emp_id, role_id)
VALUES
    ('2ph5250', 'e-006', 'r-001');

INSERT INTO
    account (password, emp_id, role_id)
VALUES
    ('2ph5251', 'e-007', 'r-003');

INSERT INTO
    account (password, emp_id, role_id)
VALUES
    ('2ph5252', 'e-008', 'r-003');

INSERT INTO
    account (password, emp_id, role_id)
VALUES
    ('2ph5253', 'e-009', 'r-003');

INSERT INTO
    account (password, emp_id, role_id)
VALUES
    ('2ph5254', 'e-010', 'r-003');

INSERT INTO
    leave_application (
        leave_type_id,
        reason,
        start_date,
        end_date,
        supervisor_id,
        req_status,
        emp_id
    )
VALUES
    (
        'lv-004',
        'reason1',
        '2023-02-20',
        '2023-03-07',
        'e-001',
        'Pending',
        'e-008'
    );

INSERT INTO
    leave_application (
        leave_type_id,
        reason,
        start_date,
        end_date,
        supervisor_id,
        req_status,
        emp_id
    )
VALUES
    (
        'lv-001',
        'reason2',
        '2023-02-21',
        '2023-03-08',
        'e-002',
        'Pending',
        'e-004'
    );

INSERT INTO
    leave_application (
        leave_type_id,
        reason,
        start_date,
        end_date,
        supervisor_id,
        req_status,
        emp_id
    )
VALUES
    (
        'lv-002',
        'reason3',
        '2023-02-22',
        '2023-03-09',
        'e-003',
        'Pending',
        'e-005'
    );

INSERT INTO
    leave_application (
        leave_type_id,
        reason,
        start_date,
        end_date,
        supervisor_id,
        req_status,
        emp_id
    )
VALUES
    (
        'lv-003',
        'reason4',
        '2023-02-23',
        '2023-03-10',
        'e-001',
        'Pending',
        'e-009'
    );

INSERT INTO
    leave_application (
        leave_type_id,
        reason,
        start_date,
        end_date,
        supervisor_id,
        req_status,
        emp_id
    )
VALUES
    (
        'lv-004',
        'reason5',
        '2023-02-24',
        '2023-03-11',
        'e-002',
        'Pending',
        'e-007'
    );

INSERT INTO
    dependent (
        name,
        b_date,
        gender,
        relationship,
        emp_id,
        address_id
    )
VALUES
    (
        'rusith',
        '2000-05-07',
        'Male',
        'son',
        'e-007',
        'ad-008'
    );

INSERT INTO
    dependent (
        name,
        b_date,
        gender,
        relationship,
        emp_id,
        address_id
    )
VALUES
    (
        'sanjana',
        '2000-05-08',
        'Male',
        'brother',
        'e-008',
        'ad-009'
    );

INSERT INTO
    dependent (
        name,
        b_date,
        gender,
        relationship,
        emp_id,
        address_id
    )
VALUES
    (
        'nadil',
        '2000-05-09',
        'Male',
        'son',
        'e-009',
        'ad-010'
    );

INSERT INTO
    dependent (
        name,
        b_date,
        gender,
        relationship,
        emp_id,
        address_id
    )
VALUES
    (
        'thisara',
        '2000-05-10',
        'Male',
        'brother',
        'e-004',
        'ad-011'
    );

INSERT INTO
    dependent (
        name,
        b_date,
        gender,
        relationship,
        emp_id,
        address_id
    )
VALUES
    (
        'ishan',
        '2000-05-11',
        'Male',
        'son',
        'e-005',
        'ad-012'
    );

INSERT INTO
    dependent (
        name,
        b_date,
        gender,
        relationship,
        emp_id,
        address_id
    )
VALUES
    (
        'deshitha',
        '2000-05-12',
        'Male',
        'brother',
        'e-006',
        'ad-013'
    );

INSERT INTO
    contact (emp_id, contact_number)
VALUES
    ('e-001', '73938793');

INSERT INTO
    contact (emp_id, contact_number)
VALUES
    ('e-002', '37636873');

INSERT INTO
    contact (emp_id, contact_number)
VALUES
    ('e-003', '32376376');

INSERT INTO
    contact (emp_id, contact_number)
VALUES
    ('e-004', '32738397');

INSERT INTO
    contact (emp_id, contact_number)
VALUES
    ('e-005', '27397478');

INSERT INTO
    contact (emp_id, contact_number)
VALUES
    ('e-006', '26366377');

INSERT INTO
    contact (emp_id, contact_number)
VALUES
    ('e-007', '38839299');

INSERT INTO
    contact (emp_id, contact_number)
VALUES
    ('e-008', '36647435');

INSERT INTO
    contact (emp_id, contact_number)
VALUES
    ('e-009', '84849836');

INSERT INTO
    contact (emp_id, contact_number)
VALUES
    ('e-010', '33987791');
