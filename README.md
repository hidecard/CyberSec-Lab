# Security Labs Web Platform

Security Labs is a web-based interactive learning platform designed to teach practical cybersecurity concepts through hands-on labs and curated resources. It offers an immersive environment where users can experiment with real-world security vulnerabilities and understand attack and defense techniques.


## Features

### SQL Injection Lab
An interactive lab to demonstrate various SQL Injection techniques and mitigation strategies. Users can practice exploiting vulnerabilities such as union-based, boolean-based, error-based, and time-based attacks. The lab provides example attack payloads, simulates vulnerable SQL queries, and displays real-time database responses. It includes real-world attack case studies and defense strategies such as input validation, parameterized queries, least privilege, and usage of web application firewalls.

### CORS Misconfiguration Lab
This lab explores Cross-Origin Resource Sharing (CORS) misconfigurations which can expose web applications to data theft and unauthorized actions. Users can interact with different CORS configurations (safe, unsafe, wildcard) and simulate attacks like simple data theft, stealing with credentials, and preflight bypass. The lab features attack scenarios, a defense guide with best practices, real-world breaches, and implementation examples for common platforms (Node.js, Nginx, Apache).

### Cybersecurity Roadmap
A comprehensive, step-by-step learning path covering foundational to advanced cybersecurity topics. It guides users through essential skills such as web app security, network security, cryptography, social engineering, penetration testing, incident response, cloud security, and more. Each step includes difficulty levels, skills to master, estimated time, prerequisites, and curated learning resources including articles, labs, courses, and videos.

### Certification System (Attractive Style)
An attractive and functional certification system featuring:

✔ QR-verification  
✔ Shareable certificate (LinkedIn-friendly)  
✔ Custom certificate ID  

➡ Learner အလုပ်ရှာတဲ့အခါ huge benefit

This system awards learners Bronze, Silver, and Gold levels based on performance. It provides verifiable and professional credentials that can significantly boost career opportunities.

### Additional Security Labs
Besides the main labs, the platform offers a broad suite of interactive labs covering topics such as Clickjacking, XSS, Command Injection, Phishing Simulation, JWT Token Tampering, Cryptography, Networking Basics, Programming Basics, and more, providing extensive hands-on practice to enhance cybersecurity skills.

## Tech Stack

- **Framework:** Next.js — a React framework for server-side rendering and static site generation providing fast performance and SEO benefits.
- **Styling:** Tailwind CSS — utility-first CSS framework for rapid UI development.
- **UI Components:** shadcn/ui — accessible, customizable React components built on top of Radix UI and Tailwind CSS.
- **Database & ORM:** Prisma — for database schema modeling and querying (SQLite as the local database).
- **Languages:** TypeScript for type-safe frontend and backend development.
- **Build Tooling:** Vite-powered build process integrated by Next.js.

## Getting Started

- Install dependencies:
  ```bash
  npm install
  ```
- Start the development server:
  ```bash
  npm run dev
  ```
- Build the project for production:
  ```bash
  npm run build
  ```
- Run in production mode:
  ```bash
  npm start
  ```

## Development Notes

- On Linux, if you encounter file-watcher limits, enable polling:
  ```bash
  CHOKIDAR_USEPOLLING=true npm run dev
  ```
- All labs and learning resources are located within the `src/components` directory.
- Feel free to add new labs or enhance the existing ones by creating new components.

## Contributing

Contributions are welcome! Open issues or pull requests to report bugs, request features, or improve the labs and documentation.

## License

This project is licensed under the MIT License.
