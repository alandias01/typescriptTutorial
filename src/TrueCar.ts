import axios from "axios";
import cheerio from "cheerio";

const CAR = {
  LOCATION: "location-flushing-ny/",
  SEARCHPARAMS: new URLSearchParams("?mileageHigh=30000&onlineDealers=none&sort[]=price_asc"),
  MILEAGE: "year-2016-max/",
  MAKE: {
    LEXUS: {
      toString: () => "lexus/",
      ES: "es/",
    },
  },
};

interface ITrueCaraData {
  year: string;
  price: string;
  miles: string;
  accidents: string;
  owners: string;
  useType: string;
  location: string;
}

export class TrueCar {
  private baseUrl = new URL("https://www.truecar.com/used-cars-for-sale/listings/");

  constructor() {
    this.processData()
      .then((data) => data.forEach((x) => console.log(JSON.stringify(x))))
      .catch((e) => console.log(e));
  }

  private createUrl = (make: {}, model: string, loc: string, mileage?: string, searchParams?: URLSearchParams) => {
    let url = new URL(make.toString(), this.baseUrl);
    url = new URL(model, url);
    url = new URL(loc, url);

    if (typeof mileage !== "undefined") url = new URL(mileage, url);
    searchParams?.forEach((v, k) => url.searchParams.set(k, v));

    return url;
  };

  private parseHtml = async (html: string) => {
    const $ = await cheerio.load(html);

    let data: ITrueCaraData[] = [];
    const listingsDiv = $("div[data-test=allVehicleListings]");
    const cardcontent = listingsDiv.find("div[data-test=cardContent]");

    cardcontent.each((i, elem) => {
      const year = $(elem).find('span[class="vehicle-card-year font-size-1"]').text();
      const price = $(elem).find("div[data-test=vehicleCardPricingBlockPrice]").text();
      let miles = $(elem).find("div[data-test=vehicleMileage]").text();
      let accident_owner_useType = $(elem).find("div[data-test=vehicleCardCondition]").text();

      const { accidents, owners, useType } = this.getAccidentOwnerUseTypeFromString(accident_owner_useType);

      let location = $(elem).find("div[data-test=vehicleCardLocation]").text();

      miles = miles.replace("miles", "");
      data.push({ year, price, miles, accidents, owners, useType, location });
    });

    return data;
  };

  private getAccidentOwnerUseTypeFromString = (accident_owner_useType: string) => {
    const arr = accident_owner_useType.split(",");
    const accidentArr = arr[0].trim().split(" ");
    const ownerArr = arr[1].trim().split(" ");

    let accidents = "-1";
    let owners = "-1";
    let useType = "-1";
    accidents = accidentArr[0]?.toLowerCase() === "no" ? "0" : accidentArr[0];
    owners = ownerArr[0];
    useType = arr[2];

    return { accidents, owners, useType };
  };

  public processData = async (url?: string) => {
    let data: ITrueCaraData[] = [];
    try {
      let urlObject = url
        ? new URL(url)
        : this.createUrl(CAR.MAKE.LEXUS, CAR.MAKE.LEXUS.ES, CAR.LOCATION, CAR.MILEAGE, CAR.SEARCHPARAMS);

      const html = await axios(urlObject.toString());
      data = await this.parseHtml(html.data);
    } catch (error) {
      console.log(error);
    }

    return data;
  };
}
