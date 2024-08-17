import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";

import { subscribe, unsubscribe } from "@/actions/subscribe";
import { useUser } from "@/app/_components/context";
import { getSubscription } from "@/services/subscriptions";

import { BellPlus, BellRing, Loader } from "lucide-react";

import { toast } from "sonner";

import { useWebPush } from "@/app/_components/web-push";

export default function Subscriptions({
    animeId,
}: {
    animeId: number;
}) {

    const { pushSubscribe, isPushSubscribed } = useWebPush();

    const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
    const [isSubscribing, setIsSubscribing] = useState(false);

    const { user, isAuthenticated } = useUser();

    useEffect(() => {
        async function fetchSubscription() {
            if (user && animeId) {
                const subscription = await getSubscription({
                    animeId: animeId.toString(),
                    userId: user.id,
                });
                setIsSubscribed(subscription !== null);
            }
        }
        fetchSubscription();
    }, [user, animeId]);


    async function handleSubscribeToggle() {
        if (!isAuthenticated || !user) {
            toast.error("Please log in to manage subscriptions.");
            return;
        }

        if (!animeId) {
            toast.error("Failed to subscribe. Please try again later.");
            return;
        }

        if (!isSubscribed && !isPushSubscribed) {
            try {
                await pushSubscribe();
            } catch (error) {
                toast.error("Failed to subscribe. Permission denied.");
                return;
            }
        };

        setIsSubscribing(true);
        if (isSubscribed) {
            await unsubscribe({
                animeId: animeId.toString(),
                userId: user?.id,
            });
            setIsSubscribed(false);
        } else {
            await subscribe({
                animeId: animeId.toString(),
                userId: user?.id,
            });
            setIsSubscribed(true);
        }
        setIsSubscribing(false);
    }

    return (<>
        {isSubscribed === null ? (
            <Button
                className={`shadow-lg ${isSubscribing ? "opacity-75" : "opacity-100"
                    }`}
                size={"icon"}
                onClick={handleSubscribeToggle}
                disabled={isSubscribing || isSubscribed === null}
            >
                <Loader className="h-4 w-4 animate-spin" />

            </Button>
        ) : (
            <Button
                className={`shadow-lg ${isSubscribing ? "opacity-75" : "opacity-100"
                    }`}
                size={"icon"}
                onClick={handleSubscribeToggle}
                disabled={isSubscribing || isSubscribed === null}
            >
                <div>
                    {isSubscribed ? (
                        <BellRing className="h-5 w-5" />
                    ) : (
                        <BellPlus className="h-5 w-5" />
                    )}
                </div>
            </Button>
        )}
    </>);
}
