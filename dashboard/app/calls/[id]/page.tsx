"use client"

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Phone, User, Clock, Calendar, MessageSquare, Ticket } from 'lucide-react'
import { Call } from '@/app/types/Icall';
import { ActionTicket } from '@/app/types/IactionTicket';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import { Badge } from "@/app/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion"

export default function CallDetails() {
  const { id } = useParams() as { id: string }
  const [call, setCall] = useState<Call | undefined>(undefined)

  useEffect(() => {
    async function fetchCall() {
      try {
        const response = await fetch(`http://localhost:4000/api/calls/${id}`); // External server URL
        const data = await response.json();
        setCall(data);
      } catch (error) {
        console.error('Error fetching call:', error);
      }
    }

    if (id) {
      fetchCall();
      const interval = setInterval(fetchCall, 2000); // Fetch every 2 seconds
      return () => clearInterval(interval);
    }
  }, [id])

  if (!call) {
    return <div>Loading...</div>
  }
  
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Call Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Call Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{call.summary}</p>
              </CardContent>
            </Card>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Live Transcript</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] w-full pr-4">
                  {call.transcript?.map((message: string, index: number) => (
                    <div key={index} className={`flex mb-4 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-[70%] p-3 rounded-lg ${index % 2 === 0 ? 'bg-blue-100' : 'bg-green-100'}`}>
                        <p className="font-semibold">{index % 2 === 0 ? 'John' : 'Jane'}</p>
                        <p>{message}</p>
                        <p className="text-xs text-gray-500 mt-1">{format(new Date(), 'HH:mm:ss')}</p>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Call Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-gray-400" />
                    <span>{call.caller}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span>{call.recipient}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span>{format(new Date(call.startTime), 'MMMM d, yyyy')}</span>
                  </div>
                  {/* <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <span>{format(new Date(call.startTime), 'HH:mm')} - {format(new Date(call.endTime), 'HH:mm')}</span>
                  </div> */}
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-gray-400" />
                    <span>{call.transcript?.length} messages</span>
                  </div>
                  <Badge variant={call.status === 'completed' ? 'secondary' : 'destructive'}>
                    {call.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Action Items</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {call.tickets?.map((ticket: ActionTicket, index: number) => (
                    <AccordionItem value={`item-${index}`} key={ticket.id}>
                      <AccordionTrigger>
                        <div className="flex items-center space-x-2">
                          <Ticket className="h-4 w-4" />
                          <span>{ticket.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="p-2">
                          <Badge 
                            variant={
                              ticket.status === 'completed' ? 'secondary' : 
                              ticket.status === 'in-progress' ? 'default' : 
                              'outline'
                            }
                          >
                            {ticket.status}
                          </Badge>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }