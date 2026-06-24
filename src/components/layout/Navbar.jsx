import { Menu, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getInitials, getGreeting } from '../../utils/formatters';

const Navbar = ({ title, onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 h-16">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-card-hover transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-heading-4 font-semibold text-text-primary">{title}</h2>
            <p className="text-caption text-text-muted hidden md:block">
              {getGreeting()}, {user?.name || user?.email || 'User'}
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Notifications (decorative) */}
          <button className="relative p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-card-hover transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
          </button>

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-caption font-bold text-accent cursor-default">
            {getInitials(user?.name || user?.email)}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
