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
    currentParticipants: 3,
    participants: [mockUsers[1], mockUsers[3], mockUsers[5]],
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
            text: '집 근처 작은 공원을 발견했어요. 벤치에 앉아서 잠시 쉬었는데 마음이 평화로웠어요.',
            submittedAt: '2024-06-25T09:00:00Z',
            reactions: []
          },
          {
            userId: '4',
            imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop',
            text: '오늘은 한강 공원에서 산책했어요! 강물이 흘러가는 소리를 들으며 걸으니 스트레스가 많이 풀렸습니다.',
            submittedAt: '2024-06-25T10:30:00Z',
            reactions: []
          },
          {
            userId: '6',
            imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=400&fit=crop',
            text: '바다 근처로 산책을 갔어요. 파도 소리를 들으며 걷는 게 이렇게 좋은 줄 몰랐네요.',
            submittedAt: '2024-06-25T16:45:00Z',
            reactions: []
          }
        ]
      },
      {
        day: 2,
        title: '새로운 길 탐험하기',
        description: '평소 가보지 않은 길로 산책하며 새로운 발견을 기록해보세요.',
        submissions: [
          {
            userId: '2',
            imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop',
            text: '새로운 골목길을 발견했어요. 오래된 벽화가 정말 아름다웠습니다.',
            submittedAt: '2024-06-26T08:30:00Z',
            reactions: []
          },
          {
            userId: '4',
            imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
            text: '언덕 위로 올라가는 길을 걸었더니 도시 전경이 한눈에 보였어요. 힘들었지만 보람있었습니다.',
            submittedAt: '2024-06-26T18:00:00Z',
            reactions: []
          },
          {
            userId: '6',
            imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop',
            text: '작은 카페가 있는 거리를 걸었어요. 커피 향이 좋아서 기분이 좋아졌습니다.',
            submittedAt: '2024-06-26T19:30:00Z',
            reactions: []
          }
        ]
      },
      {
        day: 3,
        title: '자연과 함께하기',
        description: '공원이나 자연이 있는 곳에서 산책하며 자연의 소리에 집중해보세요.',
        submissions: [
          {
            userId: '2',
            imageUrl: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=400&fit=crop',
            text: '새소리가 정말 좋았어요. 스마트폰을 잠시 끄고 자연의 소리에만 집중했습니다.',
            submittedAt: '2024-06-27T07:15:00Z',
            reactions: []
          },
          {
            userId: '4',
            imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=400&fit=crop',
            text: '나무 그늘 아래서 쉬면서 바람 소리를 들었어요. 마음이 정말 평온해졌습니다.',
            submittedAt: '2024-06-27T17:45:00Z',
            reactions: []
          },
          {
            userId: '6',
            imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop',
            text: '연못가를 걸으며 오리들을 구경했어요. 평화로운 시간이었습니다.',
            submittedAt: '2024-06-27T20:00:00Z',
            reactions: []
          }
        ]
      },
      {
        day: 4,
        title: '감사한 마음으로 걷기',
        description: '산책하며 오늘 감사한 일들을 떠올려보세요.',
        submissions: [
          {
            userId: '2',
            imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop',
            text: '건강하게 걸을 수 있다는 것에 감사했어요. 당연한 것들이 사실은 소중하다는 걸 느꼈습니다.',
            submittedAt: '2024-06-28T08:00:00Z',
            reactions: []
          },
          {
            userId: '4',
            imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop',
            text: '가족과 친구들에게 감사한 마음이 들었어요. 혼자 걷는 시간이지만 외롭지 않았습니다.',
            submittedAt: '2024-06-28T19:00:00Z',
            reactions: []
          },
          {
            userId: '6',
            imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop',
            text: '좋은 날씨에 감사했어요. 따뜻한 햇살 아래서 걷는 기분이 정말 좋았습니다.',
            submittedAt: '2024-06-28T16:30:00Z',
            reactions: []
          }
        ]
      },
      {
        day: 5,
        title: '천천히 여유롭게',
        description: '오늘은 평소보다 천천히 걸으며 주변을 자세히 관찰해보세요.',
        submissions: [
          {
            userId: '2',
            imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
            text: '천천히 걸으니 평소 놓쳤던 것들이 보였어요. 작은 꽃들이 정말 예뻤습니다.',
            submittedAt: '2024-06-29T07:30:00Z',
            reactions: []
          },
          {
            userId: '4',
            imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=400&fit=crop',
            text: '급하지 않게 걷는 게 이렇게 좋은 줄 몰랐어요. 마음도 여유로워졌습니다.',
            submittedAt: '2024-06-29T18:15:00Z',
            reactions: []
          },
          {
            userId: '6',
            imageUrl: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=400&fit=crop',
            text: '건물들의 모양이나 색깔을 자세히 봤어요. 평소에는 그냥 지나쳤던 것들이었는데 새로웠습니다.',
            submittedAt: '2024-06-29T20:45:00Z',
            reactions: []
          }
        ]
      },
      {
        day: 6,
        title: '내일을 위한 다짐',
        description: '산책하며 내일 하고 싶은 일이나 목표에 대해 생각해보세요.',
        submissions: [
          {
            userId: '2',
            imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop',
            text: '내일은 좀 더 일찍 일어나서 산책하고 싶어요. 아침 공기가 정말 좋거든요.',
            submittedAt: '2024-06-30T08:45:00Z',
            reactions: []
          },
          {
            userId: '4',
            imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop',
            text: '이 챌린지가 끝나도 산책을 계속하고 싶어요. 정말 좋은 습관이 된 것 같습니다.',
            submittedAt: '2024-06-30T17:00:00Z',
            reactions: []
          },
          {
            userId: '6',
            imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop',
            text: '친구들에게도 산책을 추천하고 싶어요. 함께 걸으면 더 즐거울 것 같습니다.',
            submittedAt: '2024-06-30T19:30:00Z',
            reactions: []
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
    dailyMissions: [
      {
        day: 1,
        title: '오늘의 감정 기록하기',
        description: '하루 종일 느꼈던 감정을 한 단어로 표현하고, 그 이유를 간단히 적어보세요.',
        submissions: [
          {
            userId: '3',
            imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
            text: '오늘은 "평온함"이었어요. 아침에 일어나서 창문을 열었을 때 들어온 바람이 너무 시원해서 마음이 차분해졌습니다.',
            submittedAt: '2024-06-10T21:00:00Z',
            reactions: [
              {
                userId: '4',
                type: 'great-job',
                message: '정말 잘했어요!'
              }
            ]
          },
          {
            userId: '4',
            imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop',
            text: '오늘의 감정은 "설렘"이에요. 새로운 책을 읽기 시작했는데 주인공이 너무 매력적이라서 계속 읽고 싶어졌어요.',
            submittedAt: '2024-06-10T22:30:00Z',
            reactions: [
              {
                userId: '3',
                type: 'amazing',
                message: '정말 멋져요!'
              }
            ]
          }
        ]
      },
      {
        day: 2,
        title: '감정의 변화 관찰하기',
        description: '하루 동안 감정이 어떻게 변했는지 기록해보세요.',
        submissions: [
          {
            userId: '3',
            imageUrl: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=400&fit=crop',
            text: '아침엔 피곤했는데 친구와 통화하고 나니 기분이 좋아졌어요. 사람과의 연결이 이렇게 중요한 걸 느꼈습니다.',
            submittedAt: '2024-06-11T20:00:00Z',
            reactions: []
          }
        ]
      },
      {
        day: 3,
        title: '긍정적 감정 찾기',
        description: '오늘 하루 중 가장 긍정적이었던 순간의 감정을 기록해보세요.',
        submissions: [
          {
            userId: '5',
            imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop',
            text: '엄마가 해주신 저녁이 너무 맛있어서 행복했어요. 가족과 함께하는 시간이 얼마나 소중한지 다시 한번 느꼈습니다.',
            submittedAt: '2024-06-12T19:30:00Z',
            reactions: [
              {
                userId: '3',
                type: 'cheer-up',
                message: '응원해요!'
              }
            ]
          }
        ]
      }
    ],
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
    dailyMissions: [
      {
        day: 1,
        title: '첫 명상 시작하기',
        description: '10분간 조용한 곳에서 호흡에 집중하며 명상해보세요.',
        submissions: [
          {
            userId: '2',
            imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
            text: '처음엔 잡념이 많았지만 점점 마음이 차분해지는 걸 느꼈어요. 10분이 이렇게 짧게 느껴질 줄 몰랐네요.',
            submittedAt: '2024-06-15T07:00:00Z',
            reactions: [
              {
                userId: '3',
                type: 'great-job',
                message: '정말 잘했어요!'
              }
            ]
          },
          {
            userId: '6',
            imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop',
            text: '아침 일찍 일어나서 명상했더니 하루가 더 여유롭게 느껴졌어요. 이 기분 좋은 느낌이 계속되길 바라요.',
            submittedAt: '2024-06-15T07:30:00Z',
            reactions: []
          }
        ]
      },
      {
        day: 2,
        title: '감정 관찰 명상',
        description: '오늘의 감정을 있는 그대로 관찰하며 명상해보세요.',
        submissions: [
          {
            userId: '3',
            imageUrl: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=400&fit=crop',
            text: '스트레스받은 하루였는데 명상을 통해 그 감정을 객관적으로 바라볼 수 있었어요. 마음이 한결 가벼워졌습니다.',
            submittedAt: '2024-06-16T21:00:00Z',
            reactions: [
              {
                userId: '2',
                type: 'amazing',
                message: '정말 멋져요!'
              }
            ]
          }
        ]
      },
      {
        day: 3,
        title: '감사 명상',
        description: '오늘 감사한 일들을 떠올리며 명상해보세요.',
        submissions: [
          {
            userId: '2',
            imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop',
            text: '가족, 친구, 건강... 당연하게 여겼던 것들에 대해 감사하는 시간이었어요. 마음이 따뜻해졌습니다.',
            submittedAt: '2024-06-17T20:00:00Z',
            reactions: []
          },
          {
            userId: '6',
            imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop',
            text: '오늘 비가 와서 집에서 명상했는데 빗소리가 배경음이 되어 더 집중할 수 있었어요. 자연의 소리가 주는 평화로움을 느꼈어요.',
            submittedAt: '2024-06-17T19:00:00Z',
            reactions: [
              {
                userId: '2',
                type: 'keep-going',
                message: '계속 화이팅!'
              }
            ]
          }
        ]
      },
      {
        day: 4,
        title: '자애 명상',
        description: '자신과 타인에게 사랑과 자비를 보내는 명상을 해보세요.',
        submissions: [
          {
            userId: '3',
            imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=400&fit=crop',
            text: '자신을 사랑하는 게 이렇게 어려운 일인지 몰랐어요. 하지만 조금씩 나 자신에게 친절해지는 연습을 해보겠습니다.',
            submittedAt: '2024-06-18T18:30:00Z',
            reactions: [
              {
                userId: '6',
                type: 'cheer-up',
                message: '응원해요!'
              }
            ]
          }
        ]
      }
    ],
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
