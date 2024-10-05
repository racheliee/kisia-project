dockerize -wait tcp://database:5432 -timeout 60s

echo "Running migrations"
npx prisma migrate deploy

# echo "Seeding database"

echo "Starting server"
node /usr/src/app/dist/src/main.js

