import { Item } from '@prisma/client';
import { Context } from '../../utils/context';

function info(): string {
    return 'This is the API for facileCheckout';
}

async function item(parent: any, args: any, context: Context): Promise<Item | null> {
    return await context.prisma.item.findOne({
        where: {
            id: Number(args.id),
        },
    });
}

async function items(parent: any, args: any, context: Context): Promise<Item[]> {
    return await context.prisma.item.findMany();
}

const Query = {
    info,
    item,
    items,
};

export default Query;
