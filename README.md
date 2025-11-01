# ✅ TaskApp: Mobile To-Do List Application

## 📝 Brief Project Description

This project is the successful completion of the take-home assignment for the Mobile Developer role at **eSupport Technologies**. It is a simple, functional, cross-platform **To-Do List application** built using React Native. The primary objective was to demonstrate the ability to implement basic **CRUD (Create, Read, Update, Delete)** operations for managing daily tasks.

The application features a clean, intuitive UI/UX and incorporates several bonus features, showcasing attention to detail and clean code organization.


https://github.com/user-attachments/assets/952f842f-f6c2-4ecc-8115-85c498a6d85d

---

## 📱 Framework Choice

* **Framework Chosen:** **React Native (Expo)**.
* **Why React Native?** React Native was selected for its efficiency in building a truly **cross-platform** mobile application from a single JavaScript codebase. The choice of **Expo** further expedited the development process, allowing for rapid iteration and simple setup, which helped maximize the number of required and optional features implemented within the timeline.

---

## ✨ Implemented Features

This application successfully implements all **Must-Have Core Requirements** and includes several **Optional Features (Bonus Points)**, as detailed in the assignment:

### Core Features (CRUD Operations)

* **Add New Tasks (Create):** Users can create tasks with a **title/description** via a modal.  
  * **Input Validation:** Validation is enforced to ensure **non-empty tasks** are submitted.
* **Display Task List (Read):** All tasks are shown in a **scrollable list** with a clear visual hierarchy.
* **Mark Tasks as Complete/Incomplete (Update):** A button allows users to **toggle the completion status**.  
  * **Visual Distinction:** Completed tasks are clearly marked with a **strikethrough** text style.
* **Update Tasks:** An inline "Edit" button allows users to modify the title/description of existing tasks.
* **Delete Tasks:** An inline "Delete" button allows users to **remove tasks** from the list.

### Bonus Features (Optional Implemented)

* **Local Data Persistence:** Tasks survive application restarts by utilizing `@react-native-async-storage/async-storage`.
* **Task Categories:** Tasks are organized and filtered by predefined categories (**Work, Personal, Study, Health, Goals**).
* **Search and Filter:** The app allows both filtering by category selection and searching by task title.
* **Dark Mode Support:** A **theme toggle button** allows the user to switch between light and dark themes.
* **Code Comments and Documentation:** Inline comments are used where necessary to clarify logic.

---

## 📦 State Management Approach and Dependencies

* **State Management Approach:** Local component state (`useState`) and prop drilling are used for primary data flow, suitable for this application's scope.
* **Persistence:** **`AsyncStorage`** is used for the persistence layer.

### Dependencies/Packages Used

| Package | Purpose |
| :--- | :--- |
| `@react-navigation/native` | Handling navigation (Welcome Screen to Home Screen). |
| `@react-navigation/stack` | Stack navigation for screen transitions. |
| `@react-native-async-storage/async-storage` | Local data persistence for storing tasks. |
| `@expo/vector-icons` | Icons for categories, theme toggle, and actions. |

---

## 🛠️ Setup and Installation Instructions

Follow these steps to set up and run the application locally:

### Prerequisites

* Node.js (v18+)
* npm or yarn
* Expo Go app on your mobile device or a mobile emulator/simulator

### How to Run the Application

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Dev-Tharusha2005/To-Do-App-.git
    cd TaskApp
    ```

2. **Install Dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Start the Expo Development Server:**
    ```bash
    npx expo start
    ```

4. **Access the App:**
    Scan the QR code displayed in your terminal or browser using the **Expo Go** app on your mobile device.

---

## ⚠️ Known Issues or Limitations

* **Testing:** Unit/component tests were not included.
* **Error Handling:** Error handling is basic, primarily covering input validation.
* **UI/UX:** While intuitive, the design could be further refined to strictly adhere to platform-specific native design guidelines (Material Design for Android, iOS guidelines).

---

## ⏱️ Time Spent on Assignment

* **Total Time:** **27 Hours**
