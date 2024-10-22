import { Users } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users size={24} />
          <h1 className="text-2xl font-bold">Futsal Team Manager</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
