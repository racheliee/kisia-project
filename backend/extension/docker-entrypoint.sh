dockerize -wait tcp://0.0.0.0:5432 -timeout 60s

echo "Running migrations"
npx prisma migrate dev --name init

# echo "Seeding database"

echo "Starting server"
node /usr/src/app/dist/src/main.js

