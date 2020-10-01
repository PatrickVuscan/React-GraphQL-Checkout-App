import { Item } from '@prisma/client';
import { Context } from '../../utils/context';

async function createItem(parent: any, args: any, context: Context, info: any): Promise<Item> {
    return await context.prisma.item.create({
        data: {
            name: args.name,
            price: args.price,
            discount: args.discount ? args.discount : 0.0,
        },
    });
}

async function updateItem(parent: any, args: any, context: Context, info: any): Promise<Item | null> {
    const item = await context.prisma.item.findOne({
        where: {
            id: Number(args.id),
        },
    });

    if (!item) {
        throw new Error(`Cannot update nonexistent item with id ${args.id}.`);
    }

    return context.prisma.item.update({
        where: {
            id: Number(args.id),
        },
        data: {
            name: args.name ? args.name : item.name,
            price: args.price ? args.price : item.price,
            discount: args.discount ? args.discount : item.discount,
        },
    });
}

async function deleteItem(parent: any, args: any, context: Context, info: any): Promise<Item | null> {
    const item = await context.prisma.item.findOne({
        where: {
            id: Number(args.id),
        },
    });

    if (!item) {
        throw new Error(`Cannot delete nonexistent item with id ${args.id}`);
    }

    await context.prisma.item.delete({
        where: {
            id: Number(args.id),
        },
    });
    return item;
}

const Mutation = {
    createItem,
    updateItem,
    deleteItem,
};

export default Mutation;
