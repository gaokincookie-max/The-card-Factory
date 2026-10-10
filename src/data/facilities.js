export const FACILITIES = {
  solid_miner:{id:'solid_miner',name:'汎用採掘機',category:'採取',w:2,h:2,cost:22,input:false,output:true,kind:'miner',accept:['iron_ore','copper_ore','chemical']},
  liquid_miner:{id:'liquid_miner',name:'液体採取機',category:'採取',w:2,h:2,cost:22,input:false,output:true,kind:'miner',accept:['crude_oil']},
  simple_processor:{id:'simple_processor',name:'加工炉',category:'加工',w:1,h:1,cost:14,input:true,output:true,kind:'processor'},
  composite_processor:{id:'composite_processor',name:'組立加工機',category:'加工',w:2,h:2,cost:34,input:true,output:true,kind:'processor'},
  infantry_factory:{id:'infantry_factory',name:'歩兵・軽兵器工場',category:'製造',w:3,h:2,cost:42,input:true,output:true,kind:'cardFactory'},
  vehicle_factory:{id:'vehicle_factory',name:'車両・重工業工場',category:'製造',w:3,h:3,cost:72,input:true,output:true,kind:'cardFactory'},
  special_factory:{id:'special_factory',name:'電子・特殊工場',category:'製造',w:3,h:2,cost:52,input:true,output:true,kind:'cardFactory'},
  support_factory:{id:'support_factory',name:'補助・軍需工場',category:'製造',w:3,h:2,cost:38,input:true,output:true,kind:'cardFactory'},
  small_warehouse:{id:'small_warehouse',name:'小型倉庫',category:'保管',w:1,h:1,cost:20,input:true,output:true,kind:'warehouse',capacity:18},
  large_warehouse:{id:'large_warehouse',name:'大型倉庫',category:'保管',w:2,h:2,cost:42,input:true,output:true,kind:'warehouse',capacity:64},
};
export const FACILITY_LIST=Object.values(FACILITIES);
