cd video-backend
docker-compose down
cd ..

rm -rf video-backend
git clone https://github.com/mumeinosato/video-backend.git
cp .env video-backend/.env

cd video-backend
rm Dockerfile
cd ..

cp Dockerfile video-backend/Dockerfile

cd video-backend
docker-compose up --build