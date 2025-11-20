# Security Labs

A collection of interactive security learning labs and resources (SQLi lab, CORS lab, roadmap, etc).  
This repo uses Next.js + Tailwind + shadcn/ui for demo components and hands-on exercises.

## Getting Started

- Install dependencies:
  ```bash
  npm install
  ```
- Start dev server:
  ```bash
  npm run dev
  ```
- Build for production:
  ```bash
  npm run build
  ```
- Run in production:
  ```bash
  npm start
  ```

## What’s Included

- SQL Injection Lab — interactive demo of SQL injection techniques and defenses
- CORS Misconfiguration Lab — demo and attack scenarios
- Cybersecurity Roadmap — curated learning path and labs

## Development Notes

- Use CHOKIDAR_USEPOLLING on Linux if you hit file-watcher limits:
  ```bash
  CHOKIDAR_USEPOLLING=true npm run dev
  ```
- Tailwind + shadcn/ui are used for layout and components.
- Add labs or resources in `src/components/CybersecurityRoadmap.tsx`.

## Contributing

Open issues or PRs to add labs, resources, or improvements.

## License

MIT
