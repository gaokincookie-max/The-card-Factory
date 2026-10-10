import {CONFIG} from '../data/config.js';
import {createFactory,tickFactory,placeFacility,demolish,setShippingWall,shippingGroups} from './factory.js';
import {createBattle,tickBattle,spawnUnit,selfDestruct,applySupport} from './battle.js';
import {CARDS} from '../data/cards.js';
import {FACILITIES} from '../data/facilities.js';

export class Game {
 constructor(){this.time=0;this.buildResource=CONFIG.startingBuildResource;this.factory=createFactory();this.battle=createBattle();this.hand=[];this.prep=CONFIG.preparationSeconds;this.lastAi=0;this.listeners=new Set;this.speed=1;}
 on(fn){this.listeners.add(fn);return()=>this.listeners.delete(fn);} emit(){for(const fn of this.listeners)fn(this);}
 tick(dt){dt*=this.speed; this.time+=dt;this.buildResource+=CONFIG.buildResourcePerSecond*dt;this.prep=Math.max(0,this.prep-dt);tickFactory(this.factory,dt,(id,cx,cy)=>this.receiveToHand(id,cx,cy));tickBattle(this.battle,dt,this.time,this.prep<=0); if(this.prep<=0&&this.time-this.lastAi>=CONFIG.aiDeploySeconds&&!this.battle.winner){this.lastAi=this.time;this.aiDeploy();}}
 receiveToHand(itemId,cx,cy){const groups=shippingGroups(this.factory.shipping);const gi=groups.group[cy*2+cx];const memberCells=groups.group.map((g,i)=>g===gi?i:-1).filter(i=>i>=0);const cap=memberCells.length*CONFIG.shippingCellCapacity;const count=this.hand.filter(h=>memberCells.includes(h.shipCell)).length;if(count>=cap||this.hand.length>=CONFIG.handLimit)return false;this.hand.push({uid:crypto.randomUUID(),itemId,shipCell:cy*2+cx});return true;}
 build(type,x,y,rot){const d=FACILITIES[type];if(!d||this.buildResource<d.cost)return null;const f=placeFacility(this.factory,type,x,y,rot);if(f){this.buildResource-=d.cost;this.emit();}return f;}
 demolish(id){const ok=demolish(this.factory,id);if(ok)this.emit();return ok;}
 playHand(uid,target){const i=this.hand.findIndex(h=>h.uid===uid);if(i<0)return false;const h=this.hand[i],c=CARDS[h.itemId]; if(!c){this.hand.splice(i,1);this.emit();return true;} let ok=false; if(c.type==='unit')ok=spawnUnit(this.battle,'player',c.id,target.row,target.col,this.time); else if(c.effect?.kind==='buildResource'){this.buildResource+=c.effect.amount;ok=true;} else ok=applySupport(this.battle,'player',c.id,target||{},this.time); if(ok){this.hand.splice(i,1);this.emit();}return ok;}
 discardHand(uid){const i=this.hand.findIndex(h=>h.uid===uid);if(i<0)return false;this.hand.splice(i,1);this.emit();return true;}
 aiDeploy(){const pool=['infantry','light_infantry','machinegun','heavy_infantry','light_tank'];const empties=[];for(let r=0;r<2;r++)for(let c=0;c<5;c++)if(!this.battle.slots.enemy[r][c]&&this.battle.removal.enemy[r][c]<=0)empties.push([r,c]);if(!empties.length)return;const [r,c]=empties[Math.floor(Math.random()*empties.length)];spawnUnit(this.battle,'enemy',pool[Math.floor(Math.random()*pool.length)],r,c,this.time);}
 selfDestruct(row,col){const ok=selfDestruct(this.battle,'player',row,col);if(ok)this.emit();return ok;}
 toggleShippingWall(key){const ok=setShippingWall(this.factory,key,!this.factory.shipping.walls[key]);if(ok)this.emit();return ok;}
}
