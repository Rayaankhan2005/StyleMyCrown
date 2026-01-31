import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function LandingScreen() {
  const router = useRouter();

  return (
    <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800' }}
        style={{ flex: 1 }}
        resizeMode="cover"
    >
        <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
            style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 80, paddingHorizontal: 32 }}
        >
            {/* Logo/Title */}
            <View style={{ marginBottom: 40 }}>
                <Text style={{ 
                    color: '#ffffff', 
                    fontSize: 48, 
                    fontWeight: 'bold',
                    marginBottom: 16,
                    textAlign: 'center'
                }}>
                    StyleMyCrown
                </Text>
                <Text style={{ 
                    color: '#cccccc', 
                    fontSize: 18,
                    textAlign: 'center',
                    lineHeight: 26
                }}>
                    Discover your perfect hairstyle with AI-powered face shape analysis
                </Text>
            </View>

            {/* CTA Buttons */}
            <View style={{ gap: 16 }}>
                <TouchableOpacity 
                    onPress={() => router.push('/home')}
                    style={{ 
                        backgroundColor: '#3b82f6',
                        paddingVertical: 18,
                        borderRadius: 16,
                        alignItems: 'center',
                        shadowColor: '#3b82f6',
                        shadowOffset: { width: 0, height: 8 },
                        shadowOpacity: 0.4,
                        shadowRadius: 12,
                        elevation: 8
                    }}
                >
                    <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 18 }}>
                        Get Started
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => router.push('/login')}
                    style={{ 
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        borderWidth: 1.5,
                        borderColor: 'rgba(255,255,255,0.3)',
                        paddingVertical: 18,
                        borderRadius: 16,
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ color: '#ffffff', fontWeight: '600', fontSize: 18 }}>
                        Sign In
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Features */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 24, marginTop: 32 }}>
                {[
                    { icon: 'camera' as const, label: 'Face Scan' },
                    { icon: 'images' as const, label: 'Gallery' },
                    { icon: 'sparkles' as const, label: 'AI Powered' },
                ].map((feature, i) => (
                    <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Ionicons name={feature.icon} size={16} color="#aaa" />
                        <Text style={{ color: '#aaa', fontSize: 13 }}>
                            {feature.label}
                        </Text>
                    </View>
                ))}
            </View>
        </LinearGradient>
    </ImageBackground>
  );
}
