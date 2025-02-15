
// export interface Product {
//     _id : string;
//     productName : string;
//     _type : "product";
//     _image? : {
//         asset : {
//             _ref : string;
//             _type : 'image';
//         }
//     };
//      price: number;
//      description? : string;
// }

interface Product {
    _id: string;
    productName: string;
    _type: "product";
    _image?: {
        asset: {
            _ref: string;
            _type: "image";
        };
    };
    price: number;
    description?: string;
}
export default Product;