# Backend coding assignment

## Build from Source

1. Clone the repo

   ```sh
   git clone git@github.com:aghtetnyein/backend_coding_assignment.git
   cd backend_coding_assignment
   ```

2. Install dependencies.

   ```sh
   npm install
   ```

3. Build in development mode.

   ```sh
   npm run dev
   ```

4. Build the production server.

   ```sh
   npm run build
   ```

5. Run the server.
   ```sh
   npm start
   ```

## Build and run in Docker Container

```sh
docker-compose up --build
```

- Change `dockerfile` under backend_srv services in `docker-compose.yml` file to run development mode in the container.
