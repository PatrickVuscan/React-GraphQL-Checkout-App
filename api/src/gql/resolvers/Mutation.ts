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

const Mutation = {
    createItem,
};

export default Mutation;
