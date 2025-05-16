
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { BatchData } from './BatchCard';
import { useDarkMode } from '@/hooks/useDarkMode';

interface EcommBatchCardProps {
  batch: BatchData;
  isActive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const EcommBatchCard: React.FC<EcommBatchCardProps> = ({ batch, isActive = false, className, style }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div 
      className={cn(
        'relative border rounded-md overflow-hidden shadow-lg',
        'transition-all duration-300 group',
        isDarkMode 
          ? 'border-blue-600/30 bg-blue-900/50 backdrop-blur-sm hover:border-blue-500/70 hover:shadow-blue-900/30' 
          : 'border-blue-300/30 bg-white/90 backdrop-blur-sm hover:border-blue-500/70 hover:shadow-blue-100',
        className
      )}
      style={style}
    >
      <Accordion type="single" defaultValue={isActive ? batch.year : undefined} collapsible>
        <AccordionItem value={batch.year} className="border-none">
          <AccordionTrigger className="p-4 hover:no-underline group flex justify-between">
            <h3 className={`font-sans text-xl md:text-2xl ${isDarkMode ? 'text-blue-300' : 'text-blue-600'} font-medium`}>
              Fiscal Year {batch.year}
            </h3>
            <ChevronDown className={`h-5 w-5 shrink-0 ${isDarkMode ? 'text-blue-300' : 'text-blue-500'} transition-transform duration-300`} />
          </AccordionTrigger>
          <AccordionContent className="pt-0 pb-4 px-4">
            <div className="space-y-4 font-sans">
              {batch.members.map((member, index) => (
                <div key={index} className="group/item">
                  <div className={`${isDarkMode ? 'text-blue-300' : 'text-blue-600'} mb-1 font-semibold flex items-center`}>
                    <span className={`inline-block h-px w-4 ${isDarkMode ? 'bg-blue-300' : 'bg-blue-400'} mr-2`}></span>
                    {member.position}:
                  </div>
                  <div className={`${isDarkMode ? 'text-blue-100' : 'text-slate-700'} pl-6 break-words`}>
                    {member.names.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className={`absolute inset-0 pointer-events-none border ${isDarkMode ? 'border-blue-700/50' : 'border-blue-200/50'} rounded-md opacity-0 group-hover:opacity-100 transition-opacity`}></div>
    </div>
  );
};

export default EcommBatchCard;
