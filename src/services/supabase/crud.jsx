import supabasePublic from './supabasePublic';
import supabaseAuth from './supabaseAuth';

export const read = async table => await supabasePublic.from(table).select('*');

export const readOne = async (table, id) => await supabasePublic.from(table).select('*').eq('id', id);

export const readFK = async (table, foreignKey) =>
    await supabasePublic.from(table).select('*').eq('foreignKey', foreignKey);

export const readFK2 = async table =>
    await supabasePublic.from(table).select('*').eq('foreignKey', foreignKey);

export const pagination = async (table, first, last) =>
    await supabasePublic.from(table).select('*').range(first, last);
