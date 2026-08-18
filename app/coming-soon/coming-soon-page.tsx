'use client'

import { motion } from 'framer-motion'
import { CoreValuesSection } from '@/components/core-values-section'
import { SocialConnect } from '@/components/social-connect'
import { ScrollToTop } from '@/components/scroll-to-top'
import { ComingSoonHero } from '@/components/coming_soon/coming-soon-hero'


export function ComingSoon() {
  return (
    <>
      <main id="main-content">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <ComingSoonHero />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <CoreValuesSection bgColor='white' />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <SocialConnect />
        </motion.div>
      </main>
      <ScrollToTop />
    </>
  )
}
