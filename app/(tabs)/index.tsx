import { Image } from 'expo-image';
import { Platform, StyleSheet, TouchableOpacity, Alert, Linking, Animated, Easing } from 'react-native';
import { useState, useRef, useEffect } from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [buttonPressed, setButtonPressed] = useState('');
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    // Pulse animation for the name
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Slide in animation for buttons
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 800,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, []);

  const handleButtonPress = (action: string) => {
    setButtonPressed(action);
    switch (action) {
      case 'portfolio':
        Alert.alert('🚀 Portfolio', 'Opening Sef\'s amazing portfolio!');
        break;
      case 'contact':
        Alert.alert('📱 Contact', 'Let\'s connect! Sef Rowinston Maco is ready to collaborate!');
        break;
      case 'projects':
        Alert.alert('💻 Projects', 'Check out these awesome projects by Sef!');
        break;
      case 'skills':
        Alert.alert('⚡ Skills', 'React Native • TypeScript • Mobile Development • UI/UX');
        break;
      case 'github':
        Alert.alert('🔗 GitHub', 'Opening GitHub profile...');
        break;
      case 'linkedin':
        Alert.alert('💼 LinkedIn', 'Connecting on LinkedIn...');
        break;
      default:
        break;
    }
    setTimeout(() => setButtonPressed(''), 200);
  };

  const CoolButton = ({ title, icon, action, color = '#007AFF', delay = 0 }: any) => (
    <Animated.View
      style={[
        styles.buttonContainer,
        {
          transform: [{ translateX: slideAnim }],
          backgroundColor: buttonPressed === action ? color + '40' : color + '20',
        },
      ]}
    >
      <TouchableOpacity
        style={[styles.coolButton, { borderColor: color }]}
        onPress={() => handleButtonPress(action)}
        activeOpacity={0.7}
      >
        <ThemedText style={[styles.buttonIcon, { color }]}>{icon}</ThemedText>
        <ThemedText style={[styles.buttonText, { color }]}>{title}</ThemedText>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#667eea', dark: '#1D3D47' }}
      headerImage={
        <ThemedView style={styles.headerContent}>
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
          <ThemedView style={styles.headerOverlay}>
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <ThemedText style={styles.headerTitle}>SEF ROWINSTON MACO</ThemedText>
            </Animated.View>
            <ThemedText style={styles.headerSubtitle}>Mobile Developer & UI/UX Enthusiast</ThemedText>
          </ThemedView>
        </ThemedView>
      }>
      
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.welcomeText}>
          Welcome to My World! 🌟
        </ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>🚀 Quick Actions</ThemedText>
        <ThemedView style={styles.buttonsGrid}>
          <CoolButton title="Portfolio" icon="🎨" action="portfolio" color="#667eea" />
          <CoolButton title="Contact Me" icon="📱" action="contact" color="#764ba2" />
          <CoolButton title="Projects" icon="💻" action="projects" color="#f093fb" />
          <CoolButton title="Skills" icon="⚡" action="skills" color="#4facfe" />
          <CoolButton title="GitHub" icon="🔗" action="github" color="#333333" />
          <CoolButton title="LinkedIn" icon="💼" action="linkedin" color="#0077b5" />
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>💡 About Me</ThemedText>
        <ThemedView style={styles.aboutCard}>
          <ThemedText style={styles.aboutText}>
            Hey there! I'm <ThemedText type="defaultSemiBold" style={styles.nameHighlight}>Sef Rowinston Maco</ThemedText>, 
            a passionate mobile developer who loves creating amazing user experiences with React Native and modern technologies.
          </ThemedText>
          <ThemedText style={styles.aboutText}>
            🎯 Currently building cool stuff with TypeScript, React Native, and Expo
          </ThemedText>
          <ThemedText style={styles.aboutText}>
            🌟 Always learning, always growing, always coding!
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>🛠️ Development Setup</ThemedText>
        <ThemedView style={styles.stepContainer}>
          <ThemedText style={styles.stepTitle}>Step 1: Customize Your Experience</ThemedText>
          <ThemedText style={styles.stepText}>
            Edit <ThemedText type="defaultSemiBold" style={styles.codeText}>app/(tabs)/index.tsx</ThemedText> to see your changes come to life!
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText style={styles.stepTitle}>Step 2: Developer Tools</ThemedText>
          <ThemedText style={styles.stepText}>
            Press{' '}
            <ThemedText type="defaultSemiBold" style={styles.shortcutText}>
              {Platform.select({
                ios: '⌘ + D',
                android: '⌘ + M',
                web: 'F12',
              })}
            </ThemedText>{' '}
            to open developer tools and unleash your creativity!
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText style={styles.stepTitle}>Step 3: Fresh Start</ThemedText>
          <ThemedText style={styles.stepText}>
            Ready for a clean slate? Run{' '}
            <ThemedText type="defaultSemiBold" style={styles.codeText}>npm run reset-project</ThemedText>{' '}
            to get a fresh start and build something amazing!
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.footerContainer}>
        <ThemedText style={styles.footerText}>
          Made with ❤️ by <ThemedText style={styles.nameHighlight}>Sef Rowinston Maco</ThemedText>
        </ThemedText>
        <ThemedText style={styles.footerSubtext}>
          Keep building, keep dreaming! 🌟
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContent: {
    flex: 1,
    position: 'relative',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
    opacity: 0.3,
  },
  headerOverlay: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  welcomeText: {
    background: 'linear-gradient(45deg, #667eea, #764ba2)',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
    fontSize: 18,
  },
  buttonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    width: '48%',
    borderRadius: 12,
    marginBottom: 8,
  },
  coolButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  buttonIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  aboutCard: {
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  nameHighlight: {
    color: '#667eea',
    fontWeight: 'bold',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'rgba(118, 75, 162, 0.05)',
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#764ba2',
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#764ba2',
  },
  stepText: {
    fontSize: 14,
    lineHeight: 20,
  },
  codeText: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 4,
    borderRadius: 4,
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }),
  },
  shortcutText: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    padding: 4,
    borderRadius: 4,
    color: '#667eea',
  },
  footerContainer: {
    alignItems: 'center',
    padding: 24,
    marginTop: 16,
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
  },
});