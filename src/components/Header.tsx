
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onCreateChallenge?: () => void;
}

const Header = ({ onCreateChallenge }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900">Day7</h1>
            <p className="text-gray-600">7일 동안 작지만 의미 있는 변화를 만들어보세요</p>
          </div>
          {onCreateChallenge && (
            <Button 
              onClick={onCreateChallenge}
              className="bg-blue-600 text-white hover:bg-blue-700 font-semibold px-6 py-2"
            >
              챌린지 만들기
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
