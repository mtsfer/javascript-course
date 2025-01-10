import {Product, Clothing, Appliance} from "../../data/products.js";

describe("test suite: Product class", () => {
    let product;

    beforeEach(() => {
        const productDetails = {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87
            },
            priceCents: 1090,
            keywords: [
                "socks",
                "sports",
                "apparel"
            ]
        };
        product = new Product(productDetails);
    });

    it('should create a product object with correct property values', () => {
        expect(product.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(product.image).toEqual("images/products/athletic-cotton-socks-6-pairs.jpg");
        expect(product.name).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs");
        expect(product.rating.stars).toEqual(4.5);
        expect(product.rating.count).toEqual(87);
        expect(product.priceCents).toEqual(1090);
    });

    it('should get the correct stars url', () => {
        const url = product.getStarsUrl();

        expect(url).toEqual(`images/ratings/rating-45.png`);
    });

    it('should get the price correctly formatted', () => {
        const formattedPrice = product.getPrice();

        expect(formattedPrice).toEqual("$10.90");
    });

    it('should have any extra information', () => {
        const extraInfoHTML = product.getExtraInfoHTML();

        expect(extraInfoHTML).toBeFalsy();
    });
});

describe("test suite: Clothing class", () => {
    let clothing;

    beforeEach(() => {
        const productDetails = {
            id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
            name: "Adults Plain Cotton T-Shirt - 2 Pack",
            rating: {
                stars: 4.5,
                count: 56
            },
            priceCents: 799,
            keywords: [
                "tshirts",
                "apparel",
                "mens"
            ],
            type: "clothing",
            sizeChartLink: "images/clothing-size-chart.png"
        };

        clothing = new Clothing(productDetails);
    });

    it('should create a clothing object with correct property values', () => {
        expect(clothing.id).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
        expect(clothing.image).toEqual("images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg");
        expect(clothing.name).toEqual("Adults Plain Cotton T-Shirt - 2 Pack");
        expect(clothing.rating.stars).toEqual(4.5);
        expect(clothing.rating.count).toEqual(56);
        expect(clothing.priceCents).toEqual(799);
        expect(clothing.sizeChartLink).toEqual("images/clothing-size-chart.png");
    });

    it('should get the correct stars url', () => {
        const url = clothing.getStarsUrl();

        expect(url).toEqual(`images/ratings/rating-45.png`);
    });

    it('should get the price correctly formatted', () => {
        const formattedPrice = clothing.getPrice();

        expect(formattedPrice).toEqual("$7.99");
    });

    it('should have any extra information', () => {
        const extraInfoHTML = clothing.getExtraInfoHTML();

        expect(extraInfoHTML).toContain(`<a href="images/clothing-size-chart.png" target="_blank">`);
        expect(extraInfoHTML).toContain("Size chart");
    });
});

describe("test suite: Appliance class", () => {
    let appliance;

    beforeEach(() => {
        const productDetails = {
            id: "54e0eccd-8f36-462b-b68a-8182611d9add",
            image: "images/products/black-2-slot-toaster.jpg",
            name: "2 Slot Toaster - Black",
            rating: {
                stars: 5,
                count: 2197
            },
            priceCents: 1899,
            keywords: [
                "toaster",
                "kitchen",
                "appliances"
            ],
            type: "appliance",
            instructionsLink: "images/appliance-instructions.png",
            warrantyLink: "images/appliance-warranty.png"
        };

        appliance = new Appliance(productDetails);
    });

    it('should create an appliance object with correct property values', () => {
        expect(appliance.id).toEqual("54e0eccd-8f36-462b-b68a-8182611d9add");
        expect(appliance.image).toEqual("images/products/black-2-slot-toaster.jpg");
        expect(appliance.name).toEqual("2 Slot Toaster - Black");
        expect(appliance.rating.stars).toEqual(5);
        expect(appliance.rating.count).toEqual(2197);
        expect(appliance.priceCents).toEqual(1899);
        expect(appliance.instructionsLink).toEqual("images/appliance-instructions.png");
        expect(appliance.warrantyLink).toEqual("images/appliance-warranty.png");
    });

    it('should get the correct stars url', () => {
        const url = appliance.getStarsUrl();

        expect(url).toEqual(`images/ratings/rating-50.png`);
    });

    it('should get the price correctly formatted', () => {
        const formattedPrice = appliance.getPrice();

        expect(formattedPrice).toEqual("$18.99");
    });

    it('should have any extra information', () => {
        const extraInfoHTML = appliance.getExtraInfoHTML();

        expect(extraInfoHTML).toContain(`<a href="images/appliance-instructions.png" target="_blank">`);
        expect(extraInfoHTML).toContain("Instructions");

        expect(extraInfoHTML).toContain(`<a href="images/appliance-warranty.png" target="_blank">`);
        expect(extraInfoHTML).toContain("Warranty");
    });
});