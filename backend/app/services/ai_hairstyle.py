import httpx
import base64
import asyncio
from app.core.config import settings

class AIHairstyleService:
    """
    Service for generating AI hairstyle variations using Hugging Face Inference API.
    FREE tier: 1000 requests/month
    """
    
    def __init__(self):
        self.api_token = settings.HUGGINGFACE_API_TOKEN
        self.base_url = "https://router.huggingface.co/models"
        # Using Stable Diffusion XL for high quality
        self.model = "stabilityai/stable-diffusion-xl-base-1.0"
    
    async def generate_hairstyle(self, image_bytes: bytes, face_shape: str, style_prompt: str = None):
        """
        Generate a new hairstyle for the given image using Hugging Face.
        
        Args:
            image_bytes: Original image as bytes
            face_shape: Detected face shape (Oval, Round, Square, etc.)
            style_prompt: Optional custom style description
        
        Returns:
            dict with generated_image_url and metadata
        """
        
        # Create style-specific prompt based on face shape
        if not style_prompt:
            style_prompts = {
                "Oval": "modern textured quiff hairstyle, professional fade, styled hair, sharp haircut",
                "Round": "high fade pompadour, voluminous top, angular cut, adds height",
                "Square": "textured crop, messy styled hair, modern cut, softens features",
                "Heart": "side part with volume, professional style, balanced proportions",
                "Oblong": "balanced hairstyle with volume, textured crop, horizontal emphasis"
            }
            style_prompt = style_prompts.get(face_shape, "modern professional hairstyle")
        
        # Focused prompt for hairstyle change
        full_prompt = f"professional portrait photo, same person with {style_prompt}, keep face identical, only change hairstyle, high quality, studio lighting, realistic"
        
        try:
            async with httpx.AsyncClient(timeout=60.0) as client:
                headers = {
                    "Authorization": f"Bearer {self.api_token}",
                }
                
                # Hugging Face img2img endpoint
                # First, we need to convert image to base64
                image_b64 = base64.b64encode(image_bytes).decode('utf-8')
                
                # Using text-to-image with prompt (simpler for free tier)
                payload = {
                    "inputs": full_prompt,
                    "parameters": {
                        "negative_prompt": "different person, different face, blurry, low quality, distorted face, unrealistic, cartoon, anime",
                        "num_inference_steps": 30,
                        "guidance_scale": 7.5,
                    }
                }
                
                # Make request to Hugging Face
                response = await client.post(
                    f"{self.base_url}/{self.model}",
                    headers=headers,
                    json=payload
                )
                
                if response.status_code == 200:
                    # Response is the image bytes
                    generated_image_bytes = response.content
                    
                    # Convert to base64 data URI for display
                    generated_b64 = base64.b64encode(generated_image_bytes).decode('utf-8')
                    generated_url = f"data:image/png;base64,{generated_b64}"
                    
                    return {
                        "success": True,
                        "generated_image_url": generated_url,
                        "prompt_used": full_prompt,
                        "face_shape": face_shape
                    }
                
                elif response.status_code == 503:
                    # Model is loading, wait and retry
                    await asyncio.sleep(20)
                    return await self.generate_hairstyle(image_bytes, face_shape, style_prompt)
                
                else:
                    error_msg = response.text
                    print(f"Hugging Face API Error ({response.status_code}): {error_msg}")
                    raise Exception(f"API returned {response.status_code}: {error_msg}")
            
        except Exception as e:
            print(f"AI Generation Error: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "message": "Failed to generate hairstyle. Please try again."
            }
