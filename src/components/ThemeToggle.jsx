'use client'
import { Switch } from '@heroui/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';


const ThemeToggle = ({value}) => {
  const {theme,setTheme}=useTheme();
      
   const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

    const isDark = theme === 'dark';
    const handleToggle = ()=>{
      setTheme(isDark ? 'light' : 'dark')
    }
    return (
        <div>
             <Switch isSelected={isDark} onChange={handleToggle}  size="lg">
          {({isSelected}) => (
            <>
              <Switch.Control className={isSelected ? value.selectedControlClass : ""}>
                <Switch.Thumb>
                  <Switch.Icon>
                    {isSelected ? (
                      <value.on className="size-3 text-inherit opacity-100" />
                    ) : (
                      <value.off className="size-3 text-inherit opacity-70" />
                    )}
                  </Switch.Icon>
                </Switch.Thumb>
              </Switch.Control>
            </>
          )}
        </Switch>
        </div>
    );
};

export default ThemeToggle;