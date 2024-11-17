"use client";

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import Link from 'next/link'
import { Phone, User } from 'lucide-react'
import { mockCalls } from './mockCalls'

export default function CallManager() {
  const [calls, setCalls] = useState(mockCalls)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every second to calculate duration
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Simulate fetching data
    setCalls(mockCalls)
  }, [])

  // Caculate duration of ongoing calls
  const formatDuration = (startTime: Date) => {
    const duration = currentTime.getTime() - startTime.getTime()
    const seconds = Math.floor(duration / 1000) % 60
    const minutes = Math.floor(duration / (1000 * 60)) % 60
    const hours = Math.floor(duration / (1000 * 60 * 60))
    return `${hours}h ${minutes}m ${seconds}s`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Call Manager</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {calls.map(call => (
            <li key={call.id} className="hover:bg-gray-50">
              <Link href={`/calls/${call.id}`} className="block p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Phone className="h-6 w-6 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{call.caller}</p>
                      <p className="text-sm text-gray-500">To: {call.recipient}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {call.status === 'completed' ? (
                      <>
                        <p className="text-sm text-gray-500">{format(call.startTime, 'MMM d, yyyy')}</p>
                        <p className="text-sm text-gray-500">
                          {format(call.startTime, 'HH:mm')} - {format(call.endTime!, 'HH:mm')}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm font-semibold bg-red-100 text-red-800 px-2 py-1 rounded">
                        {call.status === 'ongoing' ? formatDuration(call.startTime) : 'N/A'}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}