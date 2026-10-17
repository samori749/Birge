export type CategoryId =
  | 'water'
  | 'ecology'
  | 'education'
  | 'jobs'
  | 'roads'
  | 'medicine'
  | 'settlements'
  | 'social';

export type ProblemStatus =
  | 'new'            // Жаңы / Новое
  | 'review'         // Текшерилүүдө / На проверке
  | 'confirmed'      // Тастыкталды / Подтверждено
  | 'forwarded'      // Өткөрүлүп берилди / Передано в ведомство
  | 'in_progress'    // Аткарылууда / В работе
  | 'resolved'       // Чечилди / Решено
  | 'rejected';      // Четке кагылды / Отклонено

export type RegionId =
  | 'bishkek'
  | 'osh_city'
  | 'chuy'
  | 'issyk_kul'
  | 'naryn'
  | 'talas'
  | 'jalal_abad'
  | 'osh_oblast'
  | 'batken';

export interface StatusHistoryEntry {
  id: string;
  status: ProblemStatus;
  date: string;
  note: string;
  author: string;
  agency?: string;
  photoAfterUrl?: string;
}

export interface ProblemItem {
  id: string;
  title: string;
  description: string;
  category: CategoryId;
  region: RegionId;
  district: string;
  villageOrStreet: string;
  coordinates: { lat: number; lng: number };
  createdAt: string;
  status: ProblemStatus;
  statusHistory: StatusHistoryEntry[];
  imageUrl: string;
  imageAfterUrl?: string;
  confirmationsCount: number;
  confirmedByUserIds: string[];
  officialResponse?: {
    agency: string;
    responderName: string;
    text: string;
    responseDate: string;
    docNumber?: string;
  };
  authorName: string;
  isPrivate: boolean; // hide sensitive citizen info
}

export interface EducationalLesson {
  id: string;
  subject: 'math' | 'kyrgyz' | 'english' | 'logic';
  grade: string;
  titleKg: string;
  titleRu: string;
  summaryKg: string;
  summaryRu: string;
  contentKg: string;
  contentRu: string;
  quiz: {
    questionKg: string;
    questionRu: string;
    optionsKg: string[];
    optionsRu: string[];
    correctIndex: number;
    explanationKg: string;
    explanationRu: string;
  }[];
}

export interface JobVacancy {
  id: string;
  title: string;
  company: string;
  region: RegionId;
  cityOrVillage: string;
  salary: string;
  type: string;
  description: string;
  contacts: string;
  isVerified: boolean;
  publishedAt: string;
}

export interface EcoPoint {
  id: string;
  title: string;
  acceptedTypes: ('plastic' | 'paper' | 'glass' | 'batteries')[];
  address: string;
  region: RegionId;
  hours: string;
  phone: string;
}

export interface MedicalFacility {
  id: string;
  name: string;
  type: 'csm' | 'fap' | 'hospital' | 'emergency';
  region: RegionId;
  cityOrVillage: string;
  address: string;
  phone: string;
  services: string[];
  is24Hours?: boolean;
}

export interface SocialHelpRequest {
  id: string;
  title: string;
  categoryType: 'food' | 'coal' | 'clothing' | 'elderly_care' | 'medical_ride';
  region: RegionId;
  district: string;
  description: string;
  urgency: 'high' | 'medium' | 'normal';
  status: 'open' | 'assigned' | 'completed';
  createdAt: string;
  volunteersJoined: number;
}

export interface VolunteerEvent {
  id: string;
  title: string;
  category: CategoryId;
  region: RegionId;
  location: string;
  eventDate: string;
  description: string;
  organizer: string;
  participantsCount: number;
  requiredParticipants: number;
  joined: boolean;
  imageUrl?: string;
}

export interface ImpactStats {
  totalReported: number;
  totalResolved: number;
  totalVolunteers: number;
  waterLeaksFixed: number;
  cleanupsDone: number;
  studentsPracticed: number;
}
