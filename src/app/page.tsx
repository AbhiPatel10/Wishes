"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Share2, Copy } from "lucide-react";
import { DiwaliWish } from '@/components/diwali-wish';

function DiwaliPageContent() {
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || undefined;

  const [fromName, setFromName] = useState('');
  const [canShare, setCanShare] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof navigator.share !== "undefined") {
      setCanShare(true);
    }
  }, []);

  const generateLink = () => {
    if (!fromName) {
      toast({
        variant: "destructive",
        title: "Missing Name",
        description: "Please enter your name to share a wish.",
      });
      return null;
    }
    return `${window.location.origin}/?from=${encodeURIComponent(fromName)}`;
  };

  const handleShare = async () => {
    const url = generateLink();
    if (!url) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Happy Diwali!',
          text: `A special Diwali wish for you from ${fromName}!`,
          url: url,
        });
        toast({
          title: "Shared!",
          description: "Your Diwali wish has been shared.",
        });
      } catch (error) {
        // Fallback to copy link if share fails
        handleCopyToClipboard(url);
      }
    } else {
      handleCopyToClipboard(url);
    }
  };

  const handleCopyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Copied!",
      description: "URL has been copied to your clipboard.",
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-8 diwali-background">
      <DiwaliWish from={from} />
      <div className="mt-8 w-full max-w-md rounded-lg bg-black/20 p-6 shadow-2xl backdrop-blur-sm">
        <div className="space-y-2 text-center mb-6">
            <h2 className="text-2xl font-headline text-white" style={{ fontFamily: "'Lobster', cursive" }}>Share your own wish!</h2>
            <p className="text-yellow-200/80 text-sm">Enter your name and share with friends.</p>
        </div>
        <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-black flex items-center justify-center rounded-md font-bold text-white text-xl">N</div>
            <Input 
                id="fromName" 
                value={fromName} 
                onChange={(e) => setFromName(e.target.value)} 
                placeholder="Your Name" 
                className="bg-transparent text-white border-0 border-b-2 border-yellow-500/50 rounded-none focus-visible:ring-0 focus:border-b-yellow-400" 
            />
            {canShare ? (
                <Button onClick={handleShare} className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg px-4">
                    <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
            ) : (
                <Button onClick={() => {
                  const url = generateLink();
                  if (url) handleCopyToClipboard(url);
                }} className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg px-4">
                    <Copy className="mr-2 h-4 w-4" /> Copy
                </Button>
            )}
        </div>
      </div>
    </main>
  );
}


export default function Home() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center diwali-background text-white">Loading...</div>}>
      <DiwaliPageContent />
    </Suspense>
  );
}
