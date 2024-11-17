"use client";

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { Call } from '@/app/types/Icall';

export default function CallManager() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update currentTime every second to calculate durations
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch data from the external server
  useEffect(() => {
    async function fetchCalls() {
      try {
        const response = await fetch('http://localhost:4000/api/calls'); // External server URL
        const data = await response.json();
        setCalls(data);
      } catch (error) {
        console.error('Error fetching calls:', error);
      }
    }

    fetchCalls();

    const interval = setInterval(fetchCalls, 2000); // Fetch every 2 seconds

    return () => clearInterval(interval);
  }, []);

  // Calculate the duration of ongoing calls
  const formatDuration = (startTime: string) => {
    const duration = currentTime.getTime() - new Date(startTime).getTime();
    const seconds = Math.floor(duration / 1000) % 60;
    const minutes = Math.floor(duration / (1000 * 60)) % 60;
    const hours = Math.floor(duration / (1000 * 60 * 60));
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Call Manager</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {calls.map((call) => (
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
                        <p className="text-sm text-gray-500">
                          {format(new Date(call.startTime), 'MMM d, yyyy')}
                        </p>
                        <p className="text-sm text-gray-500">
                          {format(new Date(call.startTime), 'HH:mm')} - {format(new Date(call.endTime!), 'HH:mm')}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm font-semibold bg-red-100 text-red-800 px-2 py-1 rounded">
                        {formatDuration(call.startTime)}
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
  );
}
