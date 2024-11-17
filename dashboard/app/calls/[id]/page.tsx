"use client"

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { mockCalls } from '../../mockCalls'
import { Phone, User, Clock, Calendar, MessageSquare, Ticket } from 'lucide-react'
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

//testdata for now
const liveTranscript = [
    {
        id: 1,
        speaker: 'John',
        message: 'Hello, how can I help you today?',
        timestamp: new Date(),
    },
    {
        id: 2,
        speaker: 'Jane',
        message: 'I am having an issue with my account.',
        timestamp: new Date(),
    },
    {
        id: 3,
        speaker: 'John',
        message: 'I am sorry to hear that. Can you please provide more details?',
        timestamp: new Date(),
    },
    {
        id: 4,
        speaker: 'Jane',
        message: 'Sure, I am unable to login to my account since yesterday.',
        timestamp: new Date(),
    },
]

const sampleTickets = [
    {
        id: 1,
        title: 'Open New Account for John Doe',
        status: 'in-progress',
    },
    {
        id: 2,
        title: 'Open New Account for Jane Smith',
        status: 'in-progress',
    },
]

export default function CallDetails() {
  const { id } = useParams() as { id: string }
  const [call, setCall] = useState<typeof mockCalls[0] | undefined>(undefined)

  useEffect(() => {
    if (id) {
      const callData = mockCalls.find(call => call.id === parseInt(id as string))
      setCall(callData)
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
                <p>This is where the call summery will go. It summerizes the call and is updated on page reload</p>
              </CardContent>
            </Card>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Live Transcript</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] w-full pr-4">
                  {liveTranscript.map((message) => (
                    <div key={message.id} className={`flex mb-4 ${message.speaker === 'John' ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-[70%] p-3 rounded-lg ${message.speaker === 'John' ? 'bg-blue-100' : 'bg-green-100'}`}>
                        <p className="font-semibold">{message.speaker}</p>
                        <p>{message.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{format(message.timestamp, 'HH:mm:ss')}</p>
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
                    <span>{format(call.startTime, 'MMMM d, yyyy')}</span>
                  </div>
                  {/* <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <span>{format(call.startTime, 'HH:mm')} - {format(call.endTime, 'HH:mm')}</span>
                  </div> */}
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-gray-400" />
                    <span>{liveTranscript.length} messages</span>
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
                  {sampleTickets.map((ticket, index) => (
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