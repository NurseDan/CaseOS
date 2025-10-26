import os
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()


class Settings(BaseModel):
    APP_ENV: str = os.getenv("APP_ENV", "dev")
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./caseos.db")
    STORAGE_ROOT: str = os.getenv("STORAGE_ROOT", "./data")
    CORS_ORIGINS: str = os.getenv("CORS_ORIGINS", "http://localhost:3000")


settings = Settings()
