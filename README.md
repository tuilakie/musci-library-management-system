## Techstacks

- [Prisma](https://prisma.io)
- [Ant Design](https://ant.design/)
- [Vite](https://vitejs.dev/guide/)
- [Reactjs](https://react.dev/)
- [NestJs](https://nestjs.com/)
- [Redux-toolkit](https://redux-toolkit.js.org/)

## Development

After clone the repository, run the following command to install the dependencies:

```bash
# for server backend
$ npm install

# for client
$ cd client/ && npm install

# back to root directory
$ cd ..
```

Running docker (for the postgresql database):

```bash
$ docker-compose up -d
```

Pushing schema to database:

```bash
$ npx prisma db push
```

Generate type for prisma client

```bash
$ npx prisma generate
```

Seeding data

```bash
$ npx prisma db seed
```

If you want to access the database, you can use the following command:

```bash
$ npx prisma studio
```

Let's start the app:

```bash
# for backend server development
$ npm run start dev

# If you want start with watch mode
$ npm run start:dev

# for client development => open new terminal
$ cd client/ && npm run dev

```

## Ports

| URL                   | Port | Description |
| --------------------- | ---- | ----------- |
| http://localhost:5173 | 5173 | Frontend    |
| http://localhost:5000 | 5000 | Backend     |

## Useful links

| URL                       | Name    | Description |
| ------------------------- | ------- | ----------- |
| http://localhost:5000/api | Swagger | API docs    |
