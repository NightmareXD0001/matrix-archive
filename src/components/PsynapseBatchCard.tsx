
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { BatchData } from './BatchCard';

interface PsynapseBatchCardProps {
  batch: BatchData;
  isActive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const PsynapseBatchCard: React.FC<PsynapseBatchCardProps> = ({ batch, isActive = false, className, style }) => {
  return (
    <div 
      className={cn(
        'relative border border-matrix/30 bg-matrix-terminal/70 backdrop-blur-sm rounded-md overflow-hidden',
        'transition-all duration-300 group hover:border-purple-500/70 hover:shadow-purple-100',
        className
      )}
      style={style}
    >
      <Accordion type="single" defaultValue={isActive ? batch.year : undefined} collapsible>
        <AccordionItem value={batch.year} className="border-none">
          <AccordionTrigger className="p-4 hover:no-underline group flex justify-between">
            <h3 className="font-sans text-xl md:text-2xl text-purple-600 font-medium">
              Research Cohort {batch.year}
            </h3>
            <ChevronDown className="h-5 w-5 shrink-0 text-purple-500 transition-transform duration-300" />
          </AccordionTrigger>
          <AccordionContent className="pt-0 pb-4 px-4">
            <div className="space-y-4 font-sans">
              {batch.members.map((member, index) => (
                <div key={index} className="group/item">
                  <div className="text-purple-600 mb-1 font-semibold flex items-center">
                    <span className="inline-block h-px w-4 bg-purple-400 mr-2"></span>
                    {member.position}:
                  </div>
                  <div className="text-slate-700 pl-6 break-words">
                    {member.names.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="absolute inset-0 pointer-events-none border border-purple-200/50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
};

export default PsynapseBatchCard;
