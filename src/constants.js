const MAX_SIZE = 8;
const VALID_FILE_TYPE = 'audio/wav';
const ONE_YEAR = 31536000000;
const KIDS_AGE_GROUP = 'upto 10'; //should be change when we have data for kids
const KIDS = 'medium';
const ADULT = 'medium';
const MAX_LENGTH = 12;
const MOBILE_REGEX = /^[6-9]\d{9}$/;
const EMAIL_REGEX = /^\S+@\S+[\.][0-9a-z]+$/;
const MOTHER_TONGUE = [
  'Assamese',
  'Bengali',
  'Bodo',
  'Dogri',
  'Gujarati',
  'Hindi',
  'Kannada',
  'Kashmiri',
  'Konkani',
  'Maithili',
  'Malayalam',
  'Manipuri',
  'Marathi',
  'Nepali',
  'Odia',
  'Punjabi',
  'Sanskrit',
  'Santali',
  'Sindhi',
  'Tamil',
  'Telugu',
  'Urdu',
];
const LANGUAGES = [{ value: "Assamese", id: "as", text: "অসমীয়া" },
{ value: "Bengali", id: "bn", text: "বাংলা" },
// {value: "English", id: "en", text: "English"},
{ value: "Gujarati", id: "gu", text: "ગુજરાતી" },
{ value: "Hindi", id: "hi", text: "हिंदी" },
{ value: "Kannada", id: "kn", text: "ಕನ್ನಡ" },
{ value: "Malayalam", id: "ml", text: "മലയാളം" },
{ value: "Marathi", id: "mr", text: "मराठी" },
{ value: "Odia", id: "or", text: "ଓଡିଆ" },
{ value: "Punjabi", id: "pa", text: "ਪੰਜਾਬੀ" },
{ value: "Tamil", id: "ta", text: "தமிழ்" },
{ value: "Telugu", id: "te", text: "తెలుగు" },
{ value: "Dogri", id: "doi", text: "Dogri" },
{ value: "Maithili", id: "mai", text: "Maithili" },
{ value: "Urdu", id: "ur", text: "Urdu" },
{ value: "Konkani Roman", id: "kr", text: "Konkani Roman" },
{ value: "Konkani DV", id: "kd", text: "Konkani DV" },
{ value: "Manipuri BN", id: "mnibn", text: "Manipuri BN" },
{ value: "Manipuri MM", id: "mnimm", text: "Manipuri MM" },
{ value: "Santali OL", id: "satol", text: "Santali OL" },
{ value: "Santali DV", id: "satdv", text: "Santali DV" },
{ value: "Sanskrit", id: "sa", text: "Sanskrit" }];

const AGE_GROUP = [
  '',
  'upto 10',
  '10 - 30',
  '30 - 60',
  '60+',
];
const GENDER = ['', 'male', 'female', 'others'];

const WADASNR_BIN_PATH = '/opt/binaries/WadaSNR/Exe'
const FEEDBACK_MIN_LENGTH = 10

const FEEDBACK_MAX_LENGTH = 1000

module.exports = {
  MAX_SIZE,
  VALID_FILE_TYPE,
  ONE_YEAR,
  KIDS_AGE_GROUP,
  KIDS,
  ADULT,
  MOBILE_REGEX,
  EMAIL_REGEX,
  MOTHER_TONGUE,
  LANGUAGES,
  MAX_LENGTH,
  AGE_GROUP,
  GENDER,
  WADASNR_BIN_PATH,
  FEEDBACK_MIN_LENGTH,
  FEEDBACK_MAX_LENGTH
};
