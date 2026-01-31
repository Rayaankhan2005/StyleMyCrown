from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "StyleMyCrown AI"
    API_V1_STR: str = "/api/v1"
    
    # Security
    # SECRET_KEY: str = "YOUR_SECRET_KEY" 
    # ALLOWED_ORIGINS: list[str] = ["http://localhost:3000"]
    
    # AI Services - Set these via environment variables
    REPLICATE_API_TOKEN: str = ""
    HUGGINGFACE_API_TOKEN: str = ""

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()

