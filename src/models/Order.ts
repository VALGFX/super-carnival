import mongoose, { Schema, Document } from 'mongoose'

export interface IOrderProduct {
    productId: mongoose.Schema.Types.ObjectId
    name: string
    quantity: number
    price: number
    image: string
}

export interface IOrder extends Document {
    userId: mongoose.Schema.Types.ObjectId
    products: IOrderProduct[]
    totalPrice: number
    status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
    createdAt: Date
}

const OrderSchema: Schema<IOrder> = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        products: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
                name: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
                image: { type: String, required: true },
            },
        ],
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
            default: 'pending',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema)
