import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../lib/auth';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();
  const { signInWithGoogle, user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [signingIn, setSigningIn] = useState(false);

  // Redirect to home if already logged in
  useEffect(() => {
    if (user && !loading) {
      router.replace('/home');
    }
  }, [user, loading]);

  const handleGoogleSignIn = async () => {
    try {
      setSigningIn(true);
      await signInWithGoogle();
      // User will be redirected automatically via useEffect when auth state changes
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      Alert.alert(
        'OAuth Not Available', 
        'Google Sign-In requires a development build or physical device. Use "Skip Login" for testing in simulator.',
        [{ text: 'OK' }]
      );
      setSigningIn(false);
    }
  };

  const handleSkipLogin = () => {
    // For development/testing - skip authentication
    router.push('/home');
  };

  const handleEmailSignIn = () => {
    // For now, just navigate to scan (email auth can be added later)
    Alert.alert('Coming Soon', 'Email authentication will be available soon. Please use Google Sign-In for now.');
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#ffffff', fontSize: 18 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
        <LinearGradient
            colors={['#1e1e2e', '#000000']}
            style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
        />
        
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 24 }}>
            {/* Back Button */}
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 16,
                marginBottom: 24,
                alignSelf: 'flex-start',
              }}
            >
              <Ionicons name="arrow-back" size={24} color="#3b82f6" />
              <Text style={{ color: '#3b82f6', fontSize: 16, marginLeft: 8, fontWeight: '600' }}>
                Back
              </Text>
            </TouchableOpacity>

            <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ 
                backgroundColor: 'rgba(30,30,40,0.7)', 
                borderColor: 'rgba(255,255,255,0.1)', 
                borderWidth: 1, 
                borderRadius: 24, 
                padding: 32,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.5,
                shadowRadius: 20,
            }}>
                <Text style={{ color: '#ffffff', fontSize: 32, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' }}>Welcome Back</Text>
                <Text style={{ color: '#aaa', textAlign: 'center', marginBottom: 32, fontSize: 16 }}>Sign in to access your dashboard</Text>

                <View style={{ gap: 20 }}>
                    <View>
                        <Text style={{ color: '#ccc', marginBottom: 8, marginLeft: 4, fontWeight: '500' }}>Email</Text>
                        <TextInput 
                            style={{ 
                                backgroundColor: 'rgba(0,0,0,0.3)', 
                                borderColor: 'rgba(255,255,255,0.2)', 
                                borderWidth: 1, 
                                color: '#ffffff', 
                                padding: 18, 
                                borderRadius: 12,
                                fontSize: 16
                            }}
                            placeholder="name@example.com"
                            placeholderTextColor="#666"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    </View>

                    <TouchableOpacity 
                        onPress={handleEmailSignIn}
                        style={{ 
                            backgroundColor: '#3b82f6', 
                            padding: 18, 
                            borderRadius: 12, 
                            alignItems: 'center', 
                            marginTop: 10,
                            shadowColor: '#3b82f6',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.3,
                            shadowRadius: 8,
                        }}
                    >
                        <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 18 }}>
                            Sign In with Email
                        </Text>
                    </TouchableOpacity>

                     <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 24 }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.1)' }} />
                        <Text style={{ color: '#888', marginHorizontal: 16 }}>OR</Text>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.1)' }} />
                    </View>

                    <TouchableOpacity 
                        onPress={handleGoogleSignIn}
                        disabled={signingIn}
                        style={{ 
                            backgroundColor: 'rgba(255,255,255,0.08)', 
                            borderColor: 'rgba(255,255,255,0.1)', 
                            borderWidth: 1, 
                            padding: 18, 
                            borderRadius: 12, 
                            alignItems: 'center', 
                            flexDirection: 'row', 
                            justifyContent: 'center', 
                            gap: 12,
                            opacity: signingIn ? 0.6 : 1
                        }}
                    >
                        <Text style={{ color: '#ffffff', fontWeight: '600', fontSize: 16 }}>
                            {signingIn ? 'Signing in...' : 'Continue with Google'}
                        </Text>
                    </TouchableOpacity>

                    {/* Development/Testing Skip Login */}
                    <TouchableOpacity 
                        onPress={handleSkipLogin}
                        style={{ 
                            paddingVertical: 16, 
                            alignItems: 'center',
                            marginTop: 8
                        }}
                    >
                        <Text style={{ color: '#666', fontSize: 14 }}>
                            Skip Login (Dev Mode)
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
        </SafeAreaView>
    </View>
  );
}
