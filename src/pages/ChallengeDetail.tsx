import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockChallenges, mockUsers, currentUserId, reactionTypes } from '../data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Upload, Send, Camera, Calendar, Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ChallengeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [missionText, setMissionText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const challenge = mockChallenges.find(c => c.id === id);
  const currentUser = mockUsers.find(u => u.id === currentUserId);
  
  if (!challenge) {
    return <div>챌린지를 찾을 수 없습니다.</div>;
  }

  // 상태에 따른 진행도 계산
  const getProgressInfo = () => {
    if (challenge.status === 'completed') {
      return { currentDay: 6, progressPercentage: 100 };
    } else if (challenge.status === 'in-progress') {
      return { currentDay: 6, progressPercentage: (7 / 7) * 100 };
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

  // 내 미션 인증 여부 확인
  const getMySubmissionStatus = (dayIndex: number) => {
    if (challenge.status !== 'in-progress' && challenge.status !== 'completed') {
      return false;
    }
    
    const mission = challenge.dailyMissions[dayIndex];
    if (!mission) return false;
    
    return mission.submissions.some(sub => sub.userId === currentUserId);
  };

  // 내 미션 인증 데이터 가져오기
  const getMySubmissions = () => {
    const mySubmissions: Array<{day: number, submission: any}> = [];
    
    challenge.dailyMissions.forEach((mission, index) => {
      const mySubmission = mission.submissions.find(sub => sub.userId === currentUserId);
      if (mySubmission) {
        mySubmissions.push({ day: index + 1, submission: mySubmission });
      }
    });
    
    return mySubmissions;
  };

  // 일차별 버튼 상태 및 색상 결정
  const getDayButtonStyle = (dayIndex: number) => {
    const { completed, total } = getMissionSuccessCount(dayIndex);
    const isToday = dayIndex === currentDay && challenge.status === 'in-progress';
    
    if (dayIndex > currentDay) {
      // 1. 비활성화 상태
      return {
        bg: 'bg-gray-100',
        text: 'text-gray-400',
        border: ''
      };
    } else if (completed === 0) {
      // 2. 아무도 미션 성공 못함
      return {
        bg: 'bg-orange-100',
        text: 'text-orange-600',
        border: isToday ? 'ring-2 ring-orange-400' : ''
      };
    } else if (completed > 0 && completed < total) {
      // 3. 참여자 일부 미션 성공
      return {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        border: isToday ? 'ring-2 ring-blue-400' : ''
      };
    } else if (completed === total) {
      // 4. 전원 미션 성공
      return {
        bg: 'bg-green-500',
        text: 'text-white',
        border: isToday ? 'ring-2 ring-green-400' : ''
      };
    } else {
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
      setSelectedDay(dayIndex);
      setIsModalOpen(true);
    }
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEndDate = () => {
    if (challenge.endDate) return challenge.endDate;
    if (challenge.startDate) {
      const start = new Date(challenge.startDate);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return end.toISOString().split('T')[0];
    }
    return '';
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
        {/* 챌린지 정보 */}
        <Card className="border border-gray-100 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
              <Calendar size={20} className="text-blue-600" />
              챌린지 정보
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">시작일</p>
                  <p className="font-semibold text-gray-900">
                    {challenge.startDate ? formatDate(challenge.startDate) : '미정'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Calendar size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">종료일</p>
                  <p className="font-semibold text-gray-900">
                    {getEndDate() ? formatDate(getEndDate()) : '미정'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 7일 챌린지 진행도 */}
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
            <div className="space-y-6">
              <div className="relative">
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden relative">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-green-500 transition-all duration-1000 ease-out rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  />
                  <div className="absolute inset-0 flex justify-between items-center px-2">
                    {Array.from({ length: 7 }, (_, i) => {
                      const { completed, total } = getMissionSuccessCount(i);
                      const buttonStyle = getDayButtonStyle(i);
                      const isClickable = i <= currentDay || challenge.status === 'completed';
                      const leftPosition = (i / 6) * 100;
                      
                      return (
                        <div 
                          key={i} 
                          className="absolute transform -translate-x-1/2"
                          style={{ left: `${leftPosition}%` }}
                        >
                          <button
                            onClick={() => handleDayClick(i)}
                            disabled={!isClickable}
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                              buttonStyle.bg
                            } ${buttonStyle.text} ${buttonStyle.border} ${
                              isClickable ? 'hover:scale-110 cursor-pointer shadow-lg' : 'cursor-not-allowed'
                            }`}
                          >
                            {i + 1}
                          </button>
                          <div className="text-center mt-2">
                            <span className="text-xs text-gray-500">
                              {challenge.status === 'recruiting' ? `${i + 1}일차` : `(${completed}/${total})`}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 나의 진행도 */}
        {(challenge.status === 'in-progress' || challenge.status === 'completed') && (
          <Card className="border border-gray-100 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                <Users size={20} className="text-purple-600" />
                나의 진행도
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 7 }, (_, i) => {
                    const hasSubmitted = getMySubmissionStatus(i);
                    const isToday = i === currentDay && challenge.status === 'in-progress';
                    
                    return (
                      <div key={i} className="text-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold mx-auto mb-2 ${
                            hasSubmitted 
                              ? 'bg-purple-500 text-white' 
                              : i <= currentDay 
                                ? 'bg-purple-100 text-purple-600' 
                                : 'bg-gray-100 text-gray-400'
                          } ${isToday ? 'ring-2 ring-purple-400' : ''}`}
                        >
                          {hasSubmitted ? '✓' : i + 1}
                        </div>
                        <span className="text-xs text-gray-500">{i + 1}일차</span>
                      </div>
                    );
                  })}
                </div>
                
                {/* 나의 미션 인증 목록 */}
                {getMySubmissions().length > 0 && (
                  <div className="mt-6 space-y-4">
                    <h4 className="font-semibold text-gray-900">나의 미션 인증</h4>
                    {getMySubmissions().map(({ day, submission }, index) => (
                      <div key={index} className="border border-gray-100 rounded-lg p-4 bg-purple-50">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-purple-600 border-purple-200">
                            {day}일차
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {new Date(submission.submittedAt).toLocaleString('ko-KR', {
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        {submission.imageUrl && (
                          <img 
                            src={submission.imageUrl} 
                            alt={`${day}일차 미션`}
                            className="w-full max-w-sm rounded-lg object-cover mb-3 border border-gray-200"
                          />
                        )}
                        <p className="text-gray-700 bg-white p-3 rounded-lg">{submission.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 함께하는 친구들 */}
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

        {/* 진행중 챌린지: 오늘의 미션 인증하기 */}
        {challenge.status === 'in-progress' && 
         challenge.dailyMissions[currentDay] && 
         !getMySubmissionStatus(currentDay) && (
          <Card className="border border-gray-100 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-blue-600">
                오늘의 미션 인증하기 ({currentDay + 1}일차)
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

      </main>

      {/* 일차별 미션 인증 모달 */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {selectedDay !== null ? `${selectedDay + 1}일차 미션 인증` : '미션 인증'}
            </DialogTitle>
          </DialogHeader>
          
          {selectedDay !== null && challenge.dailyMissions[selectedDay] && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {challenge.dailyMissions[selectedDay].title}
                </h3>
                <p className="text-gray-700 text-sm">
                  {challenge.dailyMissions[selectedDay].description}
                </p>
              </div>

              <Tabs defaultValue={challenge.participants[0]?.id} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  {challenge.participants.map((participant) => (
                    <TabsTrigger key={participant.id} value={participant.id} className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">{participant.profileImage}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{participant.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {challenge.participants.map((participant) => {
                  const submission = challenge.dailyMissions[selectedDay]?.submissions.find(
                    sub => sub.userId === participant.id
                  );

                  return (
                    <TabsContent key={participant.id} value={participant.id} className="mt-4">
                      <div className="space-y-4">
                        {submission ? (
                          <div className="border border-gray-100 rounded-lg p-5 space-y-4 bg-white">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10">
                                <AvatarFallback className="text-lg">{participant.profileImage}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold text-gray-900">{participant.name}</p>
                                <p className="text-sm text-gray-500">
                                  {new Date(submission.submittedAt).toLocaleString('ko-KR', {
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </p>
                              </div>
                              <Badge className="ml-auto bg-green-100 text-green-700">인증 완료</Badge>
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
                                  onClick={() => handleReaction(0, reaction.id)}
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
                        ) : (
                          <div className="border border-gray-200 rounded-lg p-8 text-center bg-gray-50">
                            <div className="flex flex-col items-center gap-3">
                              <Avatar className="w-16 h-16">
                                <AvatarFallback className="text-2xl">{participant.profileImage}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold text-gray-900">{participant.name}</p>
                                <Badge variant="outline" className="mt-2 text-orange-600 border-orange-200">
                                  미인증
                                </Badge>
                              </div>
                              <p className="text-gray-500 text-sm mt-2">아직 미션을 인증하지 않았습니다.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  );
                })}
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChallengeDetail;
