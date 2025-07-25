export interface Shop {
  number: number;
  name: string;
  zone: string;
  manu: string;
  description: string;
  time: string;
  maps: string;
  image: string;
}

export const quest2Shops: Shop[] = [
  {
    number: 1,
    name: "จางล่าเมี่ยน Zhanglamian",
    zone: "A",
    manu: "จางล่าเมี่ยน Zhanglamian, โปรนิสิตเมนูข้าวซอยข้นคนจางไก",
    description:
      "จางล่าเมี่ยน Zhānglàmiàn หรือ บะหมี่รสเผ็ดตระกูลจาง เส้นเหนียวนุ่ม ทานคู่กับซอสรสเผ็ด  บวกกับกลิ่นหอม ๆ จากพริกล่าเจียวโหย่ว (Làjiāo yóu) ที่ช่วยชูรสชาติให้อาหารจานนี้โดดเด่นยิ่งขึ้น หรือซุปเนื้อตุ๋นหมูตุ๋นรสต้นตำรับสูตรคุณย่าแท้ ๆ ก็น่าลองไม่แพ้กัน",
    time: "เปิดให้บริการทุกวัน 10:00 - 22:00",
    maps: "https://maps.app.goo.gl/UpGq5mp5bpRSi4q69",
    image: "/fest/shop-images/shop-1.webp",
  },
  {
    number: 2,
    name: "หลงหลูเว่ย",
    zone: "A",
    manu: "หลูเว่ย",
    description:
      "หลงหลูเว่ย (龍滷味) TaiwanStreetFood มีของตุ๋น ของสด ผัก เส้น หลากหลายให้เลือกได้ตามใจชอบ น้ำซุปหอมสมุนไพร รสชาติกลมกล่อม ดีต่อสุขภาพ เสิร์ฟพร้อมกับน้ำจิ้มรสเด็ด",
    time: "เปิดให้บริการทุกวัน 11:00 - 21:00",
    maps: "https://maps.app.goo.gl/LGzE6cKype7kCXpp8",
    image: "/fest/shop-images/shop-2.webp",
  },
  {
    number: 3,
    name: "ข้าวมันไก่เจ๊ปุ๋ย",
    zone: "B",
    manu: "ข้าวมันไก่ต้ม",
    description:
      "เปิดมากกว่า 40 ปี ทำสดใหม่ทุกวัน ไก่ต้มนื้อนุ่มไม่แห้ง ไม่ใส่ผงชูรส ทานคู่กับข้าวมันหอม ๆ  และน้ำจิ้มที่ใช้พริกสดขิงสดรสชาติสดใหม่",
    time: "เปิดให้บริการทุกวัน 7:00-23:00",
    maps: "https://maps.app.goo.gl/k6TER2FrXC6Pa7Qo8",
    image: "/fest/shop-images/shop-3.webp",
  },
  {
    number: 4,
    name: "เจ๊นงค์นักชงมืออาชีพ",
    zone: "B",
    manu: "ชาไทยปังกรอบวิปครีม",
    description:
      "ร้านของหวานที่รวมเมนูอาหาร เครื่องดื่ม และ ขนมปัง อิ่มครบจบที่ร้านเจ๊นงค์นักชงมืออาชีพ น้ำหวานชงด้วยใจ และประสบการณ์ชงอันโชกโชน ของหวานอร่อยทุกเมนูกินคู่กับน้ำหวาน น้ำตาลคูณสอง พลังคูณสิบ",
    time: "วันจันทร์ - วันเสาร์ 7:00 - 22:30, วันอาทิตย์ 7:00 - 16:00",
    maps: "https://maps.app.goo.gl/ak6677ESgWfrihzs7",
    image: "/fest/shop-images/shop-4.webp",
  },
  {
    number: 5,
    name: "เจ๊ฝนคั่วไก่",
    zone: "B",
    manu: "ก๋วยเตี๋ยวคั่วไก่, คั่วไก่ทาโร่",
    description:
      "เปิดมากว่า 30 ปี ก๋วยเตี๋ยวคั่วไก่หอมกลิ่นกระทะ รสชาติเข้มข้น เส้นเหนียวนุ่มพอดี ไก่ไม่แห้ง และก๋วยเตี๋ยวคั่วไก่ยังเสิร์ฟมาพร้อมกับซุปกระดูกหมูร้อน ๆ หอม กลมกล่อม ใครชอบคั่วไก่ขอท้าให้ลองเจ๊ฝนคั่วไก่",
    time: "เปิดให้บริการทุกวัน 10:00 - 21:30",
    maps: "https://maps.app.goo.gl/K26YSWpCwR5Wt6XW6",
    image: "/fest/shop-images/shop-5.webp",
  },
  {
    number: 6,
    name: "เจ๊วรรณ",
    zone: "B",
    manu: "เต้าฮวยนมสด, บัวลอยน้ำขิง, นมสดเฉาก๊วยโรยผงไมโล",
    description:
      "เปิดมานานกว่า 30 ปี น้ำเต้าหู้ใช้ถั่วเหลืองซีก 100 เปอร์เซ็นต์ ไม่ผสมนมผง ไม่ผสมถั่วลิสง  รสชาติถั่วเหลืองแท้ ๆ อร่อยชัวร์แบบ authentic ดีต่อสุขภาพ ใครมาถึงบรรทัดทองต้องลองเจ๊วรรณ",
    time: "15:00 - 23:00 (หยุดวันอาทิตย์)",
    maps: "https://maps.app.goo.gl/jPjx5JmZwwbQX93C6",
    image: "/fest/shop-images/shop-6.webp",
  },
  {
    number: 7,
    name: "พาสต้าจุฬา",
    zone: "B",
    manu: "พาสต้าผัดกระเทียมพริกแห้ง,พาสต้าครีมเพสโต้ใส่กุ้ง",
    description:
      "มีพาสต้าหลากหลายเอาใจคนชอบเส้นสไตล์ฝรั่ง ซอสครีมนัว ๆ ซอสมะเขือเทศกลมกล่อม หรือแบบผัดก็เข้มข้น ราคาย่อมเยา ให้เยอะ อร่อย รสชาติถูกปากคนไทย",
    time: "เปิดให้บริการทุกวัน 17:00 - 22:00",
    maps: "https://maps.app.goo.gl/VtjnqaB6WQ615WB36",
    image: "/fest/shop-images/shop-7.webp",
  },
  {
    number: 8,
    name: "ริมสวน (โต๊ะส้ม)",
    zone: "B",
    manu: "ข้าวผัดกุ้ง",
    description:
      "โต๊ะส้มโดดเด่น แต่อาจไม่เท่ากับอาหารที่เมนูหลากหลาย รสชาติอร่อย ครั้งหนึ่งในชีวิตเด็กจุฬาต้องไม่พลาดลองเช็กอินโต๊ะส้มสักครั้ง",
    time: "เปิดให้บริการทุกวัน 16:30 - 1:00",
    maps: "https://maps.app.goo.gl/hPcq2NGxFoCC5R8Y6",
    image: "/fest/shop-images/shop-8.webp",
  },
  {
    number: 9,
    name: "ส้มตำสามสาวมิดไนท์",
    zone: "B",
    manu: "ตำป่า",
    description:
      "ร้านตั้งอยู่ตรงหัวมุมตึกเก่า มีป้ายร้านสีส้มเด่นชัด ส้มตำรสแซ่บ เมนูย่างรสเริ่ด เมนูยำรสเด็ด หากได้ลองครบก็จะได้ทั้งแซ่บ เริ่ด เด็ด ครบทุกรสในราคาจับต้องได้",
    time: "เปิดให้บริการทุกวัน 14:00 - 23:00",
    maps: "https://maps.app.goo.gl/P6RHT5x44HjT9a7p8",
    image: "/fest/shop-images/shop-9.webp",
  },
  {
    number: 10,
    name: "ส้มส้ม เกาเหลาหมูตุ๋นยาจีน",
    zone: "B",
    manu: "ก๋วยจั๊บน้ำใส, เกาเหลาหมูตุ๋น",
    description:
      "ร้านเก่าแก่ เกาเหลาหมูตุ๋นยาจีนหอมเครื่องยาจีนเตะจมูก รสชาติเข้มข้น ซดคล่องคอ เนื้อหมูตุ๋นจนเปื่อย หรือจะเป็นสายน้ำใสก็อร่อยไม่แพ้กัน ซุปหอม ๆ รสชาติกลมกล่อม ซดคล่องคอไม่แพ้ยาจีน",
    time: "7:00 – 12:30, 16:00 – 22:00 (หยุดทุกวันอาทิตย์)",
    maps: "https://maps.app.goo.gl/fF63QNPu3oUQVeAG8",
    image: "/fest/shop-images/shop-10.webp",
  },
  {
    number: 11,
    name: "เสน่ห์ลาบก้อย",
    zone: "B",
    manu: "เนื้อเสือร้องไห้ย่าง, ต้มแซ่บหมู",
    description:
      "สีผนังของร้านที่โดดเด่นสะดุดตาด้วยสีเขียวนีออนสะท้อนแสง และรสเนื้อย่างที่ใครก็บอกว่าเด็ด เนื้อนุ่ม หอมกลิ่นย่าง เบา ๆ อาหารอีสานรสชาติต้นตำรับ เข้มข้น นัว หาใครทำเหมือนไม่ได้",
    time: "เปิดให้บริการทุกวัน 16:00 - 23:00",
    maps: "https://maps.app.goo.gl/atFrPSCfqe1Meadx6",
    image: "/fest/shop-images/shop-11.webp",
  },
  {
    number: 12,
    name: "24.5 Space",
    zone: "C",
    manu: "Cold drip, Black Ice, Earl Grey Milk Tea",
    description:
      "เป็นร้านกาแฟ Specialty เล็ก ๆ บรรยากาศสบาย ๆ มีเมล็ดกาแฟให้เลือกหลากหลาย และมีน้องหมาแสนรู้ประจำอยู่ที่ร้าน",
    time: "เปิดให้บริการทุกวัน 7:00-18:00",
    maps: "https://maps.app.goo.gl/MdasYyBN5KhwdfzCA",
    image: "/fest/shop-images/shop-12.webp",
  },
  {
    number: 13,
    name: "ก๋วยเตี๋ยวเป็ดรสเด็ดสามย่าน",
    zone: "C",
    manu: "ก๋วยเตี๋ยวเป็ด, เกาเหลาเป็ดตุ๋นหม้อดิน",
    description:
      "เปิดมากว่า60 ปี บะหมี่เส้นแบน ซุปพะโล้หอม หวาน เค็ม รสชาติกลมกล่อม เนื้อเป็ดเนื้อนุ่ม ตุ๋นจนเปื่อย ไม่มีกลิ่นสาบ",
    time: "7:00 - 16:00 (หยุดทุกวันศุกร์)",
    maps: "https://maps.app.goo.gl/ZyygSxMFUPCqtbsP7",
    image: "/fest/shop-images/shop-13.webp",
  },
  {
    number: 14,
    name: "ก๋วยเตี๋ยวเรือนายเกรียง สามย่าน",
    zone: "C",
    manu: "ก๋วยเตี๋ยวหมูน้ำตก",
    description:
      "ก๋วยเตี๋ยวเรืออร่อย ไม่ต้องพึ่งเครื่องปรุง รสชาติน้ำซุปเข้มข้น กลิ่นหอม เครื่องจุก ๆ",
    time: "เปิดให้บริการทุกวัน 10:00 - 20:00",
    maps: "https://maps.app.goo.gl/3j4Ytx7HwcZVMryu7",
    image: "/fest/shop-images/shop-14.webp",
  },
  {
    number: 15,
    name: "ข้าวมันไก่สองสีสามย่าน",
    zone: "C",
    manu: "ข้าวมันไก่ ข้าวไก่ทอด ข้าวมันไก่สองสี",
    description:
      "ร้านเก่าแก่เปิดมากว่า 60 ปี ตั้งแต่ พ.ศ. 2508 การันตีรสชาติด้วยประสบการณ์การทำข้าวมันไก่ของเจ้าของร้านที่ขายมาตั้งแต่อายุ 17 จนตอนนี้อายุ 70 ไก่ต้มเนื้อนุ่ม ไก่ทอดกรอบ ๆ ทานคู่กับข้าวมันร้อน ๆ ที่ทั้งหอม ทั้งกลมกล่อม กับน้ำซุปใสซดคล่องคอ",
    time: "เปิดให้บริการทุกวัน 7:00 - 16:00",
    maps: "https://maps.app.goo.gl/t7CkuRXfpNEKQoSS8",
    image: "/fest/shop-images/shop-15.webp",
  },
  {
    number: 16,
    name: "ข้าวหมกไก่สามย่าน",
    zone: "C",
    manu: "ข้าวหมกไก่, ข้าวหมกเนื้อ, ซุปแซ่บไก่, ก๋วยเตี๋ยวเนื้อ",
    description:
      "เปิดให้บริการมายาวนานกว่า 20 ปี ราคาย่อมเยา รสชาติอร่อยทานง่าย ข้าวหมกรสกลมกล่อมจัดเต็มเครื่องเทศ ทานคู่กับเมนูซุปไก่แซ่บ ซดแล้วคล่องคอ หรือก๋วยเตี๋ยวเนื้อรสเข้มข้น",
    time: "7:00-15:00 (หยุดทุกวันอาทิตย์)",
    maps: "https://g.co/kgs/dGQd4XW",
    image: "/fest/shop-images/shop-16.webp",
  },
  {
    number: 17,
    name: "ครัวจุฬา 48",
    zone: "C",
    manu: "หมูกรอบพริกเกลือ ไข่ข้นปูผัดผงกะหรี่",
    description:
      "ร้านอาหารตามสั่งเมนูหลากหลาย รสชาติเข้มข้น ราคาเอาใจนิสิต และคนวัยทำงาน เป็น Comfort Food ที่มัดใจคนในย่าน เด่นดังเรื่องการทำเมนูไข่ข้นผงกะหรี่ ไข่นุ่ม ๆ ผัดผงกะหรี่ นัว ๆ เหยาะพริกน้ำปลาเพิ่มความกลมกล่อม หรือจะเป็นเมนูคั่วพริกเกลือหอม ๆ ข้าวสวยร้อน ๆ ก็อร่อยไม่แพ้ใคร",
    time: "วันจันทร์ - วันศุกร์ 9:00 - 20:30 (หยุดทุกวันเสาร์ - วันอาทิตย์)",
    maps: "https://maps.app.goo.gl/GKVPQzq9M1GuQqa78",
    image: "/fest/shop-images/shop-17.webp",
  },
  {
    number: 18,
    name: "เค้กต้นกก​สามย่าน",
    zone: "C",
    manu: "เค้ก​ส้ม ​เค้ก​ช็อกโกแลต",
    description:
      "เค้กหน้านิ่มที่อยู่คู่สามย่าน ยาวนานกว่า 20 ปี รสชาติเนื้อเค้กหวานกำลังดี บวกกับซอสบนหน้านิ่มที่เป็นเอกลักษณ์ ไม่ว่าจะถามใครในสามย่าน หากพูกถึงเค้กหน้านิ่ม ร้านต้นกกสามย่านต้องเป็นตัวเลือกลำดับแรกอย่างแน่นอน",
    time: "เปิดให้บริการทุกวัน 9:00 - 20:00",
    maps: "https://maps.app.goo.gl/g25EfnpiQCekMsu18",
    image: "/fest/shop-images/shop-18.webp",
  },
  {
    number: 19,
    name: "เจ๊นา คิทเช่น",
    zone: "C",
    manu: "เนื้อปูก้อนผัดผงกะหรี่ หมึกกล้วยไข่เค็ม ข้าวผัดเนื้อปูก้ามแด",
    description:
      "เริ่มจากการเป็นแผงสดในตลาดสามย่านมากกว่า 50 ปี ต่อยอดด้วยการเปิดเป็นร้านอาหารของตนเอง ใช้วัตถุดิบสด ๆของเราเอง ซอสปรุงเองโฮมเมดวัตถุดิบพรีเมี่ยม คัดแต่ของดีของอร่อยให้ได้ทานกันในราคาย่อมเยา",
    time: "เปิดให้บริการทุกวัน 9:30 - 19:30",
    maps: "https://maps.app.goo.gl/RpurcJZifh5JZu1FA",
    image: "/fest/shop-images/shop-19.webp",
  },
  {
    number: 20,
    name: "เจ๊หุย สุกี้โบราณ Hui Suki",
    zone: "C",
    manu: "ปอเปี๊ยะสวรรค์, หมูหมักไข่ตอก",
    description:
      "บุฟเฟต์สุกี้โบราณ สูตรต้นตำรับทางร้านที่เปิดมากกว่า 18 ปี เนื้อหมูเนื้อวัวหมักนุ่มสูตรพิเศษ น้ำซุปกลมกล่อม เป็นสุกี้ที่คนในย่าน และนิสิตจุฬาต่างต้องเคยลิ้มลอง",
    time: "เปิดให้บริการทุกวัน 11:00 - 23:00",
    maps: "https://maps.app.goo.gl/KGzjehVnRHggvA9g7",
    image: "/fest/shop-images/shop-20.webp",
  },
  {
    number: 21,
    name: "เจ๊แหม่มอาหารตามสั่ง",
    zone: "C",
    manu: "หมูกรอบผัดผงกะหรี่",
    description:
      "ร้านอาหารตามสั่งเมนูหลากหลาย อยากกินแบบไหนไม่ต้องกลัวไม่มี ขอแค่กล้าสั่ง รสชาติเข้มข้น ปริมาณคุ้มค่า ราคาเอาใจนิสิต และคนวัยทำงาน",
    time: "เปิดให้บริการทุกวัน 10:30 - 21:30",
    maps: "https://maps.app.goo.gl/nc47H6ZDR1Hr8tM36",
    image: "/fest/shop-images/shop-21.webp",
  },
  {
    number: 22,
    name: "เจ๊แอนคอหมูย่าง",
    zone: "C",
    manu: "คอหมูย่าง , ส้มตำไทยไข่เค็ม , ต้มแซ่บกระดูกอ่อน , คอหมูน้ำตก",
    description:
      "เป็นร้านอาหารอีสานเก่าแก่ที่เปิดมานานถึง 50 ปี ที่มีเมนูเด็ดคือคอหมูย่าง-คอหมูทอดที่เสิร์ฟคู่กับน้ำจิ้มมะขามสูตรเด็ด กินคู่กับข้าวเหนียวรับรองว่านัวสุด ๆ ราคาไม่แพงเข้าถึงง่าย",
    time: "เปิดบริการทุกวัน 11:00 - 22:00",
    maps: "https://maps.app.goo.gl/EuoYqV18Q4x2inrJ6",
    image: "/fest/shop-images/shop-22.webp",
  },
  {
    number: 23,
    name: "โจ๊กทองหล่อ",
    zone: "C",
    manu: "โจ๊กทรงเครื่องสามสหาย, ข้าวต้มแห้งหมูตุ๋น",
    description:
      "ร้านโจ๊กห้องแอร์ โจ๊กทรงเครื่องเครื่องแน่น ๆ ข้าวเนียนนุ่ม กลิ่นหอมข้าว และน้ำซุปรสชาติกลมกล่อม หมูตุ๋นเนื้อฉ่ำ ใครได้ลองแล้วจะติดใจ",
    time: "วันจันทร์ - วันเสาร์ 7:00 - 20:00 (หยุดวันอาทิตย์)",
    maps: "https://maps.app.goo.gl/Y4gzxm26xm54eSo99",
    image: "/fest/shop-images/shop-23.webp",
  },
  {
    number: 24,
    name: "ซอย 6 โภชนา Soi 6 Pochana",
    zone: "C",
    manu: "บะหมี่แห้งหมูสามอย่าง, บะหมี่หน้าเป็ดย่าง, ข้าวหน้าเป็ดย่าง",
    description:
      "ร้านอาหารเปิดมากว่า 60 ปี มีทั้งหมูกรอบ หมูแดง เป็ดย่าง เมนูหลากหลาย หมูกรอบกรอบจริงจัง หมูแดงเนื้อฉ่ำ เป็ดย่างเนื้อนุ่มไม่มีกลิ่นสาบ ทานคู่กับข้าวสวยร้อน ๆ ราดซอสของแต่ละเมนู อิ่ม อร่อย ในราคาย่อมเยา",
    time: "เปิดให้บริการทุกวัน 7:30 - 23:00",
    maps: "https://maps.app.goo.gl/iAvrzfve7M1VRTT58",
    image: "/fest/shop-images/shop-24.webp",
  },
  {
    number: 25,
    name: "ตรอกหมูกรอบ",
    zone: "C",
    manu: "ข้าวหมูกรอบพริกเกลือ ข้าวหมื่นลี้หมูกรอบ",
    description:
      "เปิดมา 10 กว่าปี หมูกรอบกรอบยันโลกหน้า รสชาติเข้มข้นทุกเมนูไม่ได้มีดีแค่หมูกรอบ ราคาดี คุณภาพล้น ใครผ่านมาอยากให้ลิ้มลองหากยังไม่ว่างเดินมากินข้าว เดินมาทักทายเล่นก็ยังดี",
    time: "เปิดให้บริการทุกวัน 10:30 - 20:00 (หยุดปีใหม่, สงกรานต์)",
    maps: "https://maps.app.goo.gl/4DtTG34cWRShRqPN9",
    image: "/fest/shop-images/shop-25.webp",
  },
  {
    number: 26,
    name: "ที.สพูน (T.Spoon)",
    zone: "C",
    manu: "หมูกรอบคั่วพริกเกลือ, หมื่นลี้, ไข่ข้นกะเพราหมูสับ, ไก่ผัดเม็ดมะม่วง",
    description:
      "ร้านอาหารคู่นิสิตจุฬา และคนในพื้นที่ เปิดให้บริการมานานกว่า 20 ปี จุดเด่นคือข้าวสีฟ้าที่หุงโดยผสมน้ำดอกอัญชัน และข้าวสีเหลืองที่หุงด้วยน้ำดอกคำฝอย ซึ่งเป็นที่นิยมในหมู่นิสิต และพนักงานมิตรทาวน์",
    time: "วันจันทร์ - วันเสาร์ 9:00 - 20:30 (หยุดทุกวันอาทิตย์)",
    maps: "https://maps.app.goo.gl/BKDbdiMb2VVJVtre9",
    image: "/fest/shop-images/shop-26.webp",
  },
  {
    number: 27,
    name: "ทูเดย์สเต๊กสามย่าน Today Steak",
    zone: "C",
    manu: "ทูเดย์รวม สเต๊กหมูพริกไทยดำ",
    description:
      "สเต๊กจานใหญ่ เนื้อชิ้นโต อร่อยเต็มคำ เมนูหลากหลาย ราคาคุ้มค่าเอาใจสายกิน",
    time: "เปิดให้บริการทุกวัน 10:00 - 22:30",
    maps: "https://maps.app.goo.gl/2qSaTEsSc4zbvPm38",
    image: "/fest/shop-images/shop-27.webp",
  },
  {
    number: 28,
    name: "เทนอิชิ (Tenichi Japanese Restaurant)",
    zone: "C",
    manu: "ชุดทงคัตสึ เสริฟพร้อมข้าวญี่ปุ่น ซุปมิโซะ และ ผัก, ชุดหมูทงเทกิ เสริฟพร้อมข้าวญี่ปุ่น ซุปมิโซะ และ ผัก",
    description:
      "แต่ละเมนูทำด้วยใจรัก ต้องการให้ลูกค้ามาทานให้รู้สึกอบอุ่น เหมือนครอบครัวญี่ปุ่นมาทำอาหารให้ คุณภาพอาหารเกินราคา วัตถุดิบอย่างดี รสชาติกลมกล่อม ราคานิสิต",
    time: "เปิดให้บริการทุกวัน 11:00 - 21:30",
    maps: "https://maps.app.goo.gl/MTsxvfztojS1KJkX7",
    image: "/fest/shop-images/shop-28.webp",
  },
  {
    number: 29,
    name: "พี่นาเอแคลร์",
    zone: "C",
    manu: "เอแคลร์ไส้วานิลลาครีม",
    description:
      "ร้านขนมหวานครอบครัวของที่เปิดขายมานานกว่า 30 ปีที่สามย่าน ตัวเอแคลร์มีขนาดพอดีคำ รสหวานกำลังดี แป้งบางพอดีกับปริมาณไส้",
    time: "เปิดให้บริการทุกวัน 8:00 - 16:00",
    maps: "https://maps.app.goo.gl/T1xcfryVctYGfup67",
    image: "/fest/shop-images/shop-29.webp",
  },
  {
    number: 30,
    name: "ร้านขนมนิสา1980 (Nisa 1980)",
    zone: "C",
    manu: "เอแคลร์, ทาร์ตมะพร้าว, คุ๊กกี้, บานอฟฟี่, ช็อคไร้แป้งสตอเบอร์รี่ครีมสด, บลูเบอร์รี่ชีสเค้กหน้าไหม้",
    description:
      "ร้านขายเบเกอรี่ที่เริ่มจากอาม่า เริ่มทำขนมมาตั้งแต่ปี 1980 องค์ความรู้ด้านขนมโดยเรียนจากอาจารย์ทำขนมจากญี่ปุ่น และอาจารย์ท่านอื่น ๆ ประกอบกับอาม่ามีลูก ๆ ที่หัดทำขนมด้วยตั้งแต่เด็ก และศึกษาเพิ่มเติมโดยตลอด จึงมีขนมเบเกอรี่ที่หลากหลาย ทั้งยุคอาม่าและขนมยุคใหม่ถูกใจน้อง ๆ ตอบโจทย์คนทานทุกวัย ราคาและคุณภาพวัตถุดิบแบบทำให้ครอบครัวทาน",
    time: "วันอังคาร - วันศุกร์ 7:30 - 14:00 (หยุดทุกวันเสาร์ - วันจันทร์) หากต้องการทานอะไรเป็นพิเศษสามารถโทรมาแจ้งก่อนล่วงหน้า",
    maps: "https://maps.app.goo.gl/28Z7cHNfAX5zp2Jq7",
    image: "/fest/shop-images/shop-30.webp",
  },
  {
    number: 31,
    name: "ร้านอาหารเจอบอุ่น",
    zone: "C",
    manu: "ข้าวผัดหนำเลี๊ยบเจ",
    description:
      "ร้านอาหารเจเจ้าดังย่านสามย่าน ด้วยรสชาติที่อร่อยแม้ไม่มีเนื้อสัตว์ และเมนูเจที่หลากหลายทั้งอาหารจานเดียว และเมนูกับข้าว ร้านอาหารเจอบอุ่นจึงเป็นตัวเลือกอันดับ 1 ในชุมชนสามย่านสำหรับผู้ที่ไม่ทานเนื้อสัตว์",
    time: "วันจันทร์ - วันเสาร์ 8:00 - 18:00, วันอาทิตย์ 8:00 - 14:00",
    maps: "https://maps.app.goo.gl/rATGL7MVrMeEiNUB9",
    image: "/fest/shop-images/shop-31.webp",
  },
  {
    number: 32,
    name: "หมูตุ๋นสามย่าน Mootoon samyan",
    zone: "C",
    manu: "ข้าวหมูตุ๋น กะเพราหมูตุ๋น ก๋วยเตี๋ยวหมูตุ๋น",
    description:
      "เปิดมากว่า 20 กว่าปี รสชาติต้นตำรับ จุดเด่นของร้านคือ หมูตุ๋นที่นำชายโครงหมู มาตุ๋นกับยาจีนใช้เวลาประมาณ 6 ชั่วโมง เนื้อหมูจึงเปื่อย หอมยาจีนทั้งชิ้น ซดพร้อมกับซุปยาจีน อิ่ม อร่อย สบายท้อง",
    time: "เปิดให้บริการทุกวัน 6:00 - 13:30",
    maps: "https://maps.app.goo.gl/TYbzpxnmhBiS6rFM8",
    image: "/fest/shop-images/shop-32.webp",
  },
  {
    number: 33,
    name: "อ้วนผอมสเต๊ก สาขาจุฬา 50",
    zone: "C",
    manu: "พอร์คกระดองเบอร์ , ไก่อลาสก้า, ก็อดฟาเธอร์เนื้อ",
    description:
      "เปิดให้บริการมานาน คู่กับตลาดสามย่าน สเต็กเนื้อถูกปรุงมาอย่างดี รสชาติเข้มข้น ให้เยอะพร้อมเครื่องเคียงแน่น ๆ ในราคาที่ย่อมเยา",
    time: "เปิดให้บริการทุกวัน 10:00 – 21:00",
    maps: "https://maps.app.goo.gl/3GxCr3r54QhhYive9",
    image: "/fest/shop-images/shop-33.webp",
  },
  {
    number: 34,
    name: "อ้วนผอมสเต๊ก สาขาตลาดสามย่าน",
    zone: "C",
    manu: "พอร์คกระดองเบอร์ , ไก่อลาสก้า, ก็อดฟาเธอร์เนื้อ",
    description:
      "เปิดให้บริการมานาน คู่กับตลาดสามย่าน สเต็กเนื้อถูกปรุงมาอย่างดี รสชาติเข้มข้น ให้เยอะพร้อมเครื่องเคียงแน่น ๆ ในราคาที่ย่อมเยา",
    time: "เปิดให้บริการทุกวัน 10:00 – 21:00",
    maps: "https://maps.app.goo.gl/LZ4Q6vnDffGXkYiV8",
    image: "/fest/shop-images/shop-34.webp",
  },
  {
    number: 35,
    name: "อิ่มจังอาหารตามสั่ง",
    zone: "C",
    manu: "หมูกรอบราดพริกสด, ข้าวผัดหนำเลี้ยบ, ก๋วยเตี๋ยวหมูสับ (ซอสแดง)",
    description:
      "ร้านอาหารตามสั่งเมนูหลากหลาย รสชาติเข้มข้น ราคาเอาใจนิสิต และคนวัยทำงาน เป็น Comfort Food ที่มัดใจคนในย่าน ใครมากินนอกจากอร่อย และถูกแล้วต่างพูดกันเป็นเสียงเดียวว่า 'อิ่มจัง",
    time: "เปิดให้บริการทุกวัน 11:00 - 22:00",
    maps: "https://maps.app.goo.gl/34ei7mAaXCBnWnbUA",
    image: "/fest/shop-images/shop-35.webp",
  },
  {
    number: 36,
    name: "เฮียเบิร์ด หมูกระทะ (HIABIRD MOOKRATA)",
    zone: "C",
    manu: "ชุดหมูกระทะ, เนื้อออสเตรเลีย, ข้าวผัดพริกเกลือ, มะนาวซ่า",
    description:
      "ร้านหมูกระทะที่คุ้มที่สุดในละแวกจุฬาฯ ด้วยบริการผักฟรี เปลี่ยนเตาฟรี เติมถ่านฟรี และมีน้ำจิ้มให้เลือกถึง 9 อย่าง มีราคาที่ย่อมเยา เฮียเบิร์ด หมูกระทะ จึงเป็น 1 ในตัวเลือกแรก ๆ สำหรับนิสิตที่ต้องการหมูกระทะมาเยียวยาจิตใจ",
    time: "เปิดให้บริการทุกวัน 16:30 - 22:30",
    maps: "https://maps.app.goo.gl/gdfZDNmFCLvntA4h6",
    image: "/fest/shop-images/shop-36.webp",
  },
  {
    number: 37,
    name: "Curry Boy",
    zone: "C",
    manu: "คัตสึคาเร (ข้าวแกงกะหรี่หมูทอด)",
    description:
      "ร้าน Curry Boy เป็นร้านข้าวแกงกะหรี่ญี่ปุ่นที่อยู่คู่ U Center มานานกว่า 20 ปี นอกจากข้าวแกงกะหรี่ ทางร้านก็มีเมนูอาหารญี่ปุ่นอื่น ๆ และด้วยวัตถุดิบคุณภาพ กับราคาย่อมเยา ร้าน Curry Boy จึงเป็นร้านอาหารญี่ปุ่นอันดับแรก ๆ ในใจนิสิตจุฬา",
    time: "11:00 - 20:30 (หยุดทุกวันอาทิตย์)",
    maps: "https://maps.app.goo.gl/4q713nY4JxFQ6rWu7",
    image: "/fest/shop-images/shop-37.webp",
  },
  {
    number: 38,
    name: "Eattention Please",
    zone: "C",
    manu: "กาแฟน้ำมะพร้าว, มัทฉะน้ำมะพร้าว, ชาไทย, กาแฟน้ำส้ม, ข้าวไข่ข้นไก่กรอบคั่วพริกเกลือ, สปาเกตตี้พริกแห้งเบคอน, ข้าวไข่ข้นกุ้ง, ข้าวเบคอนซอสญี่ปุ่นไข่ออนเซ็น, Basque burnt cheesecake, Salted caramel brownie",
    description:
      "เป็นคาเฟ่ใจกลางสามย่าน ซอยจุฬาฯ50 เป็นคาเฟ่สไตล์เกาหลี มีพร้อมทั้งเครื่องดื่ม อาหารและเบเกอรี่ที่หลากหลาย อีกทั้งยังมีสถานที่ที่เป็น Co-working spaceให้กับลูกค้าที่ต้องการใช้พื้นที่ในการทำงานหรืออ่านหนังสือ นอกจากนี้ยังมีพื้นที่สำหรับจัดกิจกรรมต่าง ๆ เช่น Event birthday cafe, Workshop, Studio, ประชุมสัมมนา",
    time: "เปิดให้บริการทุกวัน 8:30 - 20:30",
    maps: "https://maps.app.goo.gl/erHtCWyqgyKnW18YA",
    image: "/fest/shop-images/shop-38.webp",
  },
  {
    number: 39,
    name: "Entrance Coffeehouse & Studio",
    zone: "C",
    manu: "Dirty, Tiramisu latte, Honey Yogurt, Earl grey peach",
    description:
      "คอฟฟี่เฮ้าส์ของชุมชนสามย่านที่เปิดให้บริการในชุมชนสามย่านมานานกว่า 13 ปี ได้เข้าร่วมกิจกรรมอาสาเพื่อคนในชุมชน เช่น งานคริสต์มาสชุมชนสามย่าน อีกทั้งยังเป็นพาร์ทเนอร์กับสามย่านนิวเจน ที่ทำงานอาสากับเด็กในชุมชน และ Deeperlife church ที่เปิดเป็นคริสตจักรในวันอาทิตย์ เอนทรานซ์ คอฟฟี่เฮ้าส์แอนด์สตูดิโอ คือพื้นที่ที่เปิดโอกาสให้ผู้คนได้มีส่วนร่วมในการพัฒนาชุมชนและเป็นพื้นที่ปลอดภัย และยังมีส่วนโปรโมชั่นส่วนลดเครื่องดื่มสำหรับนักเรียน และนักศึกษาอีกด้วย",
    time: "7:30 - 20:30 (หยุดทุกวันอาทิตย์)",
    maps: "https://maps.app.goo.gl/U21LgTMTRYxQPPe17",
    image: "/fest/shop-images/shop-39.webp",
  },
  {
    number: 40,
    name: "JOHNNY Food & Drink",
    zone: "C",
    manu: "ข้าวหมื่นลี้, ข้าวผัดเจแปน, ออส่วนหอยนางรม",
    description:
      "ร้านอาหารตามสั่งเมนูหลากหลายให้เลือกสรร รสชาติอร่อยทุกเมนู ราคาย่อมเยา",
    time: "10:30 - 21:00 (หยุดทุกวันอาทิตย์)",
    maps: "https://maps.app.goo.gl/gHqMiQrnKjgSvRJA9",
    image: "/fest/shop-images/shop-40.webp",
  },
  {
    number: 41,
    name: "PING BKK GELATO",
    zone: "C",
    manu: "เจลาโต้รสน้องแมวสามรสชาติ, วนิลาคุ้กกี้คาราเมล, ชาโคลโอรีโอ้, ช็อคโกแลตพีนัทบัตเตอร์",
    description:
      "ร้านไอศกรีมเจลาโต้บรรยากาศอบอุ่นที่มีน้องแมวมานั่งฮีลใจ มีไอศกรีมเจลาโต้ที่เป็นเอกลักษณ์หลากหลายราชาติ สามารถลองชิมรสชาติเจลาโต้ก่อนเลือกซื้อได้",
    time: "11:30 - 22:00 (หยุดทุกวันอาทิตย์)",
    maps: "https://maps.app.goo.gl/88GxxMArZu5A4pCg9",
    image: "/fest/shop-images/shop-41.webp",
  },
  {
    number: 42,
    name: "Power of Cups (POCs)",
    zone: "C",
    manu: "Biscoff Latte, น้ำส้มคั้นสด, มัทฉะ",
    description:
      "พื้นที่ปล่อยวางความวุ่นวาย และเติมพลังใจให้กับเรื่องต่าง ๆ เครื่องดื่มอร่อยชงด้วยใจ เค้กรสชาติดีราคาจับต้องได้สำหรับนิสิต ใช้วัตถุดิบคุณภาพดี ใส่ใจกับรายละเอียดทั้งการตกแต่ง และการบริการ",
    time: "จันทร์ - ศุกร์ 7:00 - 18:00, เสาร์ - อาทิตย์ 8:00 - 18:00",
    maps: "https://maps.app.goo.gl/ZVFeyHnASegBgcci6",
    image: "/fest/shop-images/shop-42.webp",
  },
  {
    number: 43,
    name: "Skip Samyan สกิพ สามย่าน",
    zone: "C",
    manu: "อาหารเซ็ต, ยำทะเลดิบ, ครีมไข่กุ้ง, สลัดหมูม้วน, หมูทอดน้ำพริกเผ",
    description:
      "อาหารญี่ปุ่นราคานักศึกษา เมนูหลากหลาย รสชาติกลมกล่อม Comfort Food คนในย่าน และนิสิตจุฬา หากเถียงกับเพื่อนไม่รู้จะทานอะไร ร้านสกิพมีครบทุกความต้องการ",
    time: "เปิดให้บริการทุกวัน 11:00 - 20:30",
    maps: "https://maps.app.goo.gl/tctXRruqnAsttoFF6",
    image: "/fest/shop-images/shop-43.webp",
  },
  {
    number: 44,
    name: "Sloth Coffee Bar",
    zone: "C",
    manu: "Iced Caffe Cream Latte",
    description:
      "ร้านกาแฟและเครื่องดื่มเล็ก ๆแต่อบอุ่นในโครงการ U Center 1 ที่มีเจ้าของ 3 คน เป็นพ่อแม่ลูก ที่เปิดร้านนี้มาจาก 'ความสุข' จึงอยากจะส่งมอบสิ่งนี้ผ่านเครื่องดื่มที่ตั้งใจชงในทุก ๆแก้ว ด้วยการใส่ใจในรายละเอียดการเลือกวัตถุดิบที่ดี สะอาด รสชาติดี และไม่มีสารกันบูด",
    time: "วันจันทร์ - วันศุกร์ 7:30 - 16:30, วันเสาร์ 9:00 - 16:30 (หยุดทุกวันอาทิตย์)",
    maps: "https://maps.app.goo.gl/rrKAm418wUxG3Cw59",
    image: "/fest/shop-images/shop-44.webp",
  },
  {
    number: 45,
    name: "Suki Samyan (สุกี้สามย่าน)",
    zone: "C",
    manu: "สุกี้แห้ง, สุกี้น้ำ",
    description:
      "เปิดมากว่า 65 ปี น้ำจิ้มสุกี้รสชาติเข้มข้น กลมกล่อม เป็นเอกลักษณ์เฉพาะของร้าน เครื่องแน่น ๆ ทั้งเส้นนุ่ม ๆ เนื้อไม่กั๊ก ผักสดใหม่ ใครอยากลิ้มลองรสชาติต้นตำรับสุกี้ต้องแวะมาสุกี้สามย่าน",
    time: "สาขาหัวมุมจุฬา 50 เปิดให้บริการทุกวัน 6.00 - 14.00สาขาตรงข้าม Slow Combo  หยุดทุกวันเสาร์ เปิด 10:00 - 21:00",
    maps: "https://g.co/kgs/xpwCQDR",
    image: "/fest/shop-images/shop-45.webp",
  },
  {
    number: 46,
    name: "Sweet Peach Cafe สวีทพีชคาเฟ่",
    zone: "C",
    manu: "Matcha Latte, Coffee Malt, Strawberry Shortcake, Tiramisu",
    description:
      "ร้านขนมหวาน เค้กโฮมเมด รสชาติอร่อย กรีกโยเกิร์ตไม่เติมน้ำตาลสำหรับสายเฮลตี้ ภายในร้านตกแต่งน่ารัก อยู่ใกล้จุฬา และสามย่านมิตรทาวน์",
    time: "เปิดให้บริการทุกวัน 6:30 - 20:00",
    maps: "https://maps.app.goo.gl/japHo6qZavjmaz2P7",
    image: "/fest/shop-images/shop-46.webp",
  },
  {
    number: 47,
    name: "ประชาธิปไตยกินได้ Delicious Democracy",
    zone: "D",
    manu: "ก๋วยเตี๋ยวต้มยำหมูกรอบ ข้าวยำใบชาพม่า",
    description:
      "ร้านที่นำสูตรมาจากร้านก๋วยเตี๋ยวกัญชา จากร้านแถวหอพัก U Center ที่เคยประสบปัญหาค่าเช่าแพง ผู้ก่อตั้งคือ แฟรงค์ เนติวิทย์ โชติภัทร์ไพศาล นอกจากนี้ชั้นบนยังเป็นพื้นที่จัดกิจกรรมต่าง ๆ ที่สนับสนุนประชาธิปไตย เช่น เสวนา",
    time: "วันจันทร์ - ศุกร์ 11:00 - 19:00 (หยุดทุกวันเสาร์ - วันอาทิตย์)",
    maps: "https://maps.app.goo.gl/9FV5Sq7VZE4yDLwM9",
    image: "/fest/shop-images/shop-47.webp",
  },
  {
    number: 48,
    name: "เฮียตี๋ใหญ่กระทะร้อน@สามย่าน",
    zone: "D",
    manu: "หอยทอดกระทะร้อน, ผัดไทยกุ้งสด, หมูกรอบคั่วพริกเกลือไข่ดาว, กะเพราหมูสับไข่ดาว",
    description:
      "ร้านอาหารที่สามารถทานได้ทุกวันด้วยเมนูที่หลากหลาย และรสชาติที่คุ้นเคย ร้านเปิดดึกเอาใจชาวหิวดึก และชาวโต้รุ่ง",
    time: "สาขาสามย่านเปิดให้บริการทุกวัน 10:00 - 23:00",
    maps: "https://maps.app.goo.gl/EVfiAcwdKhVN7xPPA",
    image: "/fest/shop-images/shop-48.webp",
  },
  {
    number: 49,
    name: "เฮียตี๋ใหญ่กระทะร้อน@นเรศ",
    zone: "D",
    manu: "หอยทอดกระทะร้อน, ผัดไทยกุ้งสด, หมูกรอบคั่วพริกเกลือไข่ดาว, กะเพราหมูสับไข่ดาว",
    description:
      "ร้านอาหารที่สามารถทานได้ทุกวันด้วยเมนูที่หลากหลาย และรสชาติที่คุ้นเคย ร้านเปิดดึกเอาใจชาวหิวดึก และชาวโต้รุ่ง",
    time: "สาขานเรศเปิดให้บริการทุกวัน 10:00 - 21:30",
    maps: "https://maps.app.goo.gl/xV8e8fZPKY4XNvim8",
    image: "/fest/shop-images/shop-49.webp",
  },
];

export const zoneAShops = quest2Shops.filter((shop) => shop.zone === "A");
export const zoneBShops = quest2Shops.filter((shop) => shop.zone === "B");
export const zoneCShops = quest2Shops.filter((shop) => shop.zone === "C");
export const zoneDShops = quest2Shops.filter((shop) => shop.zone === "D");
