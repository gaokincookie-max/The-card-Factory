const u=(id,name,difficulty,tags,hp,atk,interval,inputs,factory,ability={})=>({id,name,type:'unit',difficulty,tags,hp,atk,interval,inputs,factory,ability});
const s=(id,name,difficulty,tags,inputs,factory,effect)=>({id,name,type:'support',difficulty,tags,inputs,factory,effect});

export const CARDS = {
  infantry: u('infantry','歩兵分隊',1,['ユニット','歩兵','人間'],100,10,1.5,{iron_ore:1,chemical:1},'infantry_factory'),
  light_infantry: u('light_infantry','軽装歩兵',1,['ユニット','歩兵','人間'],70,8,.8,{iron_ore:1},'infantry_factory'),
  heavy_infantry: u('heavy_infantry','重装歩兵',3,['ユニット','歩兵','人間','装甲'],220,7,2,{armor_plate:1,gunpowder:1},'infantry_factory'),
  machinegun: u('machinegun','機関銃班',2,['ユニット','歩兵','人間','対歩兵'],75,5,.4,{iron:1,gunpowder:1},'infantry_factory',{vsTag:{歩兵:1.25}}),
  sniper: u('sniper','狙撃班',3,['ユニット','歩兵','人間','狙撃'],55,50,4.5,{iron:1,copper_wire:1,gunpowder:1},'infantry_factory',{vsTag:{支援:1.5}}),
  medic: u('medic','衛生兵',2,['ユニット','歩兵','人間','支援'],70,0,0,{iron:1,medicine:1},'infantry_factory',{healAdjacent:{amount:12,seconds:2}}),
  commander: u('commander','野戦指揮官',2,['ユニット','歩兵','人間','支援'],80,0,0,{iron:1,copper_wire:1},'infantry_factory',{aura:{scope:'adjacent',attackMult:1.15}}),
  supply_squad: u('supply_squad','補給班',2,['ユニット','歩兵','人間','支援'],90,0,0,{iron:1,fuel:1},'infantry_factory',{aura:{scope:'column',reloadMult:.8}}),
  repair_vehicle: u('repair_vehicle','整備車両',3,['ユニット','車両','機械','支援'],160,0,0,{iron:1,electronics:1,fuel:1},'vehicle_factory',{healAdjacent:{amount:6,seconds:1,tag:'車両'}}),
  flamethrower: u('flamethrower','火炎放射班',2,['ユニット','歩兵','人間','範囲'],90,10,1,{iron:1,fuel:1},'infantry_factory',{splashAdjacentFront:.5}),
  assault: u('assault','突撃班',2,['ユニット','歩兵','人間'],110,14,1.2,{iron:1,gunpowder:1},'infantry_factory',{breakthroughDouble:true}),
  infiltrator: u('infiltrator','潜入班',3,['ユニット','歩兵','人間','特殊'],65,18,1.5,{copper_wire:1,resin:1,gunpowder:1},'special_factory',{targetBackline:true}),
  light_tank: u('light_tank','軽戦車',3,['ユニット','車両','機械','装甲'],300,25,2,{iron:2,armor_plate:1,fuel:1},'vehicle_factory'),
  heavy_tank: u('heavy_tank','重戦車',5,['ユニット','車両','機械','装甲'],600,38,3,{reinforced_armor:2,propulsion:1,advanced_ammo:1},'vehicle_factory',{damageTakenMult:.85}),
  spg: u('spg','自走砲',4,['ユニット','車両','機械','砲兵'],140,65,5,{precision:1,advanced_ammo:1,fuel:1},'vehicle_factory',{hitFrontBack:true}),
  anti_tank: u('anti_tank','対戦車班',2,['ユニット','歩兵','人間','対装甲'],80,8,2,{iron:1,gunpowder:1,fuel:1},'infantry_factory',{vsTag:{車両:3.5}}),
  anti_infantry: u('anti_infantry','対歩兵銃座',2,['ユニット','兵器','機械','対歩兵'],100,3,.3,{iron:1,gunpowder:1},'special_factory',{vsTag:{歩兵:2,車両:.4}}),
  ew_vehicle: u('ew_vehicle','電子戦車両',4,['ユニット','車両','機械','電子','支援'],120,0,0,{controller:1,precision:1,fuel:1},'special_factory',{enemyColumnReloadMult:1.35}),
  defense_command: u('defense_command','防衛指揮車',4,['ユニット','車両','機械','支援'],170,0,0,{reinforced_armor:1,controller:1},'special_factory',{aura:{scope:'adjacent',damageTakenMult:.88}}),

  requisition: s('requisition','資材調達',1,['補助','経済'],{iron_ore:1},'support_factory',{kind:'buildResource',amount:25}),
  emergency_requisition: s('emergency_requisition','緊急資材調達',1,['補助','経済'],{crude_oil:1},'support_factory',{kind:'buildResource',amount:18}),
  mass_requisition: s('mass_requisition','大規模調達',2,['補助','経済'],{iron:1,fuel:1},'support_factory',{kind:'buildResource',amount:55}),
  field_repair: s('field_repair','応急処置',1,['補助','回復'],{medicine:1},'support_factory',{kind:'heal',amount:50,target:'ally'}),
  barrage: s('barrage','集中砲撃',3,['補助','攻撃'],{iron:1,gunpowder:1,copper_wire:1},'support_factory',{kind:'damage',amount:60,target:'enemy'}),
  suppression: s('suppression','制圧射撃',1,['補助','戦闘'],{chemical:1},'support_factory',{kind:'slow',mult:1.4,seconds:5,target:'enemy'}),
  smoke: s('smoke','煙幕',1,['補助','防御'],{medicine:1},'support_factory',{kind:'columnGuard',mult:.7,seconds:6,target:'column'}),
  reposition: s('reposition','再配置命令',2,['補助','戦術'],{copper_wire:1,fuel:1},'support_factory',{kind:'reposition'}),
  swap_line: s('swap_line','前線交代',1,['補助','戦術'],{copper_ore:1},'support_factory',{kind:'swapColumn'}),
  anti_armor_rocket: s('anti_armor_rocket','対装甲ロケット',2,['補助','メタ','対装甲'],{gunpowder:1,fuel:1},'special_factory',{kind:'tagDamage',tag:'車両',hit:120,miss:20,target:'enemy'}),
  anti_infantry_bomb: s('anti_infantry_bomb','対歩兵爆撃',2,['補助','メタ','対歩兵'],{gunpowder:1,crude_oil:1},'special_factory',{kind:'tagDamage',tag:'歩兵',hit:80,miss:15,target:'enemy'}),
  emp: s('emp','軽度EMP',2,['補助','メタ','電子'],{electronics:1,chemical:1},'special_factory',{kind:'stunTag',tag:'機械',seconds:4,target:'enemy'}),
};

export const CARD_LIST = Object.values(CARDS);
