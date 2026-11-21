#!/bin/sh
set -e

echo "=========================================================="
echo "  KOMITKABE 6th IT Community Gathering 2027 (ITCG 2027)   "
echo "=========================================================="

# Ensure upload directory exists with write permissions
mkdir -p /app/public/uploads/sponsors
chmod -R 777 /app/public/uploads || true

# Wait for MySQL database to be reachable if DATABASE_URL contains db:3306
echo "⏳ Verifying database connectivity..."
for i in $(seq 1 30); do
  if nc -z db 3306 2>/dev/null || npx prisma db push --skip-generate --accept-data-loss >/dev/null 2>&1; then
    echo "✅ Database connection established."
    break
  fi
  echo "Waiting for database at db:3306... ($i/30)"
  sleep 2
done

# Run database migrations / schema sync
echo "🔄 Synchronizing database schema via Prisma db push..."
npx prisma db push --skip-generate --accept-data-loss

# Seed initial data (tiers, initial sponsors, updates) if needed
echo "🌱 Checking and seeding initial event data..."
node prisma/seed.js || true

echo "🚀 Starting Next.js Web Application on port ${PORT:-3000}..."
exec node server.js
