# Event Hub Backend

Event Hub is a platform for managing and organizing events efficiently. This project aims to provide tools for event creation, attendee management, and real-time updates.

## Features

- Create and manage events
- JWT Authentication
- MongoDB Database
- MVC structure

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/jakariamasum/event-hub-backend
cd Event-Hub-Backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file and enter credentials:

```
PORT=5000
database_url=<your_db_url>
NODE_ENV ='development'
bcrypt_salt_rounds=<your_salt_rounds>
JWT_SECRET=<your_jwt_secret>
JWT_EXPIRES=<your jwt_expires_in>
```

3. Start the development server:

```bash
npm run start:dev
```

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements.

## License

This project is licensed under the MIT License.
