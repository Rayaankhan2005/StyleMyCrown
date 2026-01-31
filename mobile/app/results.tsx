import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import PageHeader from '../components/PageHeader';

export default function ResultsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Get data from navigation params
  const imageUri = params.image as string;
  const faceShape = params.faceShape as string || 'Unknown';
  const message = params.message as string;

  // Hairstyle recommendations based on face shape
  const getRecommendations = (shape: string) => {
    const recommendations: Record<string, string[]> = {
      'Oval': ['Textured Quiff', 'Side Part', 'Slicked Back', 'Medium Length'],
      'Round': ['Pompadour', 'High Fade', 'Angular Fringe', 'Vertical Volume'],
      'Square': ['Textured Crop', 'Messy Fringe', 'Side Swept', 'Undercut'],
      'Heart': ['Side Part', 'Textured Top', 'Layered Cut', 'Fringe'],
      'Oblong': ['Side Part', 'Textured Crop', 'Short Sides', 'Volume on Top'],
    };
    return recommendations[shape] || ['Classic Cut', 'Modern Style', 'Textured Look'];
  };

  const recommendations = getRecommendations(faceShape);

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <LinearGradient
        colors={['#1a1a2e', '#000000']}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />
      
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 24 }}>
          {/* Header with Back Button */}
          <PageHeader 
            title="Analysis Complete" 
            subtitle={message || 'Your face shape has been analyzed'}
            backRoute="/home"
          />

          {/* Before/After Images */}
          {params.generatedImageUrl ? (
            <View style={{ marginBottom: 24 }}>
              <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
                AI-Generated Hairstyle Preview
              </Text>
              
              {/* Before & After Comparison */}
              <View style={{ flexDirection: 'row', gap: 12 }}>
                {/* Original Image */}
                <View style={{ flex: 1 }}>
                  <Text style={{ color: '#888', fontSize: 12, marginBottom: 8, textAlign: 'center' }}>BEFORE</Text>
                  <View style={{ 
                    borderRadius: 16, 
                    overflow: 'hidden', 
                    borderWidth: 2,
                    borderColor: 'rgba(255,255,255,0.1)'
                  }}>
                    <Image 
                      source={{ uri: imageUri }} 
                      style={{ width: '100%', aspectRatio: 3/4 }}
                      resizeMode="cover"
                    />
                  </View>
                </View>

                {/* AI Generated Image */}
                <View style={{ flex: 1 }}>
                  <Text style={{ color: '#60a5fa', fontSize: 12, marginBottom: 8, textAlign: 'center' }}>AFTER (AI)</Text>
                  <View style={{ 
                    borderRadius: 16, 
                    overflow: 'hidden', 
                    borderWidth: 2,
                    borderColor: 'rgba(59, 130, 246, 0.5)'
                  }}>
                    <Image 
                      source={{ uri: params.generatedImageUrl as string }} 
                      style={{ width: '100%', aspectRatio: 3/4 }}
                      resizeMode="cover"
                    />
                  </View>
                </View>
              </View>
            </View>
          ) : (
            /* Original Image Only */
            <View style={{ 
              borderRadius: 20, 
              overflow: 'hidden', 
              marginBottom: 24,
              borderWidth: 2,
              borderColor: 'rgba(255,255,255,0.1)'
            }}>
              <Image 
                source={{ uri: imageUri }} 
                style={{ width: '100%', aspectRatio: 3/4 }}
                resizeMode="cover"
              />
            </View>
          )}

          {/* Face Shape Card */}
          <View style={{
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderColor: 'rgba(59, 130, 246, 0.3)',
            borderWidth: 1,
            borderRadius: 16,
            padding: 20,
            marginBottom: 24
          }}>
            <Text style={{ color: '#60a5fa', fontSize: 14, fontWeight: '600', marginBottom: 8 }}>
              DETECTED FACE SHAPE
            </Text>
            <Text style={{ color: '#ffffff', fontSize: 28, fontWeight: 'bold' }}>
              {faceShape}
            </Text>
          </View>

          {/* Recommendations */}
          <View style={{ marginBottom: 32 }}>
            <Text style={{ color: '#ffffff', fontSize: 22, fontWeight: 'bold', marginBottom: 16 }}>
              Recommended Hairstyles
            </Text>
            
            {recommendations.map((style, index) => (
              <View 
                key={index}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderWidth: 1,
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: 'rgba(59, 130, 246, 0.2)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16
                }}>
                  <Text style={{ color: '#60a5fa', fontSize: 18, fontWeight: 'bold' }}>
                    {index + 1}
                  </Text>
                </View>
                <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: '600', flex: 1 }}>
                  {style}
                </Text>
              </View>
            ))}
          </View>

          {/* Action Buttons */}
          <View style={{ gap: 12, marginBottom: 20 }}>
            <TouchableOpacity
              onPress={() => router.push('/scan')}
              style={{
                backgroundColor: '#3b82f6',
                borderRadius: 12,
                paddingVertical: 18,
                alignItems: 'center',
                shadowColor: '#3b82f6',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
              }}
            >
              <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold' }}>
                Try Another Photo
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/gallery')}
              style={{
                backgroundColor: '#10b981',
                borderRadius: 12,
                paddingVertical: 18,
                alignItems: 'center',
                shadowColor: '#10b981',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
              }}
            >
              <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold' }}>
                Browse Gallery
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // TODO: Navigate to booking/consultation page
                alert('Consultation booking coming soon!');
              }}
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderColor: 'rgba(255,255,255,0.2)',
                borderWidth: 1,
                borderRadius: 12,
                paddingVertical: 18,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: '600' }}>
                Book Consultation
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/')}
              style={{
                paddingVertical: 16,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#888', fontSize: 16 }}>
                Back to Home
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
