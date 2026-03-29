const F2S = "ix07LcoXO9jQRtGYr8h1HFU34gWvqmPkIzNEfab56CsDVyudAZoKWzx1ZkfMwTVmEeFrL0SJNb8C9dqO";

export const sendOTP = async (phone) => {
  const otp = String(Math.floor(1000 + Math.random() * 9000));
  localStorage.setItem('m_otp', otp);
  
  try {
    const r = await fetch(`https://www.fast2sms.com/dev/bulkV2?authorization=${F2S}&route=otp&variables_values=${otp}&flash=0&numbers=${phone}`);
    const d = await r.json();
    if (d.return === true) {
      return { success: true, otp };
    }
    return { success: false, otp, error: d.message };
  } catch (e) {
    return { success: false, otp, error: 'Network error demo mode' };
  }
};

export const verifyOTP = (enteredOtp) => {
  const stored = localStorage.getItem('m_otp');
  return { success: enteredOtp === stored };
};

export const OWNER_EMAIL = "shamikshaanandkumar@gmail.com";
export const OWNER_PASS  = "Shamu@270108";
