
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onCreateChallenge?: () => void;
}

const Header = ({ onCreateChallenge }: HeaderProps) => {
  return (
    <header className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-white py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Day7</h1>
            <p className="text-pink-100">7일 동안 작지만 의미 있는 변화를 만들어보세요</p>
          </div>
          {onCreateChallenge && (
            <Button 
              onClick={onCreateChallenge}
              className="bg-white text-purple-600 hover:bg-pink-50 font-semibold px-6 py-2"
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
