import React, { useEffect, useRef, useState } from 'react'
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from 'react-icons/lu'
import AIResponsePreview from '../../pages/InterviewPrep/components/AIResponsePreview'

const QuestionCard = ({ question, answer, onLearnMore, isPinned, onTogglePin }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [height, setHeight] = useState(0)
  const contentRef = useRef(null)

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight
      setHeight(contentHeight + 10)
    } else {
      setHeight(0)
    }
  }, [isExpanded, answer])

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-cyan-50 rounded-xl mb-4 overflow-hidden py-4 px-5 shadow-lg shadow-indigo-100/50 border border-gray-100 hover:shadow-indigo-200 transition-all duration-300">
      <div className="flex items-start justify-between cursor-pointer">
        <div className="flex items-start gap-3.5">
          <span className="text-xs md:text-[15px] font-semibold text-indigo-400 leading-[18px]">
            Q
          </span>
          <h3
            className="text-sm md:text-[15px] font-medium text-gray-800 mr-0 md:mr-20"
            onClick={toggleExpand}
          >
            {question}
          </h3>
        </div>
        <div className="flex items-center justify-end ml-4 relative">
          <button
            className="flex items-center gap-2 text-xs text-indigo-700 px-3 py-1 mr-2 rounded border border-indigo-100 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer transition-colors"
            onClick={onTogglePin}
          >
            {isPinned ? <LuPinOff className="text-xs" /> : <LuPin className="text-xs" />}
          </button>
          <button
            className="flex items-center gap-2 text-xs text-cyan-700 font-medium bg-cyan-50 px-3 py-1 mr-2 rounded border border-cyan-100 hover:border-cyan-300 hover:bg-cyan-100 cursor-pointer transition-colors"
            onClick={() => {
              setIsExpanded(true)
              onLearnMore()
            }}
          >
            <LuSparkles />
            <span className="hidden md:block">Learn More</span>
          </button>
          <button
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
            onClick={toggleExpand}
          >
            <LuChevronDown
              size={20}
              className={`transform transition duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: `${height}px` }}
      >
        <div
          ref={contentRef}
          className="mt-4 text-gray-700 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-lg border border-gray-100"
        >
          <AIResponsePreview content={answer} />
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
