# ==============================================================================
# SIH 2026 — Andhra Pradesh Hyper-Local Business Advisory Engine
# Production Multi-Stage Dockerfile (FastAPI + React Vite Fullstack)
# ==============================================================================

# Stage 1: Build Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci --silent || npm install

COPY frontend/ ./
RUN npm run build

# Stage 2: Build & Run Python Backend with Frontend Assets
FROM python:3.11-slim AS production

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app/backend \
    PORT=8000 \
    HOST=0.0.0.0 \
    ENVIRONMENT=production

WORKDIR /app

# Install curl for container health check
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*

# Install python dependencies
COPY backend/requirements.txt /app/backend/
RUN pip install --no-cache-dir -r /app/backend/requirements.txt

# Copy backend application source
COPY backend /app/backend

# Copy built frontend assets from stage 1 into frontend/dist
COPY --from=frontend-builder /app/frontend/dist /app/frontend/dist

# Expose port (can be overridden dynamically by cloud provider via $PORT)
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:${PORT}/ || exit 1

# Start Uvicorn production server
CMD uvicorn app.main:app --host 0.0.0.0 --port ${PORT}
