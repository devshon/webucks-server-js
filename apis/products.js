function sendCategorise(req, res) {
  res.json({
    data: [
      {
        id: 1,
        name: "콜드 브루 커피",
      },
      {
        id: 2,
        name: "브루드 커피",
      },
      {
        id: 3,
        name: "에스프레소",
      },
      {
        id: 4,
        name: "프라푸치노",
      },
      {
        id: 5,
        name: "블렌디드",
      },
    ],
  });
}

function sendProducts(req, res) {
  res.json({
    data: [
      {
        id: 1,
        koreanName: "나이트로 바닐라크림",
        englishName: "Nitro Vanilla Cream",
        category: "콜드 브루 커피",
        categoryId: 1,
        imageUrl:
          "https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002487]_20210426091745467.jpg",
      },
      {
        id: 2,
        koreanName: "아이스 카페 아메리카노",
        englishName: "Ice Cafe Americano",
        category: "에스프레소",
        categoryId: 3,
        imageUrl:
          "https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[110563]_20210426095937808.jpg",
      },
      {
        id: 3,
        koreanName: "돌체 콜드 브루",
        englishName: "Dolce Cold Brew",
        category: "콜드 브루 커피",
        categoryId: 1,
        imageUrl:
          "https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002081]_20210415133656839.jpg",
      },
      {
        id: 4,
        koreanName: "콜드 브루 몰트",
        englishName: "Cold Brew Malt",
        category: "콜드 브루 커피",
        categoryId: 1,
        imageUrl:
          "https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000001636]_20210225093600536.jpg",
      },
      {
        id: 5,
        koreanName: "에스프레소 콘 파나",
        englishName: "Espresso Con Panna",
        category: "에스프레소",
        categoryId: 3,
        imageUrl:
          "https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[30]_20210415144252244.jpg",
      },
    ],
  });
}

function sendProductOne(req, res) {
  res.json({
    data: {
      id: 2,
      koreanName: "아이스 카페 아메리카노",
      englishName: "Iced Caffe Americano",
      description:
        "진한 에스프레소에 시원한 정수물과 얼음을 더햐여 스타벅스의 깔끔하고 강렬한 에스프레소를 가장 부드럽고 시원하게 즐길 수 있는 커피",
      imageURL:
        "https://image.istarbucks.co.kr/upload/store/skuimg/2015/08/[110563]_20150813222100303.jpg",
      allergens: [],
      nutritionInfo: {
        calories: "15",
        fat: "0g",
        sodium: "15mg",
        protein: "1g",
        caffeine: "225mg",
      },
    },
  });
}

module.exports = { sendProducts, sendProductOne, sendCategorise };
