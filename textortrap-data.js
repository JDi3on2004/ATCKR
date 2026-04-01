/* =====================================================
   ATCKR — Text or Trap? Game 1
   Data file: game1-data.js
   Description: All scenario objects for the phishing
   game. Each scenario has a sender, messages, whether
   it is a trap, a full explanation, and red flag chips.
   ===================================================== */


const SCENARIOS = [
  {
    sender: 'Bank of America',
    ava: '🏦',
    num: '+1 (555) 291-8847',
    msgs: [
      { text: 'ALERT: Your account has been locked due to suspicious activity.', time: '2:14 PM', bad: true },
      { text: 'Click here IMMEDIATELY to restore access or your account will be closed: www.bankofamerica-secure-login.net/verify', time: '2:14 PM', bad: true }
    ],
    isTrap: true,
    explanation: 'Real banks NEVER send you a link in a text and ask you to log in. The URL "bankofamerica-secure-login.net" is completely fake — scammers make it look real to trick you!',
    flags: [
      '🔗 Fake website URL — not the real bank',
      '⚡ Creates panic with "IMMEDIATELY"',
      '🏦 Banks never text login links',
      '🚨 Threatens to close your account'
    ],
    safePoints: []
  },

  {
    sender: 'Mom ❤️',
    ava: '👩',
    num: 'Mobile · Saved contact',
    msgs: [
      { text: "Hey honey! Don't forget we have dinner at Grandma's at 6pm tonight.", time: '3:45 PM', bad: false },
      { text: 'Can you pick up some bread on the way? Love you! 😊', time: '3:46 PM', bad: false }
    ],
    isTrap: false,
    explanation: 'This is a totally normal text from Mom! No suspicious links, no urgency, no requests for passwords or personal info. Real messages from people you know look exactly like this.',
    flags: [],
    safePoints: [
      '✅ From a saved contact you know',
      '✅ No links or suspicious requests',
      '✅ No urgency or pressure tactics',
      '✅ Just a normal everyday message'
    ]
  },

  {
    sender: 'FedEx Delivery',
    ava: '📦',
    num: '+1 (800) 463-9999',
    msgs: [
      { text: 'Your package #FX-29471 could not be delivered. A redelivery fee of $1.99 is required:', time: '11:03 AM', bad: true },
      { text: 'www.fedex-redelivery-fee.com/pay — ⚠️ Expires in 24 hours or package returned!', time: '11:03 AM', bad: true }
    ],
    isTrap: true,
    explanation: 'FedEx never charges a redelivery fee through a text message link. The website "fedex-redelivery-fee.com" is completely fake — the real FedEx site is only fedex.com.',
    flags: [
      '🔗 Fake website — not fedex.com',
      '⚡ 24-hour urgency pressure',
      '💳 FedEx never charges fees by text',
      '📦 Unsolicited out-of-nowhere message'
    ],
    safePoints: []
  },

  {
    sender: 'PRIZE CENTER 🎁',
    ava: '🎉',
    num: '+1 (900) 555-7777',
    msgs: [
      { text: '🎊🎊 CONGRATULATIONS!! You have been SELECTED to receive a FREE $500 Amazon Gift Card!', time: '9:02 AM', bad: true },
      { text: 'You have 15 MINUTES to claim before it expires! Visit: amaz0n-giftcard-winner.xyz', time: '9:02 AM', bad: true }
    ],
    isTrap: true,
    explanation: "If you didn't enter a contest, you can't win one! Also notice \"amaz0n\" — that's a zero (0) instead of the letter O. Scammers do this to make fake URLs look real.",
    flags: [
      "🎁 Didn't enter any contest",
      '🔗 "amaz0n" uses a ZERO not the letter O',
      '⚡ Extreme 15-minute pressure',
      '💰 Nobody gives $500 for free'
    ],
    safePoints: []
  },

  {
    sender: 'School Alert 🏫',
    ava: '🏫',
    num: 'Official school number',
    msgs: [
      { text: 'REMINDER: School is closed tomorrow (Thursday) due to a water main repair.', time: '5:30 PM', bad: false },
      { text: 'Normal schedule resumes Friday. Questions? Call the main office: (617) 555-0120.', time: '5:30 PM', bad: false }
    ],
    isTrap: false,
    explanation: 'This is a legitimate school alert! It gives a real phone number to call (not a suspicious link), uses no urgency tricks, and asks for zero personal information.',
    flags: [],
    safePoints: [
      '✅ Gives a real phone number to verify',
      '✅ No suspicious links anywhere',
      '✅ No request for personal info',
      '✅ Simple and straightforward'
    ]
  },

  {
    sender: 'xXProGamer99',
    ava: '🎮',
    num: 'Minecraft Server Chat',
    msgs: [
      { text: 'yo I found a FREE DIAMONDS generator!! it actually works lol click:', time: '4:10 PM', bad: true },
      { text: 'http://mc-free-diamonds.xyz/generator — just put in your username and password to get 999 diamonds', time: '4:10 PM', bad: true }
    ],
    isTrap: true,
    explanation: 'There is NO generator that gives free in-game items — these are ALWAYS scams. Asking for your password is the biggest red flag. Anyone who has your password can steal your account!',
    flags: [
      '🔑 Asking for your USERNAME + PASSWORD',
      '🔗 Sketchy fake website URL',
      '🎮 Free item generators are always fake',
      "❓ You don't know this person at all"
    ],
    safePoints: []
  },


{
    sender: 'Work 😒 ',
    ava: '💼',
    num: 'Work contact',
    msgs: [
      { text: "Hey, John called out sick could you come into work today? We could use the help.", time: '12:30 PM', bad: false },
    ],
    isTrap: false,
    explanation: "Your work contact texting you to come into work today is definitely not a scam. They are a verified number on your phone.",
    flags: [],
    safePoints: [
      '✅ Saved contact — a manager',
      '✅ No links or attachments',
      '✅ Normal, free-flowing conversation',
      '✅ Request comes from a verified number',
    ]
  },

  {
    sender: 'ClassmateMia',
    ava: '🧑',
    num: 'School friend · saved contact',
    msgs: [
      { text: "did you see the new Among Us update?? there's a new map!!", time: '7:30 PM', bad: false },
      { text: "we should play this weekend, I'll ask my mom if you can come over", time: '7:31 PM', bad: false }
    ],
    isTrap: false,
    explanation: "Just a classmate talking about a game — totally normal! No suspicious links, no requests for info, nothing weird. When texts are simple and personal like this, they're almost always real.",
    flags: [],
    safePoints: [
      '✅ Saved contact — a classmate you know',
      '✅ No links or attachments',
      '✅ Normal friendly conversation',
      '✅ No pressure or urgency at all'
    ]
  },

  { 
    sender: 'FREE ROBUX',
    ava: '🎭',
    num: '+1 (643) 245-3532',
    msgs: [
      {text: 'DO YOU WANT FREE ROBUX? Click on the link below to try this new method for collecting robux in-game:', time: '5:35 PM', bad: true},
      {text: 'http://www.robl0xfree.net/robuxgenerator -- please enter your username, password and bank details to get a $100 deposit and 900 robux', time: '5:35 PM', bad: true},
    ],
    isTrap: true,
    explanation: "It's a growing trend to get free robux nowadays, and just like the Minecraft Diamonds Generator it's asking for personal information! It is also important to never share bank details as that can be easily stolen!",
    flags: [
      '🔑 Once again asks for a username and password, and bank details',
      '🔗 Sketchy URL',
      '💰 Promises of depositing money without verification',
      '❓ Suspicious number'],
    safePoints: [],
  },

  {
    sender: 'IRS Government',
    ava: '🏛️',
    num: '+1 (202) 555-0199',
    msgs: [
      { text: 'URGENT: This is the IRS. You owe $847 in back taxes. You will be ARRESTED if you do not act immediately.', time: 'Voicemail', bad: true },
      { text: 'Call 1-800-555-0911 within 1 HOUR to stop the arrest warrant being issued.', time: 'Voicemail', bad: true }
    ],
    isTrap: true,
    explanation: 'The IRS NEVER threatens arrest in a text or voicemail! They always contact you by official mail first. Threatening arrest is a fear tactic designed to make you panic.',
    flags: [
      '🚨 Arrest threats = massive scam red flag',
      '⚡ 1-hour extreme panic deadline',
      '🏛️ IRS only sends official mail first',
      '😨 Uses fear to stop you from thinking clearly'
    ],
    safePoints: []
  }
]; 