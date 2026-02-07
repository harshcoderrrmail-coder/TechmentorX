import React, { createContext, useContext, useState, useCallback } from "react";

type Language = "en" | "hi";

interface Translations {
  [key: string]: { en: string; hi: string };
}

const translations: Translations = {
  // Navbar
  "nav.logo": { en: "MedSimplify", hi: "MedSimplify" },
  "nav.login": { en: "Log In", hi: "लॉग इन" },
  "nav.signup": { en: "Sign Up", hi: "साइन अप" },
  "nav.logout": { en: "Log Out", hi: "लॉग आउट" },
  "nav.dashboard": { en: "Dashboard", hi: "डैशबोर्ड" },

  // Hero
  "hero.title": { en: "Understand Your Medical Reports", hi: "अपनी मेडिकल रिपोर्ट समझें" },
  "hero.title2": { en: "in Simple Language", hi: "सरल भाषा में" },
  "hero.subtitle": {
    en: "Our AI translates complex medical jargon into clear, easy-to-understand language — so you can focus on your health, not your anxiety.",
    hi: "हमारा AI जटिल चिकित्सा शब्दावली को स्पष्ट, आसान भाषा में अनुवाद करता है — ताकि आप अपने स्वास्थ्य पर ध्यान दे सकें।",
  },
  "hero.cta.signup": { en: "Get Started Free", hi: "मुफ्त शुरू करें" },
  "hero.cta.login": { en: "Log In", hi: "लॉग इन करें" },

  // Features
  "features.title": { en: "Why MedSimplify?", hi: "MedSimplify क्यों?" },
  "features.ai.title": { en: "AI Simplification", hi: "AI सरलीकरण" },
  "features.ai.desc": {
    en: "Advanced AI breaks down complex medical terminology into plain language anyone can understand.",
    hi: "उन्नत AI जटिल चिकित्सा शब्दावली को सरल भाषा में बदलता है।",
  },
  "features.risk.title": { en: "Risk Indicator", hi: "जोखिम संकेतक" },
  "features.risk.desc": {
    en: "Visual risk assessment helps you quickly understand the urgency of your results at a glance.",
    hi: "दृश्य जोखिम मूल्यांकन आपको अपने परिणामों की तात्कालिकता तुरंत समझने में मदद करता है।",
  },
  "features.lang.title": { en: "Multi-language", hi: "बहु-भाषा" },
  "features.lang.desc": {
    en: "Get your reports simplified in English or Hindi — with more languages coming soon.",
    hi: "अपनी रिपोर्ट अंग्रेजी या हिंदी में सरल करें — और भाषाएं जल्द आ रही हैं।",
  },
  "features.secure.title": { en: "Secure & Private", hi: "सुरक्षित और निजी" },
  "features.secure.desc": {
    en: "Your medical data is encrypted and never shared. Your privacy is our top priority.",
    hi: "आपका मेडिकल डेटा एन्क्रिप्टेड है और कभी साझा नहीं किया जाता। आपकी गोपनीयता हमारी प्राथमिकता है।",
  },

  // Footer
  "footer.disclaimer": {
    en: "This AI tool provides educational information only and does not replace professional medical advice. Always consult a qualified healthcare provider.",
    hi: "यह AI उपकरण केवल शैक्षिक जानकारी प्रदान करता है और पेशेवर चिकित्सा सलाह की जगह नहीं लेता। हमेशा एक योग्य स्वास्थ्य प्रदाता से परामर्श करें।",
  },

  // Auth
  "auth.login.title": { en: "Welcome Back", hi: "वापसी पर स्वागत" },
  "auth.login.subtitle": { en: "Sign in to your account", hi: "अपने खाते में साइन इन करें" },
  "auth.signup.title": { en: "Create Account", hi: "खाता बनाएं" },
  "auth.signup.subtitle": { en: "Start understanding your health reports", hi: "अपनी स्वास्थ्य रिपोर्ट समझना शुरू करें" },
  "auth.email": { en: "Email", hi: "ईमेल" },
  "auth.password": { en: "Password", hi: "पासवर्ड" },
  "auth.name": { en: "Full Name", hi: "पूरा नाम" },
  "auth.login.btn": { en: "Sign In", hi: "साइन इन" },
  "auth.signup.btn": { en: "Create Account", hi: "खाता बनाएं" },
  "auth.switch.login": { en: "Already have an account?", hi: "पहले से खाता है?" },
  "auth.switch.signup": { en: "Don't have an account?", hi: "खाता नहीं है?" },
  "auth.check.email": { en: "Check your email for a confirmation link!", hi: "पुष्टि लिंक के लिए अपना ईमेल जांचें!" },

  // Dashboard
  "dash.new": { en: "New Report", hi: "नई रिपोर्ट" },
  "dash.history": { en: "Report History", hi: "रिपोर्ट इतिहास" },
  "dash.upload.title": { en: "Upload Medical Report", hi: "मेडिकल रिपोर्ट अपलोड करें" },
  "dash.upload.drag": { en: "Drag & drop your PDF here, or click to browse", hi: "अपना PDF यहां खींचें और छोड़ें, या ब्राउज़ करें" },
  "dash.upload.paste": { en: "Or paste report text below", hi: "या नीचे रिपोर्ट टेक्स्ट पेस्ट करें" },
  "dash.upload.placeholder": { en: "Paste your medical report text here...", hi: "अपनी मेडिकल रिपोर्ट का टेक्स्ट यहां पेस्ट करें..." },
  "dash.analyze": { en: "Analyze Report", hi: "रिपोर्ट का विश्लेषण करें" },
  "dash.analyzing": { en: "Analyzing your report with AI…", hi: "AI से आपकी रिपोर्ट का विश्लेषण हो रहा है…" },
  "dash.summary": { en: "Summary", hi: "सारांश" },
  "dash.indicators": { en: "Key Health Indicators", hi: "मुख्य स्वास्थ्य संकेतक" },
  "dash.risk": { en: "Overall Risk Level", hi: "समग्र जोखिम स्तर" },
  "dash.suggestions": { en: "Lifestyle Suggestions", hi: "जीवनशैली सुझाव" },
  "dash.doctor": { en: "Doctor Consultation", hi: "डॉक्टर परामर्श" },
  "dash.no.reports": { en: "No reports yet", hi: "अभी तक कोई रिपोर्ट नहीं" },
  "dash.welcome": { en: "Welcome to MedSimplify", hi: "MedSimplify में आपका स्वागत है" },
  "dash.welcome.sub": { en: "Upload a medical report to get started", hi: "शुरू करने के लिए एक मेडिकल रिपोर्ट अपलोड करें" },

  // Risk levels
  "risk.low": { en: "Low Risk", hi: "कम जोखिम" },
  "risk.moderate": { en: "Moderate Risk", hi: "मध्यम जोखिम" },
  "risk.high": { en: "High Risk", hi: "उच्च जोखिम" },

  // Status
  "status.normal": { en: "Normal", hi: "सामान्य" },
  "status.moderate": { en: "Moderate", hi: "मध्यम" },
  "status.high": { en: "High Risk", hi: "उच्च जोखिम" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = useCallback(
    (key: string) => {
      const translation = translations[key];
      if (!translation) return key;
      return translation[language] || translation.en || key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
