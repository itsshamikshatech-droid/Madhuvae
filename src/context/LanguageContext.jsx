import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    community_subtitle: "Baduga Community Matrimony",
    ancestral_title: "✦ Hethaya Nera ✦",
    ancestral_subtitle: "Our Ancestral Blessing",
    splash_desc: "A sacred, private space for the Baduga community — where tradition meets dignity in finding a life partner.",
    enter_btn: "Enter Madhuve →",
    login_title: "Login",
    login_google: "Sign in with Google",
    no_account: "New user? Sign up",
    admin_login: "Admin login",
    back: "← Back",
    welcome: "Welcome",
    login_desc: "Sign in to continue your journey",
    create_account: "Create Account →",
  },
  ta: {
    community_subtitle: "படுகர் சமூக திருமணத் தகவல் மையம்",
    ancestral_title: "✦ ஹெத்தைய நேர ✦",
    ancestral_subtitle: "எங்கள் முன்னோர்களின் ஆசி",
    splash_desc: "படுகர் சமூகத்திற்கான ஒரு புனிதமான, தனிப்பட்ட இடம் - உங்கள் வாழ்க்கை துணையை தேடுவதில் பாரம்பரியமும் கண்ணியமும் சந்திக்கும் இடம்.",
    enter_btn: "மதுவேக்குள் நுழைக →",
    login_title: "உள்நுழை",
    login_google: "கூகுள் மூலம் உள்நுழைக",
    no_account: "புதிய பயனர்? பதிவு செய்க",
    admin_login: "நிர்வாகி உள்நுழைவு",
    back: "← பின்னால்",
    welcome: "வரவேற்கிறோம்",
    login_desc: "உங்கள் பயணத்தைத் தொடர உள்நுழையவும்",
    create_account: "கணக்கை உருவாக்குக →",
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
