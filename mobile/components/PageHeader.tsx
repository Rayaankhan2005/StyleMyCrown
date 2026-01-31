import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  backRoute?: string;
}

export default function PageHeader({ title, subtitle, showBack = true, backRoute }: PageHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (backRoute) {
      router.push(backRoute as any);
    } else {
      router.back();
    }
  };

  return (
    <View style={{ marginBottom: 24, marginTop: 20 }}>
      {showBack && (
        <TouchableOpacity
          onPress={handleBack}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
            alignSelf: 'flex-start',
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#3b82f6" />
          <Text style={{ color: '#3b82f6', fontSize: 16, marginLeft: 8, fontWeight: '600' }}>
            Back
          </Text>
        </TouchableOpacity>
      )}
      
      <Text style={{ color: '#ffffff', fontSize: 36, fontWeight: 'bold', marginBottom: 8 }}>
        {title}
      </Text>
      
      {subtitle && (
        <Text style={{ color: '#aaa', fontSize: 16 }}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}
