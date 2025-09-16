async function mockFetch(url, options) {
  console.log(`Calling API: ${url}`);

  // Simulate login API
  if (url === "https://xyz.com/api/auth/login") {
    return {
      ok: true,
      status: 200,
      json: async () => ({
        token: "tok_abc123",
        userId: "u1001",
        recommendedCourseId: "c101"
      })
    };
  }

  // Simulate enroll API
  if (url === "https://xyz.com/api/enroll") {
    return {
      ok: true,
      status: 201,
      json: async () => ({
        enrollmentId: "e5001",
        userId: "u1001",
        courseId: "c101",
        status: "enrolled",
        fee: 499
      })
    };
  }

  // Fallback for unknown API
  return { ok: false, status: 404, json: async () => ({ error: "Not found" }) };
}

// Sequential API call flow
async function run() {
  try {
    // Step 1: Login
    const loginResponse = await mockFetch("https://xyz.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "student@example.com", password: "pass123" })
    });

    if (!loginResponse.ok) throw new Error("Login failed");
    const { token, userId, recommendedCourseId } = await loginResponse.json();

    // Step 2: Enroll using token + courseId
    const enrollResponse = await mockFetch("https://xyz.com/api/enroll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        userId,
        courseId: recommendedCourseId,
        paymentMethod: "mock"
      })
    });

    if (!enrollResponse.ok) throw new Error("Enrollment failed");
    const { enrollmentId, courseId, status, fee } = await enrollResponse.json();

    // Step 3: Print result
    console.log(`Enrolled: ${enrollmentId}, course: ${courseId}, status: ${status}, fee: ${fee}`);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Run the flow
run();