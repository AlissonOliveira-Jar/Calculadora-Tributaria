echo "Executando migrações do Prisma..."
npx prisma migrate deploy

echo "Iniciando o servidor Express..."
npm start
