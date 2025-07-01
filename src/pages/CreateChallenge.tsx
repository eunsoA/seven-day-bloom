
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const CreateChallenge = () => {
  const navigate = useNavigate();
  const [challengeTitle, setChallengeTitle] = useState('');
  const [challengeDescription, setChallengeDescription] = useState('');
  const [targetParticipants, setTargetParticipants] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!challengeTitle.trim() || !challengeDescription.trim() || !targetParticipants) {
      toast({
        title: "모든 필드를 채워주세요",
        description: "챌린지 제목, 설명, 목표 인원을 모두 입력해주세요.",
        variant: "destructive"
      });
      return;
    }

    const participantCount = parseInt(targetParticipants);
    if (participantCount < 3 || participantCount > 7) {
      toast({
        title: "목표 인원 오류",
        description: "목표 인원은 3명 이상 7명 이하로 설정해주세요.",
        variant: "destructive"
      });
      return;
    }

    // 실제로는 여기서 API 호출을 통해 챌린지를 생성
    toast({
      title: "챌린지가 생성되었습니다!",
      description: "새로운 챌린지가 성공적으로 만들어졌습니다. 곧 참여자들이 모일 거예요!",
    });

    // 챌린지 목록으로 이동
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <header className="bg-white shadow-sm py-4 px-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-semibold text-gray-800">새 챌린지 만들기</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              7일 챌린지 만들기
            </CardTitle>
            <p className="text-center text-gray-600 mt-2">
              함께 성장할 팀원들과 의미 있는 7일을 만들어보세요
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                  챌린지 제목 *
                </Label>
                <Input
                  id="title"
                  placeholder="예: 매일 감사 일기 쓰기, 10분 산책하기 등"
                  value={challengeTitle}
                  onChange={(e) => setChallengeTitle(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  상세 목표 *
                </Label>
                <Textarea
                  id="description"
                  placeholder="이 챌린지를 통해 무엇을 달성하고 싶나요? 팀원들에게 어떤 경험을 선사하고 싶은지 구체적으로 적어보세요."
                  value={challengeDescription}
                  onChange={(e) => setChallengeDescription(e.target.value)}
                  className="min-h-[120px] w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="participants" className="text-sm font-medium text-gray-700">
                  목표 인원 *
                </Label>
                <Select value={targetParticipants} onValueChange={setTargetParticipants}>
                  <SelectTrigger>
                    <SelectValue placeholder="함께할 팀원 수를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3명 (소규모 친밀한 팀)</SelectItem>
                    <SelectItem value="4">4명 (편안한 규모)</SelectItem>
                    <SelectItem value="5">5명 (적당한 규모)</SelectItem>
                    <SelectItem value="6">6명 (활발한 소통)</SelectItem>
                    <SelectItem value="7">7명 (다양한 응원)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">
                  * 최소 3명부터 최대 7명까지 설정 가능합니다
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">💡 챌린지 운영 팁</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 너무 큰 목표보다는 작고 달성 가능한 목표로 시작하세요</li>
                  <li>• 매일 인증할 수 있는 구체적인 행동을 제시해보세요</li>
                  <li>• 팀원들끼리 서로 응원할 수 있는 분위기를 만들어보세요</li>
                </ul>
              </div>

              <div className="flex gap-3 pt-6">
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={() => navigate(-1)}
                  className="flex-1"
                >
                  취소
                </Button>
                <Button 
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600"
                >
                  챌린지 만들기
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CreateChallenge;
