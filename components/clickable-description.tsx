export function ClickableDescription({ text }: { text: string }) {
  const parts = text.split(
    /(https?:\/\/[^\s]+|www\.[^\s]+|[\w.-]+@[\w.-]+\.[A-Za-z]{2,}|(?:\+92|0)[\d\s-]{10,14})/g
  )

  return (
    <p className="mt-2 max-w-2xl text-sm leading-6 text-brand-dark-gray">
      {parts.map((part, index) => {
        // URL
        if (/^https?:\/\//.test(part)) {
          return (
            <a
              key={index}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-royal underline underline-offset-2 hover:text-brand-navy"
            >
              {part}
            </a>
          )
        }

        // www URL
        if (/^www\./.test(part)) {
          return (
            <a
              key={index}
              href={`https://${part}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-royal underline underline-offset-2 hover:text-brand-navy"
            >
              {part}
            </a>
          )
        }

        // Email
        if (/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(part)) {
          return (
            <a
              key={index}
              href={`mailto:${part}`}
              className="font-semibold text-brand-royal underline underline-offset-2 hover:text-brand-navy"
            >
              {part}
            </a>
          )
        }

        // Phone
        if (/^(?:\+92|0)[\d\s-]{10,14}$/.test(part)) {
          const phoneNumber = part.replace(/[\s-]/g, '')

          return (
            <a
              key={index}
              href={`tel:${phoneNumber}`}
              className="font-semibold text-brand-royal underline underline-offset-2 hover:text-brand-navy"
            >
              {part}
            </a>
          )
        }

        return <span key={index}>{part}</span>
      })}
    </p>
  )
}