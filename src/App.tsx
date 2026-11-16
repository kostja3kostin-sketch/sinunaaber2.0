import React, { useState, useEffect } from 'react';
import { 
  Users, MapPin, Search, Plus, List, 
  Compass, ArrowRight, X, User, Star, Award, MessageSquare, Bot, Euro, Camera, RotateCcw, Menu, MessageCircle, Sparkles, Clock, LogOut, LogIn, UserPlus, Upload, Phone, Mail, Calendar, ExternalLink
} from 'lucide-react';
import { supabase } from './supabaseClient';
import { Analytics } from "@vercel/analytics/react";
export default function App() {
  const [activeTab, setActiveTab] = useState<'map' | 'list' | 'showcase'>('map');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedSubDistrict, setSelectedSubDistrict] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPaymentFilter, setSelectedPaymentFilter] = useState<'all' | 'free' | 'hourly' | 'fixed'>('all');
  
  const [currentLang, setCurrentLang] = useState<'et' | 'en' | 'ru'>('et');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [activePopupRegion, setActivePopupRegion] = useState<string | null>(null);
  const [selectedListingDetail, setSelectedListingDetail] = useState<any | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [activeFooterModal, setActiveFooterModal] = useState<'allRequests' | 'addListing' | 'howItWorks' | 'safety' | 'terms' | 'privacy' | 'cookies' | null>(null);

  const [viewingNeighborName, setViewingNeighborName] = useState<string | null>(null);
  const [ratingTargetName, setRatingTargetName] = useState<string | null>(null);

  const [isAddShowcaseModalOpen, setIsAddShowcaseModalOpen] = useState(false);
  const [showcaseTitle, setShowcaseTitle] = useState('');
  const [showcaseImage, setShowcaseImage] = useState('');
  const [showcaseDesc, setShowcaseDesc] = useState('');

  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [chatMode, setChatMode] = useState<'messages' | 'ai'>('messages');
  const [greetingStyle, setGreetingStyle] = useState<'casual' | 'formal' | 'friendly'>('casual');

  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; phone?: string; role?: string } | null>({
    name: 'Mari Tamm',
    email: 'mari.tamm@example.com',
    phone: '+372 555 1234',
    role: 'Kogukonna vabatahtlik'
  });

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regRole, setRegRole] = useState('Kogukonna liige');

  const translations = {
    et: {
      subtitle: 'Kogukonna hooliv abivõrgustik',
      regionsTab: 'Piirkonnad',
      listTab: 'Nimekiri',
      showcaseTab: 'Fotosein',
      messages: 'Sõnumid',
      aiHelper: 'AI Abiline',
      addListing: 'Lisa kuulutus',
      heroTitle: 'Leia abi või paku oma oskusi naabritele!',
      heroSub: 'Vali kas tasuta kogukondlik abi, tunnitasu või fikseeritud maksega teenus.',
      paymentTypeLabel: 'Maksetüüp:',
      all: 'Kõik',
      freePayment: '🌱 Tasuta',
      hourlyPayment: '⏱️ Tunnitasu',
      fixedPayment: '💶 Fikseeritud',
      regionLabel: 'Linn / Maakond',
      subDistrictLabel: 'Linnaosa / Piirkond',
      allRegions: 'Kõik piirkonnad',
      allSubDistricts: 'Kõik linnaosad',
      categoryLabel: 'Kategooria',
      allCategories: 'Kõik kategooriad',
      searchLabel: 'Kiirotsing',
      searchPlaceholder: 'Otsi märksõna järgi...',
      clearFilters: 'Tühjenda filtrid',
      regionsHeader: 'Eesti Piirkonnad',
      viewListings: 'Vaata kuulutusi',
      activeListings: 'Aktiivsed kuulutused',
      offerHelp: 'Pakun abi',
      requestHelp: 'Otsin abi',
      write: 'Kirjuta',
      openDetails: 'Vaata lähemalt',
      listingDetailsTitle: 'Kuulutuse üksikasjad',
      authorInfoTitle: 'Kuulutuse autor',
      contactInfoTitle: 'Üldinfo ja kontaktid',
      neighborListingsTitle: 'Selle naabri aktiivsed kuulutused',
      noNeighborListings: 'Sellel naabril pole hetkel teisi aktiivseid kuulutusi.',
      joinedLabel: 'Liitunud:',
      showcaseHeader: 'Tehtud tööd',
      showcaseSub: 'Jaga pilte ja infot tehtud töödest!',
      addPhotoOrAd: 'Lisa pilt ja tekst',
      adBadge: 'Tehtud töö',
      viewProfile: 'Vaata profiili',
      footerDesc: 'Eesti suurim kogukondlik abikäte ja mikro-teenuste vahendusplatvorm. Hoiame kokku ja aitame teineteist!',
      quickLinks: 'Kiirlingid',
      allRequestsLink: 'Kõik abipalved',
      howItWorksLink: 'Kuidas töötab?',
      safetyLink: 'Turvalisus ja ohutus',
      popularRegions: 'Populaarsed piirkonnad',
      contactSupport: 'Kontakt & Tugi',
      allRights: 'Kõik õigused kaitstud.',
      terms: 'Kasutustingimused',
      privacy: 'Privaatsuspoliitika',
      cookies: 'Küpsiste seaded',
      close: 'Sulge',
      logout: 'Logi välja',
      login: 'Logi sisse',
      register: 'Registreeru',
      registerModalTitle: 'Loo SinuNaabri konto',
      registerModalSub: 'Liitu Eesti suurima kogukonna abivõrgustikuga!',
      nameLabel: 'Sinu nimi',
      namePlaceholder: 'Nt. Jaan Tamme',
      emailLabel: 'E-posti aadress',
      emailPlaceholder: 'jaan@example.com',
      roleLabel: 'Millega soovid panustada?',
      roleOption1: 'Kogukonna vabatahtlik / Abiline',
      roleOption2: 'Otsin abi ja teenuseid',
      roleOption3: 'Kohalik teenusepakkuja / Meistrimees',
      completeRegister: 'Loo konto ja alusta',
      
      addModalTitle: 'Lisa uus kuulutus',
      titleLabel: 'Kuulutuse pealkiri',
      titlePlaceholder: 'Nt. Muru niitmine...',
      descriptionLabel: 'Lisainfo ja üksikasjad',
      descriptionPlaceholder: 'Kirjelda siin täpsemalt oma abipalvet või teenust...',
      typeLabel: 'Tüüp',
      amountLabel: 'Summa (€)',
      cancel: 'Loobu',
      saveListing: 'Salvesta kuulutus',
      
      showcaseModalTitle: 'Lisa teostatud töö',
      showcaseTitleLabel: 'Töö pealkiri',
      showcaseTitlePlaceholder: 'Nt. Muru niitmine Nõmmel...',
      uploadImageLabel: 'Laadi pilt arvutist üles (valikuline)',
      uploadImageBtnText: 'Vali pildifail seadmest...',
      orUrlLabel: 'Või sisesta pildi URL:',
      orUrlPlaceholder: 'https://images.unsplash.com/...',
      descLabel: 'Töö kirjeldus',
      descPlaceholder: 'Kirjelda lühidalt, mis töö sai tehtud...',
      postBtn: 'Lisapostitus',
      
      footerAllReqTitle: 'Kõik abipalved ja pakkumised SinuNaabris',
      footerAllReqLead: 'SinuNaaber.ee on loodud selleks, et viia kokku abivajajad ja vabatahtlikud või kohalikud teenusepakkujad üle terve Eesti. Meie platvorm jaguneb kaheks peamiseks suunaks:',
      footerFreeHelp: '🌱 Tasuta Naabriabi (Heategu kogukonnale)',
      footerFreeHelpDesc: 'See kategooria on mõeldud puhtalt naabritevaheliseks vastastikuseks abistamiseks ilma rahalise tasuta. Näited: vanemale naabrile puude ladustamine, muru niitmine, lemmiklooma hoid lühiajaliselt hädaolukorras, tassitäie suhkru või tööriista laenamine.',
      footerMicroServ: '⏱️ Mikroteenused ja kokkuleppelised tasud',
      footerMicroServDesc: 'Kui vajad spetsialistide abi või suuremat tööd, saad valida tunnitasu või fikseeritud makse. Näiteks kiired torutööd, elektriku abi, raskema mööbli kolimine kaubikuga või suurem kodune remont.',
      
      footerHowItWorksTitle: 'Põhjalik juhend: Kuidas SinuNaaber toimib?',
      footerHowItWorksLead: 'Platvormi kasutamine on kiire, turvaline ja lihtne kõigile Eesti elanikele. Järgi neid nelja lihtsat sammu:',
      footerHowStep1Title: '1. Vali piirkond ja registreeru',
      footerHowStep1Desc: 'Määra ülemisest paneelist või otsingust oma linn ja linnaosa (nt Tallinn, Nõmme). Loo oma profiil, lisa lühike kirjeldus endast ja oma oskustest.',
      footerHowStep2Title: '2. Sirvi olemasolevaid kuulutusi',
      footerHowStep2Desc: 'Vaata, millist abi su naabrid otsivad või milliseid teenuseid pakutakse. Saad filtreerida kuulutusi kategooriate (aiatööd, remont, transport jt) ja maksetüüpide järgi.',
      footerHowStep3Title: '3. Lisa oma abipalve või pakkumine',
      footerHowStep3Desc: 'Kui vajad ise abi või soovid oma oskusi teistele pakkuda, klõpsa nupule „Lisa kuulutus“, täida andmed, lisa soovi korral pilt ja avalda see ühe klõpsuga.',
      footerHowStep4Title: '4. Suhtle turvaliselt ja lepi kokku',
      footerHowStep4Desc: 'Kasuta naabriga ühenduse võtmiseks platvormi sisemist sõnumikeskust. Leppige kokku täpne aeg, tingimused ja teostus ning pärast töö valmimist anna naabrile aus tagasiside ja hinnang.',

      footerSafetyTitle: 'Turvalisus, ohutus ja usaldusväärsus',
      footerSafetyLead: 'Sinu ja kogu kogukonna turvalisus on SinuNaabri jaoks absoluutne prioriteet. Meie platvorm on ehitatud üles usaldusele:',
      footerSafetyPoint1: 'Kontrolli alati profiili ja arvustusi: Enne kellegagi kokkuleppimist vaata naabri varasemaid hinnanguid, tärne ja kogukonna märke (nt „Naabriabi Pioneer“ või „Viie Tärni Meistrimees“).',
      footerSafetyPoint2: 'Kasuta alati sisemist sõnumikeskust: Ära jaga esimesel hetkel liiga tundlikke isikuandmeid ega panganduse andmeid. Kogu esmane suhtlus toimub turvaliselt platvormi siseselt.',
      footerSafetyPoint3: 'Aus tagasiside süsteem: Pärast iga tehingut või abi osutamist saavad mõlemad pooled jätta ausa tagasiside ja tärnid, mis hoiab kogukonna puhtana ja usaldusväärsena.',

      footerTermsTitle: 'SinuNaaber.ee Platvormi Kasutustingimused',
      footerTermsDesc1: '1. Üldsätted: SinuNaaber.ee on digitaalne vahendusplatvorm, mis ühendab kohalikke elanikke abipalvete ja teenuste pakkumistega. Platvorm ei ole ise teenuse osutaja ega tööandja.',
      footerTermsDesc2: '2. Kasutaja kohustused: Kasutaja kohustub sisestama ainult korrektseid, tõeseid ja seadusega lubatud andmeid. Keelatud on solvava, ohtliku või eksitava sisu avaldamine.',
      footerTermsDesc3: '3. Vastutus: Kasutajad vastutavad ise omavaheliste kokkulepete, ohutusnõuete täitmise ja võimalike maksude või tasude deklareerimise eest.',

      footerPrivacyTitle: 'Privaatsuspoliitika ja Andmekaitse',
      footerPrivacyDesc1: '1. Kogutavad andmed: Kogume ainult neid andmeid, mis on hädavajalikud platvormi toimimiseks (nimi, e-post, telefon, piirkond ja teie sisestatud kuulutused/arvustused).',
      footerPrivacyDesc2: '2. Andmete kaitse: Teie isikuandmeid hoitakse turvaliselt ning neid ei antud kunagi edasi kolmandatele osapooltele ärilistel eesmärkidel.',
      footerPrivacyDesc3: '3. Õigused: Teil on igal ajal õigus nõuda oma andmete muutmist või täielikku kustutamist süsteemist.',

      footerCookiesTitle: 'Küpsiste (Cookies) poliitika ja haldus',
      footerCookiesDesc1: '1. Mis on küpsised?: Küpsised on väikesed tekstifailid, mis salvestatakse teie seadmesse, et tagada veebilehe korrektne ja kiire töö.',
      footerCookiesDesc2: '2. Vajalikud küpsised: Kasutame hädavajalikke seansiküpsiseid, mis peavad meeles teie keelevalikut (EST/ENG/RUS), aktiivset vahekaarti ja sisselogitud olekut.',
      footerCookiesDesc3: '3. Kolmanda osapoole küpsised: Me ei kasuta agressiivseid jälgimisküpsiseid ega müü teie veebikäitumise andmeid reklaamivõrgustikele.',

      subCategoryLabel: 'Alategooria',
      chatHubTitle: 'Suhtluskeskus',
      neighborsTab: 'Naabrid',
      aiGreetingStyleLabel: 'AI tervituse stiil:',
      styleCasual: '😎 Sõbralik "Tsau!"',
      styleFriendly: '🤝 Soe "Hei naaber!"',
      styleFormal: '💼 Asjalik "Tere!"',
      onlineStatus: '🟢 Online',
      offlineStatus: 'Viimati aktiivne: 15 min tagasi',
      chatWithNeighbor: 'Vestlus naabriga:',
      generalInquiry: 'Üldine päring',
      aiHelperName: 'SinuNaabri AI Abiline',
      typeMessagePlaceholder: 'Kirjuta sõnum...',
      typeAiPlaceholder: 'Küsi AI-abiliselt...',
      sendBtn: 'Saada',
      timeKeys: {
        justNow: 'Just nüüd',
        hoursAgo2: '2 tundi tagasi',
        hoursAgo3: '3 tundi tagasi',
        hoursAgo5: '5 tundi tagasi',
        yesterday: 'Eile',
        daysAgo3: '3 päeva tagasi'
      },
      categories: {
        gardening: 'Aiatööd',
        repairs: 'Remonttööd',
        transport: 'Transport',
        pets: 'Loomad',
        home: 'Kodu',
        snow: 'Lumelükkamine',
        other: 'Muu'
      },
      subCategories: {
        lawnMowing: 'Muru niitmine',
        woodSplitting: 'Puude lõhkumine',
        leaves: 'Lehtede riisumine',
        generalGarden: 'Üldine aiatöö',
        plumbing: 'Sanitaartehnilised tööd',
        electrical: 'Elektritööd',
        painting: 'Viimistlus ja värvimine',
        generalRepair: 'Üldine remont',
        construction: 'Ehitus/Pisiremont',
        cargo: 'Kaubavedu',
        rideshare: 'Sõidu jagamine',
        movingHelp: 'Kolimisabi',
        carRepair: 'Autoremont',
        moving: 'Kolimine',
        dogWalking: 'Koera jalutamine',
        petSittingHome: 'Hoiukodu lemmikloomale',
        petSitting: 'Lemmiklooma hoid',
        petsGeneral: 'Lemmikloomad',
        boxes: 'Pappkastid / pakendamine',
        smallFixes: 'Väikesed parandustööd',
        cleaning: 'Koristusabi',
        groceries: 'Toidukaupade toomine',
        snowPlowing: 'Lumelükkamine',
        snowDrifts: 'Hangede koristus',
        otherServices: 'Muud abipalved ja teenused',
        communityNotice: 'Kogukondlik teavitus'
      }
    },
    en: {
      subtitle: 'Caring community help network',
      regionsTab: 'Regions',
      listTab: 'List',
      showcaseTab: 'Showcase',
      messages: 'Messages',
      aiHelper: 'AI Assistant',
      addListing: 'Add Listing',
      heroTitle: 'Find help or offer your skills to neighbors!',
      heroSub: 'Choose between free community help, hourly rate or fixed price service.',
      paymentTypeLabel: 'Payment type:',
      all: 'All',
      freePayment: '🌱 Free',
      hourlyPayment: '⏱️ Hourly',
      fixedPayment: '💶 Fixed',
      regionLabel: 'City / County',
      subDistrictLabel: 'District / Area',
      allRegions: 'All regions',
      allSubDistricts: 'All districts',
      categoryLabel: 'Category',
      allCategories: 'All categories',
      searchLabel: 'Quick Search',
      searchPlaceholder: 'Search by keyword...',
      clearFilters: 'Clear filters',
      regionsHeader: 'Estonian Regions',
      viewListings: 'View listings',
      activeListings: 'Active listings',
      offerHelp: 'Offering help',
      requestHelp: 'Looking for help',
      write: 'Message',
      openDetails: 'View details',
      listingDetailsTitle: 'Listing Details',
      authorInfoTitle: 'Listing Author',
      contactInfoTitle: 'General Info & Contacts',
      neighborListingsTitle: 'Active listings by this neighbor',
      noNeighborListings: 'This neighbor has no other active listings at the moment.',
      joinedLabel: 'Joined:',
      showcaseHeader: 'Completed Work',
      showcaseSub: 'Share photos and info about completed work!',
      addPhotoOrAd: 'Add photo and text',
      adBadge: 'Completed Work',
      viewProfile: 'View profile',
      footerDesc: 'Estonia’s largest community help and micro-service platform. Let’s stick together and help each other!',
      quickLinks: 'Quick Links',
      allRequestsLink: 'All requests',
      howItWorksLink: 'How it works?',
      safetyLink: 'Safety & Security',
      popularRegions: 'Popular Regions',
      contactSupport: 'Contact & Support',
      allRights: 'All rights reserved.',
      terms: 'Terms of Use',
      privacy: 'Privacy Policy',
      cookies: 'Cookie Settings',
      close: 'Close',
      logout: 'Log out',
      login: 'Log in',
      register: 'Register',
      registerModalTitle: 'Create SinuNaaber Account',
      registerModalSub: 'Join Estonia’s largest community help network!',
      nameLabel: 'Your name',
      namePlaceholder: 'e.g. John Doe',
      emailLabel: 'Email address',
      emailPlaceholder: 'john@example.com',
      roleLabel: 'How do you want to contribute?',
      roleOption1: 'Community volunteer / Helper',
      roleOption2: 'Looking for help and services',
      roleOption3: 'Local service provider / Handyman',
      completeRegister: 'Create account and start',
      
      addModalTitle: 'Add New Listing',
      titleLabel: 'Listing Title',
      titlePlaceholder: 'e.g. Lawn mowing...',
      descriptionLabel: 'Additional details',
      descriptionPlaceholder: 'Describe your request or service in more detail...',
      typeLabel: 'Type',
      amountLabel: 'Amount (€)',
      cancel: 'Cancel',
      saveListing: 'Save Listing',
      
      showcaseModalTitle: 'Add Completed Work',
      showcaseTitleLabel: 'Work title',
      showcaseTitlePlaceholder: 'e.g. Lawn mowing in Nõmme...',
      uploadImageLabel: 'Upload image from computer (optional)',
      uploadImageBtnText: 'Select image file from device...',
      orUrlLabel: 'Or enter image URL:',
      orUrlPlaceholder: 'https://images.unsplash.com/...',
      descLabel: 'Work description',
      descPlaceholder: 'Briefly describe what was done...',
      postBtn: 'Post',
      
      footerAllReqTitle: 'All Help Requests and Offers on SinuNaaber',
      footerAllReqLead: 'SinuNaaber.ee is designed to connect people in need of help with volunteers or local service providers across Estonia. Our platform is split into two main directions:',
      footerFreeHelp: '🌱 Free Neighbor Help (Community Deed)',
      footerFreeHelpDesc: 'This category is intended purely for mutual neighborly assistance without financial compensation. Examples: stacking firewood for an elderly neighbor, mowing a lawn, short-term pet sitting in an emergency, or borrowing a cup of sugar or tool.',
      footerMicroServ: '⏱️ Micro-services & Agreed Fees',
      footerMicroServDesc: 'If you need professional help or larger tasks, you can choose hourly rates or fixed pricing. Examples include quick plumbing work, electrician help, van transport for furniture, or larger home repairs.',
      
      footerHowItWorksTitle: 'Comprehensive Guide: How SinuNaaber Works',
      footerHowItWorksLead: 'Using the platform is fast, safe, and simple for all residents in Estonia. Follow these four easy steps:',
      footerHowStep1Title: '1. Select region and register',
      footerHowStep1Desc: 'Set your city and district from the top bar or search (e.g. Tallinn, Nõmme). Create your profile, add a brief description of yourself and your skills.',
      footerHowStep2Title: '2. Browse existing listings',
      footerHowStep2Desc: 'Check what help your neighbors are looking for or what services are offered. Filter listings by categories (gardening, repairs, transport, etc.) and payment types.',
      footerHowStep3Title: '3. Add your request or offer',
      footerHowStep3Desc: 'If you need help or want to offer your skills to others, click "Add Listing", fill in details, attach a photo if desired, and publish with one click.',
      footerHowStep4Title: '4. Communicate safely and agree',
      footerHowStep4Desc: 'Use the platform\'s internal messaging hub to connect with your neighbor. Agree on the exact time, terms, and execution, and leave honest feedback and ratings after completion.',

      footerSafetyTitle: 'Safety, Security and Reliability',
      footerSafetyLead: 'Your safety and the safety of the entire community is an absolute priority for SinuNaaber. Our platform is built on trust:',
      footerSafetyPoint1: 'Always check profile and reviews: Before agreeing with anyone, review their past ratings, stars, and community badges (e.g. "Neighbor Help Pioneer" or "Five Star Handyman").',
      footerSafetyPoint2: 'Always use the internal messaging hub: Do not share sensitive personal info or banking details prematurely. All initial communication remains secure within the platform.',
      footerSafetyPoint3: 'Fair feedback system: After every transaction or help provided, both parties can leave honest feedback and stars, keeping the community clean and reliable.',

      footerTermsTitle: 'SinuNaaber.ee Platform Terms of Use',
      footerTermsDesc1: '1. General provisions: SinuNaaber.ee is a digital mediation platform connecting local residents with help requests and service offers. The platform is not a service provider or employer itself.',
      footerTermsDesc2: '2. User obligations: Users agree to enter only accurate, truthful, and lawfully permitted data. Publishing offensive, dangerous, or misleading content is strictly prohibited.',
      footerTermsDesc3: '3. Liability: Users are personally responsible for their mutual agreements, compliance with safety regulations, and declaration of any taxes or fees.',

      footerPrivacyTitle: 'Privacy Policy and Data Protection',
      footerPrivacyDesc1: '1. Collected data: We collect only the data essential for the platform to function (name, email, phone, region, and your submitted listings/reviews).',
      footerPrivacyDesc2: '2. Data protection: Your personal data is kept secure and is never disclosed to third parties for commercial purposes.',
      footerPrivacyDesc3: '3. Rights: You have the right at any time to request modification or complete deletion of your data from the system.',

      footerCookiesTitle: 'Cookie Policy and Management',
      footerCookiesDesc1: '1. What are cookies?: Cookies are small text files stored on your device to ensure correct and fast website operation.',
      footerCookiesDesc2: '2. Essential cookies: We use essential session cookies that remember your language preference (EST/ENG/RUS), active tab, and login status.',
      footerCookiesDesc3: '3. Third-party cookies: We do not use aggressive tracking cookies or sell your browsing behavior data to advertising networks.',

      subCategoryLabel: 'Subcategory',
      chatHubTitle: 'Communication Hub',
      neighborsTab: 'Neighbors',
      aiGreetingStyleLabel: 'AI greeting style:',
      styleCasual: '😎 Casual "Hey!"',
      styleFriendly: '🤝 Warm "Hi neighbor!"',
      styleFormal: '💼 Formal "Hello!"',
      onlineStatus: '🟢 Online',
      offlineStatus: 'Last active: 15 min ago',
      chatWithNeighbor: 'Chat with neighbor:',
      generalInquiry: 'General inquiry',
      aiHelperName: 'SinuNaaber AI Assistant',
      typeMessagePlaceholder: 'Type a message...',
      typeAiPlaceholder: 'Ask AI assistant...',
      sendBtn: 'Send',
      timeKeys: {
        justNow: 'Just now',
        hoursAgo2: '2 hours ago',
        hoursAgo3: '3 hours ago',
        hoursAgo5: '5 hours ago',
        yesterday: 'Yesterday',
        daysAgo3: '3 days ago'
      },
      categories: {
        gardening: 'Gardening',
        repairs: 'Repairs',
        transport: 'Transport',
        pets: 'Pets',
        home: 'Home',
        snow: 'Snow removal',
        other: 'Other'
      },
      subCategories: {
        lawnMowing: 'Lawn mowing',
        woodSplitting: 'Wood splitting',
        leaves: 'Raking leaves',
        generalGarden: 'General gardening',
        plumbing: 'Plumbing',
        electrical: 'Electrical work',
        painting: 'Painting & Finishing',
        generalRepair: 'General repairs',
        construction: 'Construction/Minor fix',
        cargo: 'Cargo transport',
        rideshare: 'Ride sharing',
        movingHelp: 'Moving help',
        carRepair: 'Car repair',
        moving: 'Moving',
        dogWalking: 'Dog walking',
        petSittingHome: 'Pet hosting',
        petSitting: 'Pet sitting',
        petsGeneral: 'Pets',
        boxes: 'Boxes / packaging',
        smallFixes: 'Small repairs',
        cleaning: 'Cleaning assistance',
        groceries: 'Grocery delivery',
        snowPlowing: 'Snow plowing',
        snowDrifts: 'Snow drift cleanup',
        otherServices: 'Other requests & services',
        communityNotice: 'Community notice'
      }
    },
    ru: {
      subtitle: 'Заботливая сеть взаимопомощи соседей',
      regionsTab: 'Регионы',
      listTab: 'Список',
      showcaseTab: 'Галерея',
      messages: 'Сообщения',
      aiHelper: 'ИИ Помощник',
      addListing: 'Добавить объявление',
      heroTitle: 'Найдите помощь или предложите свои навыки соседям!',
      heroSub: 'Выбирайте бесплатную соседскую помощь, почасовую оплату или фиксированную цену.',
      paymentTypeLabel: 'Тип оплаты:',
      all: 'Все',
      freePayment: '🌱 Бесплатно',
      hourlyPayment: '⏱️ Почасово',
      fixedPayment: '💶 Фиксировано',
      regionLabel: 'Город / Регион',
      subDistrictLabel: 'Район / Округ',
      allRegions: 'Все регионы',
      allSubDistricts: 'Все районы',
      categoryLabel: 'Категория',
      allCategories: 'Все категории',
      searchLabel: 'Быстрый поиск',
      searchPlaceholder: 'Поиск по ключевому слову...',
      clearFilters: 'Сбросить фильтры',
      regionsHeader: 'Регионы Эстонии',
      viewListings: 'Смотреть объявления',
      activeListings: 'Активные объявления',
      offerHelp: 'Предлагаю помощь',
      requestHelp: 'Ищу помощь',
      write: 'Написать',
      openDetails: 'Подробнее',
      listingDetailsTitle: 'Подробности объявления',
      authorInfoTitle: 'Автор объявления',
      contactInfoTitle: 'Общая информация и контакты',
      neighborListingsTitle: 'Активные объявления этого соседа',
      noNeighborListings: 'У этого соседа пока нет других активных объявлений.',
      joinedLabel: 'На сайте с:',
      showcaseHeader: 'Выполненные работы',
      showcaseSub: 'Делитесь фотографиями и описанием выполненных работ!',
      addPhotoOrAd: 'Добавить фото и текст',
      adBadge: 'Выполненная работа',
      viewProfile: 'Профиль автора',
      footerDesc: 'Крупнейшая в Эстонии платформа соседской помощи и микроуслуг. Держимся вместе и помогаем друг другу!',
      quickLinks: 'Быстрые ссылки',
      allRequestsLink: 'Все запросы',
      howItWorksLink: 'Как это работает?',
      safetyLink: 'Безопасность',
      popularRegions: 'Популярные регионы',
      contactSupport: 'Контакт и поддержка',
      allRights: 'Все права защищены.',
      terms: 'Условия использования',
      privacy: 'Политика конфиденциальности',
      cookies: 'Настройки куки',
      close: 'Закрыть',
      logout: 'Выйти',
      login: 'Войти',
      register: 'Регистрация',
      registerModalTitle: 'Создать аккаунт SinuNaaber',
      registerModalSub: 'Присоединяйтесь к крупнейшей сети помощи соседей в Эстонии!',
      nameLabel: 'Ваше имя',
      namePlaceholder: 'Напр. Иван Петров',
      emailLabel: 'Эл. почта',
      emailPlaceholder: 'ivan@example.com',
      roleLabel: 'Как вы хотите участвовать?',
      roleOption1: 'Волонтер сообщества / Помощник',
      roleOption2: 'Ищу помощь и услуги',
      roleOption3: 'Местный поставщик услуг / Мастер',
      completeRegister: 'Создать аккаунт и начать',
      
      addModalTitle: 'Добавить новое объявление',
      titleLabel: 'Заголовок объявления',
      titlePlaceholder: 'Напр. Стрижка газона...',
      descriptionLabel: 'Дополнительная информация',
      descriptionPlaceholder: 'Опишите подробнее ваш запрос или услугу...',
      typeLabel: 'Тип',
      amountLabel: 'Сумма (€)',
      cancel: 'Отмена',
      saveListing: 'Сохранить объявление',
      
      showcaseModalTitle: 'Добавить выполненную работу',
      showcaseTitleLabel: 'Название работы',
      showcaseTitlePlaceholder: 'Напр. Стрижка газона в Нымме...',
      uploadImageLabel: 'Загрузить фото с компьютера (необязательно)',
      uploadImageBtnText: 'Выберите файл изображения с устройства...',
      orUrlLabel: 'Или введите URL изображения:',
      orUrlPlaceholder: 'https://images.unsplash.com/...',
      descLabel: 'Описание работы',
      descPlaceholder: 'Коротко опишите, какая работа была сделана...',
      postBtn: 'Опубликовать',
      
      footerAllReqTitle: 'Все запросы и предложения помощи на SinuNaaber',
      footerAllReqLead: 'SinuNaaber.ee создан для того, чтобы связывать людей, нуждающихся в помощи, с волонтерами и местными поставщиками услуг по всей Эстонии. Наша платформа делится на два основных направления:',
      footerFreeHelp: '🌱 Бесплатная соседская помощь (Доброе дело)',
      footerFreeHelpDesc: 'Эта категория предназначена исключительно для взаимной помощи соседей без финансовой компенсации. Примеры: укладка дров для пожилого соседа, стрижка газона, кратковременная передержка питомца в экстренной ситуации или одолжить сахар/инструмент.',
      footerMicroServ: '⏱️ Микроуслуги и договорная оплата',
      footerMicroServDesc: 'Если вам нужна помощь профессионалов или более крупная задача, вы можете выбрать почасовую или фиксированную оплату. Например: быстрый сантехнический ремонт, помощь электрика, перевозка мебели на фургоне или ремонт в доме.',
      
      footerHowItWorksTitle: 'Подробное руководство: Как работает SinuNaaber?',
      footerHowItWorksLead: 'Использование платформы быстрое, безопасное и простое для всех жителей Эстонии. Следуйте четырем простым шагам:',
      footerHowStep1Title: '1. Выберите регион и зарегистрируйтесь',
      footerHowStep1Desc: 'Укажите свой город и район в верхней панели или поиске (например, Таллинн, Нымме). Создайте профиль, добавьте краткое описание о себе и своих навыках.',
      footerHowStep2Title: '2. Просматривайте объявления',
      footerHowStep2Desc: 'Смотрите, какая помощь нужна вашим соседям или какие услуги предлагаются. Фильтруйте объявления по категориям (сад, ремонт, транспорт и др.) и типам оплаты.',
      footerHowStep3Title: '3. Добавьте свой запрос или предложение',
      footerHowStep3Desc: 'Если вам нужна помощь или вы хотите предложить свои навыки, нажмите кнопку «Добавить объявление», заполните данные, прикрепите фото и опубликуйте в один клик.',
      footerHowStep4Title: '4. Общайтесь безопасно и договаривайтесь',
      footerHowStep4Desc: 'Используйте внутренний центр сообщений платформы для связи с соседом. Договоритесь о точном времени, условиях и оставьте честный отзыв и оценку после завершения.',

      footerSafetyTitle: 'Безопасность, надежность и доверие',
      footerSafetyLead: 'Ваша безопасность и безопасность всего сообщества — абсолютный приоритет для SinuNaaber. Наша платформа построена на доверии:',
      footerSafetyPoint1: 'Всегда проверяйте профиль и отзывы: Прежде чем договариваться с кем-либо, изучите прошлые оценки соседа, звездный рейтинг и значки сообщества (например, «Пионер соседской помощи» или «Мастер 5 звезд»).',
      footerSafetyPoint2: 'Всегда используйте внутренний центр сообщений: Не делитесь конфиденциальными личными или банковскими данными преждевременно. Все первичное общение происходит безопасно внутри платформы.',
      footerSafetyPoint3: 'Честная система отзывов: После каждой сделки или оказанной помощи обе стороны могут оставить честный отзыв и звезды, что поддерживает чистоту и надежность сообщества.',

      footerTermsTitle: 'Условия использования платформы SinuNaaber.ee',
      footerTermsDesc1: '1. Общие положения: SinuNaaber.ee — это цифровая платформа-посредник, объединяющая местных жителей с запросами о помощи и предложениями услуг. Платформа не является поставщиком услуг или работодателем.',
      footerTermsDesc2: '2. Обязанности пользователя: Пользователь обязуется предоставлять только точные, правдивые и разрешенные законом данные. Запрещена публикация оскорбительного, опасного или вводящего в заблуждение контента.',
      footerTermsDesc3: '3. Ответственность: Пользователи несут личную ответственность за взаимные договоренности, соблюдение правил техники безопасности и декларирование возможных налогов или сборов.',

      footerPrivacyTitle: 'Политика конфиденциальности и защита данных',
      footerPrivacyDesc1: '1. Собираемые данные: Мы собираем только те данные, которые необходимы для работы платформы (имя, email, телефон, регион и поданные вами объявления/отзывы).',
      footerPrivacyDesc2: '2. Защита данных: Ваши персональные данные хранятся в безопасности и никогда не передаются третьим лицам в коммерческих целях.',
      footerPrivacyDesc3: '3. Права: Вы имеете право в любой момент потребовать изменения или полного удаления ваших данных из системы.',

      footerCookiesTitle: 'Политика в отношении файлов cookie',
      footerCookiesDesc1: '1. Что такое куки?: Куки — это небольшие текстовые файлы, сохраняемые на вашем устройстве для обеспечения корректной и быстрой работы сайта.',
      footerCookiesDesc2: '2. Необходимые куки: Мы используем необходимые сеансовые куки, которые запоминают ваш выбор языка (EST/ENG/RUS), активную вкладку и статус входа.',
      footerCookiesDesc3: '3. Куки третьих лиц: Мы не используем агрессивные трекеры и не продаем данные о вашем поведении рекламным сетям.',

      subCategoryLabel: 'Подкатегория',
      chatHubTitle: 'Центр общения',
      neighborsTab: 'Соседи',
      aiGreetingStyleLabel: 'ИИ стиль приветствия:',
      styleCasual: '😎 Дружелюбный "Привет!"',
      styleFriendly: '🤝 Теплый "Привет, сосед!"',
      styleFormal: '💼 Деловой "Здравствуйте!"',
      onlineStatus: '🟢 Онлайн',
      offlineStatus: 'Был в сети: 15 мин назад',
      chatWithNeighbor: 'Чат с соседом:',
      generalInquiry: 'Общий запрос',
      aiHelperName: 'ИИ Помощник SinuNaaber',
      typeMessagePlaceholder: 'Напишите сообщение...',
      typeAiPlaceholder: 'Спросите ИИ-помощника...',
      sendBtn: 'Отправить',
      timeKeys: {
        justNow: 'Только что',
        hoursAgo2: '2 часа назад',
        hoursAgo3: '3 часа назад',
        hoursAgo5: '5 часов назад',
        yesterday: 'Вчера',
        daysAgo3: '3 дня назад'
      },
      categories: {
        gardening: 'Садоводство',
        repairs: 'Ремонт',
        transport: 'Транспорт',
        pets: 'Животные',
        home: 'Дом',
        snow: 'Уборка снега',
        other: 'Другое'
      },
      subCategories: {
        lawnMowing: 'Стрижка газона',
        woodSplitting: 'Колка дров',
        leaves: 'Уборка листьев',
        generalGarden: 'Общие работы в саду',
        plumbing: 'Сантехнические работы',
        electrical: 'Электроработы',
        painting: 'Покраска и отделка',
        generalRepair: 'Общий ремонт',
        construction: 'Строительство/Мелкий ремонт',
        cargo: 'Грузоперевозки',
        rideshare: 'Совместные поездки',
        movingHelp: 'Помощь при переезде',
        carRepair: 'Ремонт машин',
        moving: 'Переезд',
        dogWalking: 'Выгул собак',
        petSittingHome: 'Передержка животных',
        petSitting: 'Уход за питомцами',
        petsGeneral: 'Домашние животные',
        boxes: 'Коробки / упаковка',
        smallFixes: 'Мелкий ремонт',
        cleaning: 'Уборка',
        groceries: 'Доставка продуктов',
        snowPlowing: 'Уборка снега',
        snowDrifts: 'Уборка сугробов',
        otherServices: 'Другие запросы и услуги',
        communityNotice: 'Объявление сообщества'
      }
    }
  }[currentLang];

  const categoryMap: Record<string, string[]> = {
    gardening: ['lawnMowing', 'woodSplitting', 'leaves', 'generalGarden'],
    repairs: ['plumbing', 'electrical', 'painting', 'generalRepair', 'construction'],
    transport: ['cargo', 'rideshare', 'movingHelp', 'carRepair', 'moving'],
    pets: ['dogWalking', 'petSittingHome', 'petSitting', 'petsGeneral'],
    home: ['boxes', 'smallFixes', 'cleaning', 'groceries'],
    snow: ['snowPlowing', 'snowDrifts'],
    other: ['otherServices', 'communityNotice']
  };

  const regions = [
    { 
      id: 'tallinn', 
      name: 'Tallinn', 
      county: 'Harjumaa', 
      desc: 'Pealinn ja lähiümbrus',
      subDistricts: [
        { id: 'kesklinn', name: 'Kesklinn' },
        { id: 'nomme', name: 'Nõmme' },
        { id: 'mustamae', name: 'Mustamäe' },
        { id: 'kristiine', name: 'Kristiine' },
        { id: 'lasnamae', name: 'Lasnamäe' },
        { id: 'pohja-tallinn', name: 'Põhja-Tallinn' },
        { id: 'haabersti', name: 'Haabersti' },
        { id: 'pirita', name: 'Pirita' }
      ]
    },
    { 
      id: 'tartu', 
      name: 'Tartu', 
      county: 'Tartumaa', 
      desc: 'Lõuna-Eesti keskus',
      subDistricts: [
        { id: 'kesklinn-tartu', name: 'Kesklinn' },
        { id: 'annelinn', name: 'Annelinn' },
        { id: 'tammelinn', name: 'Tammelinn' },
        { id: 'karlova', name: 'Karlova' },
        { id: 'supilinn', name: 'Supilinn' },
        { id: 'raadi', name: 'Raadi' }
      ]
    },
    { 
      id: 'parnu', 
      name: 'Pärnu', 
      county: 'Pärnumaa', 
      desc: 'Suvepealinn',
      subDistricts: [
        { id: 'kesklinn-parnu', name: 'Kesklinn' },
        { id: 'rannarajoon', name: 'Rannarajoon' },
        { id: 'oulu', name: 'Ülejõe' },
        { id: 'raeküla', name: 'Raeküla' }
      ]
    },
    { 
      id: 'narva', 
      name: 'Narva', 
      county: 'Ida-Virumaa', 
      desc: 'Piirilinna kogukond',
      subDistricts: [
        { id: 'kreenholm', name: 'Kreenholm' },
        { id: 'joaorus', name: 'Joaoru' },
        { id: 'narva-kesklinn', name: 'Kesklinn' }
      ]
    },
    { 
      id: 'saaremaa', 
      name: 'Kuressaare', 
      county: 'Saaremaa', 
      desc: 'Saaremaa süda',
      subDistricts: [
        { id: 'kuressaare-linn', name: 'Kuressaare linn' },
        { id: 'saaremaa-vald', name: 'Muu Saaremaa' }
      ]
    }
  ];

  const [conversations, setConversations] = useState([
    {
      id: 1,
      partner: 'Andres Sepp',
      listingTitle: 'Abi muru niitmisega Nõmmel',
      isOnline: true,
      messages: [
        { id: 1, sender: 'Andres Sepp', text: 'Tere! Olen huvitatud teie abipakkumisest.', time: '14:20' },
        { id: 2, sender: 'Mari Tamm', text: 'Tere! Sobib suurepäraselt, mis kell teile sobiks?', time: '14:25' }
      ]
    },
    {
      id: 2,
      partner: 'Kadri Saar',
      listingTitle: 'Otsin koerajalutajat Kesklinnas',
      isOnline: false,
      messages: [
        { id: 1, sender: 'Kadri Saar', text: 'Tere! Kas saaksite homme koera jalutada?', time: 'Eile' }
      ]
    }
  ]);

  const [activeConversationId, setActiveConversationId] = useState<number>(1);
  const [newMessageText, setNewMessageText] = useState('');

  const [aiMessages, setAiMessages] = useState([
    { id: 1, sender: 'AI Naabriabi', text: 'Tsau! Mina olen siin SinuNaabri virtuaalne abiline. Küsi julgelt mida tahes, aitan hea meelega!', timeKey: 'justNow' }
  ]);
  const [aiInputText, setAiInputText] = useState('');

  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [ratingStars, setRatingStars] = useState(5);
  const [ratingTag, setRatingTag] = useState('Suurepärane ja kiire töö');
  const [ratingComment, setRatingComment] = useState('');
  const [ratingSuccess, setRatingSuccess] = useState(false);

  const [userReviews, setUserReviews] = useState<any[]>([
    { id: 1, author: 'Andres Sepp', rating: 5, tag: 'Suurepärane ja kiire töö', comment: 'Väga kiire ja kohusetundlik naaber! Töö sai tehtud täpselt nii nagu kokku lepitud.', date: '14. okt 2026' },
    { id: 2, author: 'Kadri Saar', rating: 5, tag: 'Väga hea suhtlus', comment: 'Suurepärane suhtlus ja abivalmidus. Soovitan soojalt kõigile!', date: '01. okt 2026' }
  ]);

  const [neighborsProfiles, setNeighborsProfiles] = useState<Record<string, any>>({
    'Andres Sepp': {
      name: 'Andres Sepp',
      role: 'Meistrimees ja transport',
      email: 'andres.sepp@example.com',
      phone: '+372 512 8899',
      city: 'Tallinn, Nõmme',
      joined: 'September 2026',
      bio: 'Olen kogenud meistrimees ja kaubiku omanik. Aitan hea meelega naabreid nii aiatöödel, kolimisel kui ka pisiremondiga. Töö alati korralik ja täpne!',
      badges: ['🌱 Naabriabi Pioneer', '⭐ Viie Tärni Meistrimees', '⚡ Kiire Reageerija'],
      reviews: [
        { id: 1, author: 'Mari Tamm', rating: 5, tag: 'Täpne ja usaldusväärne', comment: 'Aitas raske diivani üles toimetada, väga sõbralik mees!', date: '10. okt 2026' }
      ]
    },
    'Jüri Kask': {
      name: 'Jüri Kask',
      role: 'Sanitaartehnik',
      email: 'jyri.kask@example.com',
      phone: '+372 534 7711',
      city: 'Tartu, Kesklinn',
      joined: 'August 2026',
      bio: 'Tegelen igapäevaselt torutööde ja koduste remonditöödega Tartus. Kui segisti tilgub või radiaator vajab õhutamist, võta julgelt ühendust.',
      badges: ['🛠️ Kogukonna Meister', '🤝 Usaldusväärne Partner'],
      reviews: [
        { id: 1, author: 'Kadri Saar', rating: 5, tag: 'Suurepärane ja kiire töö', comment: 'Lahendas torustiku vea kiiresti.', date: '05. okt 2026' }
      ]
    },
    'Kadri Saar': {
      name: 'Kadri Saar',
      role: 'Lemmikloomasõber',
      email: 'kadri.saar@example.com',
      phone: '+372 566 4321',
      city: 'Tallinn, Kesklinn',
      joined: 'Oktoober 2026',
      bio: 'Armastan väga loomi ning jalutan igapäevaselt Kadrioru pargis. Pakun hea meelega seltsi ja hoolt ka naabrite lemmikutele.',
      badges: ['❤️ Lemmiklooma Lemmik', '🌱 Tasuta Naabriabi Abiline'],
      reviews: [
        { id: 1, author: 'Mari Tamm', rating: 5, tag: 'Väga hea suhtlus', comment: 'Hoidis kutsikat, suurepärane kogemus!', date: '01. okt 2026' }
      ]
    }
  });

  const currentUserBadges = ['🌱 Naabriabi Pioneer', '⭐ 5+ Tehingut', '🤝 Usaldusväärne Vabatahtlik'];

  const ratingTagsList = [
    'Suurepärane ja kiire töö',
    'Väga hea suhtlus',
    'Täpne ja usaldusväärne',
    'Hilines kokkulepitud ajast',
    'Ei vastanud täielikult ootustele'
  ];

  const [showcasePosts, setShowcasePosts] = useState<any[]>([
    {
      id: 1,
      author: 'Andres Sepp',
      title: 'Muru niitmine Nõmmel',
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb2660d?auto=format&fit=crop&w=600&q=80',
      description: 'Niitsin naabril hoovi puhtaks ja trimmerdasin servad.',
      timeKey: 'yesterday'
    },
    {
      id: 2,
      author: 'Jüri Kask',
      title: 'Vannitoa torustiku vahetus',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
      description: 'Paigaldasin uued torud ja vahetasin lekkinud segisti.',
      timeKey: 'daysAgo3'
    }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState('gardening');
  const [newSubCategory, setNewSubCategory] = useState('lawnMowing');
  const [newType, setNewType] = useState('offer');
  const [newRegion, setNewRegion] = useState('tallinn');
  const [newSubDistrict, setNewSubDistrict] = useState('nomme');
  const [newImage, setNewImage] = useState('');
  const [newPaymentType, setNewPaymentType] = useState<'free' | 'hourly' | 'fixed'>('free');
  const [newPaymentAmount, setNewPaymentAmount] = useState('10');

  const [listings, setListings] = useState<any[]>([
    { 
      id: 1, 
      title: 'Abi muru niitmisega Nõmmel', 
      description: 'Otsin abikäsi või pakun abi Nõmme eramu hoovi muru niitmiseks umbes 500m2 alal. Muruniiduk ja trimmer on kohapeal olemas. Sobib hästi nädalavahetusel või tööpäeva õhtuti alates kella 17:00-st. Töö käigus saame ka oksad kokku riisuda.',
      type: 'offer', 
      category: 'gardening', 
      subCategory: 'lawnMowing',
      region: 'tallinn', 
      subDistrict: 'nomme',
      author: 'Andres Sepp', 
      timeKey: 'hoursAgo2',
      paymentType: 'free',
      paymentText: '🌱 Tasuta (Naabriabi)',
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb2660d?auto=format&fit=crop&w=600&q=80'
    },
    { 
      id: 2, 
      title: 'Abi sanitaartehniliste töödega Tartus', 
      description: 'Köögisegisti lekib tihendi vahelt ja vajab kiiret ülevaatamist või uue segisti paigaldamist. Uus segisti ja vajalikud ühendusvoolikud on mul juba valmis ostetud. Töö võtab kogenud tegijal umbes 1 tunni.',
      type: 'request', 
      category: 'repairs', 
      subCategory: 'plumbing',
      region: 'tartu', 
      subDistrict: 'kesklinn-tartu',
      author: 'Jüri Kask', 
      timeKey: 'hoursAgo5',
      paymentType: 'hourly',
      paymentText: '⏱️ 15 € / tund',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80'
    },
    { 
      id: 3, 
      title: 'Pakun transporti Pärnu piires', 
      description: 'Mahukas kaubik (kaubaruumi pikkus 3,2 m) saadaval suuremate esemete, kodumasinate või mööbli veoks Pärnu linna ja lähiümbruse piires. Vajadusel aitan ka esemete peale- ja mahalaadimisel.',
      type: 'offer', 
      category: 'transport', 
      subCategory: 'cargo',
      region: 'parnu', 
      subDistrict: 'kesklinn-parnu',
      author: 'Andres Sepp', 
      timeKey: 'yesterday',
      paymentType: 'fixed',
      paymentText: '💶 20 € kokkuleppel',
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=80'
    },
    { 
      id: 4, 
      title: 'Otsin koerajalutajat Kesklinnas', 
      description: 'Sõbralik ja hästi kasvatatud 3-aastane kuldne retriiver vajab lühikest 30–40 minutilist lõunast jalutuskäiku Kadrioru pargis teisipäeviti ja neljapäeviti. Koer ei tiri rihma ja saab kõigiga hästi läbi.',
      type: 'request', 
      category: 'pets', 
      subCategory: 'dogWalking',
      region: 'tallinn', 
      subDistrict: 'kesklinn',
      author: 'Kadri Saar', 
      timeKey: 'hoursAgo3',
      paymentType: 'free',
      paymentText: '🌱 Tasuta (Naabriabi)',
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80'
    }
  ]);

  // Lae andmed Supabase'ist rakenduse käivitumisel
  useEffect(() => {
    fetchSupabaseData();
  }, []);

  const fetchSupabaseData = async () => {
    try {
      const { data: dbListings } = await supabase.from('listings').select('*').order('id', { ascending: false });
      if (dbListings && dbListings.length > 0) {
        const mappedListings = dbListings.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          type: item.type,
          category: item.category,
          subCategory: item.sub_category,
          region: item.region,
          subDistrict: item.sub_district,
          author: item.author,
          timeKey: 'justNow',
          paymentType: item.payment_type || 'free',
          paymentText: item.payment_text || '🌱 Tasuta (Naabriabi)',
          image: item.image
        }));
        setListings(mappedListings);
      }

      const { data: dbReviews } = await supabase.from('reviews').select('*').order('id', { ascending: false });
      if (dbReviews && dbReviews.length > 0) {
        const mariReviews = dbReviews
          .filter(r => r.target_user === 'Mari Tamm')
          .map(r => ({
            id: r.id,
            author: r.author,
            rating: r.rating,
            tag: r.tag || 'Suurepärane ja kiire töö',
            comment: r.comment,
            date: r.date_label || 'Just nüüd'
          }));
        if (mariReviews.length > 0) {
          setUserReviews(mariReviews);
        }

        const { data: dbProfiles } = await supabase.from('profiles').select('*');
        if (dbProfiles && dbProfiles.length > 0) {
          setNeighborsProfiles(prev => {
            const updated = { ...prev };
            dbProfiles.forEach(p => {
              const personReviews = dbReviews
                .filter(r => r.target_user === p.name)
                .map(r => ({
                  id: r.id,
                  author: r.author,
                  rating: r.rating,
                  tag: r.tag || 'Suurepärane ja kiire töö',
                  comment: r.comment,
                  date: r.date_label || 'Just nüüd'
                }));
              updated[p.name] = {
                ...(updated[p.name] || {}),
                name: p.name,
                role: p.role,
                email: p.email,
                phone: p.phone,
                city: p.city,
                joined: p.joined,
                bio: p.bio,
                badges: p.badges || ['🌱 Naabriabi Vabatahtlik'],
                reviews: personReviews
              };
            });
            return updated;
          });
        }
      }

      const { data: dbShowcase } = await supabase.from('showcase_posts').select('*').order('id', { ascending: false });
      if (dbShowcase && dbShowcase.length > 0) {
        const mappedShowcase = dbShowcase.map(p => ({
          id: p.id,
          author: p.author,
          title: p.title,
          image: p.image,
          description: p.description,
          timeKey: 'justNow'
        }));
        setShowcasePosts(mappedShowcase);
      }
    } catch (err) {
      console.error('Supabase laadimise viga:', err);
    }
  };

  const filteredListings = listings.filter(item => {
    const matchesRegion = selectedRegion === 'all' || item.region === selectedRegion;
    const matchesSubDistrict = selectedSubDistrict === 'all' || item.subDistrict === selectedSubDistrict;
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory || item.subCategory === selectedCategory;
    const matchesPayment = selectedPaymentFilter === 'all' || item.paymentType === selectedPaymentFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSubDistrict && matchesType && matchesCategory && matchesPayment && matchesSearch;
  });

  const popupListings = listings.filter(item => {
    const matchesReg = item.region === activePopupRegion;
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory || item.subCategory === selectedCategory;
    const matchesPay = selectedPaymentFilter === 'all' || item.paymentType === selectedPaymentFilter;
    return matchesReg && matchesCat && matchesPay;
  });

  const calculateAvgRating = (reviewsList: any[]) => {
    if (!reviewsList || reviewsList.length === 0) return '5.0';
    return (reviewsList.reduce((acc, r) => acc + r.rating, 0) / reviewsList.length).toFixed(1);
  };

  const averageRating = calculateAvgRating(userReviews);

  const goToHome = () => {
    setActiveTab('map');
    setSelectedRegion('all');
    setSelectedSubDistrict('all');
    setSearchQuery('');
    setSelectedType('all');
    setSelectedCategory('all');
    setSelectedPaymentFilter('all');
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openChatWithAuthor = (authorName: string, listingTitle: string) => {
    setChatMode('messages');
    const existing = conversations.find(c => c.partner === authorName);
    if (existing) {
      setActiveConversationId(existing.id);
    } else {
      const newConv = {
        id: Date.now(),
        partner: authorName,
        listingTitle: listingTitle,
        isOnline: true,
        messages: [
          { id: 1, sender: authorName, text: `Tere! Tunnen huvi teie kuulutuse vastu: "${listingTitle}"`, time: '14:20' }
        ]
      };
      setConversations([newConv, ...conversations]);
      setActiveConversationId(newConv.id);
    }
    setIsChatModalOpen(true);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    const activeUser = currentUser ? currentUser.name : 'Külaline';
    setConversations(conversations.map(conv => {
      if (conv.id === activeConversationId) {
        return {
          ...conv,
          messages: [
            ...conv.messages,
            { id: Date.now(), sender: activeUser, text: newMessageText, time: '14:30' }
          ]
        };
      }
      return conv;
    }));

    setNewMessageText('');
  };

  const handleSendAiMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInputText.trim()) return;

    const activeUser = currentUser ? currentUser.name : 'Külaline';
    const userMsg = { id: Date.now(), sender: activeUser, text: aiInputText, timeKey: 'justNow' };
    const updatedAiMsgs = [...aiMessages, userMsg];
    setAiMessages(updatedAiMsgs);
    const query = aiInputText.toLowerCase();
    setAiInputText('');

    setTimeout(() => {
      let prefix = 'Tsau!';
      if (greetingStyle === 'formal') prefix = 'Tere päevast!';
      if (greetingStyle === 'friendly') prefix = 'Hei naaber!';

      let replyText = `${prefix} SinuNaabris leiad infot jaluse kiirlinkidest ja saad kasutada kõiki kogukonna funktsioone! Kuidas saan aidata?`;

      if (query.includes('reiting') || query.includes('hinda')) {
        replyText = `${prefix} Naabri reitingu ja saavutuste vaatamiseks klõpsa kuulutusel naabri nimele.`;
      } else if (query.includes('märgid') || query.includes('saavutused')) {
        replyText = `${prefix} Märgid antakse naabritele automaatselt nende aktiivsuse ja heade arvustuste põhjal!`;
      }

      setAiMessages([...updatedAiMsgs, { id: Date.now() + 1, sender: translations.aiHelperName, text: replyText, timeKey: 'justNow' }]);
    }, 800);
  };

  const handleSendRating = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ratingComment.trim()) return;
    const authorName = currentUser ? currentUser.name : 'Külaline';
    const targetName = ratingTargetName || (currentUser ? currentUser.name : 'Mari Tamm');

    const newRev = {
      id: Date.now(),
      author: authorName,
      rating: ratingStars,
      tag: ratingTag,
      comment: ratingComment,
      date: translations.timeKeys.justNow
    };

    // Uuenda kohe ekraanil
    if (targetName && (!currentUser || targetName !== currentUser.name)) {
      setNeighborsProfiles(prev => {
        const existing = prev[targetName] || {
          name: targetName,
          role: 'Kogukonna liige',
          email: `${targetName.toLowerCase().replace(' ', '.')}@example.com`,
          phone: '+372 555 0000',
          city: 'Eesti',
          joined: 'November 2026',
          bio: 'Aktiivne SinuNaaber.ee kogukonna liige.',
          badges: ['🌱 Naabriabi Vabatahtlik'],
          reviews: []
        };
        return {
          ...prev,
          [targetName]: {
            ...existing,
            reviews: [newRev, ...(existing.reviews || [])]
          }
        };
      });
    } else {
      setUserReviews([newRev, ...userReviews]);
    }

    // Salvesta Supabase'i
    try {
      await supabase.from('reviews').insert([{
        target_user: targetName,
        author: authorName,
        rating: ratingStars,
        tag: ratingTag,
        comment: ratingComment,
        date_label: 'Just nüüd'
      }]);
    } catch (err) {
      console.error('Arvustuse salvestamise viga:', err);
    }

    setRatingSuccess(true);
    setTimeout(() => {
      const targetToReopen = ratingTargetName;
      setIsRatingModalOpen(false);
      setRatingSuccess(false);
      setRatingComment('');
      setRatingStars(5);
      setRatingTag('Suurepärane ja kiire töö');
      if (targetToReopen && (!currentUser || targetToReopen !== currentUser.name)) {
        setViewingNeighborName(targetToReopen);
      }
      setRatingTargetName(null);
    }, 1500);
  };

  const handleAddListing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    let payText = '🌱 Tasuta (Naabriabi)';
    if (newPaymentType === 'hourly') payText = `⏱️ ${newPaymentAmount} € / tund`;
    if (newPaymentType === 'fixed') payText = `💶 ${newPaymentAmount} € kokkuleppel`;

    const authorName = currentUser ? currentUser.name : 'Külaline';
    const finalImage = newImage.trim() || 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=600&q=80';

    const newEntry = {
      id: Date.now(),
      title: newTitle,
      description: newDescription,
      type: newType,
      category: newCategory,
      subCategory: newSubCategory,
      region: newRegion,
      subDistrict: newSubDistrict,
      author: authorName,
      timeKey: 'justNow',
      paymentType: newPaymentType,
      paymentText: payText,
      image: finalImage
    };

    setListings([newEntry, ...listings]);

    try {
      await supabase.from('listings').insert([{
        title: newTitle,
        description: newDescription,
        type: newType,
        category: newCategory,
        sub_category: newSubCategory,
        region: newRegion,
        sub_district: newSubDistrict,
        author: authorName,
        payment_type: newPaymentType,
        payment_text: payText,
        image: finalImage
      }]);
    } catch (err) {
      console.error('Kuulutuse salvestamise viga:', err);
    }

    setNewTitle('');
    setNewDescription('');
    setNewImage('');
    setIsAddModalOpen(false);
  };

  const handleListingFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNewImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setShowcaseImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddShowcasePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showcaseTitle.trim()) return;

    const authorName = currentUser ? currentUser.name : 'Külaline';
    const finalImage = showcaseImage.trim() || 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80';

    const newPost = {
      id: Date.now(),
      author: authorName,
      title: showcaseTitle,
      image: finalImage,
      description: showcaseDesc,
      timeKey: 'justNow'
    };

    setShowcasePosts([newPost, ...showcasePosts]);

    try {
      await supabase.from('showcase_posts').insert([{
        author: authorName,
        title: showcaseTitle,
        image: finalImage,
        description: showcaseDesc
      }]);
    } catch (err) {
      console.error('Fotoseina salvestamise viga:', err);
    }

    setShowcaseTitle('');
    setShowcaseDesc('');
    setShowcaseImage('');
    setIsAddShowcaseModalOpen(false);
  };

  const openNeighborProfile = (authorName: string) => {
    if (currentUser && currentUser.name === authorName) {
      setIsProfileModalOpen(true);
      return;
    }
    if (!neighborsProfiles[authorName]) {
      setNeighborsProfiles(prev => ({
        ...prev,
        [authorName]: {
          name: authorName,
          role: 'Kogukonna liige',
          email: `${authorName.toLowerCase().replace(' ', '.')}@example.com`,
          phone: '+372 555 0000',
          city: 'Eesti',
          joined: 'November 2026',
          bio: 'Aktiivne SinuNaaber.ee kogukonna liige.',
          badges: ['🌱 Naabriabi Vabatahtlik'],
          reviews: [
            { id: 1, author: 'Kogukonna liige', rating: 5, tag: 'Suurepärane ja kiire töö', comment: 'Väga abivalmis naaber!', date: translations.timeKeys.yesterday }
          ]
        }
      }));
    }
    setViewingNeighborName(authorName);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsMobileMenuOpen(false);
  };

  const handleLoginDemo = () => {
    setCurrentUser({
      name: 'Mari Tamm',
      email: 'mari.tamm@example.com',
      phone: '+372 555 1234',
      role: 'Kogukonna vabatahtlik'
    });
    setIsMobileMenuOpen(false);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) return;
    setCurrentUser({
      name: regName,
      email: regEmail,
      role: regRole
    });

    try {
      await supabase.from('profiles').upsert([{
        name: regName,
        email: regEmail,
        role: regRole,
        city: 'Eesti',
        joined: 'November 2026'
      }]);
    } catch (err) {
      console.error('Profiili salvestamise viga:', err);
    }

    setIsRegisterModalOpen(false);
    setRegName('');
    setRegEmail('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col relative">
      {/* PÄIS */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div onClick={goToHome} className="flex items-center gap-2.5 cursor-pointer group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">SinuNaaber.ee</h1>
                <span className="hidden sm:flex bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Eesti
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate max-w-[150px] sm:max-w-none">{translations.subtitle}</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
              <button onClick={() => setCurrentLang('et')} className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${currentLang === 'et' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}>EST</button>
              <button onClick={() => setCurrentLang('en')} className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${currentLang === 'en' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}>ENG</button>
              <button onClick={() => setCurrentLang('ru')} className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${currentLang === 'ru' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}>RUS</button>
            </div>

            <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1 border border-slate-200">
              <button onClick={() => setActiveTab('map')} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${activeTab === 'map' ? 'bg-white text-emerald-700 shadow-md' : 'text-slate-600'}`}>
                <Compass className="w-4 h-4" /> {translations.regionsTab}
              </button>
              <button onClick={() => setActiveTab('list')} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${activeTab === 'list' ? 'bg-white text-emerald-700 shadow-md' : 'text-slate-600'}`}>
                <List className="w-4 h-4" /> {translations.listTab}
              </button>
              <button onClick={() => setActiveTab('showcase')} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${activeTab === 'showcase' ? 'bg-white text-emerald-700 shadow-md' : 'text-slate-600'}`}>
                <Camera className="w-4 h-4" /> {translations.showcaseTab}
              </button>
            </div>

            <button onClick={() => { setChatMode('messages'); setIsChatModalOpen(true); }} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-slate-200 shadow-sm">
              <MessageSquare className="w-4 h-4 text-emerald-600" /> {translations.messages}
            </button>

            <button onClick={() => { setChatMode('ai'); setIsChatModalOpen(true); }} className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 px-3 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-emerald-200 shadow-sm">
              <Bot className="w-4 h-4 text-emerald-600" /> {translations.aiHelper}
            </button>

            <button onClick={() => setIsAddModalOpen(true)} className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2 cursor-pointer">
              <Plus className="w-4 h-4" /> {translations.addListing}
            </button>

            {currentUser ? (
              <div className="flex items-center gap-1.5">
                <button onClick={() => setIsProfileModalOpen(true)} className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:border-emerald-500 px-3 py-2 rounded-2xl shadow-sm transition-all cursor-pointer">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span>{currentUser.name}</span>
                  <span className="flex items-center gap-0.5 text-amber-600 font-extrabold ml-1 bg-amber-50 px-2 py-0.5 rounded-full">
                    <Star className="w-3 h-3 fill-amber-500" /> {averageRating}
                  </span>
                </button>
                <button onClick={handleLogout} title={translations.logout} className="p-2.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 rounded-2xl border border-slate-200 transition-colors cursor-pointer">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button onClick={handleLoginDemo} className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 px-3 py-2.5 rounded-2xl shadow-sm transition-all cursor-pointer">
                  <LogIn className="w-4 h-4" /> {translations.login}
                </button>
                <button onClick={() => setIsRegisterModalOpen(true)} className="flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-3.5 py-2.5 rounded-2xl shadow-md transition-all cursor-pointer">
                  <UserPlus className="w-4 h-4" /> {translations.register}
                </button>
              </div>
            )}
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <button onClick={() => setIsAddModalOpen(true)} className="bg-emerald-600 text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm">
              <Plus className="w-3.5 h-3.5" /> {translations.addListing}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 cursor-pointer">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 p-4 space-y-4 shadow-xl">
            <div className="flex items-center justify-between bg-slate-50 p-2 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-600">Keel / Language:</span>
              <div className="flex gap-1">
                <button onClick={() => { setCurrentLang('et'); setIsMobileMenuOpen(false); }} className={`px-3 py-1 rounded-lg text-xs font-bold ${currentLang === 'et' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700'}`}>EST</button>
                <button onClick={() => { setCurrentLang('en'); setIsMobileMenuOpen(false); }} className={`px-3 py-1 rounded-lg text-xs font-bold ${currentLang === 'en' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700'}`}>ENG</button>
                <button onClick={() => { setCurrentLang('ru'); setIsMobileMenuOpen(false); }} className={`px-3 py-1 rounded-lg text-xs font-bold ${currentLang === 'ru' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700'}`}>RUS</button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => { setActiveTab('map'); setIsMobileMenuOpen(false); }} className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1 ${activeTab === 'map' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                <Compass className="w-4 h-4" /> {translations.regionsTab}
              </button>
              <button onClick={() => { setActiveTab('list'); setIsMobileMenuOpen(false); }} className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1 ${activeTab === 'list' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                <List className="w-4 h-4" /> {translations.listTab}
              </button>
              <button onClick={() => { setActiveTab('showcase'); setIsMobileMenuOpen(false); }} className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1 ${activeTab === 'showcase' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                <Camera className="w-4 h-4" /> {translations.showcaseTab}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => { setChatMode('messages'); setIsChatModalOpen(true); setIsMobileMenuOpen(false); }} className="p-3 bg-slate-100 rounded-xl text-xs font-bold flex items-center justify-center gap-2 text-slate-700">
                <MessageSquare className="w-4 h-4 text-emerald-600" /> {translations.messages}
              </button>
              <button onClick={() => { setChatMode('ai'); setIsChatModalOpen(true); setIsMobileMenuOpen(false); }} className="p-3 bg-emerald-50 rounded-xl text-xs font-bold flex items-center justify-center gap-2 text-emerald-800 border border-emerald-200">
                <Bot className="w-4 h-4 text-emerald-600" /> {translations.aiHelper}
              </button>
            </div>

            {currentUser ? (
              <div className="space-y-2">
                <button onClick={() => { setIsProfileModalOpen(true); setIsMobileMenuOpen(false); }} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold flex items-center justify-between text-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
                      {currentUser.name.charAt(0)}
                    </div>
                    <span>{currentUser.name}</span>
                  </div>
                  <span className="flex items-center gap-1 text-amber-600 font-extrabold bg-amber-50 px-2 py-0.5 rounded-full">
                    <Star className="w-3 h-3 fill-amber-500" /> {averageRating}
                  </span>
                </button>
                <button onClick={handleLogout} className="w-full p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold flex items-center justify-center gap-2 text-rose-700">
                  <LogOut className="w-4 h-4" /> {translations.logout}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleLoginDemo} className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold flex items-center justify-center gap-2 text-emerald-800">
                  <LogIn className="w-4 h-4" /> {translations.login}
                </button>
                <button onClick={() => { setIsRegisterModalOpen(true); setIsMobileMenuOpen(false); }} className="p-3 bg-emerald-600 rounded-xl text-xs font-bold flex items-center justify-center gap-2 text-white">
                  <UserPlus className="w-4 h-4" /> {translations.register}
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* HERO & MAKSETÜÜPIDE FILTER */}
      <section className="bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-950 text-white pt-8 pb-10 px-4 text-center shadow-xl">
        <h2 className="text-2xl sm:text-4xl font-black mb-3">{translations.heroTitle}</h2>
        <p className="text-emerald-100 text-xs sm:text-sm max-w-xl mx-auto mb-6">{translations.heroSub}</p>

        <div className="bg-white p-2.5 sm:p-3 rounded-2xl max-w-2xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2 border border-emerald-700/30 shadow-lg flex-wrap text-slate-800">
          <span className="text-[11px] sm:text-xs font-bold text-slate-500 mr-1 w-full sm:w-auto text-center">{translations.paymentTypeLabel}</span>
          <button onClick={() => setSelectedPaymentFilter('all')} className={`px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${selectedPaymentFilter === 'all' ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
            {translations.all}
          </button>
          <button onClick={() => setSelectedPaymentFilter('free')} className={`px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${selectedPaymentFilter === 'free' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
            {translations.freePayment}
          </button>
          <button onClick={() => setSelectedPaymentFilter('hourly')} className={`px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${selectedPaymentFilter === 'hourly' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
            {translations.hourlyPayment}
          </button>
          <button onClick={() => setSelectedPaymentFilter('fixed')} className={`px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${selectedPaymentFilter === 'fixed' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
            {translations.fixedPayment}
          </button>
        </div>
      </section>

      {/* OTSINGU- JA FILTRIRIBA */}
      <div className="max-w-7xl mx-auto w-full px-4 -mt-5 sm:-mt-6 z-30 relative">
        <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-center">
          
          <div className="space-y-1">
            <label className="block text-xs font-extrabold text-slate-700">{translations.regionLabel}</label>
            <select value={selectedRegion} onChange={(e) => { setSelectedRegion(e.target.value); setSelectedSubDistrict('all'); }} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-600">
              <option value="all">{translations.allRegions}</option>
              {regions.map(r => <option key={r.id} value={r.id}>{r.name} ({r.county})</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-extrabold text-slate-700">{translations.subDistrictLabel}</label>
            <select value={selectedSubDistrict} onChange={(e) => setSelectedSubDistrict(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-600">
              <option value="all">{translations.allSubDistricts}</option>
              {selectedRegion !== 'all' && regions.find(r => r.id === selectedRegion)?.subDistricts.map(sub => (
                <option key={sub.id} value={sub.id}>{sub.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-extrabold text-slate-700">{translations.categoryLabel}</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-600">
              <option value="all">{translations.allCategories}</option>
              {Object.keys(categoryMap).map(catKey => (
                <option key={catKey} value={catKey}>{translations.categories[catKey as keyof typeof translations.categories]}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-extrabold text-slate-700">{translations.searchLabel}</label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input type="text" placeholder={translations.searchPlaceholder} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-600" />
            </div>
          </div>

          <div className="flex items-end h-full pt-1 sm:pt-0">
            <button onClick={() => { setSelectedRegion('all'); setSelectedSubDistrict('all'); setSelectedCategory('all'); setSearchQuery(''); setSelectedPaymentFilter('all'); }} className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-200">
              <RotateCcw className="w-3.5 h-3.5" /> {translations.clearFilters}
            </button>
          </div>

        </div>
      </div>

      {/* SISU */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        {activeTab === 'map' ? (
          <div>
            <h2 className="text-xl font-black text-slate-900 mb-6">{translations.regionsHeader}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {regions.map((reg) => {
                const regionCount = listings.filter(item => {
                  const matchReg = item.region === reg.id;
                  const matchPay = selectedPaymentFilter === 'all' || item.paymentType === selectedPaymentFilter;
                  const matchCat = selectedCategory === 'all' || item.category === selectedCategory || item.subCategory === selectedCategory;
                  return matchReg && matchPay && matchCat;
                }).length;

                return (
                  <div key={reg.id} onClick={() => setActivePopupRegion(reg.id)} className="p-6 rounded-3xl border bg-white border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">{reg.county}</span>
                        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                          {regionCount} {regionCount === 1 ? 'kuulutus' : 'kuulutust'}
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-slate-900 mt-2">{reg.name}</h3>
                      <p className="text-xs text-slate-500 mt-1">{reg.desc}</p>
                    </div>
                    <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                      <span>{translations.viewListings}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : activeTab === 'list' ? (
          <div>
            <h3 className="text-xl font-black text-slate-900 mb-6">{translations.activeListings} ({filteredListings.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredListings.map(item => {
                const regObj = regions.find(r => r.id === item.region);
                const subObj = regObj?.subDistricts.find(s => s.id === item.subDistrict);
                const timeText = translations.timeKeys[item.timeKey as keyof typeof translations.timeKeys] || item.timeKey;

                return (
                  <div key={item.id} onClick={() => setSelectedListingDetail(item)} className="bg-white rounded-3xl border border-slate-200/80 shadow-lg shadow-slate-200/30 hover:border-emerald-500 hover:shadow-xl transition-all cursor-pointer overflow-hidden flex flex-col justify-between group">
                    <div>
                      <div className="h-48 w-full overflow-hidden bg-slate-100 relative">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <span className={`absolute top-3 left-3 text-[10px] font-extrabold px-2.5 py-1 rounded-xl uppercase shadow-md ${item.type === 'offer' ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'}`}>
                          {item.type === 'offer' ? translations.offerHelp : translations.requestHelp}
                        </span>
                        
                        <span className="absolute bottom-3 right-3 text-[11px] font-extrabold px-3 py-1 rounded-xl bg-slate-900/80 text-white backdrop-blur-md shadow-md">
                          {item.paymentText}
                        </span>
                      </div>

                      <div className="p-5">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex gap-1.5 flex-wrap">
                            <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 uppercase">{translations.categories[item.category as keyof typeof translations.categories] || item.category}</span>
                            {item.subCategory && (
                              <span className="text-[10px] font-extrabold px-2 py-1 rounded-lg bg-slate-100 text-slate-600">{translations.subCategories[item.subCategory as keyof typeof translations.subCategories] || item.subCategory}</span>
                            )}
                          </div>
                          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 shrink-0">
                            <Clock className="w-3 h-3 text-emerald-600" /> {timeText}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-base mt-2 mb-1 group-hover:text-emerald-700 transition-colors">{item.title}</h4>
                        {item.description && (
                          <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">{item.description}</p>
                        )}
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-xs text-slate-500 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {regObj?.name}{subObj ? ` (${subObj.name})` : ''}
                          </p>
                          <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                            {translations.openDetails} <ExternalLink className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => openNeighborProfile(item.author)} className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer flex items-center gap-1 truncate max-w-[130px]">
                        <User className="w-3.5 h-3.5 shrink-0" /> <span className="truncate">{item.author}</span> ⭐
                      </button>
                      <button onClick={() => openChatWithAuthor(item.author, item.title)} className="px-4 py-2 bg-slate-100 hover:bg-emerald-600 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm shrink-0">
                        <MessageCircle className="w-3.5 h-3.5" /> {translations.write}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center sm:text-left">
              <div>
                <h3 className="text-xl font-black text-slate-900 flex items-center justify-center sm:justify-start gap-2">
                  <Camera className="w-6 h-6 text-emerald-600" /> {translations.showcaseHeader}
                </h3>
                <p className="text-xs text-slate-500 mt-1">{translations.showcaseSub}</p>
              </div>
              <button onClick={() => setIsAddShowcaseModalOpen(true)} className="w-full sm:w-auto px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold shadow-lg shadow-emerald-600/20 cursor-pointer flex items-center justify-center gap-2">
                <Camera className="w-4 h-4" /> {translations.addPhotoOrAd}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {showcasePosts.map(post => {
                const timeText = translations.timeKeys[post.timeKey as keyof typeof translations.timeKeys] || post.timeKey;
                return (
                  <div key={post.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md flex flex-col justify-between">
                    <div>
                      <div className="h-64 w-full overflow-hidden bg-slate-100 relative">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                        <span className="absolute bottom-3 left-3 text-[11px] font-extrabold px-3 py-1 rounded-xl bg-slate-900/80 text-white backdrop-blur-md">
                          {post.author}
                        </span>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 uppercase">{translations.adBadge}</span>
                          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-emerald-600" /> {timeText}
                          </span>
                        </div>
                        <h4 className="font-black text-slate-900 text-lg mb-2">{post.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{post.description}</p>
                      </div>
                    </div>
                    <div className="p-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">Autor: {post.author}</span>
                      <button onClick={() => openNeighborProfile(post.author)} className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-xl cursor-pointer">
                        {translations.viewProfile}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* PIIRKONNA HÜPIKAKEN */}
      {activePopupRegion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base sm:text-xl font-black text-slate-900">{regions.find(r => r.id === activePopupRegion)?.name} piirkonna kuulutused</h3>
              <button onClick={() => setActivePopupRegion(null)} className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer shrink-0"><X className="w-5 h-5" /></button>
            </div>
            <div className="py-6 overflow-y-auto space-y-4 flex-1">
              {popupListings.length === 0 ? (
                <p className="text-center text-sm text-slate-400 py-8">Selles piirkonnas pole valitud filtritele vastavaid kuulutusi.</p>
              ) : (
                popupListings.map(item => {
                  const timeText = translations.timeKeys[item.timeKey as keyof typeof translations.timeKeys] || item.timeKey;
                  return (
                    <div 
                      key={item.id} 
                      onClick={() => { setActivePopupRegion(null); setSelectedListingDetail(item); }}
                      className="bg-slate-50 hover:bg-emerald-50/40 p-4 rounded-2xl border border-slate-200 hover:border-emerald-400 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center gap-4 group"
                    >
                      <img src={item.image} alt={item.title} className="w-full sm:w-20 h-32 sm:h-20 rounded-xl object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setActivePopupRegion(null); openNeighborProfile(item.author); }} 
                          className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                        >
                          {item.author} ⭐
                        </button>
                        <h4 className="font-bold text-sm mt-0.5 text-slate-900 group-hover:text-emerald-700 transition-colors">{item.title}</h4>
                        {item.description && <p className="text-xs text-slate-500 mt-1 line-clamp-1">{item.description}</p>}
                        <div className="flex items-center flex-wrap gap-3 mt-1.5">
                          <span className="text-xs text-emerald-700 font-bold">{item.paymentText}</span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1"><Clock className="w-2.5 h-2.5" /> {timeText}</span>
                          <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 ml-auto">
                            {translations.openDetails} <ExternalLink className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActivePopupRegion(null); openChatWithAuthor(item.author, item.title); }} 
                        className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer shrink-0"
                      >
                        {translations.write}
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* KUULUTUSE DETAILVAATE AKEN */}
      {selectedListingDetail && (() => {
        const regObj = regions.find(r => r.id === selectedListingDetail.region);
        const subObj = regObj?.subDistricts.find(s => s.id === selectedListingDetail.subDistrict);
        const timeText = translations.timeKeys[selectedListingDetail.timeKey as keyof typeof translations.timeKeys] || selectedListingDetail.timeKey;

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-md">
            <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl relative max-h-[90vh] flex flex-col overflow-hidden">
              <div className="h-56 sm:h-72 w-full bg-slate-100 relative shrink-0">
                <img src={selectedListingDetail.image} alt={selectedListingDetail.title} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedListingDetail(null)} 
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-900/75 hover:bg-slate-900 text-white flex items-center justify-center cursor-pointer backdrop-blur-md transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <span className={`absolute top-4 left-4 text-xs font-extrabold px-3 py-1.5 rounded-xl uppercase shadow-md ${selectedListingDetail.type === 'offer' ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'}`}>
                  {selectedListingDetail.type === 'offer' ? translations.offerHelp : translations.requestHelp}
                </span>
                <span className="absolute bottom-4 right-4 text-xs font-extrabold px-3.5 py-1.5 rounded-xl bg-slate-900/85 text-white backdrop-blur-md shadow-md">
                  {selectedListingDetail.paymentText}
                </span>
              </div>

              <div className="p-6 sm:p-7 overflow-y-auto space-y-5 flex-1">
                <div>
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-2.5">
                    <div className="flex gap-2 flex-wrap">
                      <span className="text-xs font-extrabold px-3 py-1 rounded-lg bg-teal-50 text-teal-800 uppercase">
                        {translations.categories[selectedListingDetail.category as keyof typeof translations.categories] || selectedListingDetail.category}
                      </span>
                      {selectedListingDetail.subCategory && (
                        <span className="text-xs font-extrabold px-3 py-1 rounded-lg bg-slate-100 text-slate-700">
                          {translations.subCategories[selectedListingDetail.subCategory as keyof typeof translations.subCategories] || selectedListingDetail.subCategory}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" /> {timeText}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">{selectedListingDetail.title}</h3>
                  
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 flex items-center gap-1.5 mt-2">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" /> 
                    {regObj?.name} ({regObj?.county}){subObj ? ` — ${subObj.name}` : ''}
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 p-4 sm:p-5 rounded-2xl space-y-2">
                  <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">{translations.descriptionLabel}</span>
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {selectedListingDetail.description || 'Täiendav kirjeldus puudub.'}
                  </p>
                </div>

                <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-base shrink-0">
                      {selectedListingDetail.author.charAt(0)}
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider">{translations.authorInfoTitle}</span>
                      <h4 className="font-black text-slate-900 text-sm">{selectedListingDetail.author} ⭐</h4>
                      <p className="text-xs text-slate-600">
                        {neighborsProfiles[selectedListingDetail.author]?.role || 'Kogukonna liige'}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => { 
                      const author = selectedListingDetail.author;
                      setSelectedListingDetail(null); 
                      openNeighborProfile(author); 
                    }} 
                    className="w-full sm:w-auto px-4 py-2 bg-white hover:bg-emerald-600 text-emerald-800 hover:text-white border border-emerald-200 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
                  >
                    {translations.viewProfile}
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-5 border-t border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-end gap-2.5 shrink-0">
                <button 
                  onClick={() => setSelectedListingDetail(null)} 
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
                >
                  {translations.close}
                </button>
                <button 
                  onClick={() => { 
                    const author = selectedListingDetail.author;
                    const title = selectedListingDetail.title;
                    setSelectedListingDetail(null); 
                    openChatWithAuthor(author, title); 
                  }} 
                  className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageCircle className="w-4 h-4" /> {translations.write} ({selectedListingDetail.author})
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* CHAT JA AI-ABILINE */}
      {isChatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl relative h-[90vh] sm:h-[80vh] flex flex-col md:flex-row overflow-hidden">
            <div className="w-full md:w-1/3 border-r border-slate-200 bg-slate-50 flex flex-col h-1/3 md:h-full">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <h3 className="font-black text-slate-900 text-base">{translations.chatHubTitle}</h3>
                <button onClick={() => setIsChatModalOpen(false)} className="md:hidden"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-3 grid grid-cols-2 gap-2 border-b border-slate-200 bg-white">
                <button onClick={() => setChatMode('messages')} className={`py-2 rounded-xl text-xs font-bold cursor-pointer ${chatMode === 'messages' ? 'bg-emerald-600 text-white' : 'bg-slate-100'}`}>{translations.neighborsTab}</button>
                <button onClick={() => setChatMode('ai')} className={`py-2 rounded-xl text-xs font-bold cursor-pointer ${chatMode === 'ai' ? 'bg-emerald-600 text-white' : 'bg-slate-100'}`}>{translations.aiHelper}</button>
              </div>
              
              {chatMode === 'ai' && (
                <div className="p-3 border-b border-slate-200 bg-white space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700">{translations.aiGreetingStyleLabel}</label>
                  <select value={greetingStyle} onChange={(e: any) => setGreetingStyle(e.target.value)} className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                    <option value="casual">{translations.styleCasual}</option>
                    <option value="friendly">{translations.styleFriendly}</option>
                    <option value="formal">{translations.styleFormal}</option>
                  </select>
                </div>
              )}

              <div className="overflow-y-auto flex-1">
                {chatMode === 'messages' && conversations.map(c => (
                  <div key={c.id} onClick={() => setActiveConversationId(c.id)} className={`p-3.5 border-b border-slate-100 cursor-pointer transition-colors ${activeConversationId === c.id ? 'bg-emerald-50/70 border-l-4 border-l-emerald-600' : 'bg-white hover:bg-slate-50'}`}>
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-xs sm:text-sm text-slate-900">{c.partner}</h5>
                      <span className="text-[10px] text-emerald-600 font-extrabold">{c.isOnline ? translations.onlineStatus : translations.offlineStatus}</span>
                    </div>
                    <p className="text-[11px] text-emerald-700 truncate mt-0.5">{c.listingTitle}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 flex flex-col bg-white h-2/3 md:h-full">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-black text-slate-900 text-sm">
                    {chatMode === 'ai' ? translations.aiHelperName : `${translations.chatWithNeighbor} ${conversations.find(c => c.id === activeConversationId)?.partner || ''}`}
                  </h4>
                  {chatMode === 'messages' && (
                    <p className="text-[11px] font-semibold text-emerald-600 mt-0.5 flex items-center gap-1.5">
                      {conversations.find(c => c.id === activeConversationId)?.isOnline ? translations.onlineStatus : translations.offlineStatus}
                    </p>
                  )}
                </div>
                <button onClick={() => setIsChatModalOpen(false)} className="hidden md:flex"><X className="w-5 h-5" /></button>
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 flex flex-col">
                {chatMode === 'ai' ? (
                  aiMessages.map(m => {
                    const activeUser = currentUser ? currentUser.name : 'Külaline';
                    const isMe = m.sender === activeUser;
                    const timeText = m.timeKey ? (translations.timeKeys[m.timeKey as keyof typeof translations.timeKeys] || m.timeKey) : '14:30';
                    return (
                      <div key={m.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                        <span className="text-[10px] font-bold text-slate-400 mb-1 px-1">{m.sender} • {timeText}</span>
                        <div className={`p-3.5 rounded-2xl text-xs max-w-[85%] shadow-sm ${isMe ? 'bg-emerald-600 text-white rounded-tr-none' : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'}`}>
                          {m.text}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  conversations.find(c => c.id === activeConversationId)?.messages.map(m => {
                    const activeUser = currentUser ? currentUser.name : 'Külaline';
                    const isMe = m.sender === activeUser;
                    return (
                      <div key={m.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                        <span className="text-[10px] font-bold text-slate-400 mb-1 px-1">{m.sender} • {m.time}</span>
                        <div className={`p-3.5 rounded-2xl text-xs max-w-[85%] shadow-sm ${isMe ? 'bg-emerald-600 text-white rounded-tr-none' : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'}`}>
                          {m.text}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <form onSubmit={chatMode === 'ai' ? handleSendAiMessage : handleSendMessage} className="p-3 border-t border-slate-200 bg-white flex gap-2">
                <input type="text" placeholder={chatMode === 'ai' ? translations.typeAiPlaceholder : translations.typeMessagePlaceholder} value={chatMode === 'ai' ? aiInputText : newMessageText} onChange={(e) => chatMode === 'ai' ? setAiInputText(e.target.value) : setNewMessageText(e.target.value)} className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600" />
                <button type="submit" className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-all">{translations.sendBtn}</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* REGISTREERUMISE HÜPIKAKEN */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">{translations.registerModalTitle}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{translations.registerModalSub}</p>
              </div>
              <button onClick={() => setIsRegisterModalOpen(false)} className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer shrink-0"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">{translations.nameLabel}</label>
                <input type="text" placeholder={translations.namePlaceholder} value={regName} onChange={(e) => setRegName(e.target.value)} required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">{translations.emailLabel}</label>
                <input type="email" placeholder={translations.emailPlaceholder} value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">{translations.roleLabel}</label>
                <select value={regRole} onChange={(e) => setRegRole(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                  <option value="Kogukonna vabatahtlik">{translations.roleOption1}</option>
                  <option value="Abivajaja">{translations.roleOption2}</option>
                  <option value="Meistrimees">{translations.roleOption3}</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button type="button" onClick={() => setIsRegisterModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-xl font-bold cursor-pointer">{translations.cancel}</button>
                <button type="submit" className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold cursor-pointer hover:bg-emerald-700 transition-colors">{translations.completeRegister}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* UUE KUULUTUSE LISAMISE HÜPIKAKEN */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="text-xl font-black text-slate-900">{translations.addModalTitle}</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleAddListing} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{translations.titleLabel}</label>
                <input type="text" placeholder={translations.titlePlaceholder} value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{translations.descriptionLabel}</label>
                <textarea rows={3} placeholder={translations.descriptionPlaceholder} value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">{translations.uploadImageLabel}</label>
                <label className="border-2 border-dashed border-slate-300 hover:border-emerald-600 bg-slate-50 hover:bg-emerald-50/50 p-3 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all">
                  <Upload className="w-5 h-5 text-emerald-600 mb-1" />
                  <span className="text-xs font-bold text-slate-700">{translations.uploadImageBtnText}</span>
                  <input type="file" accept="image/*" onChange={handleListingFileUpload} className="hidden" />
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">{translations.orUrlLabel}</label>
                <input type="text" placeholder={translations.orUrlPlaceholder} value={newImage} onChange={(e) => setNewImage(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
              </div>

              {newImage && (
                <div className="relative h-28 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                  <img src={newImage} alt="Eelvaade" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => setNewImage('')} className="absolute top-2 right-2 bg-slate-900/80 text-white p-1 rounded-full text-xs"><X className="w-3.5 h-3.5" /></button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{translations.typeLabel}</label>
                  <select value={newType} onChange={(e) => setNewType(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                    <option value="offer">{translations.offerHelp}</option>
                    <option value="request">{translations.requestHelp}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{translations.regionLabel}</label>
                  <select value={newRegion} onChange={(e) => {
                    const regId = e.target.value;
                    setNewRegion(regId);
                    const foundReg = regions.find(r => r.id === regId);
                    if (foundReg && foundReg.subDistricts.length > 0) {
                      setNewSubDistrict(foundReg.subDistricts[0].id);
                    }
                  }} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                    {regions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{translations.subDistrictLabel}</label>
                  <select value={newSubDistrict} onChange={(e) => setNewSubDistrict(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                    {regions.find(r => r.id === newRegion)?.subDistricts.map(sub => (
                      <option key={sub.id} value={sub.id}>{sub.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{translations.categoryLabel}</label>
                  <select value={newCategory} onChange={(e) => { const cat = e.target.value; setNewCategory(cat); if (categoryMap[cat]?.length > 0) setNewSubCategory(categoryMap[cat][0]); }} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                    {Object.keys(categoryMap).map(catKey => (
                      <option key={catKey} value={catKey}>{translations.categories[catKey as keyof typeof translations.categories]}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{translations.subCategoryLabel}</label>
                <select value={newSubCategory} onChange={(e) => setNewSubCategory(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                  {categoryMap[newCategory]?.map(subKey => (
                    <option key={subKey} value={subKey}>{translations.subCategories[subKey as keyof typeof translations.subCategories]}</option>
                  ))}
                </select>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Euro className="w-4 h-4 text-emerald-600" /> {translations.paymentTypeLabel}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button type="button" onClick={() => setNewPaymentType('free')} className={`py-2 px-1 text-[11px] sm:text-xs rounded-xl font-bold border cursor-pointer ${newPaymentType === 'free' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-700 border-slate-200'}`}>{translations.freePayment}</button>
                  <button type="button" onClick={() => setNewPaymentType('hourly')} className={`py-2 px-1 text-[11px] sm:text-xs rounded-xl font-bold border cursor-pointer ${newPaymentType === 'hourly' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-700 border-slate-200'}`}>{translations.hourlyPayment}</button>
                  <button type="button" onClick={() => setNewPaymentType('fixed')} className={`py-2 px-1 text-[11px] sm:text-xs rounded-xl font-bold border cursor-pointer ${newPaymentType === 'fixed' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-700 border-slate-200'}`}>{translations.fixedPayment}</button>
                </div>
                {newPaymentType !== 'free' && (
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">{translations.amountLabel}</label>
                    <input type="number" value={newPaymentAmount} onChange={(e) => setNewPaymentAmount(e.target.value)} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm" />
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold cursor-pointer">{translations.cancel}</button>
                <button type="submit" className="px-6 py-2.5 bg-emerald-600 text-white rounded-2xl text-xs font-bold cursor-pointer">{translations.saveListing}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FOTOSEINA LISAMISE MODAL */}
      {isAddShowcaseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="text-xl font-black text-slate-900">{translations.showcaseModalTitle}</h3>
              <button onClick={() => setIsAddShowcaseModalOpen(false)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            
            <form onSubmit={handleAddShowcasePost} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{translations.showcaseTitleLabel}</label>
                <input type="text" placeholder={translations.showcaseTitlePlaceholder} value={showcaseTitle} onChange={(e) => setShowcaseTitle(e.target.value)} required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">{translations.uploadImageLabel}</label>
                <label className="border-2 border-dashed border-slate-300 hover:border-emerald-600 bg-slate-50 hover:bg-emerald-50/50 p-4 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all">
                  <Upload className="w-6 h-6 text-emerald-600 mb-1" />
                  <span className="text-xs font-bold text-slate-700">{translations.uploadImageBtnText}</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">{translations.orUrlLabel}</label>
                <input type="text" placeholder={translations.orUrlPlaceholder} value={showcaseImage} onChange={(e) => setShowcaseImage(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
              </div>

              {showcaseImage && (
                <div className="relative h-32 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                  <img src={showcaseImage} alt="Eelvaade" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => setShowcaseImage('')} className="absolute top-2 right-2 bg-slate-900/80 text-white p-1 rounded-full text-xs"><X className="w-3.5 h-3.5" /></button>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{translations.descLabel}</label>
                <textarea rows={3} placeholder={translations.descPlaceholder} value={showcaseDesc} onChange={(e) => setShowcaseDesc(e.target.value)} required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button type="button" onClick={() => setIsAddShowcaseModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold cursor-pointer">{translations.cancel}</button>
                <button type="submit" className="px-6 py-2.5 bg-emerald-600 text-white rounded-2xl text-xs font-bold cursor-pointer">{translations.postBtn}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ENDA PROFIILI MODAL */}
      {isProfileModalOpen && currentUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-base shrink-0">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 truncate">{currentUser.name}</h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 truncate">{currentUser.role} • {currentUser.email}</p>
                </div>
              </div>
              <button onClick={() => setIsProfileModalOpen(false)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer shrink-0"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
                <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Award className="w-4 h-4 text-emerald-600" /> Kogukonna saavutused ja märgid
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentUserBadges.map((badge, idx) => (
                    <span key={idx} className="bg-white text-emerald-800 border border-emerald-200 text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-1">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wider">Kogukonna hinnang</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-2xl font-black text-amber-900">{averageRating}</span>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500" />)}
                    </div>
                    <span className="text-xs text-amber-700 font-medium">({userReviews.length} arvustust)</span>
                  </div>
                </div>
                <button 
                  onClick={() => { 
                    setRatingTargetName(currentUser.name); 
                    setIsRatingModalOpen(true); 
                  }} 
                  className="w-full sm:w-auto px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  ⭐ Hinda profiili
                </button>
              </div>

              <div>
                <h4 className="text-sm font-black text-slate-900 mb-3">Naabrite arvustused</h4>
                <div className="space-y-3">
                  {userReviews.map(rev => (
                    <div key={rev.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{rev.author}</span>
                        <span className="text-slate-400">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-amber-500 font-bold">{'★'.repeat(rev.rating)}</span>
                        <span className="bg-teal-50 text-teal-800 font-bold px-2 py-0.5 rounded-md text-[10px] ml-2">{rev.tag}</span>
                      </div>
                      <p className="text-slate-600">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
              <button onClick={() => { setIsProfileModalOpen(false); handleLogout(); }} className="px-4 py-2.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-2xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer">
                <LogOut className="w-4 h-4" /> {translations.logout}
              </button>
              <button onClick={() => setIsProfileModalOpen(false)} className="px-6 py-2.5 bg-slate-900 text-white rounded-2xl text-xs font-bold cursor-pointer">{translations.close}</button>
            </div>
          </div>
        </div>
      )}

      {/* TEISE NAABRI PROFIIL (ÜLDINFO, TELEFON, MEIL JA TEMA KUULUTUSED) */}
      {viewingNeighborName && neighborsProfiles[viewingNeighborName] && (() => {
        const neighbor = neighborsProfiles[viewingNeighborName];
        const neighborListings = listings.filter(l => l.author === neighbor.name);
        const neighborAvgRating = calculateAvgRating(neighbor.reviews);

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-md">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-md">
                    {neighbor.name.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 truncate">{neighbor.name}</h3>
                    <p className="text-xs font-semibold text-emerald-700 truncate">{neighbor.role}</p>
                  </div>
                </div>
                <button onClick={() => setViewingNeighborName(null)} className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center cursor-pointer shrink-0"><X className="w-5 h-5" /></button>
              </div>

              <div className="space-y-6">
                {/* ÜLDINFO JA KONTAKTID */}
                <div className="bg-slate-50 border border-slate-200 p-4 sm:p-5 rounded-2xl space-y-3">
                  <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block">
                    {translations.contactInfoTitle}
                  </span>
                  
                  {neighbor.bio && (
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-white p-3 rounded-xl border border-slate-100">
                      {neighbor.bio}
                    </p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs pt-1">
                    <a href={`tel:${neighbor.phone}`} className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200/80 hover:border-emerald-500 transition-colors font-bold text-slate-800">
                      <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{neighbor.phone}</span>
                    </a>
                    <a href={`mailto:${neighbor.email}`} className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200/80 hover:border-emerald-500 transition-colors font-bold text-slate-800 truncate">
                      <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="truncate">{neighbor.email}</span>
                    </a>
                    <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200/80 font-semibold text-slate-600">
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{neighbor.city}</span>
                    </div>
                    <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200/80 font-semibold text-slate-600">
                      <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{translations.joinedLabel} {neighbor.joined}</span>
                    </div>
                  </div>
                </div>

                {/* NAABRI TEHTUD KUULUTUSED */}
                <div>
                  <h4 className="text-sm font-black text-slate-900 mb-3 flex items-center justify-between">
                    <span>{translations.neighborListingsTitle} ({neighborListings.length})</span>
                  </h4>
                  {neighborListings.length === 0 ? (
                    <p className="text-xs text-slate-400 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                      {translations.noNeighborListings}
                    </p>
                  ) : (
                    <div className="space-y-2.5">
                      {neighborListings.map(nl => {
                        const nlReg = regions.find(r => r.id === nl.region);
                        return (
                          <div 
                            key={nl.id} 
                            onClick={() => {
                              setViewingNeighborName(null);
                              setSelectedListingDetail(nl);
                            }}
                            className="p-3.5 bg-white hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-400 rounded-2xl flex items-center gap-3.5 cursor-pointer transition-all group"
                          >
                            <img src={nl.image} alt={nl.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase ${nl.type === 'offer' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                  {nl.type === 'offer' ? translations.offerHelp : translations.requestHelp}
                                </span>
                                <span className="text-[11px] font-bold text-emerald-700">{nl.paymentText}</span>
                              </div>
                              <h5 className="font-bold text-xs sm:text-sm text-slate-900 truncate group-hover:text-emerald-700">{nl.title}</h5>
                              <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-emerald-600" /> {nlReg?.name}
                              </p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 shrink-0" />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* SAAVUTUSED JA MÄRGID */}
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
                  <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <Award className="w-4 h-4 text-emerald-600" /> Naabri saavutused ja märgid
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {neighbor.badges?.map((badge: string, idx: number) => (
                      <span key={idx} className="bg-white text-emerald-800 border border-emerald-200 text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-1">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* HINNANG JA HINDAMISE NUPP */}
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wider">Kogukonna hinnang</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-2xl font-black text-amber-900">{neighborAvgRating}</span>
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500" />)}
                      </div>
                      <span className="text-xs text-amber-700 font-medium">({neighbor.reviews.length} arvustust)</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => { 
                      const target = neighbor.name;
                      setViewingNeighborName(null); 
                      setRatingTargetName(target);
                      setIsRatingModalOpen(true); 
                    }} 
                    className="w-full sm:w-auto px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
                  >
                    ⭐ Hinda naabrit
                  </button>
                </div>

                {/* ARVUSTUSED */}
                <div>
                  <h4 className="text-sm font-black text-slate-900 mb-3">Naabrite tagasiside ja kommentaarid</h4>
                  <div className="space-y-3">
                    {neighbor.reviews.map((rev: any) => (
                      <div key={rev.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">{rev.author}</span>
                          <span className="text-slate-400">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-amber-500 font-bold">{'★'.repeat(rev.rating)}</span>
                          <span className="bg-teal-50 text-teal-800 font-bold px-2 py-0.5 rounded-md text-[10px] ml-2">{rev.tag}</span>
                        </div>
                        <p className="text-slate-600">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
                <button onClick={() => { const name = neighbor.name; setViewingNeighborName(null); openChatWithAuthor(name, translations.generalInquiry); }} className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold cursor-pointer flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" /> Kirjuta naabrile sõnum
                </button>
                <button onClick={() => setViewingNeighborName(null)} className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 text-white rounded-2xl text-xs font-bold cursor-pointer">{translations.close}</button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* HINDAMISE MODAL */}
      {isRatingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {ratingTargetName ? `Anna hinnang: ${ratingTargetName}` : 'Anna naabrile hinnang'}
                </h3>
                {ratingTargetName && (
                  <p className="text-xs text-emerald-700 font-semibold mt-0.5">Arvustus lisatakse naabri {ratingTargetName} profiilile</p>
                )}
              </div>
              <button onClick={() => { setIsRatingModalOpen(false); setRatingTargetName(null); }} className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer shrink-0"><X className="w-4 h-4" /></button>
            </div>

            {ratingSuccess ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl font-black">✓</div>
                <h4 className="font-bold text-base text-slate-900">Hinnang salvestatud!</h4>
                <p className="text-xs text-slate-500">Täname, et aitad hoida kogukonda usaldusväärsena.</p>
              </div>
            ) : (
              <form onSubmit={handleSendRating} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tärnid (1-5)</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button type="button" key={star} onClick={() => setRatingStars(star)} className={`text-2xl cursor-pointer ${ratingStars >= star ? 'text-amber-500' : 'text-slate-300'}`}>
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tehingu silt / kokkuvõte</label>
                  <select value={ratingTag} onChange={(e) => setRatingTag(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                    {ratingTagsList.map(tag => <option key={tag} value={tag}>{tag}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kommentaar</label>
                  <textarea rows={3} placeholder="Kirjelda oma kogemust naabriga..." value={ratingComment} onChange={(e) => setRatingComment(e.target.value)} required className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => { setIsRatingModalOpen(false); setRatingTargetName(null); }} className="px-4 py-2 bg-slate-100 rounded-xl font-bold cursor-pointer">Loobu</button>
                  <button type="submit" className="px-5 py-2 bg-amber-600 text-white rounded-xl font-bold cursor-pointer">Saada arvustus</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* JALUS */}
      <footer className="bg-slate-950 text-slate-300 pt-12 pb-8 mt-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          <div className="space-y-3">
            <div onClick={goToHome} className="flex items-center gap-2.5 cursor-pointer group inline-flex">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">SinuNaaber.ee</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{translations.footerDesc}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-white mb-3">{translations.quickLinks}</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => setActiveFooterModal('allRequests')} className="cursor-pointer hover:text-white">{translations.allRequestsLink}</button></li>
              <li><button onClick={() => setIsAddModalOpen(true)} className="cursor-pointer hover:text-white">{translations.addListing}</button></li>
              <li><button onClick={() => setActiveFooterModal('howItWorks')} className="cursor-pointer hover:text-white">{translations.howItWorksLink}</button></li>
              <li><button onClick={() => setActiveFooterModal('safety')} className="cursor-pointer hover:text-white">{translations.safetyLink}</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-3">{translations.popularRegions}</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><span className="hover:text-white cursor-pointer" onClick={() => { setSelectedRegion('tallinn'); setActiveTab('map'); }}>Tallinn (Kristiine, Mustamäe, Nõmme)</span></li>
              <li><span className="hover:text-white cursor-pointer" onClick={() => { setSelectedRegion('tartu'); setActiveTab('map'); }}>Tartu (Annelinn, Tammelinn)</span></li>
              <li><span className="hover:text-white cursor-pointer" onClick={() => { setSelectedRegion('parnu'); setActiveTab('map'); }}>Pärnu & Pärnumaa</span></li>
              <li><span className="hover:text-white cursor-pointer" onClick={() => { setSelectedRegion('narva'); setActiveTab('map'); }}>Narva & Ida-Virumaa</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-3">{translations.contactSupport}</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="font-semibold text-slate-200">+372 600 1234</li>
              <li>Vabaduse pst 10, Tallinn</li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 pt-6 text-xs text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 SinuNaaber.ee / NaabriAbi. {translations.allRights}</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <button onClick={() => setActiveFooterModal('terms')} className="hover:text-slate-300 cursor-pointer">{translations.terms}</button>
            <button onClick={() => setActiveFooterModal('privacy')} className="hover:text-slate-300 cursor-pointer">{translations.privacy}</button>
            <button onClick={() => setActiveFooterModal('cookies')} className="hover:text-slate-300 cursor-pointer">{translations.cookies}</button>
          </div>
        </div>
      </footer>

      {/* JALUSE INFO HÜPIAKENAD */}
      {activeFooterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto text-xs sm:text-sm text-slate-700 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base sm:text-xl font-black text-slate-900">
                {activeFooterModal === 'allRequests' && translations.allRequestsLink}
                {activeFooterModal === 'howItWorks' && translations.howItWorksLink}
                {activeFooterModal === 'safety' && translations.safetyLink}
                {activeFooterModal === 'terms' && translations.terms}
                {activeFooterModal === 'privacy' && translations.privacy}
                {activeFooterModal === 'cookies' && translations.cookies}
              </h3>
              <button onClick={() => setActiveFooterModal(null)} className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors shrink-0"><X className="w-4 h-4" /></button>
            </div>
            
            {activeFooterModal === 'allRequests' && (
              <div className="space-y-4 leading-relaxed text-slate-600">
                <p className="font-bold text-slate-900 text-sm">{translations.footerAllReqLead}</p>
                <div className="grid grid-cols-1 gap-4 pt-2">
                  <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 space-y-2">
                    <h4 className="font-extrabold text-emerald-900 text-sm">{translations.footerFreeHelp}</h4>
                    <p className="text-xs sm:text-sm">{translations.footerFreeHelpDesc}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                    <h4 className="font-extrabold text-slate-900 text-sm">{translations.footerMicroServ}</h4>
                    <p className="text-xs sm:text-sm">{translations.footerMicroServDesc}</p>
                  </div>
                </div>
              </div>
            )}

            {activeFooterModal === 'howItWorks' && (
              <div className="space-y-4 leading-relaxed text-slate-600">
                <p className="font-bold text-slate-900 text-sm">{translations.footerHowItWorksLead}</p>
                <div className="space-y-4 pt-2">
                  <div className="flex gap-3.5 items-start bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">1</div>
                    <div>
                      <h5 className="font-extrabold text-slate-900">{translations.footerHowStep1Title}</h5>
                      <p className="text-xs text-slate-600 mt-1">{translations.footerHowStep1Desc}</p>
                    </div>
                  </div>
                  <div className="flex gap-3.5 items-start bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">2</div>
                    <div>
                      <h5 className="font-extrabold text-slate-900">{translations.footerHowStep2Title}</h5>
                      <p className="text-xs text-slate-600 mt-1">{translations.footerHowStep2Desc}</p>
                    </div>
                  </div>
                  <div className="flex gap-3.5 items-start bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">3</div>
                    <div>
                      <h5 className="font-extrabold text-slate-900">{translations.footerHowStep3Title}</h5>
                      <p className="text-xs text-slate-600 mt-1">{translations.footerHowStep3Desc}</p>
                    </div>
                  </div>
                  <div className="flex gap-3.5 items-start bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">4</div>
                    <div>
                      <h5 className="font-extrabold text-slate-900">{translations.footerHowStep4Title}</h5>
                      <p className="text-xs text-slate-600 mt-1">{translations.footerHowStep4Desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeFooterModal === 'safety' && (
              <div className="space-y-4 leading-relaxed text-slate-600">
                <p className="font-bold text-slate-900 text-sm">{translations.footerSafetyLead}</p>
                <div className="space-y-3 pt-2">
                  <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-2xl text-xs sm:text-sm text-slate-700">
                    ✓ {translations.footerSafetyPoint1}
                  </div>
                  <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-2xl text-xs sm:text-sm text-slate-700">
                    ✓ {translations.footerSafetyPoint2}
                  </div>
                  <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-2xl text-xs sm:text-sm text-slate-700">
                    ✓ {translations.footerSafetyPoint3}
                  </div>
                </div>
              </div>
            )}

            {activeFooterModal === 'terms' && (
              <div className="space-y-3 leading-relaxed text-slate-600 text-xs sm:text-sm">
                <p className="font-bold text-slate-900">{translations.footerTermsTitle}</p>
                <p>{translations.footerTermsDesc1}</p>
                <p>{translations.footerTermsDesc2}</p>
                <p>{translations.footerTermsDesc3}</p>
              </div>
            )}

            {activeFooterModal === 'privacy' && (
              <div className="space-y-3 leading-relaxed text-slate-600 text-xs sm:text-sm">
                <p className="font-bold text-slate-900">{translations.footerPrivacyTitle}</p>
                <p>{translations.footerPrivacyDesc1}</p>
                <p>{translations.footerPrivacyDesc2}</p>
                <p>{translations.footerPrivacyDesc3}</p>
              </div>
            )}

            {activeFooterModal === 'cookies' && (
              <div className="space-y-3 leading-relaxed text-slate-600 text-xs sm:text-sm">
                <p className="font-bold text-slate-900">{translations.footerCookiesTitle}</p>
                <p>{translations.footerCookiesDesc1}</p>
                <p>{translations.footerCookiesDesc2}</p>
                <p>{translations.footerCookiesDesc3}</p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button onClick={() => setActiveFooterModal(null)} className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold cursor-pointer hover:bg-slate-800 transition-colors">{translations.close}</button>
            </div>
          </div>
        </div>
      )}
      <Analytics />
    </div>
  );
}