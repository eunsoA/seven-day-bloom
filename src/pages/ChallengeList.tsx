
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockChallenges } from '../data/mockData';
import ChallengeCard from '../components/ChallengeCard';
import Header from '../components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

const ChallengeList = () => {
  const navigate = useNavigate();
  const [challenges] = useState(mockChallenges);

  const handleJoinChallenge = (challengeId: string) => {
    toast({
      title: "챌린지 참여 완료!",
      description: "새로운 챌린지에 참여하셨습니다. 함께 성장해요!",
    });
  };

  const handleViewChallenge = (challengeId: string) => {
    navigate(`/challenge/${challengeId}`);
  };

  const handleCreateChallenge = () => {
    navigate('/create-challenge');
  };

  const recruitingChallenges = challenges.filter(c => c.status === 'recruiting');
  const inProgressChallenges = challenges.filter(c => c.status === 'in-progress');
  const completedChallenges = challenges.filter(c => c.status === 'completed');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCreateChallenge={handleCreateChallenge} />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="recruiting" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white border border-gray-200">
            <TabsTrigger value="recruiting" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              모집중 ({recruitingChallenges.length})
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
              진행중 ({inProgressChallenges.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-gray-50 data-[state=active]:text-gray-700">
              완료 ({completedChallenges.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recruiting" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recruitingChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onJoin={handleJoinChallenge}
                  onView={handleViewChallenge}
                />
              ))}
            </div>
            {recruitingChallenges.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p>현재 모집 중인 챌린지가 없습니다.</p>
                <p className="mt-2">새로운 챌린지를 만들어보세요!</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="in-progress" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProgressChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onView={handleViewChallenge}
                />
              ))}
            </div>
            {inProgressChallenges.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p>현재 진행 중인 챌린지가 없습니다.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onView={handleViewChallenge}
                />
              ))}
            </div>
            {completedChallenges.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p>완료된 챌린지가 없습니다.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ChallengeList;
