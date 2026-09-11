document.addEventListener('DOMContentLoaded', () => {
  // ============================================
  // DOM ELEMENTS
  // ============================================

  const cosmicIntro = document.getElementById('cosmicIntro');
  const enterBtn = document.getElementById('enterBtn');
  const mainContainer = document.getElementById('mainContainer');
  const particlesContainer = document.getElementById('particles');

  const userNameInput = document.getElementById('userName');
  const userZodiacSelect = document.getElementById('userZodiac');
  const userBirthDateInput = document.getElementById('userBirthDate');
  const modeCards = document.querySelectorAll('.mode-card');
  const createProfileBtn = document.getElementById('createProfileBtn');

  const profileSection = document.getElementById('profileSection');
  const personalDashboard = document.getElementById('personalDashboard');
  const profileAvatar = document.getElementById('profileAvatar');
  const personalGreeting = document.getElementById('personalGreeting');
  const personalRashiInfo = document.getElementById('personalRashiInfo');
  const personalReadingText = document.getElementById('personalReadingText');

  const applianceInput = document.getElementById('applianceInput');
  const checkApplianceBtn = document.getElementById('checkApplianceBtn');

  const loadingSection = document.getElementById('loading');
  const loadingText = document.getElementById('loadingText');

  const horoscopeSection = document.getElementById('horoscopeSection');
  const applianceIcon = document.getElementById('applianceIcon');
  const applianceName = document.getElementById('applianceName');
  const currentDate = document.getElementById('currentDate');
  const horoscopeText = document.getElementById('horoscopeText');

  const jathakamIntro = document.getElementById('jathakamIntro');
  const applianceBorn = document.getElementById('applianceBorn');
  const applianceRashi = document.getElementById('applianceRashi');
  const applianceNakshatra = document.getElementById('applianceNakshatra');
  const applianceLagnam = document.getElementById('applianceLagnam');
  const applianceDosham = document.getElementById('applianceDosham');
  const applianceCareer = document.getElementById('applianceCareer');
  const familyOpinion = document.getElementById('familyOpinion');

  const matchPercentage = document.getElementById('matchPercentage');
  const verdictHeading = document.getElementById('verdictHeading');
  const verdictText = document.getElementById('verdictText');
  const adviceHeading = document.getElementById('adviceHeading');
  const relationshipAdviceText = document.getElementById('relationshipAdviceText');

  const warningBox = document.getElementById('warningBox');
  const warningText = document.getElementById('warningText');

  const timingKicker = document.getElementById('timingKicker');
  const timingTitle = document.getElementById('timingTitle');
  const deadlineTime = document.getElementById('deadlineTime');
  const deadlineTask = document.getElementById('deadlineTask');
  const ifDoneText = document.getElementById('ifDoneText');
  const ifNotDoneText = document.getElementById('ifNotDoneText');

  const remedyBtn = document.getElementById('remedyBtn');
  const remedyResult = document.getElementById('remedyResult');
  const remedyText = document.getElementById('remedyText');

  const newApplianceBtn = document.getElementById('newApplianceBtn');
  const shareBtn = document.getElementById('shareBtn');

  // ============================================
  // APP STATE
  // ============================================

  const state = {
    hasEntered: false,
    selectedMode: 'aunty',
    profile: {
      name: '',
      zodiac: '',
      birthDate: ''
    },
    applianceName: ''
  };

  // ============================================
  // ZODIAC DATA
  // ============================================

  const zodiacData = {
    aries: { label: 'Aries / മേടം', element: 'Fire', quality: 'Cardinal' },
    taurus: { label: 'Taurus / ഇടവം', element: 'Earth', quality: 'Fixed' },
    gemini: { label: 'Gemini / മിഥുനം', element: 'Air', quality: 'Mutable' },
    cancer: { label: 'Cancer / കർക്കിടകം', element: 'Water', quality: 'Cardinal' },
    leo: { label: 'Leo / ചിങ്ങം', element: 'Fire', quality: 'Fixed' },
    virgo: { label: 'Virgo / കന്നി', element: 'Earth', quality: 'Mutable' },
    libra: { label: 'Libra / തുലാം', element: 'Air', quality: 'Cardinal' },
    scorpio: { label: 'Scorpio / വൃശ്ചികം', element: 'Water', quality: 'Fixed' },
    sagittarius: { label: 'Sagittarius / ധനു', element: 'Fire', quality: 'Mutable' },
    capricorn: { label: 'Capricorn / മകരം', element: 'Earth', quality: 'Cardinal' },
    aquarius: { label: 'Aquarius / കുംഭം', element: 'Air', quality: 'Fixed' },
    pisces: { label: 'Pisces / മീനം', element: 'Water', quality: 'Mutable' }
  };

  const elementCompatibility = {
    Fire: { Fire: 85, Earth: 60, Air: 90, Water: 40 },
    Earth: { Fire: 60, Earth: 80, Air: 50, Water: 70 },
    Air: { Fire: 90, Earth: 50, Air: 85, Water: 60 },
    Water: { Fire: 40, Earth: 70, Air: 60, Water: 90 }
  };

  const applianceElements = ['Fire', 'Earth', 'Air', 'Water'];

  const applianceEmojis = [
    '⚡',
    '🔌',
    '🏠',
    '🪔',
    '📱',
    '💻',
    '🧊',
    '🌀',
    '🍳',
    '🎧',
    '🔋',
    '🛋️'
  ];

  // ============================================
  // PERSONAL READINGS
  // ============================================

  const auntyPersonalReadings = [
    '{name} mole, today your {rashi} energy is strong. But don’t skip breakfast, face looking little tired.',
    'Aiyyo {name}, {rashi} people are emotional today. Don’t reply quickly in family WhatsApp group.',
    '{name} mole, aunty says today is good for cleaning room and ignoring relatives who ask personal questions.',
    'Your {rashi} has one small dosham today: overthinking after 10 PM. Drink tea and sleep.',
    '{name}, today you will hear one unexpected news. Act surprised even if you already knew from neighbour aunty.'
  ];

  const unclePersonalReadings = [
    '{name}, as a {rashi}, today focus on practical matters. First charge phone, then charge life.',
    '{name}, your {rashi} shows spending tendency. Don’t buy random things online after 11 PM.',
    'Listen {name}, career is important. But today first eat properly, then think about career.',
    '{name}, your {rashi} is good today for planning, saving, and checking the electricity bill before it becomes emotional.',
    'Today, {name}, avoid unnecessary arguments. Especially with people who did not read the manual.'
  ];

  const auntyRelationshipReadings = [
    'Aiyyo {name} mole, you and {appliance} have an interesting cosmic connection. This appliance understands your late-night emotional needs better than some people.',
    '{name}, {appliance} entered your life with one purpose: to support you, make noise, and occasionally disappoint you. Like family only.',
    'The stars say {appliance} is loyal, but check warranty first. Love is one thing, service centre is another thing.',
    '{name} mole, your {rashi} and {appliance} are giving “adjust cheyyam” energy. Not perfect, but manageable.',
    'Today {appliance} feels close to your aura. Don’t take it for granted. Clean it once in a while, ketto.'
  ];

  const uncleRelationshipReadings = [
    '{name}, {appliance} is compatible with you only if you use it properly. Manual is there for a reason.',
    'Your {rashi} and {appliance} have decent practical connection. But calculate power consumption before emotional attachment.',
    '{name}, this {appliance} has potential. Maintain it well, keep bill safely, and don’t call technician for small things.',
    'According to cosmic calculation, {appliance} is useful. That itself is better than many investments.',
    '{name}, your relationship with {appliance} can work. But don’t leave it switched on unnecessarily. KSEB will not forgive.'
  ];

  // ============================================
  // APPLIANCE JATHAKAM DATA
  // ============================================

  const applianceJathakamData = {
    bornDays: [
      'Black Friday Sale, 2018',
      'Onam Offer Day, 2020',
      'Amazon delivery at 3:47 PM',
      'A random Sunday when uncle said “discount undu”',
      'Wedding-gift season, 2019',
      'The day the old appliance finally gave up',
      'One rainy day when current went off three times'
    ],

    rashis: [
      'ചൂട് രാശി / Choodu Rashi',
      'തണുപ്പ് രാശി / Thanuppu Rashi',
      'കറന്റ് രാശി / Current Rashi',
      'വൈഫൈ രാശി / Wi-Fi Rashi',
      'വാട്ട്സ് രാശി / Watts Rashi',
      'അഡ്ജസ്റ്റ് രാശി / Adjust Rashi'
    ],

    nakshatras: [
      'Burnt Toast Nakshatram',
      'Power-Cut Nakshatram',
      'KSEB Bill Nakshatram',
      'Wi-Fi Weak Aaya Nakshatram',
      'Tea-Time Nakshatram',
      'Family WhatsApp Nakshatram',
      'Leftover Curry Nakshatram',
      'Onam Sadya Nakshatram'
    ],

    lagnams: [
      'Kitchen Lagnam',
      'Living Room Lagnam',
      'Socketinte Aduthu Lagnam',
      'Corner Table Lagnam',
      'Ammaയുടെ കണ്ണിൽപ്പെടാത്ത Lagnam',
      'Extension Board Lagnam'
    ],

    doshams: [
      'Crumb Dosham',
      'Low Battery Dosham',
      'Overheating Dosham',
      'KSEB Bill Dosham',
      'Dust Bunny Dosham',
      'Remote Missing Dosham',
      'No Dosham... but aunty still suspicious'
    ],

    careers: [
      'Full-time വീട്ടുജോലി സഹായകൻ',
      'Breakfast specialist',
      'Family drama witness',
      'Electricity bill increase manager',
      'Late-night snack enabler',
      'Official tea-time companion',
      'Unpaid household employee'
    ],

    auntyOpinions: [
      '{appliance} is nice, mole. But maintenance cost entha? First ask warranty details.',
      'This {appliance} has good family background. Bought in sale, but still decent.',
      'Aiyo, {appliance} looks okay. But neighbour aunty has better model, apparently.',
      '{appliance} is hardworking. Unlike some people in this house, I will not name names.',
      'Use {appliance} properly, ketto. Don’t make amma call technician again.',
      '{appliance} has small dosham only. One wipe with Vim and everything will be fine.'
    ],

    uncleOpinions: [
      '{appliance} is okay, but current consumption check cheyyu. KSEB bill jokes are not jokes.',
      'Before trusting {appliance}, read manual. Nobody reads manual these days, that is the problem.',
      '{appliance} has potential. But yearly maintenance should be planned properly.',
      'This {appliance} is better than buying unnecessary things. At least it has function.',
      'Good appliance. But why did you not buy it during last year sale? Money saved aayene.',
      '{appliance} is acceptable. Keep bill safely. Warranty card evide?'
    ]
  };

  // ============================================
  // VERDICTS AND ADVICES
  // ============================================

  const auntyVerdicts = {
    excellent: [
      'Aiyyo, perfect yojippu! Like appam and stew. Even the astrologer will say “nalla porutham aanu!” 🌟',
      'Match made in Kerala heaven! Even aunty approves, and you know aunty approves nothing easily. 💕',
      'Stars have spoken: perfect pair! Like rice-sambar, tea-biscuit, and serial-family drama. ✨'
    ],
    good: [
      'Nalla connection aanu! Give it time, mole. Good things take time—like proper biryani dum. 👍',
      'Universe approves. Aunty also approves, but she still wants to check the warranty. ✅',
      'Good vibes. Keep this relationship going like free tea at wedding function. 🌈'
    ],
    okay: [
      'Complicated, but workable. Like most Malayali marriages—adjustment aanu main. 🤷',
      'Not best, not worst. Like homemade cooking: sometimes amazing, sometimes Swiggy.',
      'Aunty is neutral. She is watching and taking notes for future gossip. ⚖️'
    ],
    bad: [
      'Aiyo, astrologer also says no! This connection has more red flags than KSEB bill. 💔',
      'Don’t do it, mole. Listen to elders once. Universe is warning you. 🚫',
      'Clash of energies! Like dosa without chutney. Technically possible, emotionally painful. ⚡'
    ],
    terrible: [
      'RUN, mole! This appliance will drain your life force like toxic relative at Onam. 🧛',
      'Apocalypse-level mismatch. Call amma, astrologer, priest—anyone available! ☄️',
      'This is a cosmic disaster. Like family function where everyone fights before food comes. 💥'
    ]
  };

  const uncleVerdicts = {
    excellent: [
      'Very good compatibility. Practical and emotionally stable. Keep the bill safely. 🌟',
      'Excellent match. Better planning than many human relationships, frankly. ✅',
      'Strong result. Use appliance correctly and do not ignore maintenance schedule. ✨'
    ],
    good: [
      'Good enough. Don’t overthink. Just use it properly and switch off after work. 👍',
      'Decent compatibility. Current consumption may be the only issue. Check KSEB bill. 💡',
      'Good investment of emotional energy. At least this appliance has a clear purpose. ✅'
    ],
    okay: [
      'Average result. Not a disaster, but not something to announce in family group. 🤷',
      'Can work with discipline, maintenance, and less unnecessary drama.',
      'Practical compatibility is okay. Emotional compatibility is not required for every appliance. ⚖️'
    ],
    bad: [
      'Not recommended. Too much maintenance, too little return. Like some investments. 🚫',
      'This connection is not practical. Save money and move on. 💔',
      'Power consumption and personality both are not matching. Avoid if possible. ⚡'
    ],
    terrible: [
      'Absolute no. Don’t waste time, electricity, or money. ❌',
      'Run. This appliance is more trouble than benefit. Like buying something without reading reviews.',
      'This match will create problems in house and KSEB bill. Avoid immediately. ☄️'
    ]
  };

  const auntyAdviceData = {
    excellent: [
      'Celebrate! Share this in family WhatsApp group. Forward karaanalle!',
      'Trust this bond. It is stronger than your cousin’s long-distance relationship.',
      'You two are unstoppable. Like biryani and raita.'
    ],
    good: [
      'Respect, snacks, and communication—three pillars of every healthy Malayali relationship.',
      'Small efforts matter. Like bringing biscuit with evening tea.',
      'Keep talking, but also listen sometimes. Important aanu.'
    ],
    okay: [
      'Compromise needed. Like deciding who controls the AC remote.',
      'Give each other space. Especially after relatives start asking questions.',
      'Patience is needed—like waiting in Kerala traffic.'
    ],
    bad: [
      'Set boundaries. Say “Not your business, chechi” with a polite smile.',
      'Maybe you are better as acquaintances. Smile, wave, avoid eye contact.',
      'Do not force it. Universe knows something, apparently.'
    ],
    terrible: [
      'Run fast. Do not look back. Like you saw your electricity bill.',
      'Call amma. She will advise you and scold you—two services in one.',
      'Priorities, mole: chai first, peace later.'
    ]
  };

  const uncleAdviceData = {
    excellent: [
      'Maintain it properly. Good things last only with regular servicing.',
      'Keep the warranty card and bill in one folder. Future you will thank present you.',
      'Good match. No need to discuss too much; just use it efficiently.'
    ],
    good: [
      'Do basic maintenance. Don’t wait for problem before taking action.',
      'Avoid unnecessary emotional attachment. Appliance is appliance, but take care of it.',
      'Use within limits. Everything has capacity, even people.'
    ],
    okay: [
      'Manageable. Don’t expect too much, then you will not be disappointed.',
      'Read manual once. It may solve half of your problems.',
      'Use carefully and keep repair budget aside.'
    ],
    bad: [
      'Better to reconsider. Repair cost may become emotional damage.',
      'Do not spend more money fixing a bad decision.',
      'If it gives trouble twice, call technician. Don’t become YouTube engineer.'
    ],
    terrible: [
      'Avoid completely. Save money and mental peace.',
      'Switch off, unplug, move on. Practical solution.',
      'No remedy needed. Just don’t buy it.'
    ]
  };

  const auntyWarnings = [
    'This connection may cause emotional damage. Like relatives asking “when marriage?”',
    'Neighbours may notice. Then aunty network will activate immediately.',
    'Your amma will have 1,000 questions. Prepare answers.',
    'One small dosham is there. Do not use appliance after midnight, people will talk.',
    'Family WhatsApp group may receive news before you do.'
  ];

  const uncleWarnings = [
    'Risk of high electricity bill detected. KSEB is watching.',
    'Warranty details unclear. This is a serious family matter.',
    'Do not use extension board from 2009. Safety first.',
    'Maintenance cost may exceed emotional benefit.',
    'Read manual before blaming appliance.'
  ];

  // ============================================
  // COSMIC TIMING TASKS
  // ============================================

  const auntyTimingTasks = [
    {
      task: 'Wipe {appliance} with one respectful cloth.',
      done: 'Aunty approval increases by 40%. Your evening tea will taste emotionally better.',
      notDone: '{appliance} may make one suspicious sound when guests are sitting nearby.'
    },
    {
      task: 'Do not argue with {appliance}. Just switch it off gently.',
      done: 'Household peace stays intact. Even amma may say “good child.”',
      notDone: 'Neighbour aunty may hear a sound and ask why your house is always having problems.'
    },
    {
      task: 'Tell {appliance}: “Njan ninne appreciate cheyyunnu.”',
      done: 'Cosmic bond becomes stronger. Appliance may cooperate for at least one full day.',
      notDone: 'It may choose the exact wrong time to stop working, like during video call with relatives.'
    },
    {
      task: 'Keep {appliance} clean before 4 PM tea time.',
      done: 'Your aura becomes shiny like new steel vessel from wedding gift.',
      notDone: 'Amma may ask “ഇതൊക്കെ ആരാണ് വൃത്തിയാക്കേണ്ടത്?” and no answer will be correct.'
    },
    {
      task: 'Do not leave {appliance} alone with your cousin.',
      done: 'Family property remains safe. No extra explanation needed.',
      notDone: 'Cousin may press random buttons and say “I thought it was touch screen.”'
    }
  ];

  const uncleTimingTasks = [
    {
      task: 'Switch off {appliance} properly and check the plug.',
      done: 'Possible KSEB saving detected. Uncle will nod once. This is high praise.',
      notDone: 'Electricity bill may increase by imaginary amount, but uncle will explain it for 45 minutes.'
    },
    {
      task: 'Read at least one line of the manual for {appliance}.',
      done: 'You gain practical wisdom and reduce technician-call probability by 0.7%.',
      notDone: 'Uncle may say “I told you so” before you even explain the problem.'
    },
    {
      task: 'Check whether {appliance} needs charging, cleaning, or maintenance.',
      done: 'Your adulting score increases. Uncle may mention this in front of relatives.',
      notDone: 'It may stop working exactly when you need it. This is called planning failure.'
    },
    {
      task: 'Keep bill or warranty information for {appliance} in one safe place.',
      done: 'Future you avoids one emotional customer-care call.',
      notDone: 'Warranty card may disappear into the same dimension as missing socks.'
    },
    {
      task: 'Do not buy another accessory for {appliance} tonight.',
      done: 'Savings remain safe. Financial horoscope improves slightly.',
      notDone: 'Cart total may become suspicious. Bank balance will ask questions.'
    }
  ];

  // ============================================
  // REMEDIES
  // ============================================

  const auntyRemedies = [
    'Offer 3 Parle-G biscuits near the appliance. Vastu correction complete.',
    'Wipe the appliance respectfully with Vim. Aunty says fresh start is important.',
    'Drink one strong kaapi at 4 PM. Then all decisions will become clear.',
    'Do not open family WhatsApp group for one hour. Aura protection needed.',
    'Place one banana near the appliance. Don’t ask why. Astrologer knows.',
    'Call amma and say you ate properly. Half the dosham will disappear.',
    'Say “adjust cheyyam” three times and restart the appliance.'
  ];

  const uncleRemedies = [
    'Switch it off for five minutes and switch on again. This solves 70% of life problems.',
    'Read the manual. Yes, actually read it.',
    'Check plug, socket, and electricity bill. Then panic.',
    'Keep warranty card safely. That is the real remedy.',
    'Do not buy accessories until you know you need them.',
    'Clean it once. Maintenance is cheaper than repair.',
    'Ask technician before opening screws. YouTube is not always correct.'
  ];

  // ============================================
  // HELPER FUNCTIONS
  // ============================================

  function pick(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function replaceTokens(text, values) {
    return text.replace(/\{(\w+)\}/g, (match, key) => {
      return values[key] ?? match;
    });
  }

  function getCompatibilityCategory(score) {
    if (score >= 90) return 'excellent';
    if (score >= 70) return 'good';
    if (score >= 50) return 'okay';
    if (score >= 30) return 'bad';
    return 'terrible';
  }

  function getRandomDeadline() {
    const hour = Math.floor(Math.random() * 8) + 1;
    const minuteOptions = ['03', '12', '23', '37', '47', '56'];
    const minute = pick(minuteOptions);
    const period = Math.random() > 0.55 ? 'PM' : 'AM';

    return `${hour}:${minute} ${period}`;
  }

  // ============================================
  // INTRO
  // ============================================

  function createParticles() {
    particlesContainer.innerHTML = '';

    for (let index = 0; index < 45; index += 1) {
      const particle = document.createElement('div');
      const size = Math.random() * 5 + 2;
      const colors = ['#f8cf62', '#ffffff', '#dcae45', '#fff2b2'];

      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = pick(colors);
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particle.style.animationDuration = `${Math.random() * 5 + 5}s`;

      particlesContainer.appendChild(particle);
    }
  }

  function createDashOverlay() {
    const overlay = document.createElement('div');

    overlay.className = 'dash-overlay';
    overlay.innerHTML = `
      <div class="dash-content">
        <h2 class="dash-title">✨ രാശി നോക്കുന്നു...</h2>
        <div class="dash-line"></div>
        <p class="dash-subtitle">
          ഒരു മിനിറ്റ് മോനേ... നക്ഷത്രങ്ങൾ എല്ലാം മീറ്റിങ്ങിലാണ്.
        </p>
      </div>
    `;

    document.body.appendChild(overlay);
    return overlay;
  }

  function enterCosmicRealm() {
    if (state.hasEntered) return;

    state.hasEntered = true;
    cosmicIntro.classList.add('hidden');

    const overlay = createDashOverlay();

    setTimeout(() => {
      overlay.classList.add('active');
    }, 200);

    setTimeout(() => {
      cosmicIntro.style.display = 'none';
      mainContainer.classList.add('visible');
    }, 700);

    setTimeout(() => {
      overlay.classList.remove('active');

      setTimeout(() => {
        overlay.remove();

        profileSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 300);
    }, 1700);
  }

  // ============================================
  // PROFILE LOGIC
  // ============================================

  function setMode(mode) {
    state.selectedMode = mode;

    modeCards.forEach((card) => {
      card.classList.toggle('selected', card.dataset.mode === mode);
    });
  }

  function getPersonalReading() {
    const rashiLabel = zodiacData[state.profile.zodiac].label;

    const source =
      state.selectedMode === 'aunty'
        ? auntyPersonalReadings
        : unclePersonalReadings;

    return replaceTokens(pick(source), {
      name: state.profile.name,
      rashi: rashiLabel
    });
  }

  function createProfile() {
    const name = userNameInput.value.trim();
    const zodiac = userZodiacSelect.value;
    const birthDate = userBirthDateInput.value;

    if (!name) {
      alert('പേര് പറയു, mole! Auntyക്ക് എല്ലാം അറിയണം.');
      userNameInput.focus();
      return;
    }

    if (!zodiac) {
      alert('രാശി select cheyyu! Without rashi, aunty cannot do magic.');
      userZodiacSelect.focus();
      return;
    }

    state.profile.name = name;
    state.profile.zodiac = zodiac;
    state.profile.birthDate = birthDate;

    profileAvatar.textContent = name.charAt(0).toUpperCase();

    if (state.selectedMode === 'aunty') {
      personalGreeting.textContent = `Aiyyo, ${name} mole!`;
    } else {
      personalGreeting.textContent = `Eda/Edi ${name}, കേൾക്ക്!`;
    }

    personalRashiInfo.textContent =
      `${zodiacData[zodiac].label} • ${zodiacData[zodiac].element} Element • ` +
      `${birthDate ? 'Birth details accepted by aunty' : 'Birth date optional, drama mandatory'}`;

    personalReadingText.textContent = getPersonalReading();

    profileSection.style.display = 'none';
    personalDashboard.style.display = 'block';

    personalDashboard.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  // ============================================
  // APPLIANCE JATHAKAM
  // ============================================

  function createApplianceJathakam(appliance) {
    const opinionSource =
      state.selectedMode === 'aunty'
        ? applianceJathakamData.auntyOpinions
        : applianceJathakamData.uncleOpinions;

    jathakamIntro.textContent =
      `${appliance}-ന്റെ ജാതകം full ആയി ${state.selectedMode} നോക്കി. ` +
      'കുറച്ച് truth, കുറച്ച് drama, full confidence.';

    applianceBorn.textContent = pick(applianceJathakamData.bornDays);
    applianceRashi.textContent = pick(applianceJathakamData.rashis);
    applianceNakshatra.textContent = pick(applianceJathakamData.nakshatras);
    applianceLagnam.textContent = pick(applianceJathakamData.lagnams);
    applianceDosham.textContent = pick(applianceJathakamData.doshams);
    applianceCareer.textContent = pick(applianceJathakamData.careers);

    familyOpinion.textContent = replaceTokens(pick(opinionSource), {
      appliance
    });
  }

  // ============================================
  // COSMIC TIMING ALERT
  // ============================================

  function createCosmicTimingAlert(appliance) {
    const tasks =
      state.selectedMode === 'aunty'
        ? auntyTimingTasks
        : uncleTimingTasks;

    const selectedTask = pick(tasks);
    const deadline = getRandomDeadline();

    if (state.selectedMode === 'aunty') {
      timingKicker.textContent = 'Aunty Approved Cosmic Notice';
      timingTitle.textContent = 'ഇന്നത്തെ Cosmic Deadline';
    } else {
      timingKicker.textContent = 'Uncle Approved Practical Notice';
      timingTitle.textContent = 'ഇന്നത്തെ Practical Deadline';
    }

    deadlineTime.textContent = `Before ${deadline}`;

    deadlineTask.textContent = replaceTokens(selectedTask.task, {
      appliance
    });

    ifDoneText.textContent = replaceTokens(selectedTask.done, {
      appliance
    });

    ifNotDoneText.textContent = replaceTokens(selectedTask.notDone, {
      appliance
    });
  }

  // ============================================
  // APPLIANCE RESULT
  // ============================================

  function getApplianceIcon(appliance) {
    const name = appliance.toLowerCase();

    if (name.includes('fridge')) return '❄️';
    if (name.includes('fan')) return '🌀';
    if (name.includes('phone')) return '📱';
    if (name.includes('laptop')) return '💻';
    if (name.includes('mixer')) return '🥤';
    if (name.includes('air fryer')) return '🍟';
    if (name.includes('toaster')) return '🍞';
    if (name.includes('coffee')) return '☕';
    if (name.includes('vacuum')) return '🧹';
    if (name.includes('charger')) return '🔌';
    if (name.includes('tv')) return '📺';

    return pick(applianceEmojis);
  }

  function getRelationshipReading(appliance) {
    const source =
      state.selectedMode === 'aunty'
        ? auntyRelationshipReadings
        : uncleRelationshipReadings;

    return replaceTokens(pick(source), {
      name: state.profile.name,
      rashi: zodiacData[state.profile.zodiac].label,
      appliance
    });
  }

  function generateApplianceResult() {
    const appliance = applianceInput.value.trim();

    if (!appliance) {
      alert('Appliance-ന്റെ പേര് type cheyyu, mole! Fan, mixer, charger—anything.');
      applianceInput.focus();
      return;
    }

    state.applianceName = appliance;

    personalDashboard.style.display = 'none';
    horoscopeSection.style.display = 'none';
    loadingSection.style.display = 'block';

    loadingText.textContent =
      state.selectedMode === 'aunty'
        ? `${appliance}-ന്റെ ജാതകം നോക്കുന്നു... neighbour auntyക്ക് പറയരുത്.`
        : `${appliance}-ന്റെ power consumptionയും karmaയും check cheyyunnu...`;

    setTimeout(() => {
      const userElement = zodiacData[state.profile.zodiac].element;
      const applianceElement = pick(applianceElements);

      let score = elementCompatibility[userElement][applianceElement];

      if (state.profile.birthDate) {
        const dateLastDigit = Number(
          state.profile.birthDate.replaceAll('-', '').slice(-1)
        );

        score += dateLastDigit % 7;
      }

      score += Math.floor(Math.random() * 15) - 7;
      score = Math.max(12, Math.min(100, score));

      const category = getCompatibilityCategory(score);

      const selectedVerdicts =
        state.selectedMode === 'aunty'
          ? auntyVerdicts
          : uncleVerdicts;

      const selectedAdvice =
        state.selectedMode === 'aunty'
          ? auntyAdviceData
          : uncleAdviceData;

      const selectedWarnings =
        state.selectedMode === 'aunty'
          ? auntyWarnings
          : uncleWarnings;

      applianceIcon.textContent = getApplianceIcon(appliance);
      applianceName.textContent = appliance;
      horoscopeText.textContent = getRelationshipReading(appliance);

      createApplianceJathakam(appliance);
      createCosmicTimingAlert(appliance);

      matchPercentage.textContent = `${score}%`;

      verdictHeading.textContent =
        state.selectedMode === 'aunty'
          ? '⚖️ Auntyയുടെ Verdict'
          : '⚖️ Uncleയുടെ Practical Verdict';

      adviceHeading.textContent =
        state.selectedMode === 'aunty'
          ? '💡 Auntyയുടെ Upadesham'
          : '💡 Uncleയുടെ Financial Advice';

      verdictText.textContent = pick(selectedVerdicts[category]);
      relationshipAdviceText.textContent = pick(selectedAdvice[category]);

      if (category === 'bad' || category === 'terrible') {
        warningText.textContent = pick(selectedWarnings);
        warningBox.style.display = 'block';
      } else {
        warningBox.style.display = 'none';
      }

      remedyResult.style.display = 'none';
      remedyText.textContent = '';

      loadingSection.style.display = 'none';
      horoscopeSection.style.display = 'block';

      horoscopeSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 1600);
  }

  // ============================================
  // REMEDY
  // ============================================

  function showRemedy() {
    const source =
      state.selectedMode === 'aunty'
        ? auntyRemedies
        : uncleRemedies;

    remedyText.textContent = pick(source);
    remedyResult.style.display = 'block';
  }

  // ============================================
  // SHARE
  // ============================================

  async function shareResult() {
    if (!state.applianceName) {
      alert('First appliance rashi bhalam നോക്കൂ, mole!');
      return;
    }

    const message = `🔮 KUMBIDI TIMES — PERSONAL APPLIANCE RASHI BHALAM

Name: ${state.profile.name}
Rashi: ${zodiacData[state.profile.zodiac].label}
Appliance: ${state.applianceName}
Compatibility: ${matchPercentage.textContent}

Verdict:
${verdictText.textContent}

Forward to family WhatsApp group! Forward karaanalle!`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Kumbidi Times Rashi Bhalam',
          text: message
        });

        return;
      }

      await navigator.clipboard.writeText(message);
      alert('Copied! Family WhatsApp groupil forward cheyyu! 📲');
    } catch (error) {
      console.log('Sharing cancelled or unavailable.', error);
    }
  }

  // ============================================
  // NEW APPLIANCE
  // ============================================

  function resetForNewAppliance() {
    horoscopeSection.style.display = 'none';
    applianceInput.value = '';
    personalDashboard.style.display = 'block';

    personalDashboard.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    setTimeout(() => {
      applianceInput.focus();
    }, 450);
  }

  // ============================================
  // EVENT LISTENERS
  // ============================================

  enterBtn.addEventListener('click', enterCosmicRealm);

  modeCards.forEach((card) => {
    card.addEventListener('click', () => {
      setMode(card.dataset.mode);
    });
  });

  createProfileBtn.addEventListener('click', createProfile);

  checkApplianceBtn.addEventListener('click', generateApplianceResult);

  applianceInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      generateApplianceResult();
    }
  });

  remedyBtn.addEventListener('click', showRemedy);

  newApplianceBtn.addEventListener('click', resetForNewAppliance);

  shareBtn.addEventListener('click', shareResult);

  // ============================================
  // INITIALIZE
  // ============================================

  currentDate.textContent = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  createParticles();

  setTimeout(() => {
    if (!state.hasEntered) {
      enterCosmicRealm();
    }
  }, 15000);

  console.log('Kumbidi Times loaded. Aunty and uncle are ready.');
});