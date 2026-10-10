import {MATERIALS,PROCESS_RECIPES} from '../data/materials.js';
import {CARDS,CARD_LIST} from '../data/cards.js';
import {FACILITIES,FACILITY_LIST} from '../data/facilities.js';

export const Catalog={MATERIALS,PROCESS_RECIPES,CARDS,CARD_LIST,FACILITIES,FACILITY_LIST};
export function itemDef(id){return MATERIALS[id]||CARDS[id]||null;}
export function itemName(id){return itemDef(id)?.name||id;}
export function recipeCost(inputs={}){return Object.entries(inputs).reduce((s,[id,q])=>s+(MATERIALS[id]?.baseCost||1)*q,0);}
export function cardRecipesFor(factoryId){return CARD_LIST.filter(c=>c.factory===factoryId).map(c=>({id:c.id,out:c.id,qty:1,inputs:c.inputs,seconds:Math.max(2,1.5+c.difficulty*1.7),facility:factoryId,cost:recipeCost(c.inputs)}));}
