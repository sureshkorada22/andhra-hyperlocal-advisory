const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const rootDir = __dirname;
const backendDir = path.join(rootDir, 'backend');
const frontendDir = path.join(rootDir, 'frontend');

console.log('\x1b[36m%s\x1b[0m', '═══════════════════════════════════════════════════════════════════');
console.log('\x1b[36m%s\x1b[0m', '  SIH 2026 — Andhra Pradesh Hyper-Local Business Advisory Engine  ');
console.log('\x1b[36m%s\x1b[0m', '═══════════════════════════════════════════════════════════════════');
console.log('📍 Backend:  http://localhost:8000 (API & Docs: /docs)');
console.log('🌐 Frontend: http://localhost:5173');
console.log('───────────────────────────────────────────────────────────────────');

// Determine Python executable
let pythonCmd = path.join(backendDir, 'venv', 'bin', 'python3');
if (!fs.existsSync(pythonCmd)) {
  pythonCmd = 'python3';
}

// 1. Spawn FastAPI Backend
const backend = spawn(
  pythonCmd,
  ['-m', 'uvicorn', 'app.main:app', '--reload', '--host', '0.0.0.0', '--port', '8000'],
  {
    cwd: backendDir,
    env: { ...process.env, PYTHONPATH: '.' },
    stdio: 'inherit',
    shell: false
  }
);

backend.on('error', (err) => {
  console.error('\x1b[31m[Backend Error]:\x1b[0m', err.message);
});

// 2. Spawn React + Vite Frontend
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: frontendDir,
  stdio: 'inherit',
  shell: true
});

frontend.on('error', (err) => {
  console.error('\x1b[31m[Frontend Error]:\x1b[0m', err.message);
});

// Graceful cleanup
function cleanup() {
  console.log('\n\x1b[33m🛑 Gracefully shutting down backend and frontend...\x1b[0m');
  try {
    backend.kill('SIGTERM');
  } catch (e) {}
  try {
    frontend.kill('SIGTERM');
  } catch (e) {}
  setTimeout(() => process.exit(0), 500);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
