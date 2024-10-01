// src/mockData.js

// Simulating login response
export const mockLoginResponse = {
    token: "mock-jwt-token",
    user: {
      id: "12345",
      email: "testuser@example.com",
      name: "Test User",
    },
  };
  
  // Simulating task data
  export const mockTasks = [
    {
      _id: "1",
      title: "Complete Project Documentation",
      description: "Prepare the documentation for the new project.",
      dueDate: "2024-10-01",
      status: "In Progress",
      assignedUser: "John Doe",
      priority: "High",
    },
    {
      _id: "2",
      title: "Fix Bugs in Login System",
      description: "Resolve authentication issues with the login system.",
      dueDate: "2024-09-30",
      status: "To Do",
      assignedUser: "Jane Smith",
      priority: "Medium",
    },
    {
      _id: "3",
      title: "Design New Homepage",
      description: "Create a new homepage design for the marketing team.",
      dueDate: "2024-10-05",
      status: "Completed",
      assignedUser: "Alice Brown",
      priority: "Low",
    },
  ];
  