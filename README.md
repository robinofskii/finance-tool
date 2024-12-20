# Family Expense Management App

## Overview

This project aims to simplify the process of managing family expenses. While tracking expenses manually is feasible, making changes and recalculations—especially when costs are interrelated or percentages shift—can be time-consuming. This tool will streamline the process, providing a user-friendly interface to track, manage, and divide expenses effectively.

As a software developer, I decided to create this tool to fit my specific needs instead of searching for existing solutions. While I’ll draw inspiration from other apps down the line, the initial focus is on building a simple yet effective tool tailored to my family’s requirements.

Additionally, this project serves as an opportunity to experiment with new technologies, such as Deno, while utilizing tools I’m already familiar with, like TypeScript and React.

---

## Features

### MVP (Minimum Viable Product)

#### 1. Expense Tracking
- **Add Expenses**: Add expenses with the following attributes:
  - Description (e.g., "Groceries")
  - Amount (e.g., 100.50)
  - Interval (yearly, monthly, weekly, or custom)
  - Date (when the expense starts or occurs)
- **Edit/Delete Expenses**: Modify or remove existing expenses.
- **View Expenses**: List all expenses, grouped or filtered by intervals.
- **Aggregated Totals**: Display total costs for specific intervals (per year, month, week).

#### 2. Cost Division
- **Default Splits**: Assign a 50/50 split for expenses between family members by default.
- **Customizable Splits**:
  - Adjust the percentage for individual expenses.
  - Allow fixed amounts for specific expenses.
- **Individualized Overviews**:
  - Display each person’s share of the expenses.
  - Show aggregated totals for individual contributions.

#### 3. Real-Time Updates
- **Dynamic UI Updates**:
  - Reflect changes instantly when editing an expense or adjusting divisions.
  - Recalculate total costs and individual shares on the fly.
- **Experimentation Mode**:
  - Provide a sandbox mode where users can test changes before saving them.
  - Show the impact of changes visually without committing them.

---

## Technologies

### Core Technologies
- **TypeScript**: The main language for the project, ensuring strong typing and maintainability.
- **React**: For building the frontend user interface.
- **Deno**: For backend development, offering modern and secure APIs.

### Libraries and Tools
- **tRPC**: Enables building and consuming fully type-safe APIs, sharing types between the backend and frontend.
- **MongoDB & Mongoose**:
  - MongoDB: A NoSQL database for storing data.
  - Mongoose: A schema-based library to simplify data modeling and validation for MongoDB.
- **Zod**: A TypeScript-first schema declaration and validation library, used for:
  - Validating API request bodies.
  - Validating frontend forms using shared types created by tRPC.

---

## Installation and Setup

### Prerequisites
Before setting up the project, ensure you have the following installed:
1. **Deno**: [Install Deno](https://deno.land/#installation)
2. **Node.js (Optional)**: Required only if you want to install additional npm modules directly.

---

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2.	**Install Dependencies**
Deno will automatically manage dependencies, including npm modules listed in the deno.json file.
Run the following command to initialize the environment:
   ```bash
   deno task dev
   ```
   This will:
- Start the development server with Vite for the frontend.
- Run the backend server using the server/main.ts entry point.

---
## Directory Structure
- `client/`: Contains the frontend code, including React components and Vite configuration.
- `server/`: Contains the backend code, including API routes and data handling logic.