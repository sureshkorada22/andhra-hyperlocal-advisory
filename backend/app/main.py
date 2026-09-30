import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.db.database import init_db
from app.api.routes import router

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("sih-ap-hyperlocal")

app = FastAPI(
    title="SIH 2026 — Andhra Pradesh Hyper-Local Business Advisory Engine (Module 1)",
    description="AI-Driven Hyper-Local Business Advisory for Rural Micro-Entrepreneurs in Andhra Pradesh, India.",
    version="1.0.0"
)

# Enable CORS for React + TypeScript frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

import os
from fastapi import Request, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

# Candidate paths for static frontend build
CANDIDATE_FRONTEND_PATHS = [
    os.getenv("FRONTEND_DIST_DIR", ""),
    os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "frontend", "dist")),
    os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "dist")),
    os.path.abspath("/app/frontend/dist"),
]
FRONTEND_DIST_DIR = next((p for p in CANDIDATE_FRONTEND_PATHS if p and os.path.isdir(p)), None)

if FRONTEND_DIST_DIR:
    logger.info(f"Frontend static files detected at: {FRONTEND_DIST_DIR}")
    assets_dir = os.path.join(FRONTEND_DIST_DIR, "assets")
    if os.path.isdir(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

@app.on_event("startup")
def on_startup():
    logger.info("Initializing database tables...")
    try:
        init_db()
        logger.info("Database initialized successfully.")
    except Exception as e:
        logger.warning(f"Database initialization note: {e}")

# Include all API endpoints
app.include_router(router)

@app.api_route("/", methods=["GET", "HEAD"])
def root(request: Request):
    accept = request.headers.get("accept", "")
    # When accessed directly by a browser and static files exist, serve the React frontend
    if "text/html" in accept and FRONTEND_DIST_DIR:
        index_file = os.path.join(FRONTEND_DIST_DIR, "index.html")
        if os.path.exists(index_file):
            return FileResponse(index_file)

    return {
        "system": "SIH 2026 — Module 1: Andhra Pradesh Hyper-Local Business Advisory Assistant",
        "geographic_scope": "Andhra Pradesh, India ONLY",
        "status": "active",
        "docs_url": "/docs"
    }

if FRONTEND_DIST_DIR:
    @app.get("/{full_path:path}", include_in_schema=False)
    async def serve_spa_fallback(full_path: str):
        if full_path.startswith("api") or full_path in ("docs", "redoc", "openapi.json"):
            raise HTTPException(status_code=404, detail="Not Found")
        
        file_path = os.path.join(FRONTEND_DIST_DIR, full_path)
        if os.path.isfile(file_path):
            return FileResponse(file_path)
        
        index_file = os.path.join(FRONTEND_DIST_DIR, "index.html")
        if os.path.exists(index_file):
            return FileResponse(index_file)
        raise HTTPException(status_code=404, detail="File Not Found")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", settings.PORT))
    uvicorn.run("app.main:app", host=settings.HOST, port=port, reload=(settings.ENV == "development"))

