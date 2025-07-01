
import { Challenge } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Calendar } from 'lucide-react';

interface ChallengeCardProps {
  challenge: Challenge;
  onJoin?: (challengeId: string) => void;
  onView?: (challengeId: string) => void;
}

const ChallengeCard = ({ challenge, onJoin, onView }: ChallengeCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recruiting':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'in-progress':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'recruiting':
        return '모집중';
      case 'in-progress':
        return '진행중';
      case 'completed':
        return '완료';
      default:
        return '알 수 없음';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-pink-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-gray-800 leading-tight">
            {challenge.title}
          </CardTitle>
          <Badge className={getStatusColor(challenge.status)}>
            {getStatusText(challenge.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600 text-sm leading-relaxed">
          {challenge.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{challenge.currentParticipants}/{challenge.targetParticipants}명</span>
          </div>
          {challenge.startDate && (
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>{new Date(challenge.startDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {challenge.status === 'recruiting' && onJoin && (
            <Button 
              onClick={() => onJoin(challenge.id)}
              className="flex-1 bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white"
            >
              참여하기
            </Button>
          )}
          <Button 
            variant="outline" 
            onClick={() => onView?.(challenge.id)}
            className="flex-1 border-pink-200 text-pink-600 hover:bg-pink-50"
          >
            자세히 보기
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChallengeCard;
