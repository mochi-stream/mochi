"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface WebPushContextType {
    pushSubscribe: () => Promise<void>;
    pushUnsubscribe: () => Promise<void>;
    isPushSubscribed: boolean;
}

const WebPushContext = createContext<WebPushContextType | undefined>(undefined);

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_KEY || '';

const urlB64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
};

export const WebPushProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isPushSubscribed, setIsPushSubscribed] = useState<boolean>(false);

    useEffect(() => {
        const registerServiceWorker = async () => {
            if ('serviceWorker' in navigator) {
                try {
                    await navigator.serviceWorker.register('/sw.js');
                    console.log('Service Worker registered.');
                } catch (error) {
                    console.error('Service Worker registration failed:', error);
                }
            } else {
                console.warn('Service Workers are not supported in this browser.');
            }
        };

        const checkSubscription = async () => {
            if ('serviceWorker' in navigator && 'PushManager' in window) {
                const registration = await navigator.serviceWorker.ready;
                const subscription = await registration.pushManager.getSubscription();
                setIsPushSubscribed(!!subscription);
            }
        };

        registerServiceWorker().then(checkSubscription);
    }, []);

    const pushSubscribe = async () => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlB64ToUint8Array(VAPID_PUBLIC_KEY),
            });

            await fetch('/api/push/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(subscription),
            });

            setIsPushSubscribed(true);
        }
    };

    const pushUnsubscribe = async () => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();
            if (subscription) {
                await subscription.unsubscribe();

                await fetch('/api/push/unsubscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ endpoint: subscription.endpoint }),
                });

                setIsPushSubscribed(false);
            }
        }
    };

    return (
        <WebPushContext.Provider value={{ pushSubscribe, pushUnsubscribe, isPushSubscribed }}>
            {children}
        </WebPushContext.Provider>
    );
};

export const useWebPush = () => {
    const context = useContext(WebPushContext);
    if (context === undefined) {
        throw new Error('useWebPush must be used within a WebPushProvider');
    }
    return context;
};
