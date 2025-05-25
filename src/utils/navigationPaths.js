const pathTitleRules = [
  { pattern: /^\/$/, title: 'Home' }, 
  { pattern: /^\/home$/, title: 'Dashboard' },
  { pattern: /^\/events$/, title: 'Events' },
  { pattern: /^\/admin\/addevent$/, title: 'Add Event' },
  { pattern: /^\/event\/booking\/[^\/]+$/, title: 'Tickets' },
  { pattern: /^\/event\/[^\/]+$/, title: 'Event Details' },
]

export const getTitleFromPath = (pathname) => {
  const match = pathTitleRules.find(rule => rule.pattern.test(pathname))
  return match ? match.title : ''
}