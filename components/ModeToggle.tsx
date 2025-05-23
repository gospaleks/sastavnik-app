'use client';

import { useEffect, useState } from 'react';
import { MoonStar, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { DropdownMenuItem } from './ui/dropdown-menu';
import { Button } from './ui/button';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenuItem onClick={toggleTheme}>
      {theme === 'light' ? <MoonStar fill="currentColor" /> : <Sun />}
      Promena teme
    </DropdownMenuItem>
  );
}

export function ModeToggle2() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (!mounted) {
    return null;
  }

  return (
    <Button variant={'outline'} onClick={toggleTheme}>
      {theme === 'light' ? (
        <MoonStar fill="currentColor" className="opacity-80" />
      ) : (
        <Sun />
      )}
      <span className="sr-only">Promena teme</span>
    </Button>
  );
}
