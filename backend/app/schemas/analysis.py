from pydantic import BaseModel

class AnalysisResponse(BaseModel):
    """
    Schema for the response after a face analysis request.
    """
    filename: str
    face_detected: bool
    hairline_score: float | None = None
    face_shape: str | None = None
    generated_image_url: str | None = None
    message: str
