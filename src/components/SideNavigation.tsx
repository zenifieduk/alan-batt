'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  TrendingUp, 
  FileText, 
  BarChart3, 
  Bot, 
  Mail, 
  Search, 
  Download,
  Code,
  Sparkles,
  Menu
} from 'lucide-react';
import { useSidebar } from './SidebarProvider';

export default function SideNavigation() {
  const pathname = usePathname();
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/markets', label: 'Markets', icon: TrendingUp },
    { href: '/content', label: 'Content', icon: FileText },
    { href: '/reports', label: 'Reports', icon: BarChart3 },
    { href: '/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/emails', label: 'Newsletters', icon: Mail },
    { href: '/ai', label: 'AI Chat', icon: Bot },
    { href: '/seo', label: 'SEO', icon: Search },
    { href: '/downloads', label: 'Downloads', icon: Download },
    { href: '/new-dev', label: 'New Dev', icon: Code },
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [setIsCollapsed]);

  // Update main content margin when sidebar state changes
  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent && !isMobile) {
      mainContent.style.marginLeft = isCollapsed ? '4rem' : '16rem';
    } else if (mainContent && isMobile) {
      mainContent.style.marginLeft = '0';
    }
  }, [isCollapsed, isMobile]);

  // Mobile menu button
  if (isMobile) {
    return (
      <>
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="fixed top-4 left-4 z-50 bg-blue-900 text-white p-2 rounded-lg shadow-lg md:hidden"
          aria-label="Open mobile menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={toggleMobileMenu}
            />
            <div className="fixed inset-y-0 left-0 w-64 bg-blue-900 text-white shadow-xl">
              {/* Header */}
              <div className="p-4 border-b border-blue-800">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-blue-700 rounded-lg flex items-center justify-center">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">Alan Batt</div>
                    <div className="text-xs text-blue-200">Dashboard</div>
                  </div>
                </div>
              </div>

              {/* Navigation Items */}
              <nav className="p-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={toggleMobileMenu}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-800 text-white'
                          : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                      }`}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-xs text-blue-300 text-center">
                  <p>Magicalogical</p>
                  <p>Innovation Hub</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop sidebar
  return (
    <div className={`fixed left-0 top-0 h-full bg-blue-900 text-white transition-all duration-300 ease-in-out z-40 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Toggle Button */}
      <button
        onClick={toggleCollapse}
        className="absolute -right-3 top-6 bg-blue-900 text-white p-1 rounded-full shadow-lg hover:bg-blue-800 transition-colors"
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>

      {/* Header */}
      <div className="p-4 border-b border-blue-800">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-5 w-5" />
          </div>
          {!isCollapsed && (
            <div>
              <div className="font-bold text-lg">Alan Batt</div>
              <div className="text-xs text-blue-200">Dashboard</div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-800 text-white'
                  : 'text-blue-100 hover:bg-blue-800 hover:text-white'
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-xs text-blue-300 text-center">
            <p>Magicalogical</p>
            <p>Innovation Hub</p>
          </div>
        </div>
      )}
    </div>
  );
}
