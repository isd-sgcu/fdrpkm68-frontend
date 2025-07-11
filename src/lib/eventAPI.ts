// Mock API functions for event registration status
// These will be replaced with real API calls later

export type EventType = 'firstdate' | 'rpkm' | 'freshmen-night' | 'cu-fest';

export interface EventStatus {
  isRegistered: boolean;
  isLate: boolean; // registration closed
  registrationSuccess?: boolean; // just registered
  isComingSoon?: boolean; // event not available yet
}

export interface EventConfig {
  id: EventType;
  title: string;
  description: string;
  schedule: string;
  registrationInfo: string;
  additionalInfo: string;
  popupColors: {
    notRegistered: string;
    registered: string;
    late: string;
    comingSoon: string;
  };
}

export const EVENT_CONFIGS: Record<EventType, EventConfig> = {
  'firstdate': {
    id: 'firstdate',
    title: 'CU First Date',
    description: 'CU First Date หรือ วันเเรกพบนิสิตใหม่ เป็นกิจกรรมต้อนรับน้องเฟรชชี่เข้าสู่รั้วจามจุรี เเละเปิดโอกาสให้น้อง ๆ ได้ทำความรู้จักกับพี่ ๆ เเละเพื่อน ๆ ในคณะ ผ่านกิจกรรมสนุก ๆ มาสร้างความประทับใจในวันแรกของการเป็นนิสิตด้วยกันนะ',
    schedule: '📅 จัดวันที่ 19 กรกฎาคม 2568',
    registrationInfo: '📝 ลงทะเบียนล่วงหน้าได้ตั้งแต่วันนี้',
    additionalInfo: '',
    popupColors: {
      notRegistered: 'vivid-pink',
      registered: 'light-green',
      late: 'light-beige',
      comingSoon: 'light-beige'
    }
  },
  'cu-fest': {
    id: 'cu-fest',
    title: 'CU Fest',
    description: 'เทศกาลแห่งความสนุกสนาน ที่รวมการแสดง กิจกรรม และความบันเทิงต่าง ๆ ไว้ในงานเดียว',
    schedule: 'พร้อมให้ลงทะเบียนในวันที่ 20 กรกฎาคม 2568 ',
    registrationInfo: '📝 ลงทะเบียนเข้าร่วมงานได้ตั้งแต่วันนี้',
    additionalInfo: '',
    popupColors: {
      notRegistered: 'vivid-pink',
      registered: 'light-green',
      late: 'light-beige',
      comingSoon: 'light-beige'
    }
  },
  'rpkm': {
    id: 'rpkm',
    title: 'รับเพื่อนก้าวใหม่',
    description: 'รับเพื่อนก้าวใหม่ คือ กิจกรรมสำหรับนิสิตใหม่ทุกคณะ ได้ร่วมกิจกรรมที่บ้านรับเพื่อน สร้างความสนุกสนาน ประทับใจและกระชับสัมพันธ์ระหว่างนิสิตใหม่จากคณะต่าง ๆ เสริมสัมพันธ์ข้ามคณะ',
    schedule: '📅 จัดวันที่ 1–3 สิงหาคม 2568',
    registrationInfo: '📝 ลงทะเบียน "เข้างาน" ล่วงหน้าได้ตั้งแต่วันนี้',
    additionalInfo: '🫶 เว็บไซต์เปิดให้ลงทะเบียน “เลือกบ้าน” ตั้งแต่วันที่ 20 กรกฏาคม เวลา 20:00 น',
    popupColors: {
      notRegistered: 'vivid-pink',
      registered: 'light-green',
      late: 'light-beige',
      comingSoon: 'light-beige'
    }
  },
  'freshmen-night': {
    id: 'freshmen-night',
    title: 'Freshmen Night',
    description: 'คืนสุดพิเศษสำหรับน้องใหม่ ที่จะเต็มไปด้วยความสนุกสนาน การแสดง และกิจกรรมต่าง ๆ ที่น่าจดจำ',
    schedule: '📅 จัดวันที่ 3 สิงหาคม 2567',
    registrationInfo: '📝 ลงทะเบียนเข้าร่วมงานได้ตั้งแต่วันนี้',
    additionalInfo: '',
    popupColors: {
      notRegistered: 'vivid-pink',
      registered: 'light-green',
      late: 'light-beige',
      comingSoon: 'light-beige'
    }
  }
};

// Simple in-memory storage for demo purposes
// In a real app, this would be stored in a database
const registrations = new Set<EventType>();

export const getEventStatus = async (eventType: EventType): Promise<EventStatus> => {
  await new Promise(resolve => setTimeout(resolve, 100));    
  
  // Check if user is registered for this event
  const isRegistered = registrations.has(eventType);
  
  const mockData: Record<EventType, EventStatus> = {
    'firstdate': { isRegistered, isLate: false, isComingSoon: false },
    'rpkm': { isRegistered, isLate: false, isComingSoon: false },
    'freshmen-night': { isRegistered, isLate: false, isComingSoon: false },
    'cu-fest': { isRegistered, isLate: false, isComingSoon: false }
  };
  
  return mockData[eventType];
};

export const registerForEvent = async (eventType: EventType): Promise<{ success: boolean }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Add to registrations set
  registrations.add(eventType);
  
  // Mock successful registration
  return { success: true };
};