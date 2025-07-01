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
            imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop',
            text: '집 근처 작은 공원을 발견했어요. 벤치에 앉아서 잠시 쉬었는데 마음이 평화로웠어요. 바람이 살랑살랑 불어서 기분이 좋았습니다.',
            submittedAt: '2024-06-25T09:00:00Z',
            reactions: [
              {
                userId: '3',
                type: 'great-job',
                message: '정말 잘했어요!'
              },
              {
                userId: '4',
                type: 'cheer-up',
                message: '응원해요!'
              }
            ]
          },
          {
            userId: '4',
            imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop',
            text: '오늘은 한강 공원에서 산책했어요! 강물이 흘러가는 소리를 들으며 걸으니 스트레스가 많이 풀렸습니다. 내일도 꼭 나와야겠어요.',
            submittedAt: '2024-06-25T10:30:00Z',
            reactions: [
              {
                userId: '2',
                type: 'amazing',
                message: '정말 멋져요!'
              }
            ]
          },
          {
            userId: '6',
            imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=400&fit=crop',
            text: '바다 근처로 산책을 갔어요. 파도 소리를 들으며 걷는 게 이렇게 좋은 줄 몰랐네요. 10분이 금세 지나갔어요!',
            submittedAt: '2024-06-25T16:45:00Z',
            reactions: [
              {
                userId: '2',
                type: 'good-work',
                message: '수고 많았어요!'
              },
              {
                userId: '4',
                type: 'keep-going',
                message: '계속 화이팅!'
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
    currentParticipants: 4,
    participants: [mockUsers[2], mockUsers[3], mockUsers[4], mockUsers[5]],
    status: 'completed',
    startDate: '2024-06-10',
    endDate: '2024-06-16',
    dailyMissions: [],
    createdAt: '2024-06-05'
  },
  {
    id: '4',
    title: '책 읽기 습관 만들기',
    description: '매일 30분씩 독서하며 새로운 지식과 통찰을 얻어보아요.',
    hostId: '4',
    targetParticipants: 5,
    currentParticipants: 2,
    participants: [mockUsers[3], mockUsers[0]],
    status: 'recruiting',
    dailyMissions: [
      {
        day: 1,
        title: '읽고 싶은 책 선택하기',
        description: '7일 동안 읽을 책을 선택하고 첫 페이지를 펼쳐보세요.',
        submissions: []
      }
    ],
    createdAt: '2024-07-02'
  },
  {
    id: '5',
    title: '물 많이 마시기',
    description: '하루 8잔의 물을 마시며 건강한 수분 섭취 습관을 기르는 챌린지입니다.',
    hostId: '5',
    targetParticipants: 6,
    currentParticipants: 1,
    participants: [mockUsers[4]],
    status: 'recruiting',
    dailyMissions: [
      {
        day: 1,
        title: '물통 준비하기',
        description: '하루 종일 들고 다닐 물통을 준비하고 물을 채워보세요.',
        submissions: []
      }
    ],
    createdAt: '2024-07-01'
  },
  {
    id: '6',
    title: '스마트폰 사용 줄이기',
    description: '디지털 디톡스를 통해 현실에 더 집중하는 시간을 만들어보아요.',
    hostId: '6',
    targetParticipants: 4,
    currentParticipants: 3,
    participants: [mockUsers[5], mockUsers[6], mockUsers[0]],
    status: 'recruiting',
    dailyMissions: [
      {
        day: 1,
        title: '스마트폰 사용 시간 체크하기',
        description: '오늘 하루 스마트폰 사용 시간을 확인하고 기록해보세요.',
        submissions: []
      }
    ],
    createdAt: '2024-06-30'
  },
  {
    id: '7',
    title: '새로운 요리 도전하기',
    description: '매일 새로운 요리를 시도하며 요리 실력을 늘려보아요.',
    hostId: '7',
    targetParticipants: 5,
    currentParticipants: 4,
    participants: [mockUsers[6], mockUsers[1], mockUsers[2], mockUsers[4]],
    status: 'in-progress',
    startDate: '2024-06-28',
    dailyMissions: [
      {
        day: 1,
        title: '간단한 요리 만들기',
        description: '평소 해보지 않은 간단한 요리를 하나 만들어보세요.',
        submissions: []
      }
    ],
    createdAt: '2024-06-25'
  },
  {
    id: '8',
    title: '영어 단어 외우기',
    description: '매일 10개씩 새로운 영어 단어를 외우며 어휘력을 늘려보아요.',
    hostId: '1',
    targetParticipants: 7,
    currentParticipants: 5,
    participants: [mockUsers[0], mockUsers[1], mockUsers[3], mockUsers[4], mockUsers[6]],
    status: 'recruiting',
    dailyMissions: [
      {
        day: 1,
        title: '첫 10개 단어 외우기',
        description: '오늘 외울 영어 단어 10개를 선택하고 암기해보세요.',
        submissions: []
      }
    ],
    createdAt: '2024-06-29'
  },
  {
    id: '9',
    title: '명상하기',
    description: '매일 10분씩 명상하며 마음의 평화를 찾아보아요.',
    hostId: '2',
    targetParticipants: 4,
    currentParticipants: 4,
    participants: [mockUsers[1], mockUsers[2], mockUsers[5], mockUsers[6]],
    status: 'completed',
    startDate: '2024-06-15',
    endDate: '2024-06-21',
    dailyMissions: [],
    createdAt: '2024-06-12'
  },
  {
    id: '10',
    title: '일찍 잠자리에 들기',
    description: '11시 전에 잠자리에 들어 규칙적인 수면 패턴을 만들어보아요.',
    hostId: '3',
    targetParticipants: 6,
    currentParticipants: 2,
    participants: [mockUsers[2], mockUsers[5]],
    status: 'recruiting',
    dailyMissions: [
      {
        day: 1,
        title: '수면 준비하기',
        description: '11시 전 잠자리 준비를 마치고 오늘 하루를 정리해보세요.',
        submissions: []
      }
    ],
    createdAt: '2024-07-01'
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
