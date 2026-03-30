import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Splash() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="sc on" id="s-splash">
      <div className="splash-bg"></div>
      <div className="fs-center" style={{ position: 'relative', zIndex: 2 }}>
        <div className="flt fu fu1" style={{ filter: 'drop-shadow(0 10px 28px rgba(184,134,58,.32))', marginBottom: '2px' }}>
          <svg width="130" height="130" viewBox="0 0 130 130" fill="none">
            <circle cx="65" cy="60" r="52" fill="rgba(184,134,58,.08)"/>
            <path d="M65 18C26 18 10 48 10 64L65 64Z" fill="#B8863A" opacity=".93"/>
            <path d="M65 18C104 18 120 48 120 64L65 64Z" fill="#8C6020" opacity=".9"/>
            <path d="M65 18Q49 44 41 64" stroke="rgba(253,250,244,.5)" strokeWidth="1.4"/>
            <path d="M65 18Q81 44 89 64" stroke="rgba(253,250,244,.5)" strokeWidth="1.4"/>
            <path d="M65 18Q65 48 65 64" stroke="rgba(253,250,244,.4)" strokeWidth="1.6"/>
            <path d="M65 18Q37 33 20 55" stroke="rgba(253,250,244,.25)" strokeWidth=".9"/>
            <path d="M65 18Q93 33 110 55" stroke="rgba(253,250,244,.25)" strokeWidth=".9"/>
            <path d="M10 64Q17 57 24 64Q31 71 38 64Q45 57 52 64Q58 71 63 64Q65 60 67 64Q73 71 80 64Q87 57 94 64Q100 71 107 64Q113 57 120 64" stroke="#7A1E2E" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
            <circle cx="10" cy="64" r="3.2" fill="#7A1E2E"/><circle cx="38" cy="64" r="3.2" fill="#7A1E2E"/>
            <circle cx="65" cy="64" r="3.2" fill="#7A1E2E"/><circle cx="93" cy="64" r="3.2" fill="#7A1E2E"/>
            <circle cx="120" cy="64" r="3.2" fill="#7A1E2E"/>
            <circle cx="65" cy="18" r="5.5" fill="#B8863A"/><circle cx="65" cy="18" r="2.8" fill="#FDFAF4"/>
            <line x1="65" y1="64" x2="65" y2="106" stroke="#6B5030" strokeWidth="3.2" strokeLinecap="round"/>
            <path d="M65 106Q65 118 52 120Q43 121 43 113" stroke="#6B5030" strokeWidth="3.2" fill="none" strokeLinecap="round"/>
            <circle cx="65" cy="36" r="2.5" fill="rgba(253,250,244,.4)"/>
            <circle cx="48" cy="46" r="1.8" fill="rgba(253,250,244,.35)"/>
            <circle cx="82" cy="46" r="1.8" fill="rgba(253,250,244,.35)"/>
          </svg>
        </div>
        <div className="fu fu2" style={{ textAlign: 'center', marginBottom: '6px' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '48px', fontWeight: 700, color: 'var(--g1)', letterSpacing: '.05em', lineHeight: 1 }}>Madhuve</div>
          <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--hint)', marginTop: '5px' }}>{t('community_subtitle')}</div>
        </div>
        <div className="div-c fu fu3" style={{ margin: '10px auto 14px' }}></div>
        <div className="fu fu3" style={{ textAlign: 'center', marginBottom: '18px' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '17px', color: 'var(--cr)', letterSpacing: '.07em' }}>{t('ancestral_title')}</div>
          <div style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: '12.5px', color: 'var(--hint)', marginTop: '4px' }}>{t('ancestral_subtitle')}</div>
        </div>
        <div className="fu fu4" style={{ background: 'rgba(184,134,58,.07)', border: '1px solid rgba(184,134,58,.18)', borderRadius: '18px', padding: '16px 20px', textAlign: 'center', marginBottom: '22px', width: '100%' }}>
          <p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: 1.7 }}>{t('splash_desc')}</p>
        </div>
        <div className="ltog fu fu4">
          <button 
            className={`lbtn ${language === 'en' ? 'on' : ''}`} 
            onClick={() => setLanguage('en')}
          >
            English
          </button>
          <button 
            className={`lbtn ${language === 'ta' ? 'on' : ''}`} 
            onClick={() => setLanguage('ta')}
          >
            தமிழ்
          </button>
        </div>
        <button className="btn btn-gold fu fu5" onClick={() => navigate('/login')}>{t('enter_btn')}</button>
      </div>
    </div>
  );
}
