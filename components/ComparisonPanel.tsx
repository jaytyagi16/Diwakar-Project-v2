import React from 'react';
import { X, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import useCountUp from '../hooks/useCountUp';

interface ComparisonPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AnimatedStat = ({ value, prefix = '', suffix = '' }: { value: number, prefix?: string, suffix?: string }) => {
    const animatedValue = useCountUp(value, 1500);
    return <span>{prefix}{animatedValue.toLocaleString()}{suffix}</span>;
}

const ComparisonPanel: React.FC<ComparisonPanelProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[190] backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className={`fixed inset-y-0 right-0 w-full sm:w-[450px] bg-white dark:bg-gray-900 z-[200] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <div>
             <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              📊 Similar Claims
             </h3>
             <p className="text-xs text-gray-500 mt-1">AI matched 8 claims (Toyota, Front Collision)</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Stats */}
            <div className="space-y-6">
                
                {/* Processing Time */}
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Processing Time</h4>
                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-700 dark:text-gray-300">This Claim</span>
                                <span className="font-bold text-gray-900 dark:text-white"><AnimatedStat value={38} suffix=" min" /></span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-brand-500 w-[15%] rounded-full"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-500">Average</span>
                                <span className="font-medium text-gray-500">4.2 hrs</span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-gray-400 w-full rounded-full opacity-30"></div>
                            </div>
                        </div>
                        <div className="flex items-center text-green-600 dark:text-green-400 text-xs font-bold mt-2">
                            <TrendingDown size={14} className="mr-1" />
                            85% faster than average
                        </div>
                    </div>
                </div>

                {/* Settlement Amount */}
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Settlement Amount</h4>
                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-700 dark:text-gray-300">This Claim</span>
                                <span className="font-bold text-gray-900 dark:text-white"><AnimatedStat value={3160} prefix="$" /></span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[90%] rounded-full"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-500">Average</span>
                                <span className="font-medium text-gray-500">$3,400</span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-gray-400 w-[95%] rounded-full opacity-30"></div>
                            </div>
                        </div>
                         <div className="flex items-center text-green-600 dark:text-green-400 text-xs font-bold mt-2">
                            <TrendingDown size={14} className="mr-1" />
                            7% below average
                        </div>
                    </div>
                </div>

                 {/* Fraud Score */}
                 <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Fraud Score</h4>
                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-700 dark:text-gray-300">This Claim</span>
                                <span className="font-bold text-gray-900 dark:text-white"><AnimatedStat value={45} /></span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-orange-500 w-[45%] rounded-full"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-500">Average</span>
                                <span className="font-medium text-gray-500">32</span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-gray-400 w-[32%] rounded-full opacity-30"></div>
                            </div>
                        </div>
                        <div className="flex items-center text-orange-600 dark:text-orange-400 text-xs font-bold mt-2">
                            <TrendingUp size={14} className="mr-1" />
                            Slightly elevated risk
                        </div>
                    </div>
                </div>

            </div>

            {/* Table */}
            <div>
                 <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Top 5 Similar Matches</h4>
                 <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 dark:bg-gray-800 text-xs uppercase text-gray-500 font-semibold">
                            <tr>
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Payout</th>
                                <th className="px-4 py-3">Time</th>
                                <th className="px-4 py-3 text-right">Match</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
                            {[
                                { id: '#4521', payout: '$3,200', time: '3.1 hr', match: '94%' },
                                { id: '#4398', payout: '$3,650', time: '5.2 hr', match: '91%' },
                                { id: '#4287', payout: '$2,900', time: '2.8 hr', match: '89%' },
                                { id: '#4156', payout: '$3,800', time: '6.1 hr', match: '87%' },
                                { id: '#3992', payout: '$3,100', time: '4.5 hr', match: '85%' },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <td className="px-4 py-3 font-mono text-xs">{row.id}</td>
                                    <td className="px-4 py-3">{row.payout}</td>
                                    <td className="px-4 py-3">{row.time}</td>
                                    <td className="px-4 py-3 text-right font-bold text-green-600 dark:text-green-400">{row.match}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default ComparisonPanel;