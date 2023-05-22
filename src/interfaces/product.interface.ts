export interface Product {
    _id: string;
    name: string;
    price: Number;
    stock: Number;
    description: string;
    shippingCountry: string
    shippingAddress: string;
    shippingPostCode: string;
    base64image: string;
}