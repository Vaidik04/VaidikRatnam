/**
 * LAL KITAB TIMEZONE & HISTORICAL INDIAN OFFSET RESOLVER
 * Handles historical war time (1941-1945 +06:30) and standard IST (+05:30)
 */

export interface CityPreset {
  name: string;
  state: string;
  lat: number;
  lon: number;
  defaultTimezone: string;
}

export const POPULAR_INDIAN_CITIES: CityPreset[] = [
  { name: "Jaipur", state: "Rajasthan", lat: 26.9124, lon: 75.7873, defaultTimezone: "Asia/Kolkata" },
  { name: "New Delhi", state: "Delhi", lat: 28.6139, lon: 77.209, defaultTimezone: "Asia/Kolkata" },
  { name: "Mumbai", state: "Maharashtra", lat: 19.076, lon: 72.8777, defaultTimezone: "Asia/Kolkata" },
  { name: "Kolkata", state: "West Bengal", lat: 22.5726, lon: 88.3639, defaultTimezone: "Asia/Kolkata" },
  { name: "Varanasi", state: "Uttar Pradesh", lat: 25.3176, lon: 82.9739, defaultTimezone: "Asia/Kolkata" },
  { name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lon: 72.5714, defaultTimezone: "Asia/Kolkata" },
  { name: "Bengaluru", state: "Karnataka", lat: 12.9716, lon: 77.5946, defaultTimezone: "Asia/Kolkata" },
  { name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lon: 80.2707, defaultTimezone: "Asia/Kolkata" },
  { name: "Hyderabad", state: "Telangana", lat: 17.385, lon: 78.4867, defaultTimezone: "Asia/Kolkata" },
  { name: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lon: 80.9462, defaultTimezone: "Asia/Kolkata" },
  { name: "Patna", state: "Bihar", lat: 25.5941, lon: 85.1376, defaultTimezone: "Asia/Kolkata" },
  { name: "Ujjain", state: "Madhya Pradesh", lat: 23.1765, lon: 75.7885, defaultTimezone: "Asia/Kolkata" },
  { name: "Amritsar", state: "Punjab", lat: 31.634, lon: 74.8723, defaultTimezone: "Asia/Kolkata" },
  { name: "Pune", state: "Maharashtra", lat: 18.5204, lon: 73.8567, defaultTimezone: "Asia/Kolkata" },
];

/**
 * Resolves the historical UTC offset for India based on birth date.
 * During WWII (Sept 1, 1942 to Oct 15, 1945), India observed Daylight / War Time of UTC+06:30.
 * Prior to 1906, local mean time (LMT) prevailed.
 * Standard IST is UTC+05:30.
 */
export function resolveHistoricalIndianOffset(year: number, month: number, day: number): {
  offsetHours: number;
  offsetString: string;
  note: string;
} {
  const birthDate = new Date(Date.UTC(year, month - 1, day));

  // WWII Indian War Time: 1942-09-01 to 1945-10-15 (UTC +6.5 hours)
  const warTimeStart = new Date(Date.UTC(1942, 8, 1));
  const warTimeEnd = new Date(Date.UTC(1945, 9, 15));

  if (birthDate >= warTimeStart && birthDate <= warTimeEnd) {
    return {
      offsetHours: 6.5,
      offsetString: "+06:30",
      note: "Historical Indian War Time (WWII) recognized for accurate astrological calculation.",
    };
  }

  // Pre-1906: Standard IST was officially adopted on Jan 1, 1906
  if (year < 1906) {
    return {
      offsetHours: 5.53, // Madras LMT standard
      offsetString: "+05:32",
      note: "Historical pre-1906 Local Mean Time standard applied.",
    };
  }

  // Standard Indian Standard Time
  return {
    offsetHours: 5.5,
    offsetString: "+05:30",
    note: "Standard Indian Standard Time (IST - Asia/Kolkata).",
  };
}
