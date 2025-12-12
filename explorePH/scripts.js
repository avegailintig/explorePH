// (No functional change needed — keep the same script you already have.)
// The previously provided scripts.js already implements multi-image modal, thumbnails, arrows and keyboard navigation.
// Ensure you are using the latest version you accepted earlier. For convenience, here's the same script with no changes:
document.addEventListener('DOMContentLoaded', ()=> {
  const toggle = document.querySelector('#navToggle');
  const links = document.querySelector('.nav-links');
  if(toggle){
    toggle.addEventListener('click', ()=> {
      links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
      links.style.flexDirection = 'column';
      links.style.background = 'rgba(255,255,255,0.98)';
      links.style.padding = '12px';
      links.style.position = 'absolute';
      links.style.right = '18px';
      links.style.top = '66px';
      links.style.borderRadius = '10px';
      links.style.boxShadow = '0 10px 30px rgba(2,20,40,0.08)';
    });
  }

  // set active nav link
  const navAnchors = document.querySelectorAll('.nav-links a');
  const path = location.pathname.split('/').pop() || 'index.html';
  navAnchors.forEach(a=>{
    const href = a.getAttribute('href');
    if(href === path) a.classList.add('active');
  });

  // gallery modal (existing behavior)
  const galleryImgs = document.querySelectorAll('.gallery-grid img');
  if(galleryImgs.length){
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(2,10,20,0.6);z-index:9999;opacity:0;transition:opacity 180ms;visibility:hidden;';
    modal.innerHTML = '<div style="max-width:90%;max-height:90%;"><img style="width:100%;height:auto;border-radius:12px;box-shadow:0 20px 40px rgba(0,0,0,0.5)"></div>';
    document.body.appendChild(modal);
    const modalImg = modal.querySelector('img');

    galleryImgs.forEach(img=>{
      img.addEventListener('click', ()=>{
        modalImg.src = img.src;
        modal.style.visibility = 'visible';
        setTimeout(()=> modal.style.opacity = '1',10);
      });
    });

    modal.addEventListener('click', ()=>{
      modal.style.opacity = '0';
      setTimeout(()=> modal.style.visibility = 'hidden',200);
    });
  }

  // simple contact form behavior (no backend) - show a nice alert
  const contactForm = document.querySelector('#contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      alert('Thanks! Your message has been noted locally (no backend). For submission, connect to a server or email handler.');
      contactForm.reset();
    });
  }

  // ---------------------------
  // Destination modal logic (multi-image + arrow navigation)
  // ---------------------------
  const destinationsData = {
    palawan: {
      title: "Palawan — El Nido & Coron",
      images: ["images/palawan.jpg", "images/palawan-2.jpg", "images/palawan-3.jpg","images/palawan-4.jpg","images/palawan-5.jpg"],
      tag: "Beaches & Islands",
      about: "Palawan is famed for its dramatic limestone karsts, emerald lagoons, and marine-rich waters. El Nido and Coron are gateways to island hopping and snorkelling.",
      culture: "Local communities depend on fishing and tourism; respect marine protected areas and local practices. You'll find Filipino hospitality, seafood-rich cuisine, and multi-lingual guides.",
      tips: [
        "Book island tours in advance during high season (Nov–May).",
        "Bring reef-safe sunscreen and a dry bag for electronics.",
        "Carry small cash for park fees and island vendors."
      ],
      cautions: [
        "Some lagoons have strict entry limits — follow guides' instructions.",
        "Weather can change quickly; check boat schedules and cancellations."
      ]
    },

    siargao: {
      title: "Siargao — Surf & Island Life",
      images: ["images/siargao.jpg", "images/siargao-2.jpg","images/siargao-3.jpg","images/siargao-4.jpg","images/siargao-5.jpg"],
      tag: "Surfing & Island Hops",
      about: "Siargao is the Philippines' surf capital, known for 'Cloud 9' wave, relaxed island vibe, and nearby islets perfect for day trips.",
      culture: "Laid-back island culture with many cafes, surf hostels, and community-driven tourism. Respect local surf etiquette and beachfront habitats.",
      tips: [
        "If you're surfing, rent boards locally or bring your own after checking airline rules.",
        "Rent a motorbike to explore the island; wear helmets and drive carefully.",
        "Peak surf season is Aug–Nov; book accommodations early then."
      ],
      cautions: [
        "Strong rip currents in some surf breaks — only surf within your skill level.",
        "Medical facilities are limited; bring a basic first-aid kit."
      ]
    },

    baguio: {
      title: "Baguio — Cool Highlands",
      images: ["images/baguio.jpg", "images/baguio-2.jpg", "images/baguio-3.jpg", "images/baguio-4.jpg"],
      tag: "Highlands & Chill",
      about: "Baguio offers cooler temperatures, parks (Burnham Park), weekend markets, and an abundance of cafés and pine-lined streets.",
      culture: "A mix of indigenous Cordilleran culture and urban Filipino influence. Support local handicrafts, and be mindful in heritage areas.",
      tips: [
        "Layer your clothing — mornings/evenings are cool.",
        "Try local strawberry preserves and ukay-ukay (thrift stalls).",
        "Visit weekday mornings to avoid weekend crowds at Burnham Park."
      ],
      cautions: [
        "Traffic can be heavy on holiday weekends; plan travel time accordingly.",
        "Altitude is mild but bring any medications you need."
      ]
    },

    // ... other destinations (images arrays, etc.)
    cebu: {
      title: "Cebu — History & Waterfalls",
      images: ["images/cebu.jpg", "images/cebu-2.jpg","images/cebu-3.jpg","images/cebu-4.jpg","images/cebu-5.jpg"],
      tag: "City & Nature",
      about: "Cebu blends historical sites in the city with nearby waterfalls, diving spots and northern beaches.",
      culture: "Cebuano language is widely spoken; visitors will find festive fiestas and strong culinary traditions (lechon).",
      tips: [
        "Explore both Cebu City sights and nearby natural attractions like Kawasan Falls.",
        "Public transpo is affordable; ride-hailing apps are also available.",
        "Sample local cuisine — try lechon and sutukil seafood."
      ],
      cautions: [
        "Beware of strong currents at some beach spots; follow lifeguard advice.",
        "Avoid flaunting valuables in crowded urban areas."
      ]
    },

    bohol: {
      title: "Bohol — Chocolate Hills & Tarsiers",
      images: ["images/bohol.jpg", "images/bohol-2.jpg","images/bohol-3.jpg","images/bohol-4.jpg"],
      tag: "Nature & Wildlife",
      about: "Bohol is known for the Chocolate Hills, the tiny tarsier primates, and slow river cruises on the Loboc River.",
      culture: "Locals are friendly and family-oriented; eco-tourism is important — choose ethical wildlife encounters.",
      tips: [
        "Visit tarsier sanctuaries that follow ethical viewing rules (no flash, quiet).",
        "Renting a scooter or hiring a guide is an easy way to see Chocolate Hills and nearby sites."
      ],
      cautions: [
        "Tarsiers are sensitive — do not touch or use flash photography.",
        "Roads outside main towns can be narrow — drive carefully."
      ]
    },
    vigan: {
  title: "Vigan — Spanish Colonial Heritage",
  images: ["images/vigan.jpg", "images/vigan-2.jpg","images/vigan-3.jpg","images/vigan-4.jpg"],
  tag: "History & Culture",
  about: "Vigan is known for well-preserved Spanish architecture, cobblestone streets, and cultural museums.",
  culture: "Local craftsmanship, weaving, and pottery remain important.",
  tips: [
    "Try a kalesa ride along Calle Crisologo.",
    "Visit the Syquia Mansion and Pagburnayan pottery shop."
  ],
  cautions: [
    "Streets can be crowded at night — go early for photos.",
    "Some museums have entrance fees — bring small bills."
  ]
},
siquijor: {
  title: "Siquijor — Mystical Island of Healing",
  images: ["images/siquijor.jpg", "images/siquijor-2.jpg", "images/siquijor-3.jpg","images/siquijor-4.jpg"],
  tag: "Beaches & Folklore",
  about: "Known for its clear beaches, waterfalls, and mystical healing traditions passed down through generations.",
  culture: "Locals are warm and approachable; folklore adds charm without affecting daily life.",
  tips: [
    "Visit Cambugahay Falls and Salagdoong Beach.",
    "Rent a scooter to circle the entire island in a day."
  ],
  cautions: [
    "Some roads are steep — drive safely.",
    "Respect local traditions and healing practices."
  ]
},
batanes: {
  title: "Batanes — Rolling Hills & Stone Houses",
  images: ["images/batanes.jpg", "images/batanes-2.jpg","images/batanes-3.jpg","images/batanes-4.jpg"],
  tag: "Nature & Culture",
  about: "Batanes is loved for its surreal landscapes, stone houses, and peaceful lifestyle far from the city.",
  culture: "Ivatans are known for honesty — some towns even have unmanned 'Honesty Stores'.",
  tips: [
    "Visit Marlboro Hills and Vayang Rolling Hills.",
    "Rent a bike or hire a guide to explore different islands."
  ],
  cautions: [
    "Flights are weather-dependent — delays are common.",
    "Bring cash; ATMs are limited."
  ]
},
banaue: {
  title: "Banaue — Rice Terraces of the Ifugao",
  images: ["images/banaue.jpg", "images/banaue-2.jpg", "images/banaue-3.jpg"],
  tag: "Indigenous Culture & Nature",
  about: "Home to the UNESCO-listed Banaue Rice Terraces, carved by the Ifugao people over 2,000 years ago.",
  culture: "Ifugao communities preserve rice-farming traditions and indigenous craftsmanship.",
  tips: [
    "Hike to Batad for postcard-worthy views.",
    "Hire local guides to support community tourism."
  ],
  cautions: [
    "Expect long travel time from Manila.",
    "Trails can be muddy after rain — wear sturdy shoes."
  ]
},
apo: {
    title: "Mount Apo — The Highest Peak in the Philippines",
    images: ["images/apo.jpg", "images/apo-2.jpg", "images/apo-3.jpg"],
    tag: "Nature & Hiking",
    about: "Mount Apo is a Philippine trekking icon, offering challenging trails, mossy forests, and volcanic landscapes.",
    culture: "Indigenous tribes near Mt. Apo consider the mountain sacred.",
    tips: [
      "Hire accredited guides for a safe climb.",
      "Prepare physically — the hike takes 2–3 days."
    ],
    cautions: [
      "Weather is unpredictable; pack warm gear.",
      "Trails may close during conservation periods."
    ]
  },
  zambales: {
    title: "Zambales — Beaches, Coves & Camping",
    images: ["images/zambales.jpg", "images/zambales-2.jpg", "images/zambales-3.jpg", "images/zambales-4.jpg"],
    tag: "Adventure & Camping",
    about: "Zambales is known for Anawangin and Nagsasa Coves, formed by volcanic ash from Mt. Pinatubo.",
    culture: "Locals guide island-hopping and camping tours.",
    tips: [
      "Try overnight camping for stargazing.",
      "Add Capones Lighthouse to your island tour."
    ],
    cautions: [
      "Some coves have no signal — prepare accordingly.",
      "Waters can get rough depending on weather."
    ]
  },
  camiguin: {
    title: "Camiguin — The Island Born of Fire",
    images: ["images/camiguin.jpg", "images/camiguin-2.jpg", "images/camiguin-3.jpg", "images/camiguin-4.jpg", "images/camiguin-5.jpg"],
    tag: "Volcanoes & Natural Springs",
    about: "Camiguin offers volcanoes, hot and cold springs, waterfalls, and the famous White Island sandbar.",
    culture: "Locals celebrate Lanzones Festival every October.",
    tips: [
      "Visit White Island early for clear views of Mt. Hibok-Hibok.",
      "Experience both the hot and cold springs."
    ],
    cautions: [
      "No shade in White Island — bring sun protection.",
      "Weather can affect boat schedules."
    ]
  },
  tagaytay: {
    title: "Tagaytay — Taal Volcano Viewpoint",
    images: ["images/tagaytay.jpg", "images/tagaytay-2.jpg", "images/tagaytay-3.jpg"],
    tag: "Scenic Views & Food Trips",
    about: "Tagaytay offers cool weather, scenic views of Taal Volcano, and popular restaurants.",
    culture: "Known as a relaxing weekend getaway.",
    tips: [
      "Best visited on weekdays to avoid crowds.",
      "Try bulalo, tawilis, and local pastries."
    ],
    cautions: [
      "Fog can limit visibility.",
      "Heavy traffic during weekends."
    ]
  },
  davao: {
    title: "Davao — Clean & Green City",
    images: ["images/davao.jpg", "images/davao-2.jpg", "images/davao-3.jpg", "images/davao-4.jpg"],
    tag: "Culture & Nature",
    about: "Home to Mount Apo, Philippine Eagle Center, and Samal Island beaches.",
    culture: "Locals value discipline; smoking areas and rules are strictly implemented.",
    tips: [
      "Visit Eden Nature Park and Eagle Center.",
      "Take a short trip to Samal Island."
    ],
    cautions: [
      "Follow local ordinances — rules are strict.",
      "Be careful around protected wildlife zones."
    ]
  },
   iloilo: {
    title: "Iloilo & Guimaras — Heritage & Mango Islands",
    images: ["images/iloilo.jpg", "images/iloilo-2.jpg", "images/iloilo-3.jpg"],
    tag: "Food & Heritage",
    about: "Iloilo features heritage mansions and churches, while Guimaras is famous for sweet mangoes.",
    culture: "Ilonggos are known for being gentle and soft-spoken.",
    tips: [
      "Try La Paz Batchoy and visit Molo Mansion.",
      "Take a boat to Guimaras for mango farms."
    ],
    cautions: [
      "Outdoor attractions can be hot — visit early.",
      "Crowds increase during Dinagyang Festival."
    ]
  },

  aporeef: {
  title: "Apo Reef — The Largest Coral Reef System in the Philippines",
  images: ["images/aporeef.jpg", "images/aporeef-2.jpg", "images/aporeef-3.jpg", "images/aporeef-4.jpg"],
  tag: "Diving & Marine Life",
  about: "Apo Reef Natural Park is one of the world’s top diving destinations, known for its crystal-clear waters, vibrant corals, sharks, turtles, and massive reef walls.",
  culture: "The reef is a protected marine sanctuary — local communities and rangers work to preserve its biodiversity.",
  tips: [
    "Best visited with organized tours from Sablayan, Occidental Mindoro.",
    "Ideal for certified divers — the reef offers deep walls and strong currents."
  ],
  cautions: [
    "Strictly follow park rules — no touching corals and no anchoring on reefs.",
    "Limited facilities on the island; bring essentials like water and sun protection."
  ]
}

    // other destination entries unchanged...
  };

  // Modal elements (from destinations.html)
  const destModal = document.getElementById('destModal');
  const destModalImage = document.getElementById('modalImage');
  const destModalTitle = document.getElementById('modalTitle');
  const destModalAbout = document.getElementById('modalAbout');
  const destModalCulture = document.getElementById('modalCulture');
  const destModalTips = document.getElementById('modalTips');
  const destModalTag = document.getElementById('modalTag');
  const destModalThumbs = document.getElementById('modalThumbs');
  const modalPrevBtn = document.getElementById('modalPrev');
  const modalNextBtn = document.getElementById('modalNext');

  // state for current images
  let currentImages = [];
  let currentIndex = 0;

  // Helper: clear thumbnails
  function clearThumbs() {
    if (!destModalThumbs) return;
    destModalThumbs.innerHTML = '';
  }

  // Helper: set main image and update active thumb
  function setMainImageByIndex(index) {
    if (!destModalImage) return;
    if (!Array.isArray(currentImages) || currentImages.length === 0) {
      destModalImage.src = '';
      destModalImage.alt = '';
      return;
    }
    // wrap index
    currentIndex = ((index % currentImages.length) + currentImages.length) % currentImages.length;
    const src = currentImages[currentIndex];
    destModalImage.src = src || '';
    destModalImage.alt = destModalTitle.textContent || '';

    // update active thumb highlight
    if (destModalThumbs) {
      const thumbs = destModalThumbs.querySelectorAll('img');
      thumbs.forEach(t => t.classList.remove('active'));
      const active = destModalThumbs.querySelector(`img[data-index="${currentIndex}"]`);
      if (active) active.classList.add('active');
    }
  }

  // Helper: create thumbnail elements and wire click to change main image
  function populateThumbs(images) {
    clearThumbs();
    if (!Array.isArray(images) || !destModalThumbs) return;
    images.forEach((src, idx) => {
      const t = document.createElement('img');
      t.src = src;
      t.alt = `Photo ${idx + 1}`;
      t.dataset.index = idx;
      t.addEventListener('click', () => {
        setMainImageByIndex(idx);
      });
      destModalThumbs.appendChild(t);
    });
    // mark first active if exists
    const first = destModalThumbs.querySelector('img');
    if (first) first.classList.add('active');
  }

  function openDestModal(id) {
    const data = destinationsData[id];
    if (!data || !destModal) return;
    destModalTitle.textContent = data.title || '';
    destModalTag.textContent = data.tag || '';
    destModalTag.style.display = data.tag ? 'inline-block' : 'none';
    destModalAbout.textContent = data.about || '';
    destModalCulture.textContent = data.culture || '';

    // images: use images[] array
    currentImages = Array.isArray(data.images) && data.images.length ? data.images.slice() : (data.image ? [data.image] : []);
    if (currentImages.length) {
      populateThumbs(currentImages);
      setMainImageByIndex(0);
    } else {
      clearThumbs();
      setMainImageByIndex(0);
    }

    destModalTips.innerHTML = '';
    if (Array.isArray(data.tips)) {
      data.tips.forEach(t => {
        const li = document.createElement('li');
        li.textContent = t;
        destModalTips.appendChild(li);
      });
    }
    if (Array.isArray(data.cautions)) {
      data.cautions.forEach(c => {
        const li = document.createElement('li');
        li.textContent = c;
        destModalTips.appendChild(li);
      });
    }

    destModal.classList.add('open');
    destModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // focus close button briefly
    const closeBtn = destModal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeDestModal() {
    if (!destModal) return;
    destModal.classList.remove('open');
    destModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // next / prev handlers
  function showNextImage() {
    if (!currentImages || currentImages.length === 0) return;
    setMainImageByIndex(currentIndex + 1);
  }
  function showPrevImage() {
    if (!currentImages || currentImages.length === 0) return;
    setMainImageByIndex(currentIndex - 1);
  }

  // Attach click handlers to destination cards (only if they exist on the page)
  const destCards = document.querySelectorAll('.dest-card');
  if(destCards.length && destModal){
    destCards.forEach(card => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        if (id) openDestModal(id);
      });
    });

    // close modal on overlay click or close button
    destModal.addEventListener('click', (e) => {
      if (e.target.matches('[data-close]') || e.target.classList.contains('modal-close')) {
        closeDestModal();
      }
    });

    // wire arrows
    if (modalPrevBtn) modalPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showPrevImage();
    });
    if (modalNextBtn) modalNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showNextImage();
    });

    // keyboard handling: ESC to close, left/right to navigate images
    document.addEventListener('keydown', (e) => {
      if (!destModal.classList.contains('open')) return;
      if (e.key === 'Escape') {
        closeDestModal();
      } else if (e.key === 'ArrowRight') {
        showNextImage();
      } else if (e.key === 'ArrowLeft') {
        showPrevImage();
      }
    });
  }

});