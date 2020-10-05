import moongose, {Schema, Document} from "mongoose";


export interface ProductInterface extends Document {
    name: string,
    description: string,
    price: number,
    inStock: boolean
};

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
});

export default moongose.model<ProductInterface>("Product", productSchema);