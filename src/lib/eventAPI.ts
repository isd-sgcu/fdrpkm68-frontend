// Mock API functions for event registration status
// These will be replaced with real API calls later

export type EventType = 'firstdate' | 'rpkm' | 'freshmen-night';

export interface EventStatus {
  isRegistered: boolean;
  isLate: boolean; // registration closed
  registrationSuccess?: boolean; // just registered
  isComingSoon?: boolean; // event not available yet
}

export const getEventStatus = async (eventType: EventType): Promise<EventStatus> => {
  await new Promise(resolve => setTimeout(resolve, 100));    
  const mockData: Record<EventType, EventStatus> = {
    'firstdate': { isRegistered: false, isLate: false, isComingSoon: false },
    'rpkm': { isRegistered: false, isLate: false, isComingSoon: true },
    'freshmen-night': { isRegistered: false, isLate: false, isComingSoon: true }
  };
  
  return mockData[eventType];
};

export const registerForEvent = async (eventType: EventType): Promise<{ success: boolean }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock successful registration
  return { success: true };
};