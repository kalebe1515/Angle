# Angle - An Experimental MATLAB Alternative (Alpha Preview)

> Angle is an experimental project that attempts to reconstruct the MATLAB experience in a modern way, using a Web frontend + Go backend + Python integration. It aims to be a free, open, and extensible platform for scientific computing and modeling.

---

## Project Status (Initial Open Source Release)

> This project was built collaboratively between the author and AI. It is only a prototype, and most modules are not connected. Functionalities are extremely limited.

- Currently available:
  - Python code execution (basic syntax only; no third-party libraries)
  - Markdown editing and export (no rendering)
  - LaTeX editing and export (no rendering)

- Major limitations:
  - **Cannot render md/tex inside the interface; export-only**
  - **Project system is not functional (no create/save/switch support)**
  - **Module components are built but not wired to backend**
  - **Backend logic may not match frontend UI interactions**
  - **Module execution and data flow mechanisms are not connected**
  - > "The project was developed on a MacBook M1, so the current version only supports ARM-based macOS systems."
  
-  Note:
  `angle-core/modules/` contains all module logic written by the author, but most are not connected to the UI, and even the calling logic may not match the frontend interaction.

---

## Project Positioning

This project is more like an "experimental prototype", showing:

- A possible architecture for a MATLAB alternative
- Early thoughts on module orchestration and modeling
- A personal exploration into the modernization of scientific computing tools

The author is not a professional software architect. The project was completed independently with the help of AI. 

 Four-layer architecture: UI + Control Layer + Scheduling + Module Definitions (all present, but not connected)

---

## Community Involvement & Vision

Despite its limitations—being only able to run Python and export md/tex—it is open-sourced in hopes of attracting frontend developers, backend engineers, and researchers to help push it forward as:

> A modern, open platform for education, simulation, and scientific modeling.

---

## Project Structure Overview

> The project consists of `angle-core` (Go backend) and `angle-ui` (React frontend), with functional modules separated cleanly for ease of restructuring.

---

## Contribution Suggestions

- **Module Binding**: Frontend module components need to be connected to corresponding `angle-core/modules` functions.
- **Execution Flow**: Only the `/run` API is partially functional; no unified task dispatcher exists.
- **UI Improvements**: Styling and motion are basic; contributions via TailwindCSS or framer-motion are welcome.
- **Project Lifecycle**: No support yet for project creation, saving, or switching.

---

## Disclaimer & Reflection

The author is a first-year undergraduate student. The project began out of irritation with an upperclassman, leading to the idea of building a MATLAB alternative.

While many modules are "implemented", they are not connected; in practice, only:

- Python code (very basic)
- Markdown export
- LaTeX export

are usable.

Perhaps continuing to use MATLAB is the correct choice.  
It’s even possible this project will never be useful.  
**Some UI layouts may even be meaningless.**

---

## Author

- **ID**: lixiaSky  
- **GitHub**: https://github.com/lixiasky  
- **Email**: lixiasky+public@protonmail.com
- **Stack**: Go + Python + React + Tailwind  

---

## How to Run

```
cd angle-ui
npm install
npm run dev
```

```
cd angle-core
go run main.go
```

Then open your browser and go to:

```
http://localhost:5173
```

---

## About Features

Due to extremely limited functionality (only 3 usable features), no detailed features are described here.  
Refer to the `screenshots` folder to understand what is or isn't working.

---

## License

MIT License