
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockChallenges, mockUsers, currentUserId, reactionTypes } from '../data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Upload, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ChallengeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [missionText, setMissionText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const challenge = mockChallenges.find(c => c.id === id);
  const currentUser = mockUsers.find(u => u.id === currentUserId);
  
  if (!challenge) {
    return <div>챌린지를 찾을 수 없습니다.</div>;
  }

  const currentDay = challenge.status === 'in-progress' ? 1 : 0;
  const progressPercentage = (currentDay / 7) * 100;

  const handleSubmitMission = () => {
    if (!missionText.trim()) {
      toast({
        title: "미션 인증을 작성해주세요",
        description: "한두 줄이라도 좋으니 오늘의 미션에 대해 적어보세요.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "미션 인증 완료!",
      description: "오늘의 미션을 성공적으로 인증했습니다. 팀원들이 응원해줄 거예요!",
    });
    
    setMissionText('');
    setSelectedImage(null);
  };

  const handleReaction = (submissionIndex: number, reactionType: string) => {
    toast({
      title: "응원을 보냈습니다!",
      description: "팀원에게 따뜻한 응원을 전했습니다.",
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartChallenge = () => {
    toast({
      title: "챌린지가 시작되었습니다!",
      description: "모든 참여자에게 문자 메시지로 알림을 보냈습니다.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <header className="bg-white shadow-sm py-4 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-800">{challenge.title}</h1>
            <p className="text-sm text-gray-600">{challenge.description}</p>
          </div>
          <Badge className={challenge.status === 'recruiting' ? 'bg-blue-100 text-blue-800' : 
                           challenge.status === 'in-progress' ? 'bg-green-100 text-green-800' : 
                           'bg-gray-100 text-gray-800'}>
            {challenge.status === 'recruiting' ? '모집중' : 
             challenge.status === 'in-progress' ? '진행중' : '완료'}
          </Badge>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* 7일 진행도 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>7일 챌린지 진행도</span>
              {challenge.status === 'recruiting' && challenge.hostId === currentUserId && (
                <Button onClick={handleStartChallenge} className="bg-green-600 hover:bg-green-700">
                  챌린지 시작하기
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={progressPercentage} className="w-full" />
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 7 }, (_, i) => (
                  <div key={i} className="text-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mx-auto mb-1 ${
                      i < currentDay ? 'bg-green-500 text-white' : 
                      i === currentDay ? 'bg-blue-500 text-white' : 
                      'bg-gray-200 text-gray-500'
                    }`}>
                      {i + 1}
                    </div>
                    <span className="text-xs text-gray-600">{i + 1}일차</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 팀원 현황 */}
        <Card>
          <CardHeader>
            <CardTitle>함께하는 친구들 ({challenge.participants.length}명)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {challenge.participants.map((participant) => (
                <div key={participant.id} className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback>{participant.profileImage}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{participant.name}</span>
                  {participant.id === challenge.hostId && (
                    <Badge variant="outline" className="text-xs">방장</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 오늘의 미션 */}
        {challenge.status === 'in-progress' && challenge.dailyMissions[currentDay] && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-purple-700">
                오늘의 미션 ({currentDay + 1}일차)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {challenge.dailyMissions[currentDay].title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {challenge.dailyMissions[currentDay].description}
                </p>
              </div>

              <div className="space-y-4 p-4 bg-pink-50 rounded-lg">
                <h4 className="font-medium text-gray-800">미션 인증하기</h4>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      사진 업로드 (선택사항)
                    </label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="flex-1"
                      />
                      <Upload size={20} className="text-gray-400" />
                    </div>
                    {selectedImage && (
                      <img src={selectedImage} alt="미션 인증" className="mt-2 w-32 h-32 object-cover rounded-lg" />
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      한두 줄 소감
                    </label>
                    <Textarea
                      placeholder="오늘의 미션에 대한 소감을 한두 줄로 적어보세요..."
                      value={missionText}
                      onChange={(e) => setMissionText(e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleSubmitMission}
                    className="w-full bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600"
                  >
                    <Send size={16} className="mr-2" />
                    미션 인증하기
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 팀원들의 미션 인증 */}
        {challenge.status === 'in-progress' && challenge.dailyMissions[currentDay]?.submissions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>팀원들의 미션 인증</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {challenge.dailyMissions[currentDay].submissions.map((submission, index) => {
                const user = mockUsers.find(u => u.id === submission.userId);
                return (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{user?.profileImage}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(submission.submittedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    {submission.imageUrl && (
                      <img 
                        src={submission.imageUrl} 
                        alt="미션 인증" 
                        className="w-full max-w-sm rounded-lg object-cover"
                      />
                    )}
                    
                    <p className="text-gray-700">{submission.text}</p>
                    
                    <div className="flex flex-wrap gap-2 pt-2 border-t">
                      {reactionTypes.map((reaction) => (
                        <Button
                          key={reaction.id}
                          variant="outline"
                          size="sm"
                          onClick={() => handleReaction(index, reaction.id)}
                          className="text-xs hover:bg-pink-50 hover:border-pink-200"
                        >
                          {reaction.emoji} {reaction.label}
                        </Button>
                      ))}
                    </div>
                    
                    {submission.reactions.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {submission.reactions.map((reaction, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {reactionTypes.find(r => r.id === reaction.type)?.emoji} {reaction.message}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default ChallengeDetail;
