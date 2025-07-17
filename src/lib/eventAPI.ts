import { api } from "@/lib/api";
import { getAuthHeaders, getAuthToken } from "@/lib/auth";

export type EventType = "firstdate" | "rpkm" | "freshmen-night" | "cufest";

// API event names mapping
export const API_EVENT_NAMES: Record<EventType, string> = {
  firstdate: "FIRSTDATE",
  rpkm: "RPKM",
  "freshmen-night": "FRESHMENNIGHT",
  cufest: "CU_FEST",
};

export interface CheckinResponse {
  id: string;
  userId: string;
  event: string;
  status: "PRE_REGISTER";
  createdAt: string;
  updatedAt: string;
}

export interface EventStatus {
  isRegistered: boolean;
  isLate: boolean;
  registrationSuccess?: boolean;
  isComingSoon?: boolean;
  checkinData?: CheckinResponse;
}

export type ColorVariant =
  | "black"
  | "vivid-pink"
  | "light-green"
  | "light-blue"
  | "light-pink"
  | "light-beige";

export interface EventConfig {
  id: EventType;
  title: string;
  description: string;
  schedule: string;
  registrationInfo: string;
  additionalInfo: string;
  popupColors: {
    notRegistered: ColorVariant;
    registered: ColorVariant;
    late: ColorVariant;
    comingSoon: ColorVariant;
  };
}

export const EVENT_CONFIGS: Record<EventType, EventConfig> = {
  firstdate: {
    id: "firstdate",
    title: "CU First Date",
    description:
      "CU First Date หรือ วันเเรกพบนิสิตใหม่ เป็นกิจกรรมต้อนรับน้องเฟรชชี่เข้าสู่รั้วจามจุรี เเละเปิดโอกาสให้น้อง ๆ ได้ทำความรู้จักกับพี่ ๆ เเละเพื่อน ๆ ในคณะ ผ่านกิจกรรมสนุก ๆ มาสร้างความประทับใจในวันแรกของการเป็นนิสิตด้วยกันนะ",
    schedule: "📅 จัดวันที่ 19 กรกฎาคม 2568",
    registrationInfo: "📝 เปิดลงทะเบียนวันที่ 17 กรกฎาคม เวลา 19:00 น.",
    additionalInfo: "",
    popupColors: {
      notRegistered: "vivid-pink",
      registered: "light-green",
      late: "light-beige",
      comingSoon: "light-beige",
    },
  },
  cufest: {
    id: "cufest",
    title: "Festival",
    description:
      "เทศกาลแห่งความสนุกสนาน ที่รวมการแสดง กิจกรรม และความบันเทิงต่าง ๆ ไว้ในงานเดียว",
    schedule: "พร้อมให้ลงทะเบียนในวันที่ 20 กรกฎาคม 2568 ",
    registrationInfo: "📝 ลงทะเบียนเข้าร่วมงานได้ตั้งแต่วันนี้",
    additionalInfo: "",
    popupColors: {
      notRegistered: "vivid-pink",
      registered: "light-green",
      late: "light-beige",
      comingSoon: "light-beige",
    },
  },
  rpkm: {
    id: "rpkm",
    title: "รับเพื่อนก้าวใหม่",
    description:
      "รับเพื่อนก้าวใหม่ คือ กิจกรรมสำหรับนิสิตใหม่ทุกคณะ ได้ร่วมกิจกรรมที่บ้านรับเพื่อน สร้างความสนุกสนาน ประทับใจและกระชับสัมพันธ์ระหว่างนิสิตใหม่จากคณะต่าง ๆ เสริมสัมพันธ์ข้ามคณะ",
    schedule: "📅 จัดวันที่ 1–3 สิงหาคม 2568",
    registrationInfo:
      '📝 เปิดลงทะเบียน "เข้างาน" วันที่ 20 กรกฎาคม เวลา 19:00 น.',
    additionalInfo:
      "🫶 เว็บไซต์เปิดให้ลงทะเบียน “เลือกบ้าน” ตั้งแต่วันที่ 20 กรกฏาคม เวลา 20:00 น",
    popupColors: {
      notRegistered: "vivid-pink",
      registered: "light-green",
      late: "light-beige",
      comingSoon: "light-beige",
    },
  },
  "freshmen-night": {
    id: "freshmen-night",
    title: "Freshmen Night",
    description:
      "คืนสุดพิเศษสำหรับน้องใหม่ ที่จะเต็มไปด้วยความสนุกสนาน การแสดง และกิจกรรมต่าง ๆ ที่น่าจดจำ",
    schedule: "📅 จัดวันที่ 3 สิงหาคม 2568",
    registrationInfo: "📝 เปิดลงทะเบียนวันที่ 20 กรกฎาคม เวลา 19:00 น.",
    additionalInfo: "",
    popupColors: {
      notRegistered: "vivid-pink",
      registered: "light-green",
      late: "light-beige",
      comingSoon: "light-beige",
    },
  },
};

export const getEventStatus = async (
  eventType: EventType,
  authToken?: string
): Promise<EventStatus> => {
  const apiEventName = API_EVENT_NAMES[eventType];

  // Handle events that don't have API mapping
  if (!apiEventName || eventType === "cufest") {
    return {
      isRegistered: false,
      isLate: false,
      isComingSoon: true,
    };
  }

  // Check if authenticated
  const token = authToken || getAuthToken();
  if (!token) {
    throw new Error("Authentication required");
  }

  const response = await api.get<CheckinResponse>(`/checkin/${apiEventName}`, {
    headers: getAuthHeaders(token),
  });

  if (response.success && response.data) {
    return {
      isRegistered: true,
      isLate: false,
      isComingSoon: false,
      checkinData: response.data,
    };
  }

  if (!response.success && response.error) {
    const errorMessage = response.error;

    // Check for specific error patterns from backend
    if (errorMessage.includes("before register period")) {
      return {
        isRegistered: false,
        isLate: false,
        isComingSoon: true,
      };
    } else if (errorMessage.includes("after register period")) {
      return {
        isRegistered: false,
        isLate: true,
        isComingSoon: false,
      };
    } else if (
      errorMessage.includes("404") ||
      errorMessage.includes("not found")
    ) {
      return {
        isRegistered: false,
        isLate: false,
        isComingSoon: false,
      };
    } else if (
      errorMessage.includes("401") ||
      errorMessage.includes("unauthorized")
    ) {
      throw new Error("Authentication required");
    } else {
      return {
        isRegistered: false,
        isLate: false,
        isComingSoon: true,
      };
    }
  }

  return {
    isRegistered: false,
    isLate: true,
    isComingSoon: false,
  };
};

export const registerForEvent = async (
  eventType: EventType
): Promise<{
  success: boolean;
  data?: CheckinResponse;
  error?: string;
  needsLogin?: boolean;
}> => {
  const apiEventName = API_EVENT_NAMES[eventType];

  if (!apiEventName || eventType === "cufest") {
    return { success: false, error: "Event not available for registration" };
  }

  const token = getAuthToken();
  if (!token) {
    return {
      success: false,
      error: "กรุณาเข้าสู่ระบบก่อนลงทะเบียน",
      needsLogin: true,
    };
  }

  const response = await api.post<CheckinResponse>(
    `/checkin/register`,
    { event: apiEventName },
    { headers: getAuthHeaders(token) }
  );

  if (response.success && response.data) {
    return { success: true, data: response.data };
  } else {
    const errorMessage = response.error || "Registration failed";

    if (errorMessage.includes("already exists")) {
      return { success: false, error: "คุณได้ลงทะเบียนไปแล้ว" };
    } else if (errorMessage.includes("before register period")) {
      return { success: false, error: "ยังไม่ถึงเวลาลงทะเบียน" };
    } else if (errorMessage.includes("after register period")) {
      return { success: false, error: "หมดเวลาลงทะเบียนแล้ว" };
    } else if (
      errorMessage.includes("401") ||
      errorMessage.includes("unauthorized")
    ) {
      return { success: false, error: "กรุณาเข้าสู่ระบบก่อน" };
    } else {
      return { success: false, error: errorMessage };
    }
  }
};
