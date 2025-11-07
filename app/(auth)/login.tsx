import { login } from '@/services/auth';
import { Button, Center, HStack, Icon, Input, InputField, Link, Text, VStack } from '@gluestack-ui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { AppleLogo, FacebookLogo, GoogleLogo } from 'phosphor-react-native';
import React, { useState } from 'react';
import { Alert } from 'react-native';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter email and password');
            return;
        }
        try {
            const token = await login(email, password);
            await AsyncStorage.setItem('userToken', token);
            Alert.alert('Success', 'Logged in successfully');
            router.replace('/(tabs)');
        } catch (error) {
            Alert.alert('Login failed', error.message);
        }
    };

    return (
        <Center flex={1} bg="$white" px="$6">
            <VStack space="lg" w="100%">
                <VStack space="xs">
                    <Text fontSize="$2xl" fontWeight="bold">
                        Log into
                    </Text>
                    <Text fontSize="$2xl" fontWeight="bold">
                        your account
                    </Text>
                </VStack>

                <Input>
                    <InputField
                        placeholder="Email address"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                </Input>
                <Input>
                    <InputField
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </Input>

                <HStack justifyContent="flex-end">
                    <Link>
                        <Text color="$coolGray600">Forgot Password?</Text>
                    </Link>
                </HStack>

                <Button bg="$black" py="$3" rounded="$full" onPress={handleLogin}>
                    <Text color="$white" fontWeight="bold">LOG IN</Text>
                </Button>

                <Center>
                    <Text color="$coolGray600">or log in with</Text>
                    <HStack mt="$3" space="lg">
                        <Icon as={AppleLogo} h={32} w={32} color="$black" />
                        <Icon as={GoogleLogo} h={32} w={32} color="$black" />
                        <Icon as={FacebookLogo} h={32} w={32} color="$black" />
                    </HStack>
                </Center>

                <Center mt="$6">
                    <HStack space="xs">
                        <Text color="$coolGray600">Don’t have an account?</Text>
                        <Link onPress={() => router.push('/(auth)/signup')}>
                            <Text fontWeight="bold">Sign Up</Text>
                        </Link>
                    </HStack>
                </Center>
            </VStack>
        </Center>
    );
}
