
import { User, Challenge, ReactionType } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: '유진',
    age: 17,
    profileImage: '👧',
    phoneNumber: '010-1234-5678'
  },
  {
    id: '2',
    name: '민수',
    age: 21,
    profileImage: '👨',
    phoneNumber: '010-2234-5678'
  },
  {
    id: '3',
    name: '지혜',
    age: 19,
    profileImage: '👩',
    phoneNumber: '010-3234-5678'
  },
  {
    id: '4',
    name: '현우',
    age: 20,
    profileImage: '👦',
    phoneNumber: '010-4234-5678'
  },
  {
    id: '5',
    name: '소영',
    age: 18,
    profileImage: '👧',
    phoneNumber: '010-5234-5678'
  },
  {
    id: '6',
    name: '태민',
    age: 22,
    profileImage: '👨',
    phoneNumber: '010-6234-5678'
  },
  {
    id: '7',
    name: '예은',
    age: 16,
    profileImage: '👩',
    phoneNumber: '010-7234-5678'
  }
];

export const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: '감사하는 습관 기르기',
    description: '매일 하나씩 감사한 일을 찾아서 기록하며 긍정적인 마음을 키워보아요.',
    hostId: '1',
    targetParticipants: 5,
    currentParticipants: 3,
    participants: [mockUsers[0], mockUsers[1], mockUsers[2]],
    status: 'recruiting',
    dailyMissions: [
      {
        day: 1,
        title: '오늘 감사한 한 가지',
        description: '오늘 하루 중 가장 감사했던 순간을 사진과 함께 기록해보세요.',
        submissions: []
      },
      {
        day: 2,
        title: '가족에게 감사 표현하기',
        description: '가족 중 한 분께 감사 인사를 전하고 그 순간을 기록해보세요.',
        submissions: []
      }
    ],
    createdAt: '2024-07-01'
  },
  {
    id: '2',
    title: '매일 10분 산책하기',
    description: '건강한 몸과 마음을 위해 매일 10분씩 산책하며 자연을 느껴보아요.',
    hostId: '2',
    targetParticipants: 6,
    currentParticipants: 4,
    participants: [mockUsers[1], mockUsers[3], mockUsers[4], mockUsers[5]],
    status: 'in-progress',
    startDate: '2024-06-25',
    dailyMissions: [
      {
        day: 1,
        title: '첫 산책 시작하기',
        description: '10분간 집 근처를 산책하며 새롭게 발견한 것을 사진으로 남겨보세요.',
        submissions: [
          {
            userId: '2',
            imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
            text: '집 근처 작은 공원을 발견했어요. 벤치에 앉아서 잠시 쉬었는데 마음이 평화로웠어요.',
            submittedAt: '2024-06-25T09:00:00Z',
            reactions: [
              {
                userId: '3',
                type: 'great-job',
                message: '정말 잘했어요!'
              }
            ]
          }
        ]
      }
    ],
    createdAt: '2024-06-20'
  },
  {
    id: '3',
    title: '감정 일기 쓰기',
    description: '하루의 감정을 솔직하게 기록하며 자신을 더 깊이 이해해보아요.',
    hostId: '3',
    targetParticipants: 4,
    currentParticipants: 7,
    participants: mockUsers,
    status: 'completed',
    startDate: '2024-06-10',
    endDate: '2024-06-16',
    dailyMissions: [],
    createdAt: '2024-06-05'
  }
];

export const reactionTypes: ReactionType[] = [
  { id: 'great-job', label: '정말 잘했어요!', emoji: '👏' },
  { id: 'cheer-up', label: '응원해요!', emoji: '💪' },
  { id: 'good-work', label: '수고 많았어요!', emoji: '🌟' },
  { id: 'keep-going', label: '계속 화이팅!', emoji: '🔥' },
  { id: 'amazing', label: '정말 멋져요!', emoji: '✨' }
];

export const currentUserId = '1'; // 현재 로그인한 사용자 (유진)
