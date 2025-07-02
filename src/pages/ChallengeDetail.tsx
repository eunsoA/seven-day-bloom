
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
import { ArrowLeft, Upload, Send, Camera } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ChallengeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [missionText, setMissionText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  
  const challenge = mockChallenges.find(c => c.id === id);
  const currentUser = mockUsers.find(u => u.id === currentUserId);
  
  if (!challenge) {
    return <div>챌린지를 찾을 수 없습니다.</div>;
  }

  // 상태에 따른 진행도 계산
  const getProgressInfo = () => {
    if (challenge.status === 'completed') {
      return { currentDay: 7, progressPercentage: 100 };
    } else if (challenge.status === 'in-progress') {
      return { currentDay: 1, progressPercentage: (2 / 7) * 100 };
    } else {
      return { currentDay: 0, progressPercentage: 0 };
    }
  };

  const { currentDay, progressPercentage } = getProgressInfo();

  // 각 일차별 미션 성공 인원 계산
  const getMissionSuccessCount = (dayIndex: number) => {
    if (challenge.status !== 'in-progress' && challenge.status !== 'completed') {
      return { completed: 0, total: challenge.participants.length };
    }
    
    const mission = challenge.dailyMissions[dayIndex];
    if (!mission) {
      return { completed: 0, total: challenge.participants.length };
    }
    
    return {
      completed: mission.submissions.length,
      total: challenge.participants.length
    };
  };

  // 일차별 버튼 상태 및 색상 결정
  const getDayButtonStyle = (dayIndex: number) => {
    const { completed, total } = getMissionSuccessCount(dayIndex);
    const isToday = dayIndex === currentDay && challenge.status === 'in-progress';
    
    if (dayIndex > currentDay) {
      // 1. 아직 활성화되지 않은 상태
      return {
        bg: 'bg-gray-100',
        text: 'text-gray-400',
        border: ''
      };
    } else if (isToday && completed === 0) {
      // 2. 오늘이 해당 요일이지만 아무도 인증하지 않은 상태
      return {
        bg: 'bg-orange-100',
        text: 'text-orange-600',
        border: 'ring-2 ring-orange-400'
      };
    } else if (isToday && completed > 0 && completed < total) {
      // 3. 오늘이 해당 요일이고, 일부가 인증한 상태
      return {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        border: 'ring-2 ring-blue-400'
      };
    } else if (isToday && completed === total) {
      // 4. 오늘이 해당 요일이고, 전부 인증 완료한 상태
      return {
        bg: 'bg-green-100',
        text: 'text-green-600',
        border: 'ring-2 ring-green-400'
      };
    } else if (dayIndex < currentDay) {
      // 완료된 일차
      return {
        bg: 'bg-green-600',
        text: 'text-white',
        border: ''
      };
    } else {
      // 기본 상태
      return {
        bg: 'bg-gray-100',
        text: 'text-gray-400',
        border: ''
      };
    }
  };

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

  const handleDayClick = (dayIndex: number) => {
    if (dayIndex <= currentDay || challenge.status === 'completed') {
      setSelectedDay(selectedDay === dayIndex ? null : dayIndex);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white py-4 px-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">{challenge.title}</h1>
            <p className="text-sm text-gray-600 mt-1">{challenge.description}</p>
          </div>
          <Badge className={challenge.status === 'recruiting' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                           challenge.status === 'in-progress' ? 'bg-green-50 text-green-600 border-green-100' : 
                           'bg-gray-50 text-gray-600 border-gray-100'}>
            {challenge.status === 'recruiting' ? '모집중' : 
             challenge.status === 'in-progress' ? '진행중' : '완료'}
          </Badge>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* 7일 진행도 */}
        <Card className="border border-gray-100 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between text-lg">
              <span className="text-gray-900">7일 챌린지 진행도</span>
              {challenge.status === 'recruiting' && challenge.hostId === currentUserId && (
                <Button onClick={handleStartChallenge} className="bg-blue-600 hover:bg-blue-700 text-white">
                  챌린지 시작하기
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div className="relative">
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-green-500 transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 7 }, (_, i) => {
                  const { completed, total } = getMissionSuccessCount(i);
                  const buttonStyle = getDayButtonStyle(i);
                  const isClickable = i <= currentDay || challenge.status === 'completed';
                  
                  return (
                    <div key={i} className="text-center">
                      <button
                        onClick={() => handleDayClick(i)}
                        disabled={!isClickable}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold mx-auto mb-2 transition-all duration-200 ${
                          buttonStyle.bg
                        } ${buttonStyle.text} ${buttonStyle.border} ${
                          isClickable ? 'hover:scale-105 cursor-pointer' : 'cursor-not-allowed'
                        } ${selectedDay === i ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                      >
                        {i + 1}
                      </button>
                      <span className="text-xs text-gray-500">
                        {challenge.status === 'recruiting' ? `${i + 1}일차` : `(${completed}/${total})`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 팀원 현황 */}
        <Card className="border border-gray-100 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-gray-900">함께하는 친구들 ({challenge.participants.length}명)</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-3">
              {challenge.participants.map((participant) => (
                <div key={participant.id} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                  <Avatar className="w-7 h-7">
                    <AvatarFallback className="text-sm">{participant.profileImage}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-900">{participant.name}</span>
                  {participant.id === challenge.hostId && (
                    <Badge variant="outline" className="text-xs text-blue-600 border-blue-200">방장</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 진행중 챌린지: 오늘의 미션 */}
        {challenge.status === 'in-progress' && challenge.dailyMissions[currentDay] && (
          <Card className="border border-gray-100 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-blue-600">
                오늘의 미션 ({currentDay + 1}일차)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {challenge.dailyMissions[currentDay].title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {challenge.dailyMissions[currentDay].description}
                </p>
              </div>

              <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <Camera size={20} className="text-blue-600" />
                  <h4 className="font-semibold text-gray-900">미션 인증하기</h4>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      사진 업로드
                    </label>
                    <div className="flex items-center gap-3">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="flex-1 border-gray-200 bg-white"
                      />
                      <Upload size={18} className="text-gray-400" />
                    </div>
                    {selectedImage && (
                      <div className="mt-3">
                        <img 
                          src={selectedImage} 
                          alt="미션 인증" 
                          className="w-40 h-40 object-cover rounded-lg border border-gray-200" 
                        />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      미션 소감
                    </label>
                    <Textarea
                      placeholder="오늘의 미션에 대한 소감을 간단히 적어보세요..."
                      value={missionText}
                      onChange={(e) => setMissionText(e.target.value)}
                      className="min-h-[100px] border-gray-200 bg-white resize-none"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleSubmitMission}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
                  >
                    <Send size={16} className="mr-2" />
                    미션 인증하기
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 선택된 일차의 미션 인증 보기 */}
        {selectedDay !== null && (challenge.status === 'in-progress' || challenge.status === 'completed') && (
          <>
            {(() => {
              const mission = challenge.dailyMissions[selectedDay];
              if (!mission || mission.submissions.length === 0) return null;
              
              return (
                <Card className="border border-gray-100 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg text-gray-900">
                      {selectedDay + 1}일차 미션 인증 ({mission.submissions.length}명 완료)
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{mission.title}</p>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-6">
                    {mission.submissions.map((submission, index) => {
                      const user = mockUsers.find(u => u.id === submission.userId);
                      return (
                        <div key={index} className="border border-gray-100 rounded-lg p-5 space-y-4 bg-white">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="text-lg">{user?.profileImage}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-gray-900">{user?.name}</p>
                              <p className="text-sm text-gray-500">
                                {new Date(submission.submittedAt).toLocaleString('ko-KR', {
                                  month: 'long',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                          </div>
                          
                          {submission.imageUrl && (
                            <div className="rounded-lg overflow-hidden">
                              <img 
                                src={submission.imageUrl} 
                                alt="미션 인증" 
                                className="w-full max-w-md rounded-lg object-cover border border-gray-100"
                              />
                            </div>
                          )}
                          
                          <p className="text-gray-800 leading-relaxed bg-gray-50 p-3 rounded-lg">{submission.text}</p>
                          
                          <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
                            {reactionTypes.map((reaction) => (
                              <Button
                                key={reaction.id}
                                variant="outline"
                                size="sm"
                                onClick={() => handleReaction(index, reaction.id)}
                                className="text-sm hover:bg-blue-50 hover:border-blue-200 border-gray-200 text-gray-700"
                              >
                                {reaction.emoji} {reaction.label}
                              </Button>
                            ))}
                          </div>
                          
                          {submission.reactions.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {submission.reactions.map((reaction, i) => (
                                <Badge key={i} variant="secondary" className="text-sm bg-blue-50 text-blue-700 border-blue-100">
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
              );
            })()}
          </>
        )}
      </main>
    </div>
  );
};

export default ChallengeDetail;
