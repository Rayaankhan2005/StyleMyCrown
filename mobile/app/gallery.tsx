import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import PageHeader from '../components/PageHeader';

// Hairstyle data organized by face shape
const hairstyleData = {
  Oval: [
    { id: 1, name: 'Textured Quiff', style: 'Trendy', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', description: 'Modern and versatile' },
    { id: 2, name: 'Side Part', style: 'Professional', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400', description: 'Classic and clean' },
    { id: 3, name: 'Slicked Back', style: 'Classic', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', description: 'Timeless elegance' },
    { id: 4, name: 'Medium Length', style: 'Casual', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400', description: 'Relaxed and natural' },
  ],
  Round: [
    { id: 5, name: 'High Fade Pompadour', style: 'Trendy', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400', description: 'Adds height and definition' },
    { id: 6, name: 'Angular Fringe', style: 'Professional', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400', description: 'Creates sharp lines' },
    { id: 7, name: 'Vertical Volume', style: 'Trendy', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', description: 'Elongates face shape' },
    { id: 8, name: 'Textured Crop', style: 'Casual', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', description: 'Modern and easy' },
  ],
  Square: [
    { id: 9, name: 'Textured Crop', style: 'Trendy', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400', description: 'Softens angular features' },
    { id: 10, name: 'Messy Fringe', style: 'Casual', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400', description: 'Adds texture and movement' },
    { id: 11, name: 'Side Swept', style: 'Professional', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400', description: 'Balanced and refined' },
    { id: 12, name: 'Undercut', style: 'Trendy', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', description: 'Bold and modern' },
  ],
  Heart: [
    { id: 13, name: 'Side Part Volume', style: 'Professional', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', description: 'Balances proportions' },
    { id: 14, name: 'Textured Top', style: 'Trendy', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400', description: 'Adds width at top' },
    { id: 15, name: 'Layered Cut', style: 'Casual', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400', description: 'Natural and flowing' },
    { id: 16, name: 'Fringe Style', style: 'Classic', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400', description: 'Softens forehead' },
  ],
  Oblong: [
    { id: 17, name: 'Side Part', style: 'Professional', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', description: 'Creates horizontal emphasis' },
    { id: 18, name: 'Textured Crop', style: 'Trendy', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', description: 'Balanced proportions' },
    { id: 19, name: 'Short Sides', style: 'Casual', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400', description: 'Clean and simple' },
    { id: 20, name: 'Volume on Top', style: 'Classic', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400', description: 'Adds width' },
  ],
};

const faceShapes = ['All', 'Oval', 'Round', 'Square', 'Heart', 'Oblong'];
const styleTypes = ['All', 'Trendy', 'Professional', 'Casual', 'Classic'];

export default function GalleryScreen() {
  const router = useRouter();
  const [selectedFaceShape, setSelectedFaceShape] = useState('All');
  const [selectedStyle, setSelectedStyle] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter hairstyles
  const getFilteredHairstyles = () => {
    let allStyles: any[] = [];
    
    if (selectedFaceShape === 'All') {
      Object.values(hairstyleData).forEach(styles => allStyles.push(...styles));
    } else {
      allStyles = hairstyleData[selectedFaceShape as keyof typeof hairstyleData] || [];
    }

    if (selectedStyle !== 'All') {
      allStyles = allStyles.filter(style => style.style === selectedStyle);
    }

    if (searchQuery) {
      allStyles = allStyles.filter(style => 
        style.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return allStyles;
  };

  const filteredHairstyles = getFilteredHairstyles();

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <LinearGradient
        colors={['#1a1a2e', '#000000']}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />
      
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          {/* Header with Back Button */}
          <PageHeader 
            title="Hairstyle Gallery" 
            subtitle="Discover styles perfect for your face shape"
            backRoute="/home"
          />

          {/* Search Bar */}
          <View style={{ marginBottom: 20 }}>
            <TextInput
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderColor: 'rgba(255,255,255,0.2)',
                borderWidth: 1,
                borderRadius: 12,
                padding: 16,
                color: '#ffffff',
                fontSize: 16,
              }}
              placeholder="Search hairstyles..."
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Face Shape Filter */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ color: '#ccc', fontSize: 14, marginBottom: 12, fontWeight: '600' }}>
              FACE SHAPE
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
              {faceShapes.map((shape) => (
                <TouchableOpacity
                  key={shape}
                  onPress={() => setSelectedFaceShape(shape)}
                  style={{
                    backgroundColor: selectedFaceShape === shape ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 20,
                    marginRight: 10,
                    borderWidth: 1,
                    borderColor: selectedFaceShape === shape ? '#3b82f6' : 'rgba(255,255,255,0.2)',
                  }}
                >
                  <Text style={{ color: '#ffffff', fontWeight: '600' }}>{shape}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Style Type Filter */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ color: '#ccc', fontSize: 14, marginBottom: 12, fontWeight: '600' }}>
              STYLE TYPE
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {styleTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setSelectedStyle(type)}
                  style={{
                    backgroundColor: selectedStyle === type ? '#10b981' : 'rgba(255,255,255,0.1)',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 20,
                    marginRight: 10,
                    borderWidth: 1,
                    borderColor: selectedStyle === type ? '#10b981' : 'rgba(255,255,255,0.2)',
                  }}
                >
                  <Text style={{ color: '#ffffff', fontWeight: '600' }}>{type}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Results Count */}
          <Text style={{ color: '#888', fontSize: 14, marginBottom: 16 }}>
            {filteredHairstyles.length} style{filteredHairstyles.length !== 1 ? 's' : ''} found
          </Text>

          {/* Hairstyle Grid */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
            {filteredHairstyles.map((hairstyle) => (
              <View
                key={hairstyle.id}
                style={{
                  width: '47%',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: 16,
                  overflow: 'hidden',
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.1)',
                }}
              >
                <Image
                  source={{ uri: hairstyle.image }}
                  style={{ width: '100%', height: 180 }}
                  resizeMode="cover"
                />
                <View style={{ padding: 12 }}>
                  <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>
                    {hairstyle.name}
                  </Text>
                  <Text style={{ color: '#888', fontSize: 12, marginBottom: 8 }}>
                    {hairstyle.description}
                  </Text>
                  <View style={{
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 8,
                    alignSelf: 'flex-start',
                  }}>
                    <Text style={{ color: '#60a5fa', fontSize: 11, fontWeight: '600' }}>
                      {hairstyle.style}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Empty State */}
          {filteredHairstyles.length === 0 && (
            <View style={{ alignItems: 'center', paddingVertical: 40 }}>
              <Text style={{ color: '#666', fontSize: 16, textAlign: 'center' }}>
                No hairstyles found.{'\n'}Try adjusting your filters.
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
