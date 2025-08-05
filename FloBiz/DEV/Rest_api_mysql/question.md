
# EduZone - Course Search API Design --- as it is asked in the exam.

The online learning platform, "EduZone", has a database that stores information about courses, instructors, and students. The platform allows students to search for courses by instructor, course title, or category. The database has three tables: courses, instructors, and enrollments. The courses table has the following columns: course_id (primary key), title, description, category, and instructor_id (foreign key). The instructors table has the following columns: instructor_id (primary key), name, and biography. The enrollments table has the following columns: enrollment_id (primary key), course_id (foreign key), and student_id (foreign key).

The platform wants to implement a REST API endpoint that allows students to search for courses by instructor, course title, or category. The API should return a list of courses that match the search query, along with the instructor's name and the number of students enrolled in each course. The API should also allow students to sort the results by course title or instructor name.

Write a SQL query and a REST API implementation in any programming language to achieve this functionality. Ensure that your implementation uses multiple joins to retrieve the required data. Also, implement API-based searching and sorting.

You can assume that the student_id column in the enrollments table is not relevant for this problem.

Please provide your implementation in a programming language of your choice, and ensure that it is correctly formatted and readable.

You have 600 seconds to solve this problem.








```markdown
# EduZone - Course Search API Design ---- formatted by GPT.

EduZone is an online learning platform that stores information about courses, instructors, and students. The platform allows students to search for courses by **instructor**, **course title**, or **category**.

## Database Schema

The platform's database contains three tables:

### 1. `courses` table
| Column       | Description                        |
|--------------|------------------------------------|
| course_id    | Primary key                        |
| title        | Title of the course                |
| description  | Description of the course          |
| category     | Category of the course             |
| instructor_id| Foreign key referencing instructors |

### 2. `instructors` table
| Column       | Description              |
|--------------|--------------------------|
| instructor_id| Primary key              |
| name         | Instructor's name        |
| biography    | Short biography          |

### 3. `enrollments` table
| Column       | Description                       |
|--------------|-----------------------------------|
| enrollment_id| Primary key                       |
| course_id    | Foreign key referencing courses   |
| student_id   | Foreign key referencing students  |

> 💡 *Note: The `student_id` column is not relevant for this problem.*

---

## Task

Implement a **REST API endpoint** that allows students to **search for courses** using the following filters:

- Instructor name
- Course title
- Category

The API should:

- Return a **list of courses** that match the search query
- Include the **instructor's name**
- Include the **number of students enrolled** in each course
- Support **sorting** by either:
  - Course title
  - Instructor name

---

## Requirements

- Write a **SQL query** that retrieves the required data using **multiple joins**.
- Implement a **REST API** using any programming language or framework of your choice.
- Ensure the API:
  - Accepts query parameters for search and sorting
  - Returns properly structured JSON response
```