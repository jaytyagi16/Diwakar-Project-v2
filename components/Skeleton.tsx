import React from 'react';

interface SkeletonProps {
  width?: string;
  height?: string;
  rounded?: string;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  width = '100%', 
  height = '20px', 
  rounded = '0.25rem',
  className = ''
}) => {
  return (
    <div 
      className={`skeleton ${className}`}
      style={{ width, height, borderRadius: rounded }}
    />
  );
};

export const CardSkeleton: React.FC = () => (
  <div className="flex flex-col gap-3 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
    <Skeleton width="60%" height="16px" />
    <Skeleton width="40%" height="32px" />
    <Skeleton width="80%" height="14px" />
    <div className="mt-2">
      <Skeleton width="100%" height="8px" rounded="4px" />
    </div>
  </div>
);

export default Skeleton;