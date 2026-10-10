// UIや通信から分離した確定的な工場状態管理。将来は同じcommandをサーバーが検証して実行する。
export const SIZE=32;
export const catalog={iron:{name:'鉄鉱石採集',size:[2,2],cost:12,resource:'鉄鉱石'},copper:{name:'銅鉱石採集',size:[2,2],cost:12,resource:'銅鉱石'},oil:{name:'原油採集',size:[2,2],cost:12,resource:'原油'},chem:{name:'化学資源採集',size:[2,2],cost:12,resource:'化学資源'},smelter:{name:'加工炉',size:[1,1],cost:20},assembler:{name:'組立加工機',size:[2,2],cost:32},infantry:{name:'歩兵・軽兵器工場',size:[3,2],cost:50},vehicle:{name:'車両・重工業工場',size:[3,3],cost:75},special:{name:'電子・特殊工場',size:[3,2],cost:55},support:{name:'補助・軍需工場',size:[3,2],cost:50},warehouseSmall:{name:'小型倉庫',size:[1,1],cost:15},warehouseLarge:{name:'大型倉庫',size:[2,2],cost:30}};
const resourcePositions=[[4,4],[25,4],[4,25],[25,25]];
export function initialState(){return {tick:0,money:100,zones:resourcePositions.map(([x,y],id)=>({id,x,y})),buildings:[],belts:[],nextId:1,rotation:0};}
export function footprint(kind,rotation){const [w,h]=catalog[kind].size;return rotation%2?[h,w]:[w,h];}
const within=(x,y,a,b,w,h)=>x>=a&&y>=b&&x<a+w&&y<b+h;
export function place(state,kind,x,y,rotation=0){if(!catalog[kind])return '不明な施設';const [w,h]=footprint(kind,rotation);if(x<0||y<0||x+w>SIZE||y+h>SIZE)return '盤面外です';if(state.money<catalog[kind].cost)return '建築資材が不足';const mining=!!catalog[kind].resource;
 if(mining&&!state.zones.some(z=>z.x===x&&z.y===y&&w===2&&h===2))return '採集施設は2×2の資源ゾーンに完全一致させてください';
 if(!mining&&state.zones.some(z=>!(x+w<=z.x||x>=z.x+2||y+h<=z.y||y>=z.y+2)))return '資源ゾーンをふさぐことはできません';
 if(state.buildings.some(b=>{const [bw,bh]=footprint(b.kind,b.rotation);return !(x+w<=b.x||x>=b.x+bw||y+h<=b.y||y>=b.y+bh)}))return 'ほかの施設と重なっています';
 if(state.belts.some(b=>within(b.x,b.y,x,y,w,h)))return 'ベルトと重なっています';
 state.money-=catalog[kind].cost;state.buildings.push({id:state.nextId++,kind,x,y,rotation,inventory:{},progress:0});return null;}
export function remove(state,x,y){const idx=state.buildings.findIndex(b=>{const [w,h]=footprint(b.kind,b.rotation);return within(x,y,b.x,b.y,w,h)});if(idx>=0){state.buildings.splice(idx,1);return '施設を撤去しました（払い戻しなし）';}const bi=state.belts.findIndex(b=>b.x===x&&b.y===y);if(bi>=0){state.belts.splice(bi,1);return 'ベルトを撤去しました';}return '撤去対象がありません';}
export function step(state,dt){state.tick+=dt;state.money+=dt;}
export function beltLine(state,x1,y1,x2,y2){if(x1!==x2&&y1!==y2)return 'ベルトは直線のみです';const dx=Math.sign(x2-x1),dy=Math.sign(y2-y1);const length=Math.abs(x2-x1)+Math.abs(y2-y1);if(length===0)return '異なる終点を指定してください';const cells=[];for(let n=0;n<=length;n++){const x=x1+dx*n,y=y1+dy*n;if(state.zones.some(z=>within(x,y,z.x,z.y,2,2)))return '資源ゾーンを通過できません';if(state.buildings.some(b=>{const[w,h]=footprint(b.kind,b.rotation);return within(x,y,b.x,b.y,w,h)}))return '施設が経路を塞いでいます';if(state.belts.some(b=>b.x===x&&b.y===y)&&n!==0&&n!==length)return 'ベルトの交差は禁止です';cells.push({x,y});}for(const c of cells)if(!state.belts.some(b=>b.x===c.x&&b.y===c.y))state.belts.push(c);return null;}
