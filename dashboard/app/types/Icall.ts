import { ActionTicket } from './IactionTicket';

export interface Call {
  id: string;
  caller: string;
  recipient: string;
  startTime: string;
  endTime?: string;
  transcript?: string[];
  tickets?: ActionTicket[];
  summary?: string;
  status: 'ongoing' | 'completed';
}