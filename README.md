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

## API endpoints

1. Add a new player

   ```sh
   Endpoint: http://localhost:8001/api/v1/players
   Method: POST
   ```

   <img width="574" alt="Screen Shot 2022-11-21 at 12 41 22" src="https://user-images.githubusercontent.com/42200250/202978071-defdbe21-2efd-4560-8722-912035ccba98.png">

2. Get all players

   ```sh
   Endpoint: http://localhost:8001/api/v1/players
   Method: GET
   ```

3. Get players with a given gender, level and age

   ### (A-4)

   ```sh
   Endpoint: http://localhost:8001/api/v1/players?gender=male&age=22&level=8
   Method: GET
   ```

   <img width="660" alt="Screen Shot 2022-11-21 at 12 47 45" src="https://user-images.githubusercontent.com/42200250/202978873-07abab5c-b0d4-4328-bb01-f5f3a204db01.png">

4. Add a new sport

   ```sh
   Endpoint: http://localhost:8001/api/v1/sports
   Method: POST
   ```

   <img width="576" alt="Screen Shot 2022-11-21 at 12 54 22" src="https://user-images.githubusercontent.com/42200250/202979807-34c13fcb-eff2-4bb1-931f-b37718e08a77.png">

5. Get all sports

   ```sh
   Endpoint: http://localhost:8001/api/v1/sports
   Method: GET
   ```

6. Get a specific sport

   ### (B-1)

   ```sh
   Endpoint: http://localhost:8001/api/v1/sports/boxing
   Method: GET
   ```

7. Get sports multiple (= more than or equal to 2) players are associated with.

   ### (A-2)

   ```sh
   Endpoint: http://localhost:8001/api/v1/sports?multiPlayers=1
   Method: GET
   ```

   <img width="573" alt="Screen Shot 2022-11-21 at 12 57 30" src="https://user-images.githubusercontent.com/42200250/202980293-74e7305c-fcb0-4332-9a5b-ebc20818ee59.png">

8. Get sports no player is associated with.

   ### (A-3)

   ```sh
   Endpoint: http://localhost:8001/api/v1/sports?noPlayers=1
   Method: GET
   ```

   <img width="575" alt="Screen Shot 2022-11-21 at 13 00 14" src="https://user-images.githubusercontent.com/42200250/202980696-d387aa41-bb43-4682-8243-d8d4ccabed95.png">
