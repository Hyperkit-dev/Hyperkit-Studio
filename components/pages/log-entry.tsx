import React from 'react';
import { Globe } from 'lucide-react';

export type LogLevel = 'ERROR' | 'WARN' | 'INFO';

export interface LogEntryProps {
  timestamp: string;
  level: LogLevel;
  source: string;
  message: string;
  network: string;
  networkIcon?: 'globe' | 'ethereum';
  isSelected?: boolean;
  onClick?: () => void;
}

export const LogEntry: React.FC<LogEntryProps> = ({
  timestamp,
  level,
  source,
  message,
  network,
  networkIcon = 'globe',
  isSelected = false,
  onClick
}) => {
  const getLevelStyles = () => {
    switch (level) {
      case 'ERROR':
        return {
          badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
          text: 'text-rose-200'
        };
      case 'WARN':
        return {
          badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          text: 'text-[#D4D4D8]'
        };
      case 'INFO':
        return {
          badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
          text: 'text-[#D4D4D8]'
        };
      default:
        return {
          badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
          text: 'text-[#D4D4D8]'
        };
    }
  };

  const styles = getLevelStyles();

  return (
    <div 
      className={`flex items-center px-4 py-2.5 border-b border-[#1F1F22] log-row cursor-pointer hover:bg-[#101322] transition-colors relative ${
        isSelected ? 'log-row-selected' : ''
      }`}
      onClick={onClick}
    >
      <div className="w-36 text-[#71717A] shrink-0">{timestamp}</div>
      <div className="w-20 shrink-0">
        <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border ${styles.badge}`}>
          {level}
        </span>
      </div>
      <div className="w-40 text-[#D4D4D8] shrink-0 truncate pr-2">{source}</div>
      <div className={`flex-1 ${styles.text} truncate pr-4`}>{message}</div>
      <div className="w-32 text-right pr-4 shrink-0 flex justify-end">
        <div className="flex items-center gap-1.5 bg-[#1F1F22] px-2 py-0.5 rounded text-[10px] text-[#A1A1AA]">
          {networkIcon === 'ethereum' ? (
            <img 
              src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=026" 
              className="w-3 h-3 opacity-70" 
              alt="ETH"
            />
          ) : (
            <Globe className="w-3 h-3" />
          )}
          {network}
        </div>
      </div>
    </div>
  );
};