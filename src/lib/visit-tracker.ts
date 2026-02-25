import fs from 'fs';
import path from 'path';

interface Visit {
  id: string;
  timestamp: string;
  page: string;
  referrer?: string;
  userAgent?: string;
  ip?: string;
  country?: string;
  city?: string;
}

interface VisitsData {
  visits: Visit[];
  stats: {
    total: number;
    uniqueVisitors: number;
    pageViews: number;
    lastVisit: string;
  };
}

const DATA_FILE = path.join(process.cwd(), 'data', 'visits.json');

function ensureDataDir() {
  const dataDir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function readVisits(): VisitsData {
  ensureDataDir();
  if (!fs.existsSync(DATA_FILE)) {
    return {
      visits: [],
      stats: {
        total: 0,
        uniqueVisitors: 0,
        pageViews: 0,
        lastVisit: ''
      }
    };
  }
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {
      visits: [],
      stats: {
        total: 0,
        uniqueVisitors: 0,
        pageViews: 0,
        lastVisit: ''
      }
    };
  }
}

function writeVisits(data: VisitsData): void {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function logVisit(page: string = '/', headers: Record<string, string | string[] | undefined> = {}): Visit {
  const data = readVisits();
  
  const userAgent = typeof headers['user-agent'] === 'string' ? headers['user-agent'] : 'Unknown';
  const ip = typeof headers['x-forwarded-for'] === 'string' 
    ? headers['x-forwarded-for'].split(',')[0].trim()
    : 'Unknown';
  const referrer = typeof headers['referer'] === 'string' ? headers['referer'] : undefined;

  const visit: Visit = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    page,
    referrer,
    userAgent,
    ip
  };

  data.visits.push(visit);
  
  const uniqueIps = new Set(data.visits.map(v => v.ip).filter(ip => ip !== 'Unknown'));
  
  data.stats = {
    total: data.visits.length,
    uniqueVisitors: uniqueIps.size,
    pageViews: data.visits.length,
    lastVisit: visit.timestamp
  };

  writeVisits(data);
  
  return visit;
}

export function getVisits(): VisitsData {
  return readVisits();
}

export function getVisitsByPage(page: string): Visit[] {
  const data = readVisits();
  return data.visits.filter(v => v.page === page);
}

export function getRecentVisits(limit: number = 10): Visit[] {
  const data = readVisits();
  return data.visits.slice(-limit).reverse();
}

export function getStats() {
  const data = readVisits();
  return data.stats;
}
