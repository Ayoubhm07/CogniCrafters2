import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
interface CountryLanguages {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})


export class MyMemoryTranslationService {
  private apiUrl = 'https://api.mymemory.translated.net/get';
  
  constructor(private http: HttpClient) {}
  
  getUserIP(): Observable<any> {
    return this.http.get('https://api.ipify.org/?format=json');
  }

  getLocationByIP(ip: string): Observable<any> {
    return this.http.get(`https://ipapi.co/${ip}/json/`);
  }

  getLanguageByLocation(location: any): string {
    const country = location.country_code; // Récupérer le code pays depuis la localisation

    // Mapper les codes pays aux langues correspondantes
    const countryLanguages: CountryLanguages = {
      'AF': 'ps', // Afghanistan -> pachto (pashto)
      'AL': 'sq', // Albanie -> albanais
      'DZ': 'ar', // Algérie -> arabe
      'AD': 'ca', // Andorre -> catalan
      'AO': 'pt', // Angola -> portugais
      'AG': 'en', // Antigua-et-Barbuda -> anglais
      'AR': 'es', // Argentine -> espagnol
      'AM': 'hy', // Arménie -> arménien
      'AU': 'en', // Australie -> anglais
      'AT': 'de', // Autriche -> allemand
      'AZ': 'az', // Azerbaïdjan -> azerbaïdjanais
      'BS': 'en', // Bahamas -> anglais
      'BH': 'ar', // Bahreïn -> arabe
      'BD': 'bn', // Bangladesh -> bengali
      'BB': 'en', // Barbade -> anglais
      'BY': 'be', // Biélorussie -> biélorusse
      'BE': 'nl', // Belgique -> néerlandais, fr -> français, de -> allemand
      'BZ': 'en', // Belize -> anglais
      'BJ': 'fr', // Bénin -> français
      'BT': 'dz', // Bhoutan -> dzongkha
      'BO': 'es', // Bolivie -> espagnol
      'BA': 'bs', // Bosnie-Herzégovine -> bosnien
      'BW': 'en', // Botswana -> anglais
      'BR': 'pt', // Brésil -> portugais
      'BN': 'ms', // Brunéi Darussalam -> malais
      'BG': 'bg', // Bulgarie -> bulgare
      'BF': 'fr', // Burkina Faso -> français
      'BI': 'rn', // Burundi -> rundi (kirundi)
      'CV': 'pt', // Cap-Vert -> portugais
      'KH': 'km', // Cambodge -> khmer
      'CM': 'fr', // Cameroun -> français
      'CA': 'en', // Canada -> anglais, fr -> français
      'CF': 'fr', // République centrafricaine -> français
      'TD': 'fr', // Tchad -> français
      'CL': 'es', // Chili -> espagnol
      'CN': 'zh', // Chine -> chinois (mandarin)
      'CO': 'es', // Colombie -> espagnol
      'KM': 'ar', // Comores -> arabe
      'CD': 'fr', // République démocratique du Congo -> français
      'CG': 'fr', // Congo -> français
      'CR': 'es', // Costa Rica -> espagnol
      'HR': 'hr', // Croatie -> croate
      'CU': 'es', // Cuba -> espagnol
      'CY': 'el', // Chypre -> grec
      'CZ': 'cs', // République tchèque -> tchèque
      'DK': 'da', // Danemark -> danois
      'DJ': 'fr', // Djibouti -> français
      'DM': 'en', // Dominique -> anglais
      'DO': 'es', // République dominicaine -> espagnol
      'EC': 'es', // Équateur -> espagnol
      'EG': 'ar', // Égypte -> arabe
      'SV': 'es', // Salvador -> espagnol
      'GQ': 'fr', // Guinée équatoriale -> français
      'ER': 'ti', // Érythrée -> tigrinya
      'EE': 'et', // Estonie -> estonien
      'ET': 'am', // Éthiopie -> amharique
      'FJ': 'en', // Fidji -> anglais
      'FI': 'fi', // Finlande -> finnois
      'FR': 'fr', // France -> français
      'GA': 'fr', // Gabon -> français
      'GM': 'en', // Gambie -> anglais
      'GE': 'ka', // Géorgie -> géorgien
      'DE': 'de', // Allemagne -> allemand
      'GH': 'en', // Ghana -> anglais
      'GR': 'el', // Grèce -> grec
      'GD': 'en', // Grenade -> anglais
      'GT': 'es', // Guatemala -> espagnol
      'GN': 'fr', // Guinée -> français
      'GW': 'pt', // Guinée-Bissau -> portugais
      'GY': 'en', // Guyana -> anglais
      'HT': 'fr', // Haïti -> français
      'HN': 'es', // Honduras -> espagnol
      'HU': 'hu', // Hongrie -> hongrois
      'IS': 'is', // Islande -> islandais
      'IN': 'hi', // Inde -> hindi, en -> anglais
      'ID': 'id', // Indonésie -> indonésien
      'IR': 'fa', // Iran -> persan
      'IQ': 'ar', // Irak -> arabe
      'IE': 'en', // Irlande -> anglais
      'IL': 'he', // Israël -> hébreu
      'IT': 'it', // Italie -> italien
      'CI': 'fr', // Côte d'Ivoire -> français
      'JM': 'en', // Jamaïque -> anglais
      'JP': 'ja', // Japon -> japonais
      'JO': 'ar', // Jordanie -> arabe
      'KZ': 'kk', // Kazakhstan -> kazakh
      'KE': 'sw', // Kenya -> swahili
      'KI': 'en', // Kiribati -> anglais
      'KW': 'ar', // Koweït -> arabe
      'KG': 'ky', // Kirghizistan -> kirghize
      'LA': 'lo', // Laos -> lao
      'LV': 'lv', // Lettonie -> letton
      'LB': 'ar', // Liban -> arabe
      'LS': 'en', // Lesotho -> anglais
      'LR': 'en', // Libéria -> anglais
      'LY': 'ar', // Libye -> arabe
      'LI': 'de', // Liechtenstein -> allemand
      'LT': 'lt', // Lituanie -> lituanien
      'LU': 'fr', // Luxembourg -> français, lb -> luxembourgeois, de -> allemand
      'MG': 'mg', // Madagascar -> malgache
      'MW': 'en', // Malawi -> anglais
      'MY': 'ms', // Malaisie -> malais
      'MV': 'dv', // Maldives -> maldivien
      'ML': 'bm', // Mali -> bambara
      'MT': 'mt', // Malte -> maltais
      'MH': 'mh', // Îles Marshall -> marshallais
      'MR': 'ar', // Mauritanie -> arabe
      'MU': 'en', // Maurice -> anglais
      'MX': 'es', // Mexique -> espagnol
      'FM': 'en', // Micronésie -> anglais
      'MD': 'ro', // Moldavie -> roumain
      'MC': 'fr', // Monaco -> français
      'MN': 'mn', // Mongolie -> mongol
      'ME': 'sr', // Monténégro -> serbe
      'MA': 'ar', // Maroc -> arabe
      'MZ': 'pt', // Mozambique -> portugais
      'MM': 'my', // Myanmar -> birman
      'NA': 'en', // Namibie -> anglais
      'NR': 'en', // Nauru -> anglais
      'NP': 'ne', // Népal -> népalais
      'NL': 'nl', // Pays-Bas -> néerlandais
      'NZ': 'en', // Nouvelle-Zélande -> anglais
      'NI': 'es', // Nicaragua -> espagnol
      'NE': 'fr', // Niger -> français
      'NG': 'en', // Nigéria -> anglais
      'NO': 'no', // Norvège -> norvégien
      'OM': 'ar', // Oman -> arabe
      'PK': 'ur', // Pakistan -> ourdou
      'PW': 'en', // Palaos -> anglais
      'PA': 'es', // Panama -> espagnol
      'PG': 'en', // Papouasie-Nouvelle-Guinée -> anglais
      'PY': 'es', // Paraguay -> espagnol
      'PE': 'es', // Pérou -> espagnol
      'PH': 'tl', // Philippines -> tagalog
      'PL': 'pl', // Pologne -> polonais
      'PT': 'pt', // Portugal -> portugais
      'QA': 'ar', // Qatar -> arabe
      'RO': 'ro', // Roumanie -> roumain
      'RU': 'ru', // Russie -> russe
      'RW': 'rw', // Rwanda -> kinyarwanda
      'KN': 'en', // Saint-Christophe-et-Niévès -> anglais
      'LC': 'en', // Sainte-Lucie -> anglais
      'VC': 'en', // Saint-Vincent-et-les-Grenadines -> anglais
      'WS': 'sm', // Samoa -> samoan
      'SM': 'it', // Saint-Marin -> italien
      'ST': 'pt', // Sao Tomé-et-Principe -> portugais
      'SA': 'ar', // Arabie Saoudite -> arabe
      'SN': 'fr', // Sénégal -> français
      'RS': 'sr', // Serbie -> serbe
      'SC': 'en', // Seychelles -> anglais
      'SL': 'en', // Sierra Leone -> anglais
      'SG': 'en', // Singapour -> anglais
      'SK': 'sk', // Slovaquie -> slovaque
      'SI': 'sl', // Slovénie -> slovène
      'SB': 'en', // Îles Salomon -> anglais
      'SO': 'so', // Somalie -> somali
      'ZA': 'zu', // Afrique du Sud -> zoulou
      'KR': 'ko', // Corée du Sud -> coréen
      'SS': 'en', // Soudan du Sud -> anglais
      'ES': 'es', // Espagne -> espagnol
      'LK': 'si', // Sri Lanka -> cingalais
      'SD': 'ar', // Soudan -> arabe
      'SR': 'nl', // Suriname -> néerlandais
      'SZ': 'en', // Eswatini -> anglais
      'SE': 'sv', // Suède -> suédois
      'CH': 'de', // Suisse -> allemand, fr -> français, it -> italien, rm -> romanche
      'SY': 'ar', // Syrie -> arabe
      'TJ': 'tg', // Tadjikistan -> tadjik
      'TZ': 'sw', // Tanzanie -> swahili
      'TH': 'th', // Thaïlande -> thaï
      'TL': 'pt', // Timor-Leste -> portugais
      'TG': 'fr', // Togo -> français
      'TO': 'to', // Tonga -> tongan
      'TT': 'en', // Trinité-et-Tobago -> anglais
      'TN': 'ar', // Tunisie -> arabe
      'TR': 'tr', // Turquie -> turc
      'TM': 'tk', // Turkménistan -> turkmène
      'TV': 'en', // Tuvalu -> anglais
      'UG': 'sw', // Ouganda -> swahili
      'UA': 'uk', // Ukraine -> ukrainien
      'AE': 'ar', // Émirats arabes unis -> arabe
      'GB': 'en', // Royaume-Uni -> anglais
      'US': 'en', // États-Unis -> anglais
      'UY': 'es', // Uruguay -> espagnol
      'UZ': 'uz', // Ouzbékistan -> ouzbek
      'VU': 'bi', // Vanuatu -> bislama
      'VA': 'it', // Saint-Siège (Cité du Vatican) -> italien
      'VE': 'es', // Venezuela -> espagnol
      'VN': 'vi', // Vietnam -> vietnamien
      'YE': 'ar', // Yémen -> arabe
      'ZM': 'en', // Zambie -> anglais
      'ZW': 'en', // Zimbabwe -> anglais
    }    
    if (countryLanguages.hasOwnProperty(country)) {
      return countryLanguages[country];
    } else {
      return 'en';
    }
  }
  translate(text: string, sourceLang: string, targetLang: string): Observable<string> {
    const url = `${this.apiUrl}?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;
    return this.http.get<any>(url).pipe(
      map(response => response.responseData.translatedText)
    );
  }
  translateText(text: string, targetLang: string): Observable<string> {
    return this.getUserIP().pipe(
      switchMap(userIpInfo => {
        const userCountryCode = userIpInfo.country; // Obtenez le code pays à partir de l'adresse IP
        const sourceLang = this.getLanguageByLocation(userCountryCode); // Obtenez la langue associée au code pays

        const url = `${this.apiUrl}?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;
        return this.http.get<any>(url).pipe(
          map(response => response.responseData.translatedText)
        );
      })
    );
  }
}
 
