"use client"
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { VapiWidget } from "./VapiWidget";
import { useState, useEffect } from "react";
import Vapi from '@vapi-ai/web';

export function CallSection() {
  const { user } = useUser()
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<Array<{ role: string, text: string }>>([]);
  useEffect(() => {
    const vapiInstance = new Vapi(process.env.NEXT_PUBLIC_VAPI_KEY || "");
    setVapi(vapiInstance);

    // Event listeners
    vapiInstance.on('call-start', () => {
      console.log('Call started');
      setIsConnected(true);
    });
    vapiInstance.on('call-end', () => {
      console.log('Call ended');
      setIsConnected(false);
      setIsSpeaking(false);
    });

    vapiInstance.on('speech-start', () => {
      console.log('Assistant started speaking');
      setIsSpeaking(true);
    });

    vapiInstance.on('speech-end', () => {
      console.log('Assistant stopped speaking');
      setIsSpeaking(false);
    });

    vapiInstance.on('message', (message: { type: string, role: string, transcript: string }) => {
      if (message.type === 'transcript') {
        setTranscript(prev => [...prev, {
          role: message.role,
          text: message.transcript
        }]);
      }
    });

    vapiInstance.on('error', (error: any) => {
      console.error('Vapi error:', error);
    });
    return () => {
      vapiInstance?.stop();
    };
  }, []);

  const startCall = () => {
    if (vapi) {
      vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT);
    }
  };

  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="font-bold mb-4 text-4xl">Connect with Your AI Assistant</h1>
        <p className="text-muted-foreground">
          Initiate a voice call with your AI dental assistant for real-time support and information.
        </p>
      </div>
      <div className="space-y-4">
        <div className="grid lg:grid-cols-2 gap-4">
          <Card className="pb-14">
            <div className="space-y-5">
              <div className="flex justify-center items-center rounded-full bg-primary/50 mx-auto w-32 h-32">
                <Image width={100} height={100} src={'/logo.png'} alt="logo"></Image>
              </div>
              <div className="text-center space-y-1">
                <h5 className="font-bold text-2xl">Dentwise AI</h5>
                <p className="text-muted-foreground">Dental Assistant</p>
              </div>
              {
                isConnected ?               <Badge variant={'outline'} className="mx-auto flex items-center"><span className="w-2 h-2 rounded-full bg-primary inline-block"></span> Connected</Badge>:
                 <Badge variant={'secondary'} className="mx-auto flex items-center">Wating</Badge>
                

              }
            </div>
          </Card>
          <Card className="pb-14">
            <div className="space-y-5">
              <div className="flex justify-center items-center rounded-full bg-primary/50 overflow-hidden mx-auto w-32 h-32">
                <Image width={150} height={150} src={user?.imageUrl ?? "/logo.png"} alt="logo"></Image>
              </div>
              <div className="text-center space-y-1">
                <h5 className="font-bold text-2xl">You</h5>
                <p className="text-muted-foreground">{user?.fullName}</p>
              </div>
              <Badge variant={'outline'} className="mx-auto flex items-center"><span className="w-2 h-2 rounded-full bg-muted inline-block"></span> Ready</Badge>
            </div>
          </Card>
        </div>
        {
          !isConnected ? <Button onClick={startCall} className="block mx-auto">Start Call</Button> : <Button onClick={endCall} variant={'destructive'} className="block mx-auto">End Call</Button> 
        }
        {
        transcript.length > 0 ? (<div className="mt-10 overflow-y-auto">
             {transcript.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: '8px',
                    textAlign: msg.role === 'user' ? 'right' : 'left'
                  }}
                >
                  <span style={{
                    background: msg.role === 'user' ? '#12A594' : '#333',
                    color: '#fff',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    display: 'inline-block',
                    fontSize: '14px',
                    maxWidth: '80%'
                  }}>
                    {msg.text}
                  </span>
                </div>
              ))}
        </div>)
        : <Badge className="mx-auto block" variant={'secondary'}> Conversation will appear here ...</Badge>
        }
        
      </div>
      {/* <VapiWidget apiKey={process.env.NEXT_PUBLIC_VAPI_KEY ?? ""} assistantId={process.env.NEXT_PUBLIC_VAPI_ASSISTANT ?? ""}/> */}

    </div>
  );
}