# 👑 StyleMyCrown - AI-Powered Hairstyle Recommendation App

**Your personal hairstyle consultant powered by AI**

StyleMyCrown analyzes your face shape and recommends the perfect hairstyles tailored just for you. Browse our curated gallery, get personalized recommendations, and discover your next look!

---

## ✨ Features

### 🎯 Core Features

- **📸 Face Shape Analysis** - Upload a photo and get instant face shape detection (Oval, Round, Square, Heart, Oblong)
- **🎨 Hairstyle Gallery** - Browse 20+ curated hairstyles organized by face shape and style type
- **🔍 Smart Filtering** - Filter by face shape, style type (Trendy, Professional, Casual, Classic), and search
- **💡 Personalized Recommendations** - Get hairstyle suggestions based on your unique face shape
- **🔐 Authentication** - Secure login with Supabase (Google OAuth ready for production)
- **📱 Beautiful UI** - Premium dark theme with smooth animations and gradients

### 🚀 Coming Soon

- AI Hairstyle Generation (Replicate/Hugging Face integration ready)
- User Dashboard with scan history
- Save favorite hairstyles
- Barber booking integration
- Social sharing

---

## 🛠️ Tech Stack

### **Mobile App** (React Native + Expo)

- **Framework**: Expo Router for navigation
- **UI**: React Native with custom components
- **Styling**: Inline styles with LinearGradient
- **Image Handling**: Expo Image Picker
- **Authentication**: Supabase Auth

### **Backend** (Python + FastAPI)

- **Framework**: FastAPI
- **AI Services**: Replicate API / Hugging Face (configurable)
- **Face Analysis**: OpenCV (MediaPipe integration ready)
- **Database**: Supabase (PostgreSQL)

### **Frontend** (Next.js - Optional)

- **Framework**: Next.js 14
- **UI**: Shadcn/ui components
- **Styling**: Tailwind CSS

---

## 📦 Installation

### **Prerequisites**

- Node.js 18+
- Python 3.14+
- Expo CLI
- Supabase account (free tier)

### **1. Clone the Repository**

```bash
git clone https://github.com/yourusername/StyleMyCrown.git
cd StyleMyCrown
```

### **2. Setup Mobile App**

```bash
cd mobile
npm install

# Create .env file
echo "EXPO_PUBLIC_SUPABASE_URL=your_supabase_url" > .env
echo "EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key" >> .env

# Start the app
npx expo start
```

### **3. Setup Backend**

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Start the server
python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### **4. Setup Supabase**

1. Create a project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key
3. Enable Google OAuth in Authentication → Providers
4. Add credentials to `.env` files

---

## 🎨 Hairstyle Gallery

The gallery features **20+ professionally curated hairstyles** organized by:

### **Face Shapes**

- **Oval**: Versatile styles that work with balanced proportions
- **Round**: Styles that add height and definition
- **Square**: Cuts that soften angular features
- **Heart**: Styles that balance wider foreheads
- **Oblong**: Cuts that add horizontal emphasis

### **Style Types**

- **Trendy**: Modern, fashion-forward looks
- **Professional**: Clean, business-appropriate styles
- **Casual**: Relaxed, everyday looks
- **Classic**: Timeless, traditional cuts

---

## 🔑 Configuration

### **Supabase Setup**

```env
# Mobile (.env)
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Backend (config.py)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-service-role-key
```

### **AI Services (Optional)**

```python
# backend/app/core/config.py
REPLICATE_API_TOKEN="r8_..."  # For AI generation
HUGGINGFACE_API_TOKEN="hf_..."  # Alternative AI service
```

---

## 📱 App Flow

1. **Landing Page** → Get Started or Browse Gallery
2. **Login** → Google OAuth or Skip (dev mode)
3. **Scan** → Upload photo for analysis
4. **Results** → View face shape + recommendations
5. **Gallery** → Browse curated hairstyles

---

## 🎯 API Endpoints

### **Analysis**

```http
POST /api/v1/analysis/analyze
Content-Type: multipart/form-data

Parameters:
- file: Image file
- generate_ai: boolean (optional, default: false)

Response:
{
  "filename": "photo.jpg",
  "face_detected": true,
  "face_shape": "Oval",
  "generated_image_url": "...",
  "message": "Analysis Complete"
}
```

---

## 🚀 Deployment

### **Mobile App**

```bash
# Build for iOS
npx expo build:ios

# Build for Android
npx expo build:android

# Or use EAS Build
eas build --platform all
```

### **Backend**

```bash
# Deploy to Railway, Render, or Heroku
# Example: Railway
railway up
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Unsplash** for hairstyle reference images
- **Supabase** for authentication and database
- **Replicate** for AI image generation
- **Expo** for mobile development framework

---

## 📞 Support

For support, email support@stylemycrown.com or join our Discord community.

---

**Made with ❤️ by the StyleMyCrown Team**
