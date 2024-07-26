// ErrorBoundary.tsx

import React, { Component, ReactNode } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import Gmail from '../Components/Contact/Gmail';
import Linkdin from '../Components/Contact/Linkdin';
import GitHub from '../Components/Contact/GitHub';
import Portfolio from '../Components/Contact/Portfolio';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // You can log the error to an error reporting service here
        //console.warn("Error caught in Error Boundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Render fallback UI
            return (
                <View style={styles.container}>
                    <Image style={{ height: 60, width: 60 }} source={require('../Images/tea.png')} />
                    <Text style={styles.errorText}>Something went wrong.</Text>
                    <Button title="Try Again" onPress={() => this.setState({ hasError: false })} />
                    <Text style={styles.contact}>Contact us</Text>
                    <View style={{ display: 'flex', flexDirection: 'row',marginTop:5, justifyContent: 'center', alignItems: 'center' }}>
                        <Gmail />
                        <GitHub />
                        <Linkdin />
                        <Portfolio />
                    </View>
                </View>
            );
        }

        return this.props.children;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        marginBottom: 20,
        color:'#444'
    },
    contact: {
        fontSize: 12,
        color: '#0582f7',
        textDecorationLine: 'underline',
        marginTop: 15
    }
});


export default ErrorBoundary;
