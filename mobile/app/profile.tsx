import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuth } from '../lib/auth';
import { Ionicons } from '@expo/vector-icons';
import PageHeader from '../components/PageHeader';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/');
  };

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
            title="My Profile" 
            subtitle="Manage your account and preferences"
            backRoute="/home"
          />

          {/* Profile Info */}
          <View style={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            borderRadius: 20,
            padding: 24,
            marginBottom: 24,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.1)',
          }}>
            <View style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: 'rgba(59, 130, 246, 0.2)',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
              alignSelf: 'center',
            }}>
              <Ionicons name="person" size={40} color="#3b82f6" />
            </View>
            <Text style={{ color: '#ffffff', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 }}>
              {user?.email || 'Guest User'}
            </Text>
            <Text style={{ color: '#888', fontSize: 14, textAlign: 'center' }}>
              Member since {new Date().toLocaleDateString()}
            </Text>
          </View>

          {/* Stats */}
          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 24 }}>
            {[
              { label: 'Scans', value: '0', icon: 'scan' as const },
              { label: 'Favorites', value: '0', icon: 'heart' as const },
              { label: 'Styles', value: '20+', icon: 'images' as const },
            ].map((stat, i) => (
              <View
                key={i}
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: 16,
                  padding: 16,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.1)',
                }}
              >
                <Ionicons name={stat.icon} size={24} color="#3b82f6" style={{ marginBottom: 8 }} />
                <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold', marginBottom: 4 }}>
                  {stat.value}
                </Text>
                <Text style={{ color: '#888', fontSize: 12 }}>
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>

          {/* Menu Items */}
          <View style={{ gap: 12, marginBottom: 24 }}>
            {[
              { icon: 'bar-chart' as const, title: 'Scan History', subtitle: 'View past analyses', route: '/home' },
              { icon: 'heart' as const, title: 'Saved Styles', subtitle: 'Your favorite looks', route: '/gallery' },
              { icon: 'settings' as const, title: 'Settings', subtitle: 'App preferences', route: '/home' },
              { icon: 'mail' as const, title: 'Support', subtitle: 'Get help', route: '/home' },
            ].map((item, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => router.push(item.route as any)}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: 16,
                  padding: 18,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.1)',
                }}
              >
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  backgroundColor: 'rgba(59, 130, 246, 0.2)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16,
                }}>
                  <Ionicons name={item.icon} size={20} color="#3b82f6" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: '600', marginBottom: 2 }}>
                    {item.title}
                  </Text>
                  <Text style={{ color: '#888', fontSize: 13 }}>
                    {item.subtitle}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Sign Out Button */}
          <TouchableOpacity
            onPress={handleSignOut}
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              borderWidth: 1,
              borderColor: 'rgba(239, 68, 68, 0.3)',
              borderRadius: 16,
              paddingVertical: 16,
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <Text style={{ color: '#ef4444', fontSize: 16, fontWeight: '600' }}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
