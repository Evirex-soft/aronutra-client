import dbConnect from "@/lib/mongoose";
import Order, { IOrder } from "@/models/Order";
import mongoose from "mongoose";

export async function getOrderById(orderId: string): Promise<IOrder | null> {
    try {
        await dbConnect();
        const isValidMongoId = mongoose.Types.ObjectId.isValid(orderId);

        const order = await Order.findOne({
            $or: [
                { orderId: orderId },
                ...(isValidMongoId ? [{ _id: orderId }] : [])
            ]
        }).lean();

        if (!order) return null;
        return JSON.parse(JSON.stringify(order));
    } catch (error) {
        console.error("Error fetching order:", error);
        return null;
    }
}

export async function getOrdersByUserId(
    userId: string,
    limit = 5
) {
    await dbConnect();

    const orders = await Order.find({
        userId,
    })
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean();

    return JSON.parse(JSON.stringify(orders));
}



export async function getPaginatedOrders(
    userId: string,
    page = 1,
    limit = 5
) {
    await dbConnect();

    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
        Order.find({ userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),

        Order.countDocuments({ userId }),
    ]);

    return {
        orders: JSON.parse(JSON.stringify(orders)),
        total,
    };
}