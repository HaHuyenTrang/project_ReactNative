// // import { Button, Center, HStack, Icon, Input, InputField, Link, Text, VStack } from '@gluestack-ui/themed';
// // import { useNavigation } from '@react-navigation/native';
// // import { AppleLogo, FacebookLogo, GoogleLogo } from 'phosphor-react-native';
// // import React from 'react';

// // export default function SignUp() {
// //     const navigation = useNavigation();

// //     return (
// //         <Center flex={1} bg="$white" px="$6">
// //             <VStack space="lg" w="100%">
// //                 <VStack space="xs">
// //                     <Text fontSize="$2xl" fontWeight="bold">
// //                         Create
// //                     </Text>
// //                     <Text fontSize="$2xl" fontWeight="bold">
// //                         your account
// //                     </Text>
// //                 </VStack>
// //                 <Input>
// //                     <InputField placeholder="Enter your name" />
// //                 </Input>

// //                 <Input>
// //                     <InputField placeholder="Email address" keyboardType="email-address" />
// //                 </Input>

// //                 <Input>
// //                     <InputField placeholder="Password" secureTextEntry />
// //                 </Input>

// //                 <Input>
// //                     <InputField placeholder="Confirm password" secureTextEntry />
// //                 </Input>


// //                 <Button bg="$black" py="$3" rounded="$full">
// //                     <Text color="$white" fontWeight="bold">SIGN UP</Text>
// //                 </Button>

// //                 <Center>
// //                     <Text color="$coolGray600">or sign up with</Text>
// //                     <HStack mt="$3" space="lg">
// //                         <Icon as={AppleLogo} h={32} w={32} color="$black" />
// //                         <Icon as={GoogleLogo} h={32} w={32} color="$black" />
// //                         <Icon as={FacebookLogo} h={32} w={32} color="$black" />
// //                     </HStack>
// //                 </Center>

// //                 <Center mt="$6">
// //                     <HStack space="xs">
// //                         <Text color="$coolGray600">Already have account?</Text>
// //                         <Link onPress={() => navigation.navigate('Login')}>
// //                             <Text fontWeight="bold">Log In</Text>
// //                         </Link>
// //                     </HStack>
// //                 </Center>
// //             </VStack>
// //         </Center>
// //     );
// // }



// import { register } from '@/services/auth';
// import { Button, Center, HStack, Icon, Input, InputField, Link, Text, VStack } from '@gluestack-ui/themed';
// import { useRouter } from 'expo-router';
// import { AppleLogo, FacebookLogo, GoogleLogo } from 'phosphor-react-native';
// import React, { useState } from 'react';
// import { Alert } from 'react-native';

// export default function SignUp() {
//     const router = useRouter();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSignUp = async () => {
//         if (!email || !password) {
//             Alert.alert('Error', 'Please fill all required fields');
//             return;
//         }
//         try {
//             await register('Nguyen Van A', email, password, '0123456789', 'Ha Noi');
//             Alert.alert('Success', 'Registration complete');
//             router.replace('/(auth)/login');
//         } catch (error) {
//             Alert.alert('Register failed', error.message);
//         }
//     };

//     return (
//         <Center flex={1} bg="$white" px="$6">
//             <VStack space="lg" w="100%">
//                 <VStack space="xs">
//                     <Text fontSize="$2xl" fontWeight="bold">
//                         Create
//                     </Text>
//                     <Text fontSize="$2xl" fontWeight="bold">
//                         your account
//                     </Text>
//                 </VStack>

//                 <Input>
//                     <InputField placeholder="Email address" keyboardType="email-address" value={email} onChangeText={setEmail} />
//                 </Input>
//                 <Input>
//                     <InputField placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
//                 </Input>

//                 <Button bg="$black" py="$3" rounded="$full" onPress={handleSignUp}>
//                     <Text color="$white" fontWeight="bold">SIGN UP</Text>
//                 </Button>

//                 <Center>
//                     <Text color="$coolGray600">or sign up with</Text>
//                     <HStack mt="$3" space="lg">
//                         <Icon as={AppleLogo} h={32} w={32} color="$black" />
//                         <Icon as={GoogleLogo} h={32} w={32} color="$black" />
//                         <Icon as={FacebookLogo} h={32} w={32} color="$black" />
//                     </HStack>
//                 </Center>

//                 <Center mt="$6">
//                     <HStack space="xs">
//                         <Text color="$coolGray600">Already have account?</Text>
//                         <Link onPress={() => router.push('/(auth)/login')}>
//                             <Text fontWeight="bold">Log In</Text>
//                         </Link>
//                     </HStack>
//                 </Center>
//             </VStack>
//         </Center>
//     );
// }



import { register } from '@/services/auth';
import {
    Button,
    Center,
    HStack,
    Icon,
    Input,
    InputField,
    Link,
    Text,
    VStack,
} from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { AppleLogo, FacebookLogo, GoogleLogo } from 'phosphor-react-native';
import React, { useState } from 'react';
import { Alert, ScrollView } from 'react-native';

export default function SignUp() {
    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = async () => {
        if (!fullName || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        try {
            const res = await register(fullName, email, password, phone, address);
            Alert.alert('Success', 'Account created successfully!');
            router.replace('/(auth)/login');
        } catch (error) {
            Alert.alert('Register failed', error.message);
        }
    };

    return (
        <ScrollView flex={1} bg="$white">
            <Center flex={1} px="$6" py="$8">
                <VStack space="lg" w="100%">
                    {/* Title */}
                    <VStack space="xs">
                        <Text fontSize="$2xl" fontWeight="bold">
                            Create
                        </Text>
                        <Text fontSize="$2xl" fontWeight="bold">
                            your account
                        </Text>
                    </VStack>

                    {/* Input fields */}
                    <Input>
                        <InputField
                            placeholder="Enter your name"
                            value={fullName}
                            onChangeText={setFullName}
                        />
                    </Input>
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
                            placeholder="Phone number"
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={setPhone}
                        />
                    </Input>
                    <Input>
                        <InputField
                            placeholder="Address"
                            value={address}
                            onChangeText={setAddress}
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
                    <Input>
                        <InputField
                            placeholder="Confirm password"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                    </Input>

                    {/* Button */}
                    <Button
                        bg="$black"
                        py="$3"
                        rounded="$full"
                        onPress={handleSignUp}
                    >
                        <Text color="$white" fontWeight="bold">
                            SIGN UP
                        </Text>
                    </Button>

                    {/* Social Login */}
                    <Center>
                        <Text color="$coolGray600">or sign up with</Text>
                        <HStack mt="$3" space="lg">
                            <Icon as={AppleLogo} h={32} w={32} color="$black" />
                            <Icon as={GoogleLogo} h={32} w={32} color="$black" />
                            <Icon as={FacebookLogo} h={32} w={32} color="$black" />
                        </HStack>
                    </Center>

                    {/* Link to Login */}
                    <Center mt="$6">
                        <HStack space="xs">
                            <Text color="$coolGray600">Already have an account?</Text>
                            <Link onPress={() => router.push('/(auth)/login')}>
                                <Text fontWeight="bold">Log In</Text>
                            </Link>
                        </HStack>
                    </Center>
                </VStack>
            </Center>
        </ScrollView>
    );
}
