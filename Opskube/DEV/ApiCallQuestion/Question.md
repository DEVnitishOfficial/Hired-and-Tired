Write a JavaScript code to implement a sequential API call flow using async/await. You are given two APIs: /api/auth/login and /api/enroll. The goal is to authenticate a user, extract the recommended course ID, and then enroll the user in that course.

Base url for Api: xyz.com

API 1 - Login & Pick Course:

POST /api/auth/login
Request body:
{ "email": "student@example.com", "password": "pass123" }
Response (200):
{
  "token": "tok_abc123",
  "userId": "u1001",
  "recommendedCourseId": "c101"
}
API 2 - Enroll:

POST /api/enroll
Headers: Authorization: Bearer tok_abc123
Request body:
{ "userId": "u1001", "courseId": "c101", "paymentMethod": "mock" }
Response (201):
{
  "enrollmentId": "e5001",
  "userId": "u1001",
  "courseId": "c101",
  "status": "_enrolled_",
  "_fee_': _499_
}
Your task is to write an async function run() that calls these APIs sequentially. First, call /api/auth/login to extract the token, userId, and recommendedCourseId. Then, use these extracted values to call /api/enroll. Finally, print the enrollment information: enrollmentId, courseId, status, and fee.

Use mock responses for both APIs and perform API calls using fetch. Verify that your implementation works by printing the correct enrollment information to the console.

Expected console output: Enrolled: e5001, course: c101, status: enrolled, fee: 499

You can use the following minimal JS skeleton as a starting point:

async function run() {
    // Implement your logic here
}