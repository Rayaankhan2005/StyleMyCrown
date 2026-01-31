import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import PageHeader from '../components/PageHeader';

export default function ScanScreen() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  // ... (keep existing code for pickImage and startAnalysis)

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // Analysis will be triggered when user clicks "Confirm" button
    }
  };

  const startAnalysis = async () => {
      if (!image) return;
      
      setAnalyzing(true);
      try {
          const formData = new FormData();
          formData.append('file', {
              uri: image,
              type: 'image/jpeg',
              name: 'upload.jpg',
          } as any);

          // Backend API endpoint
          // Use localhost for iOS Simulator, or your IP (192.168.0.106) for physical devices
          const response = await fetch('http://localhost:8000/api/v1/analysis/analyze', {
              method: 'POST',
              body: formData,
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });

          if (!response.ok) throw new Error('Analysis failed');

          const data = await response.json();
          
          // Navigate to results page with data
          router.push({
              pathname: '/results',
              params: {
                  image: image,
                  faceShape: data.face_shape || 'Unknown',
                  message: data.message,
                  generatedImageUrl: data.generated_image_url || ''
              }
          });
          
      } catch (error) {
          alert("Error connecting to server. Ensure backend is running.");
          console.error(error);
      } finally {
          setAnalyzing(false);
      }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#0f0f1a' }}>
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 24 }}>
          <PageHeader 
            title="New Scan" 
            subtitle="Upload a selfie to analyze your hairline features"
            backRoute="/home"
          />
          
          <View style={{ alignItems: 'center', flex: 1 }}>
          <TouchableOpacity 
            onPress={pickImage}
            style={{ 
                width: '100%', 
                aspectRatio: 3/4, 
                backgroundColor: 'rgba(255,255,255,0.05)', 
                borderColor: 'rgba(255,255,255,0.2)', 
                borderWidth: 2, 
                borderStyle: 'dashed', 
                borderRadius: 24, 
                alignItems: 'center', 
                justifyContent: 'center', 
                overflow: 'hidden' 
            }}
          >
            {image ? (
                <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
            ) : (
                <View style={{ alignItems: 'center', gap: 16 }}>
                    <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                         <Text style={{ color: 'white', fontSize: 32 }}>+</Text>
                    </View>
                    <Text style={{ color: 'white', fontWeight: '600', fontSize: 18 }}>Tap to Upload</Text>
                    <Text style={{ color: '#6b7280' }}>Supports JPG, PNG</Text>
                </View>
            )}
            
            {analyzing && (
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#60a5fa', fontWeight: 'bold', fontSize: 18 }}>Analyzing...</Text>
                </View>
            )}
          </TouchableOpacity>

          {image && !analyzing && (
              <View style={{ flexDirection: 'row', gap: 16, marginTop: 32, width: '100%' }}>
                  <TouchableOpacity 
                    onPress={() => setImage(null)}
                    style={{ flex: 1, paddingVertical: 16, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', alignItems: 'center' }}
                  >
                      <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>Retake</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                      onPress={startAnalysis}
                      style={{ 
                      flex: 1, 
                      backgroundColor: '#2563eb', 
                      paddingVertical: 16, 
                      borderRadius: 12, 
                      alignItems: 'center',
                      shadowColor: '#3b82f6',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.2,
                      shadowRadius: 4,
                      elevation: 5
                  }}>
                      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Confirm</Text>
                  </TouchableOpacity>
              </View>
          )}
          </View>
      </SafeAreaView>
    </View>
  );
}
