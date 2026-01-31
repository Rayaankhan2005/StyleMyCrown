import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuth } from '../lib/auth';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const features = [
    {
      id: 1,
      title: 'Scan Face',
      description: 'Analyze your face shape instantly',
      icon: 'camera' as const,
      color: '#3b82f6',
      route: '/scan',
    },
    {
      id: 2,
      title: 'Browse Gallery',
      description: 'Explore hairstyle inspiration',
      icon: 'images' as const,
      color: '#10b981',
      route: '/gallery',
    },
    {
      id: 3,
      title: 'My Profile',
      description: 'View your scan history',
      icon: 'person' as const,
      color: '#8b5cf6',
      route: '/profile',
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <LinearGradient
        colors={['#1a1a2e', '#000000']}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />
      
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 24 }}>
          {/* Header */}
          <View style={{ marginBottom: 32, marginTop: 20 }}>
            <Text style={{ color: '#ffffff', fontSize: 36, fontWeight: 'bold', marginBottom: 8 }}>
              Welcome Back
            </Text>
            <Text style={{ color: '#aaa', fontSize: 16 }}>
              Discover your perfect hairstyle
            </Text>
          </View>

          {/* Quick Actions */}
          <View style={{ gap: 16, marginBottom: 32 }}>
            {features.map((feature) => (
              <TouchableOpacity
                key={feature.id}
                onPress={() => router.push(feature.route as any)}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: 20,
                  padding: 24,
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.1)',
                  flexDirection: 'row',
                  alignItems: 'center',
                  shadowColor: feature.color,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 8,
                }}
              >
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 16,
                    backgroundColor: `${feature.color}20`,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16,
                  }}
                >
                  <Ionicons name={feature.icon} size={28} color={feature.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold', marginBottom: 4 }}>
                    {feature.title}
                  </Text>
                  <Text style={{ color: '#888', fontSize: 14 }}>
                    {feature.description}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color={feature.color} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Popular Styles */}
          <View style={{ marginBottom: 24 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <Text style={{ color: '#ffffff', fontSize: 24, fontWeight: 'bold' }}>
                Popular Styles
              </Text>
              <TouchableOpacity onPress={() => router.push('/gallery')} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Text style={{ color: '#3b82f6', fontSize: 14, fontWeight: '600' }}>
                  See All
                </Text>
                <Ionicons name="arrow-forward" size={14} color="#3b82f6" />
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -24, paddingHorizontal: 24 }}>
              {[
                { name: 'Textured Quiff', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
                { name: 'High Fade', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400' },
                { name: 'Side Part', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400' },
                { name: 'Pompadour', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400' },
              ].map((style, index) => (
                <View
                  key={index}
                  style={{
                    width: 140,
                    marginRight: 12,
                    borderRadius: 16,
                    overflow: 'hidden',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.1)',
                  }}
                >
                  <Image
                    source={{ uri: style.image }}
                    style={{ width: '100%', height: 160 }}
                    resizeMode="cover"
                  />
                  <View style={{ padding: 12 }}>
                    <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: '600' }}>
                      {style.name}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* How It Works */}
          <View style={{ marginTop: 24 }}>
            <Text style={{ color: '#ffffff', fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
              How It Works
            </Text>
            
            {[
              { step: 1, title: 'Take a Photo', desc: 'Upload or capture your photo', icon: 'camera-outline' as const },
              { step: 2, title: 'AI Analysis', desc: 'We detect your face shape', icon: 'analytics-outline' as const },
              { step: 3, title: 'Get Recommendations', desc: 'Discover perfect styles for you', icon: 'sparkles-outline' as const },
            ].map((item) => (
              <View
                key={item.step}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 16,
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  padding: 16,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.05)',
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16,
                  }}
                >
                  <Ionicons name={item.icon} size={20} color="#3b82f6" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: '600', marginBottom: 2 }}>
                    {item.title}
                  </Text>
                  <Text style={{ color: '#888', fontSize: 13 }}>
                    {item.desc}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
