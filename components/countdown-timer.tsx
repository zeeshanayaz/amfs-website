'use client'

import { useState, useEffect, useRef } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

// Target launch date — update this as needed
const TARGET_DATE = new Date('2027-09-01T00:00:00')

function calculateTimeLeft(): TimeLeft {
  const now = new Date()
  const diff = TARGET_DATE.getTime() - now.getTime()

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  }
}

interface CountUnit {
  label: string
  value: number
}

function CountBox({ label, value }: CountUnit) {
  const prevValue = useRef(value)
  const [isFlipping, setIsFlipping] = useState(false)

  useEffect(() => {
    if (prevValue.current !== value) {
      setIsFlipping(true)
      const timer = setTimeout(() => setIsFlipping(false), 400)
      prevValue.current = value
      return () => clearTimeout(timer)
    }
  }, [value])

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative flex items-center justify-center bg-brand-navy rounded-xl shadow-lg w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border border-white/10"
        style={{ boxShadow: '0 4px 20px rgba(36, 60, 125, 0.25)' }}
      >
        {/* Top highlight line */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-4 right-4 h-px bg-brand-sky/30"
        />
        <span
          className={`font-serif font-bold text-brand-gold text-2xl sm:text-3xl md:text-4xl tabular-nums leading-none ${isFlipping ? 'count-flip' : ''}`}
          aria-live="polite"
          aria-label={`${value} ${label}`}
        >
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-brand-dark-gray text-[10px] sm:text-xs font-semibold uppercase tracking-widest">
        {label}
      </span>
    </div>
  )
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) {
    // Skeleton while hydrating to avoid SSR mismatch
    return (
      <div className="flex items-end gap-3 sm:gap-4 md:gap-5 justify-center" aria-hidden="true">
        {['Days', 'Hours', 'Minutes', 'Seconds'].map((label) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <div className="bg-brand-navy rounded-xl w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 animate-pulse" />
            <span className="text-brand-dark-gray text-[10px] sm:text-xs font-semibold uppercase tracking-widest">
              {label}
            </span>
          </div>
        ))}
      </div>
    )
  }

  const units: CountUnit[] = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ]

  return (
    <div
      className="flex items-end gap-3 sm:gap-4 md:gap-5 justify-center"
      role="timer"
      aria-label="Countdown to website launch"
    >
      {units.map(({ label, value }, index) => (
        <div key={label} className="flex items-end gap-3 sm:gap-4 md:gap-5">
          <CountBox label={label} value={value} />
          {index < units.length - 1 && (
            <span
              aria-hidden="true"
              className="text-brand-navy font-bold text-xl sm:text-2xl md:text-3xl mb-6 sm:mb-8 md:mb-10 leading-none select-none"
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
