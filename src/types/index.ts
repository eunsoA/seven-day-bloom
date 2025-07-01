
export interface User {
  id: string;
  name: string;
  age: number;
  profileImage: string;
  phoneNumber: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  hostId: string;
  targetParticipants: number;
  currentParticipants: number;
  participants: User[];
  status: 'recruiting' | 'in-progress' | 'completed';
  startDate?: string;
  endDate?: string;
  dailyMissions: DailyMission[];
  createdAt: string;
}

export interface DailyMission {
  day: number;
  title: string;
  description: string;
  submissions: MissionSubmission[];
}

export interface MissionSubmission {
  userId: string;
  imageUrl?: string;
  text: string;
  submittedAt: string;
  reactions: EmotionalReaction[];
}

export interface EmotionalReaction {
  userId: string;
  type: 'great-job' | 'cheer-up' | 'good-work' | 'keep-going' | 'amazing';
  message: string;
}

export type ReactionType = {
  id: 'great-job' | 'cheer-up' | 'good-work' | 'keep-going' | 'amazing';
  label: string;
  emoji: string;
};
