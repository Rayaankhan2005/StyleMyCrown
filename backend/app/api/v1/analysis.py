from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.face_analyzer import FaceAnalyzerService
from app.services.ai_hairstyle import AIHairstyleService
from app.schemas.analysis import AnalysisResponse

router = APIRouter()
analyzer = FaceAnalyzerService()
ai_service = AIHairstyleService()

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_face(file: UploadFile = File(...), generate_ai: bool = True):
    """
    Endpoint to analyze an uploaded user photo and optionally generate AI hairstyle.
    Returns face metrics, validation status, and AI-generated hairstyle URL.
    Now using FREE Hugging Face API for AI generation!
    """
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image.")

    content = await file.read()
    
    # Step 1: Analyze face shape
    result = await analyzer.analyze_image(content)
    
    # Step 2: Generate AI hairstyle if requested and face detected
    ai_result = None
    if generate_ai and result["face_detected"]:
        face_shape = result.get("face_shape", "Oval")
        ai_result = await ai_service.generate_hairstyle(content, face_shape)
    
    return AnalysisResponse(
        filename=file.filename,
        face_detected=result["face_detected"],
        hairline_score=result.get("hairline_score"),
        face_shape=result.get("face_shape"),
        generated_image_url=ai_result.get("generated_image_url") if ai_result and ai_result.get("success") else None,
        message=result["message"]
    )
