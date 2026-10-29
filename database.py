import sqlite3
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "zeasense.db"

def inicializar_banco():
    conexao = sqlite3.connect(DB_PATH)

    conexao.execute("""
        CREATE TABLE IF NOT EXISTS leituras (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            device_id TEXT NOT NULL,
            silo_id TEXT NOT NULL,
            point_id TEXT NOT NULL,
            timestamp TEXT NOT NULL,
            temperature_c REAL,
            humidity_rh REAL,
            tvoc_ppb REAL,
            eco2_ppm REAL,
            status TEXT NOT NULL
        )
    """)

    conexao.commit()
    conexao.close()

    print(f"Banco de dados criado/verificado em: {DB_PATH}")

if __name__ == "__main__":
    inicializar_banco()