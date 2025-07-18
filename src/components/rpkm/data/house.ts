import {
  type HouseResponse,
  getAllHouses,
  getHousePreferences,
} from "@/lib/houseAPI";

type ExtraHouseType = {
  nameThai: string;
  image: string;
  instagramName: string;
};

export type HousePrefType = {
  houseRank1: string | null;
  houseRank2: string | null;
  houseRank3: string | null;
  houseRank4: string | null;
  houseRank5: string | null;
  houseRankSub: string | null;
};

export type HouseDisplayType = {
  id: string;
  nameThai: string;
  nameEng: string;
  descriptionThai: string;
  descriptionEng: string;
  sizeLetter: string;
  chosenCount: number;
  capacity: number;
  instagram: string;
  instagramName: string;
  facebook: string;
  tiktok: string;
  image: string;
};

const extraHouseData: ExtraHouseType[] = [
  {
    nameThai: "บ้านว้อนท์",
    image: "BaanWanted.png",
    instagramName: "baan_wanted",
  },
  {
    nameThai: "บ้านคุณหนู",
    image: "BaanKhunNoo.png",
    instagramName: "baankhunnoo_official",
  },
  {
    nameThai: "บ้านโคะ",
    image: "BaanKoh.png",
    instagramName: "baankohchula",
  },
  {
    nameThai: "บ้านดัง",
    image: "BaanDung.png",
    instagramName: "baandung.official",
  },
  {
    nameThai: "บ้านเดอะ",
    image: "BaanThe.png",
    instagramName: "baanthechula.official",
  },
  {
    nameThai: "บ้านหลายใจ",
    image: "BaanLaijai.png",
    instagramName: "baanlaijai",
  },
  {
    nameThai: "บ้านอากาเป้",
    image: "BaanAgape.png",
    instagramName: "baanagapechula",
  },
  {
    nameThai: "บ้านโบ้",
    image: "BaanBoe.PNG",
    instagramName: "baanboe",
  },
  {
    nameThai: "บ้านนอก",
    image: "BaanNork.png",
    instagramName: "baannork.chula",
  },
  {
    nameThai: "บ้านจิ๊จ๊ะ",
    image: "BaanJiJah.png",
    instagramName: "baanjijah.chula",
  },
  {
    nameThai: "บ้านเอช้วน",
    image: "BaanA-Chuan.png",
    instagramName: "baanachuan_official",
  },
  {
    nameThai: "บ้านโจ๊ะเด๊ะ ฮือซา",
    image: "BaanJodehHuesa.png",
    instagramName: "jodeh_official",
  },
  {
    nameThai: "บ้านอะอึ๋ม",
    image: "BaanA-Aum.png",
    instagramName: "baanaaum.official",
  },
  {
    nameThai: "บ้านคิดส์",
    image: "BaanKids.png",
    instagramName: "baankids.official",
  },
  {
    nameThai: "บ้านแจ๋ว",
    image: "BaanJaew.png",
    instagramName: "baanjaew",
  },
  {
    nameThai: "บ้านสด",
    image: "BaanSod.png",
    instagramName: "baansod.official",
  },
  {
    nameThai: "บ้านเฮา",
    image: "BaanHaaw.png",
    instagramName: "baan.haaw",
  },
  {
    nameThai: "บ้านคุ้ม",
    image: "BaanKoom.png",
    instagramName: "baankoom.chula",
  },
  {
    nameThai: "บ้านโจ๋",
    image: "BaanJo.png",
    instagramName: "baanjochula",
  },
  {
    nameThai: "บ้านโซ้ยตี๋หลีหมวย",
    image: "BaanSoeiteelheemouy.png",
    instagramName: "baansoeiteelheemouy",
  },
  {
    nameThai: "บ้านแรงส์",
    image: "BaanRangs.png",
    instagramName: "baanrangs.official",
  },
  {
    nameThai: "บ้านยิ้ม",
    image: "BaanYim.png",
    instagramName: "baanyimchula",
  },
];

export async function getHouses(token?: string): Promise<HouseDisplayType[]> {
  const response = await getAllHouses(token);
  if (
    !response.success ||
    !response.data ||
    !Array.isArray(response.data.data)
  ) {
    console.error("Failed to fetch house data:", response.error);
    return [];
  }
  const houseAPI = response.data.data;

  const houses: HouseDisplayType[] = houseAPI.map((house: HouseResponse) => {
    const extra = extraHouseData.find((e) => e.nameThai === house.nameThai);
    return {
      id: house.id,
      nameThai: house.nameThai,
      nameEng: house.nameEnglish,
      descriptionThai: house.descriptionThai,
      descriptionEng: house.descriptionEnglish,
      sizeLetter: house.sizeLetter,
      chosenCount: house.chosenCount,
      capacity: house.capacity,
      instagram: house.instagram,
      facebook: house.facebook,
      tiktok: house.tiktok,
      image: extra?.image ?? "",
      instagramName: extra?.instagramName ?? "",
    };
  });
  return houses;
}

export async function getPrefHouses(token?: string): Promise<HousePrefType> {
  const houseResult: HousePrefType = {
    houseRank1: null,
    houseRank2: null,
    houseRank3: null,
    houseRank4: null,
    houseRank5: null,
    houseRankSub: null,
  };

  const response = await getHousePreferences(token);
  console.log("Response from getHousePreferences:", response);
  if (!response.success || !response.data) {
    console.error("Failed to fetch house data:", response.error);
    return houseResult;
  }

  const houseData = response.data.data;

  houseResult.houseRank1 = houseData.houseRank1
    ? (houseData.houseRank1.id ?? null)
    : null;
  houseResult.houseRank2 = houseData.houseRank2
    ? (houseData.houseRank2.id ?? null)
    : null;
  houseResult.houseRank3 = houseData.houseRank3
    ? (houseData.houseRank3.id ?? null)
    : null;
  houseResult.houseRank4 = houseData.houseRank4
    ? (houseData.houseRank4.id ?? null)
    : null;
  houseResult.houseRank5 = houseData.houseRank5
    ? (houseData.houseRank5.id ?? null)
    : null;
  houseResult.houseRankSub = houseData.houseRankSub
    ? (houseData.houseRankSub.id ?? null)
    : null;

  return houseResult;
}
