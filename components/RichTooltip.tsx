import React, { useState } from 'react';

interface RichTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'bottom';
}

const RichTooltip: React.FC<RichTooltipProps> = ({ children, content, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div 
      className="tooltip-wrapper"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`rich-tooltip ${position}`}>
          {content}
        </div>
      )}
    </div>
  );
};

export default RichTooltip;