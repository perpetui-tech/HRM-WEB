export const AppConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME || "HR Portal",
  logo: process.env.NEXT_PUBLIC_APP_LOGO || "/logo.png",
  smLogo: process.env.NEXT_PUBLIC_APP_SM_LOGO || "logo.png",
  address: process.env.NEXT_PUBLIC_APP_ADDRESS || "Your Company Address",
  logoBgColor: process.env.LOGO_BG_COLOUR || "#121833",
  companyName: process.env.NEXT_PUBLIC_APP_COMPANY_NAME || "HRM PORTAL",
  themePrimaryColor: process.env.NEXT_PUBLIC_THEME_COLOR || "#1e40af",
  companyLogo: process.env.NEXT_PUBLIC_COMPANY_LOGO || "/logo.png",  
  themeColor: process.env.NEXT_PUBLIC_PRIMARY_COLOR || "#00ab75",
  fontFamily: process.env.NEXT_PUBLIC_FONT || "Montserrat, sans-serif",
  backgroundImage: process.env.NEXT_PUBLIC_BACKGROUND_IMAGE || null,
  themeBackground: process.env.NEXT_PUBLIC_PRIMARY_COLOR || "#F1F5F9",
  textColor: process.env.NEXT_PUBLIC_TEXT_COLOR || "#1F2937",
  font: process.env.NEXT_PUBLIC_FONT || "Inter",
  fontWeight: process.env.NEXT_PUBLIC_FONT_WEIGHT || "400",
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/",
  IS_DEV_MODE: process.env.NEXT_PUBLIC_DEV_MODE || false,
  

};
