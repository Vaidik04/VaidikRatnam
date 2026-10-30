/**
 * VAIDIK RATNAM — VEDIC ASTROLOGY & RATNA KNOWLEDGE BASE
 * Grounded in classical Parashari Jyotish (Brihat Parashara Hora Shastra)
 * and classical Ratna Shastra (Garuda Purana, Brihat Samhita).
 */

export interface PlanetaryGemstone {
  planet: string;
  sanskritPlanet: string;
  primaryRatna: string;
  sanskritRatna: string;
  mineralFamily: string;
  upaRatnas: string[];
  auspiciousMetal: string;
  wearingFinger: string;
  wearingDay: string;
  muhurtaTime: string;
  beejMantra: string;
  deity: string;
  cosmicRay: string;
  lifeSignifications: string[];
}

export interface LagnaProfile {
  slug: string;
  sanskritName: string;
  englishName: string;
  rulingPlanet: string;
  element: "Agni (Fire)" | "Prithvi (Earth)" | "Vayu (Air)" | "Jala (Water)";
  nature: "Chara (Movable)" | "Sthira (Fixed)" | "Dvisvabhava (Dual)";
  description: string;
  // Functional Benefic Gemstones (Dharma Trikona: Houses 1, 5, 9)
  lagneshRatna: {
    stone: string;
    sanskritName: string;
    house: "1st House (Tanu Bhava)";
    significance: string;
  };
  panchameshRatna: {
    stone: string;
    sanskritName: string;
    house: "5th House (Putra / Purva Punya)";
    significance: string;
  };
  bhagyeshRatna: {
    stone: string;
    sanskritName: string;
    house: "9th House (Bhagya Bhava)";
    significance: string;
  };
  // Cautionary / Strictly Inimical Gemstones (Pratikool)
  prohibitedGemstones: {
    stone: string;
    planet: string;
    reason: string;
  }[];
  // Classical recommendations
  primaryMetal: string;
  keyMantra: string;
  traditionalNonStoneRemedies: string[];
}

export const NAVAGRAHA_DATA: Record<string, PlanetaryGemstone> = {
  surya: {
    planet: "Sun",
    sanskritPlanet: "Surya",
    primaryRatna: "Ruby",
    sanskritRatna: "Manikya (माणिक्य)",
    mineralFamily: "Natural Corundum",
    upaRatnas: ["Red Garnet", "Rubellite (Red Tourmaline)", "Red Spinel"],
    auspiciousMetal: "22K/18K Yellow Gold or Copper",
    wearingFinger: "Ring Finger (Anamika)",
    wearingDay: "Sunday (Ravivar) morning during Shukla Paksha",
    muhurtaTime: "Within 1 hour after sunrise",
    beejMantra: "Om Hram Hreem Hroum Sah Suryaya Namah (ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः)",
    deity: "Lord Surya / Gayatri",
    cosmicRay: "Red Cosmic Light",
    lifeSignifications: ["Vitality", "Leadership", "Father", "Soul Strength (Atmakaraka)", "Governance", "Dignity"],
  },
  chandra: {
    planet: "Moon",
    sanskritPlanet: "Chandra",
    primaryRatna: "Natural Pearl",
    sanskritRatna: "Mukta / Moti (मोती)",
    mineralFamily: "Natural Basra / South Sea Organic Gemstone",
    upaRatnas: ["Natural Moonstone", "White Agate"],
    auspiciousMetal: "Pure Silver (925 / Chandi)",
    wearingFinger: "Little Finger (Kanishtha) or Ring Finger",
    wearingDay: "Monday (Somvar) evening or Shukla Paksha morning",
    muhurtaTime: "Early morning or Moonrise",
    beejMantra: "Om Shram Shreem Shroum Sah Chandraya Namah (ॐ श्रां श्रीं श्रौं सः चन्द्राय नमः)",
    deity: "Lord Shiva / Goddess Parvati",
    cosmicRay: "Orange / White Luminous Light",
    lifeSignifications: ["Mind (Manas)", "Mother", "Emotional Calm", "Intuition", "Bodily Fluids", "Peace of Heart"],
  },
  mangala: {
    planet: "Mars",
    sanskritPlanet: "Mangala",
    primaryRatna: "Red Coral",
    sanskritRatna: "Moonga / Pravala (मूंगा)",
    mineralFamily: "Organic Precious Coral (Corallium Rubrum)",
    upaRatnas: ["Red Carnelian", "Red Jasper"],
    auspiciousMetal: "Copper or Gold-Silver alloy (Panchadhatu)",
    wearingFinger: "Ring Finger (Anamika) or Index Finger",
    wearingDay: "Tuesday (Mangalvar) morning during Shukla Paksha",
    muhurtaTime: "Within 1 hour after sunrise",
    beejMantra: "Om Kram Kreem Kroum Sah Bhaumaya Namah (ॐ क्रां क्रीं क्रौं सः भौमाय नमः)",
    deity: "Lord Kartikeya (Murugan) / Hanuman Ji",
    cosmicRay: "Yellow Cosmic Light",
    lifeSignifications: ["Courage", "Brothers", "Land & Property", "Physical Energy", "Technical Skill", "Willpower"],
  },
  budha: {
    planet: "Mercury",
    sanskritPlanet: "Budha",
    primaryRatna: "Emerald",
    sanskritRatna: "Panna / Marakata (पन्ना)",
    mineralFamily: "Natural Beryl",
    upaRatnas: ["Green Tourmaline (Verdelite)", "Peridot", "Green Tsavorite"],
    auspiciousMetal: "Gold or Panchadhatu",
    wearingFinger: "Little Finger (Kanishtha)",
    wearingDay: "Wednesday (Budhvar) morning during Shukla Paksha",
    muhurtaTime: "2 hours after sunrise",
    beejMantra: "Om Bram Breem Broum Sah Budhaya Namah (ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः)",
    deity: "Lord Vishnu",
    cosmicRay: "Green Cosmic Light",
    lifeSignifications: ["Intellect (Buddhi)", "Commerce & Trade", "Speech & Writing", "Analysis", "Nervous System"],
  },
  guru: {
    planet: "Jupiter",
    sanskritPlanet: "Brihaspati / Guru",
    primaryRatna: "Yellow Sapphire",
    sanskritRatna: "Pukhraj / Pushparaga (पुखराज)",
    mineralFamily: "Natural Corundum",
    upaRatnas: ["Yellow Topaz (Imperial)", "Natural Heliodor", "Citrine"],
    auspiciousMetal: "22K/18K Yellow Gold or Brass",
    wearingFinger: "Index Finger (Tarjani)",
    wearingDay: "Thursday (Guruvar) morning during Shukla Paksha",
    muhurtaTime: "Within 1 hour after sunrise",
    beejMantra: "Om Gram Greem Groum Sah Gurave Namah (ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः)",
    deity: "Lord Dakshinamurthy / Lord Brahma",
    cosmicRay: "Blue Cosmic Light",
    lifeSignifications: ["Wisdom", "Dharma", "Children (Santana)", "Spiritual Grace", "Wealth", "Higher Learning"],
  },
  shukra: {
    planet: "Venus",
    sanskritPlanet: "Shukra",
    primaryRatna: "Diamond or White Sapphire",
    sanskritRatna: "Heera (हीरा) / Shwet Pukhraj",
    mineralFamily: "Carbon Diamond or Natural Colorless Corundum",
    upaRatnas: ["Natural White Zircon", "Goshenite (White Beryl)"],
    auspiciousMetal: "Platinum, White Gold, or Pure Silver",
    wearingFinger: "Middle Finger (Madhyama) or Little Finger",
    wearingDay: "Friday (Shukravar) morning during Shukla Paksha",
    muhurtaTime: "Early morning or sunrise",
    beejMantra: "Om Dram Dreem Droum Sah Shukraya Namah (ॐ द्रां द्रीं द्रौं सः शुक्राय नमः)",
    deity: "Goddess Mahalakshmi",
    cosmicRay: "Indigo Cosmic Light",
    lifeSignifications: ["Beauty", "Art & Creativity", "Spouse (Kalatra)", "Luxury", "Vehicles", "Refinement"],
  },
  shani: {
    planet: "Saturn",
    sanskritPlanet: "Shani",
    primaryRatna: "Blue Sapphire",
    sanskritRatna: "Neelam / Neelashma (नीलम)",
    mineralFamily: "Natural Corundum",
    upaRatnas: ["Amethyst (Jamunia)", "Blue Iolite (Kaka-neeli)", "Blue Topaz"],
    auspiciousMetal: "Iron, White Gold, or Panchadhatu / Silver",
    wearingFinger: "Middle Finger (Madhyama)",
    wearingDay: "Saturday (Shanivar) evening or twilight during Shukla Paksha",
    muhurtaTime: "During sunset or twilight",
    beejMantra: "Om Pram Preem Proum Sah Shanaischaraya Namah (ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः)",
    deity: "Lord Shiva / Lord Hanuman",
    cosmicRay: "Violet Cosmic Light",
    lifeSignifications: ["Discipline", "Longevity (Ayur)", "Patience", "Hard Labor", "Justice", "Detachment"],
  },
  rahu: {
    planet: "North Node (Rahu)",
    sanskritPlanet: "Rahu",
    primaryRatna: "Hessonite Garnet",
    sanskritRatna: "Gomed / Gomedhaka (गोमेद)",
    mineralFamily: "Grossular Garnet",
    upaRatnas: ["Orange-Brown Zircon", "Spessartine Garnet"],
    auspiciousMetal: "Silver or Ashtadhatu",
    wearingFinger: "Middle Finger (Madhyama)",
    wearingDay: "Saturday during twilight or Rahu Kaal transition",
    muhurtaTime: "Late evening or post-sunset",
    beejMantra: "Om Bhram Bhreem Bhroum Sah Rahave Namah (ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः)",
    deity: "Goddess Durga / Bhairava",
    cosmicRay: "Ultraviolet Cosmic Rays",
    lifeSignifications: ["Ambition", "Foreign Endeavors", "Unconventional Thought", "Research", "Breakthroughs"],
  },
  ketu: {
    planet: "South Node (Ketu)",
    sanskritPlanet: "Ketu",
    primaryRatna: "Cat's Eye Chrysoberyl",
    sanskritRatna: "Vaidurya / Lehsunia (लहसुनिया)",
    mineralFamily: "Natural Chrysoberyl (with Chatoyancy)",
    upaRatnas: ["Cat's Eye Quartz", "Cat's Eye Tourmaline"],
    auspiciousMetal: "Silver or Gold",
    wearingFinger: "Middle Finger or Little Finger",
    wearingDay: "Tuesday or Thursday during Brahma Muhurta / Night",
    muhurtaTime: "Night time or early pre-dawn",
    beejMantra: "Om Sram Sreem Sroum Sah Ketave Namah (ॐ स्रां स्रीं स्रौं सः केतवे नमः)",
    deity: "Lord Ganesha",
    cosmicRay: "Infrared Cosmic Rays",
    lifeSignifications: ["Moksha (Liberation)", "Occult Insight", "Spiritual Discrimination", "Intuitive Healing"],
  },
};

export const LAGNA_PROFILES: LagnaProfile[] = [
  {
    slug: "mesha",
    sanskritName: "Mesha (मेष)",
    englishName: "Aries",
    rulingPlanet: "Mars (Mangala)",
    element: "Agni (Fire)",
    nature: "Chara (Movable)",
    description: "The pioneering, energetic first sign of the zodiac ruled by Mars. Naturally inclined toward action, courage, and leadership.",
    lagneshRatna: {
      stone: "Red Coral (Moonga)",
      sanskritName: "Pravala",
      house: "1st House (Tanu Bhava)",
      significance: "Strengthens bodily vitality, self-confidence, immunity, and leadership drive.",
    },
    panchameshRatna: {
      stone: "Ruby (Manikya)",
      sanskritName: "Manikya",
      house: "5th House (Putra / Purva Punya)",
      significance: "Sun rules 5th house (Leo). Awakens creative intellect, administrative wisdom, and dignity.",
    },
    bhagyeshRatna: {
      stone: "Yellow Sapphire (Pukhraj)",
      sanskritName: "Pushparaga",
      house: "9th House (Bhagya Bhava)",
      significance: "Jupiter rules 9th house (Sagittarius). Grants higher fortune, righteous fortune, and divine grace.",
    },
    prohibitedGemstones: [
      {
        stone: "Emerald (Panna)",
        planet: "Mercury (Budha)",
        reason: "Mercury is lord of 3rd and 6th houses (Dusthana), representing obstacles, conflicts, and ailments for Aries.",
      },
      {
        stone: "Diamond (Heera)",
        planet: "Venus (Shukra)",
        reason: "Venus rules the 2nd and 7th houses, making it a primary dual Maraka (death-inflicting) planet for Mesha Lagna.",
      },
    ],
    primaryMetal: "22K Yellow Gold or Copper",
    keyMantra: "Om Mangalaya Namah",
    traditionalNonStoneRemedies: ["Hanuman Chalisa recitation on Tuesdays", "Offering red lentils (Masoor Dal) to charity", "Surya Arghya at sunrise"],
  },
  {
    slug: "vrishabha",
    sanskritName: "Vrishabha (वृषभ)",
    englishName: "Taurus",
    rulingPlanet: "Venus (Shukra)",
    element: "Prithvi (Earth)",
    nature: "Sthira (Fixed)",
    description: "Grounded, steadfast sign ruled by Venus. Values beauty, stability, material refinement, and enduring relationships.",
    lagneshRatna: {
      stone: "Diamond or White Sapphire",
      sanskritName: "Heera / Shwet Pukhraj",
      house: "1st House (Tanu Bhava)",
      significance: "Empowers personal charisma, grace, artistic refinement, and physical well-being.",
    },
    panchameshRatna: {
      stone: "Emerald (Panna)",
      sanskritName: "Marakata",
      house: "5th House (Putra / Purva Punya)",
      significance: "Mercury rules 5th house (Virgo). Enhances analytical trade brilliance, financial wisdom, and speech.",
    },
    bhagyeshRatna: {
      stone: "Blue Sapphire (Neelam)",
      sanskritName: "Neelashma",
      house: "9th House (Bhagya Bhava)",
      significance: "Saturn rules 9th (Capricorn) and 10th (Aquarius), acting as the supreme Yogakaraka planet for Taurus.",
    },
    prohibitedGemstones: [
      {
        stone: "Ruby (Manikya)",
        planet: "Sun (Surya)",
        reason: "Sun is an arch-enemy of Venus and rules the 4th house while holding neutral-malefic tendencies for Taurus.",
      },
      {
        stone: "Yellow Sapphire (Pukhraj)",
        planet: "Jupiter (Guru)",
        reason: "Jupiter rules the 8th (Dusthana) and 11th houses, making it a functional malefic for Vrishabha.",
      },
      {
        stone: "Red Coral (Moonga)",
        planet: "Mars (Mangala)",
        reason: "Mars is lord of the 12th (Losses) and 7th (Maraka) houses; coral should generally be avoided.",
      },
    ],
    primaryMetal: "Platinum, White Gold, or Pure Silver",
    keyMantra: "Om Shukraya Namah",
    traditionalNonStoneRemedies: ["Shri Suktam chanting on Fridays", "Feeding cows with green fodder or sweet dough", "Offering white rice to the needy"],
  },
  {
    slug: "mithuna",
    sanskritName: "Mithuna (मिथुन)",
    englishName: "Gemini",
    rulingPlanet: "Mercury (Budha)",
    element: "Vayu (Air)",
    nature: "Dvisvabhava (Dual)",
    description: "Intellectual, communicative sign ruled by Mercury. Driven by curiosity, commerce, learning, and adaptability.",
    lagneshRatna: {
      stone: "Emerald (Panna)",
      sanskritName: "Marakata",
      house: "1st House (Tanu Bhava)",
      significance: "Sharpening business intuition, memory retention, vocal articulation, and nervous resilience.",
    },
    panchameshRatna: {
      stone: "Diamond or White Zircon",
      sanskritName: "Heera",
      house: "5th House (Putra / Purva Punya)",
      significance: "Venus rules 5th house (Libra). Bestows creative genius, artistic talent, and joyful progeny.",
    },
    bhagyeshRatna: {
      stone: "Blue Sapphire (Neelam)",
      sanskritName: "Neelashma",
      house: "9th House (Bhagya Bhava)",
      significance: "Saturn rules 9th house (Aquarius). Grants enduring luck, philosophical maturity, and international success.",
    },
    prohibitedGemstones: [
      {
        stone: "Red Coral (Moonga)",
        planet: "Mars (Mangala)",
        reason: "Mars is the supreme functional malefic for Gemini, ruling the 6th (disease) and 11th houses.",
      },
      {
        stone: "Yellow Sapphire (Pukhraj)",
        planet: "Jupiter (Guru)",
        reason: "Jupiter rules two Kendras (7th and 10th), suffering from Kendradhipati Dosha and Maraka characteristics.",
      },
      {
        stone: "Pearl (Mukta)",
        planet: "Moon (Chandra)",
        reason: "Moon rules the 2nd house (Maraka sthana) and can provoke financial and respiratory volatility.",
      },
    ],
    primaryMetal: "Gold or Panchadhatu",
    keyMantra: "Om Budhaya Namah",
    traditionalNonStoneRemedies: ["Vishnu Sahasranama chanting", "Donating green gram (Moong) on Wednesdays", "Watering Tulsi plants daily"],
  },
  {
    slug: "karka",
    sanskritName: "Karka (कर्क)",
    englishName: "Cancer",
    rulingPlanet: "Moon (Chandra)",
    element: "Jala (Water)",
    nature: "Chara (Movable)",
    description: "Deeply intuitive, nurturing sign ruled by the Moon. Governed by empathy, home life, mental tranquility, and protectiveness.",
    lagneshRatna: {
      stone: "Natural Pearl (Mukta)",
      sanskritName: "Moti",
      house: "1st House (Tanu Bhava)",
      significance: "Brings profound mental peace, emotional stability, clear intuition, and hormonal balance.",
    },
    panchameshRatna: {
      stone: "Red Coral (Moonga)",
      sanskritName: "Pravala",
      house: "5th House (Putra / Purva Punya)",
      significance: "Mars rules the 5th (Scorpio) and 10th (Aries), serving as the single most powerful Yogakaraka planet for Cancer.",
    },
    bhagyeshRatna: {
      stone: "Yellow Sapphire (Pukhraj)",
      sanskritName: "Pushparaga",
      house: "9th House (Bhagya Bhava)",
      significance: "Jupiter rules 9th house (Pisces). Bestows divine protection, spiritual wisdom, and family prosperity.",
    },
    prohibitedGemstones: [
      {
        stone: "Blue Sapphire (Neelam)",
        planet: "Saturn (Shani)",
        reason: "Saturn rules the 7th (Maraka) and 8th (Dusthana) houses; extremely adversarial to Moon's waters.",
      },
      {
        stone: "Emerald (Panna)",
        planet: "Mercury (Budha)",
        reason: "Mercury rules the 3rd and 12th (Vyaya - loss) houses, creating mental unrest and unnecessary expenditures.",
      },
      {
        stone: "Diamond (Heera)",
        planet: "Venus (Shukra)",
        reason: "Venus is a functional malefic ruling the 4th and 11th houses, causing domestic discord and excess desires.",
      },
    ],
    primaryMetal: "Pure Silver (925 Chandi)",
    keyMantra: "Om Chandraya Namah",
    traditionalNonStoneRemedies: ["Maha Mrityunjaya Japa", "Fasting on Mondays during Shukla Paksha", "Offering raw milk or water to Shiva Lingam"],
  },
  {
    slug: "simha",
    sanskritName: "Simha (सिंह)",
    englishName: "Leo",
    rulingPlanet: "Sun (Surya)",
    element: "Agni (Fire)",
    nature: "Sthira (Fixed)",
    description: "Regal, magnanimous sign ruled by the Sun. Manifests sovereignty, moral fortitude, creative vitality, and leadership.",
    lagneshRatna: {
      stone: "Natural Ruby (Manikya)",
      sanskritName: "Manikya",
      house: "1st House (Tanu Bhava)",
      significance: "Elevates physical strength, social authority, administrative prestige, and soul radiance.",
    },
    panchameshRatna: {
      stone: "Yellow Sapphire (Pukhraj)",
      sanskritName: "Pushparaga",
      house: "5th House (Putra / Purva Punya)",
      significance: "Jupiter rules 5th house (Sagittarius). Inspires brilliant intellect, scholarly success, and noble children.",
    },
    bhagyeshRatna: {
      stone: "Red Coral (Moonga)",
      sanskritName: "Pravala",
      house: "9th House (Bhagya Bhava)",
      significance: "Mars rules 9th (Aries) and 4th (Scorpio), operating as a brilliant Yogakaraka for Leo.",
    },
    prohibitedGemstones: [
      {
        stone: "Blue Sapphire (Neelam)",
        planet: "Saturn (Shani)",
        reason: "Saturn is the arch-enemy of Sun and rules the 6th (disease) and 7th (Maraka) houses for Leo.",
      },
      {
        stone: "Diamond (Heera)",
        planet: "Venus (Shukra)",
        reason: "Venus rules the 3rd and 10th houses, holding inimical relations with the Sun.",
      },
    ],
    primaryMetal: "22K/18K Yellow Gold or Copper",
    keyMantra: "Om Suryaya Namah",
    traditionalNonStoneRemedies: ["Aditya Hridaya Stotra recitation on Sundays", "Offering water with red sandalwood to the rising Sun", "Respecting father and elders"],
  },
  {
    slug: "kanya",
    sanskritName: "Kanya (कन्या)",
    englishName: "Virgo",
    rulingPlanet: "Mercury (Budha)",
    element: "Prithvi (Earth)",
    nature: "Dvisvabhava (Dual)",
    description: "Methodical, discerning sign ruled by Mercury. Excels in analytical precision, healing crafts, service, and detail orientation.",
    lagneshRatna: {
      stone: "Natural Emerald (Panna)",
      sanskritName: "Marakata",
      house: "1st House (Tanu Bhava)",
      significance: "Sharpening discernment, curing nervous strain, amplifying commercial acumen and communication.",
    },
    panchameshRatna: {
      stone: "Blue Sapphire (Neelam)",
      sanskritName: "Neelashma",
      house: "5th House (Putra / Purva Punya)",
      significance: "Saturn rules 5th house (Capricorn) and 6th. For Virgo, a friendly Saturn brings discipline and strategic depth.",
    },
    bhagyeshRatna: {
      stone: "Diamond or White Sapphire",
      sanskritName: "Heera",
      house: "9th House (Bhagya Bhava)",
      significance: "Venus rules 9th house (Taurus) and 2nd house. Bestows continuous fortune, elegance, and prosperity.",
    },
    prohibitedGemstones: [
      {
        stone: "Red Coral (Moonga)",
        planet: "Mars (Mangala)",
        reason: "Mars is the most baneful planet for Virgo, ruling the 3rd and 8th (Dusthana / longevity threat) houses.",
      },
      {
        stone: "Yellow Sapphire (Pukhraj)",
        planet: "Jupiter (Guru)",
        reason: "Jupiter rules two Kendras (4th and 7th Maraka), suffering from Kendradhipati Dosha.",
      },
      {
        stone: "Pearl (Mukta)",
        planet: "Moon (Chandra)",
        reason: "Moon rules the 11th house, an Upachaya house that requires careful scrutiny before wearing stones.",
      },
    ],
    primaryMetal: "Gold or Panchadhatu",
    keyMantra: "Om Budhaya Namah",
    traditionalNonStoneRemedies: ["Donating green vegetables to cows on Wednesdays", "Chanting Vishnu Sahasranama", "Planting flowering trees"],
  },
  {
    slug: "tula",
    sanskritName: "Tula (तुला)",
    englishName: "Libra",
    rulingPlanet: "Venus (Shukra)",
    element: "Vayu (Air)",
    nature: "Chara (Movable)",
    description: "Harmonious, diplomatic sign ruled by Venus. Seeks justice, aesthetic perfection, balanced partnerships, and cultural grace.",
    lagneshRatna: {
      stone: "Natural Diamond or White Zircon",
      sanskritName: "Heera / Shwet Pukhraj",
      house: "1st House (Tanu Bhava)",
      significance: "Enhances personal magnetism, artistic expression, marital joy, and bodily radiance.",
    },
    panchameshRatna: {
      stone: "Blue Sapphire (Neelam)",
      sanskritName: "Neelashma",
      house: "5th House (Putra / Purva Punya)",
      significance: "Saturn rules 4th (Capricorn) and 5th (Aquarius), serving as the greatest Yogakaraka for Libra.",
    },
    bhagyeshRatna: {
      stone: "Emerald (Panna)",
      sanskritName: "Marakata",
      house: "9th House (Bhagya Bhava)",
      significance: "Mercury rules 9th house (Gemini) and 12th. Empowers high intellect, dharma, and flourishing foreign trade.",
    },
    prohibitedGemstones: [
      {
        stone: "Ruby (Manikya)",
        planet: "Sun (Surya)",
        reason: "Sun is debilitated in Libra, an arch-enemy of Venus, and rules the 11th house (Badhaka sthana for movable signs).",
      },
      {
        stone: "Yellow Sapphire (Pukhraj)",
        planet: "Jupiter (Guru)",
        reason: "Jupiter rules the 3rd and 6th (Dusthana / Rogasthana) houses, causing legal disputes and health troubles.",
      },
    ],
    primaryMetal: "Platinum, White Gold, or Silver",
    keyMantra: "Om Shukraya Namah",
    traditionalNonStoneRemedies: ["Mahalakshmi Ashtakam chanting on Fridays", "Donating white items (curd, sugar, milk) to women in need", "Maintaining fair conduct in business"],
  },
  {
    slug: "vrishchika",
    sanskritName: "Vrishchika (वृश्चिक)",
    englishName: "Scorpio",
    rulingPlanet: "Mars (Mangala)",
    element: "Jala (Water)",
    nature: "Sthira (Fixed)",
    description: "Intense, transformative sign ruled by Mars. Governed by deep spiritual resilience, investigative insight, and unyielding will.",
    lagneshRatna: {
      stone: "Red Coral (Moonga)",
      sanskritName: "Pravala",
      house: "1st House (Tanu Bhava)",
      significance: "Solidifies physical immunity, emotional defense, unshakeable stamina, and personal sovereignty.",
    },
    panchameshRatna: {
      stone: "Yellow Sapphire (Pukhraj)",
      sanskritName: "Pushparaga",
      house: "5th House (Putra / Purva Punya)",
      significance: "Jupiter rules 5th house (Pisces) and 2nd. Awakens sacred wisdom, financial stability, and pious children.",
    },
    bhagyeshRatna: {
      stone: "Natural Pearl (Mukta)",
      sanskritName: "Moti",
      house: "9th House (Bhagya Bhava)",
      significance: "Moon rules 9th house (Cancer). Bestows supreme fortune, emotional peace, and mother's blessings.",
    },
    prohibitedGemstones: [
      {
        stone: "Diamond (Heera)",
        planet: "Venus (Shukra)",
        reason: "Venus is a severe functional malefic ruling the 7th (Maraka) and 12th (Loss) houses for Scorpio.",
      },
      {
        stone: "Emerald (Panna)",
        planet: "Mercury (Budha)",
        reason: "Mercury rules the 8th (Dusthana) and 11th houses; dangerous for vitality and financial stability.",
      },
      {
        stone: "Blue Sapphire (Neelam)",
        planet: "Saturn (Shani)",
        reason: "Saturn rules the 3rd and 4th houses, holding inherent enmity towards Mars.",
      },
    ],
    primaryMetal: "Copper or 22K Yellow Gold",
    keyMantra: "Om Mangalaya Namah",
    traditionalNonStoneRemedies: ["Sundarkand recitation on Tuesdays", "Offering vermilion (Sindoor) to Hanuman Ji", "Donating blood or medicines to hospitals"],
  },
  {
    slug: "dhanu",
    sanskritName: "Dhanu (धनु)",
    englishName: "Sagittarius",
    rulingPlanet: "Jupiter (Brihaspati)",
    element: "Agni (Fire)",
    nature: "Dvisvabhava (Dual)",
    description: "Expansive, truth-seeking sign ruled by Jupiter. Driven by philosophical righteousness, optimism, ethics, and quest for knowledge.",
    lagneshRatna: {
      stone: "Natural Yellow Sapphire (Pukhraj)",
      sanskritName: "Pushparaga",
      house: "1st House (Tanu Bhava)",
      significance: "Amplifies righteous leadership, liver health, scholarly respect, and divine blessings.",
    },
    panchameshRatna: {
      stone: "Red Coral (Moonga)",
      sanskritName: "Pravala",
      house: "5th House (Putra / Purva Punya)",
      significance: "Mars rules 5th house (Aries) and 12th. Inspires strategic courage, high merit, and vigorous intelligence.",
    },
    bhagyeshRatna: {
      stone: "Natural Ruby (Manikya)",
      sanskritName: "Manikya",
      house: "9th House (Bhagya Bhava)",
      significance: "Sun rules 9th house (Leo). Brings royal fortune, fatherly support, spiritual illumination, and executive power.",
    },
    prohibitedGemstones: [
      {
        stone: "Diamond (Heera)",
        planet: "Venus (Shukra)",
        reason: "Venus rules the 6th (Dusthana - debts and enemies) and 11th houses; highly inimical to Jupiter.",
      },
      {
        stone: "Blue Sapphire (Neelam)",
        planet: "Saturn (Shani)",
        reason: "Saturn rules the 2nd (Maraka) and 3rd houses, causing communicative friction and delays.",
      },
    ],
    primaryMetal: "22K/18K Yellow Gold or Brass",
    keyMantra: "Om Gurave Namah",
    traditionalNonStoneRemedies: ["Guru Stotra recitation on Thursdays", "Donating yellow chickpeas (Chana Dal) and turmeric", "Respecting spiritual teachers and elders"],
  },
  {
    slug: "makara",
    sanskritName: "Makara (मकर)",
    englishName: "Capricorn",
    rulingPlanet: "Saturn (Shani)",
    element: "Prithvi (Earth)",
    nature: "Chara (Movable)",
    description: "Pragmatic, disciplined sign ruled by Saturn. Guided by perseverance, structural mastery, duty, and long-term legacy.",
    lagneshRatna: {
      stone: "Natural Blue Sapphire (Neelam)",
      sanskritName: "Neelashma",
      house: "1st House (Tanu Bhava)",
      significance: "Fortifies bone health, patience, professional mastery, focused endurance, and protection from malice.",
    },
    panchameshRatna: {
      stone: "Diamond or White Sapphire",
      sanskritName: "Heera",
      house: "5th House (Putra / Purva Punya)",
      significance: "Venus rules 5th (Taurus) and 10th (Libra), acting as the ultimate Yogakaraka for Capricorn.",
    },
    bhagyeshRatna: {
      stone: "Natural Emerald (Panna)",
      sanskritName: "Marakata",
      house: "9th House (Bhagya Bhava)",
      significance: "Mercury rules 9th house (Virgo) and 6th. Bestows commercial prosperity, legal triumph, and fortune.",
    },
    prohibitedGemstones: [
      {
        stone: "Ruby (Manikya)",
        planet: "Sun (Surya)",
        reason: "Sun is an arch-enemy of Saturn and rules the 8th house (Dusthana / longevity peril) for Makara.",
      },
      {
        stone: "Red Coral (Moonga)",
        planet: "Mars (Mangala)",
        reason: "Mars is an enemy of Saturn and rules the 4th and 11th (Badhaka) houses.",
      },
      {
        stone: "Yellow Sapphire (Pukhraj)",
        planet: "Jupiter (Guru)",
        reason: "Jupiter rules the 3rd and 12th (Loss) houses, provoking financial draining.",
      },
    ],
    primaryMetal: "Silver, White Gold, or Panchadhatu",
    keyMantra: "Om Sham Shanaischaraya Namah",
    traditionalNonStoneRemedies: ["Lighting mustard oil lamp under Peepal tree on Saturdays", "Feeding black sesame and bread to stray dogs and crows", "Shani Chalisa recitation"],
  },
  {
    slug: "kumbha",
    sanskritName: "Kumbha (कुम्भ)",
    englishName: "Aquarius",
    rulingPlanet: "Saturn (Shani)",
    element: "Vayu (Air)",
    nature: "Sthira (Fixed)",
    description: "Visionary, humanitarian sign ruled by Saturn. Driven by egalitarian ethics, scientific inquiry, community reform, and lofty ideals.",
    lagneshRatna: {
      stone: "Natural Blue Sapphire (Neelam)",
      sanskritName: "Neelashma",
      house: "1st House (Tanu Bhava)",
      significance: "Grounds erratic energy, anchors long-range vision, protects reputation, and grants unwavering endurance.",
    },
    panchameshRatna: {
      stone: "Natural Emerald (Panna)",
      sanskritName: "Marakata",
      house: "5th House (Putra / Purva Punya)",
      significance: "Mercury rules 5th house (Gemini) and 8th. Inspires scientific inventions, literary genius, and sharp trade intellect.",
    },
    bhagyeshRatna: {
      stone: "Diamond or White Zircon",
      sanskritName: "Heera",
      house: "9th House (Bhagya Bhava)",
      significance: "Venus rules 9th (Libra) and 4th (Taurus), serving as the supreme Yogakaraka planet for Aquarius.",
    },
    prohibitedGemstones: [
      {
        stone: "Ruby (Manikya)",
        planet: "Sun (Surya)",
        reason: "Sun rules the 7th house (Maraka sthana) and is an arch-adversary of Saturn.",
      },
      {
        stone: "Pearl (Mukta)",
        planet: "Moon (Chandra)",
        reason: "Moon rules the 6th house (Dusthana - debts, enemies, and sickness) for Kumbha Lagna.",
      },
      {
        stone: "Red Coral (Moonga)",
        planet: "Mars (Mangala)",
        reason: "Mars rules the 3rd and 10th houses, holding an unfriendly stance towards Saturn.",
      },
    ],
    primaryMetal: "Silver, White Gold, or Panchadhatu",
    keyMantra: "Om Sham Shanaischaraya Namah",
    traditionalNonStoneRemedies: ["Service to elderly, disabled, or sanitation workers", "Reciting Hanuman Chalisa at dusk", "Donating black blankets or iron utensils"],
  },
  {
    slug: "meena",
    sanskritName: "Meena (मीन)",
    englishName: "Pisces",
    rulingPlanet: "Jupiter (Brihaspati)",
    element: "Jala (Water)",
    nature: "Dvisvabhava (Dual)",
    description: "Compassionate, mystical final sign ruled by Jupiter. Embodies spiritual devotion, imaginative transcendence, surrender, and universal empathy.",
    lagneshRatna: {
      stone: "Natural Yellow Sapphire (Pukhraj)",
      sanskritName: "Pushparaga",
      house: "1st House (Tanu Bhava)",
      significance: "Nourishes spiritual wisdom, mental serenity, physical immunity, and unblemished moral standing.",
    },
    panchameshRatna: {
      stone: "Natural Pearl (Mukta)",
      sanskritName: "Moti",
      house: "5th House (Putra / Purva Punya)",
      significance: "Moon rules 5th house (Cancer). Blesses with serene emotions, intuitive insight, and happy, virtuous progeny.",
    },
    bhagyeshRatna: {
      stone: "Red Coral (Moonga)",
      sanskritName: "Pravala",
      house: "9th House (Bhagya Bhava)",
      significance: "Mars rules 9th (Scorpio) and 2nd (Aries). Bestows intense fortune, family wealth, and protective strength.",
    },
    prohibitedGemstones: [
      {
        stone: "Diamond (Heera)",
        planet: "Venus (Shukra)",
        reason: "Venus is exalted in Pisces but is a fierce functional malefic ruling the 3rd and 8th (Dusthana) houses.",
      },
      {
        stone: "Emerald (Panna)",
        planet: "Mercury (Budha)",
        reason: "Mercury is debilitated in Pisces and rules two Kendras (4th and 7th Maraka), suffering from Kendradhipati Dosha.",
      },
      {
        stone: "Blue Sapphire (Neelam)",
        planet: "Saturn (Shani)",
        reason: "Saturn rules the 11th and 12th (Losses / Vyaya) houses, draining wealth and emotional equilibrium.",
      },
    ],
    primaryMetal: "22K Yellow Gold or Silver",
    keyMantra: "Om Gurave Namah",
    traditionalNonStoneRemedies: ["Dakshinamurthy Stotra recitation", "Feeding cows with jaggery and wheat", "Supporting spiritual pilgrims or Vedic students"],
  },
];

