import type { Category, Dish } from '../types'
export const categories: Category[] = ['Starters','Main Course','Desserts','Beverages',"Chef's Specials"]
export const dishes: Dish[] = [
{id:'s1',name:'Smoked Beetroot Galouti',description:'Coal-smoked beet, whipped chevre, ghee-toasted brioche.',price:520,category:'Starters',veg:true,label:'Popular'},
{id:'s2',name:'Tandoori Prawns',description:'Tiger prawns, kasundi marinade, charred lime.',price:890,category:'Starters',veg:false},
{id:'s3',name:'Ember Paneer Tikka',description:'Hand-pressed paneer, hung-curd, mustard oil, raw mango.',price:580,category:'Starters',veg:true},
{id:'m1',name:'Dum Lamb Raan',description:'Twelve-hour slow-braised leg, saffron jus, rumali.',price:1650,category:'Main Course',veg:false,label:"Chef's pick"},
{id:'m2',name:'Wood-fire Black Dal',description:'Overnight urad, cultured butter, smoked over cedar.',price:620,category:'Main Course',veg:true,label:'Popular'},
{id:'m3',name:'Malabar Fish Curry',description:'Line-caught seer, kokum, coconut, curry leaf oil.',price:1240,category:'Main Course',veg:false},
{id:'d1',name:'Jaggery Kulfi Smoke',description:'Slow-set kulfi, date-palm jaggery, burnt-milk crumble.',price:420,category:'Desserts',veg:true},
{id:'d2',name:'Fig & Rabri Tart',description:'Roasted figs, reduced rabri, pistachio soil.',price:460,category:'Desserts',veg:true},
{id:'b1',name:'Smoked Kokum Cooler',description:'Kokum, charred pineapple, black salt, soda.',price:320,category:'Beverages',veg:true},
{id:'b2',name:'Cardamom Old Fashioned',description:'Rye, jaggery, green cardamom, orange smoke.',price:780,category:'Beverages',veg:true},
{id:'c1',name:'Tasting Fire — Seven Courses',description:'The kitchen’s season, paired with small-batch wines.',price:3800,category:"Chef's Specials",veg:false,label:"Chef's pick"},
{id:'c2',name:'Monsoon Thali for Two',description:'Seasonal vegetables, millets, three breads, two sweets.',price:2400,category:"Chef's Specials",veg:true}]
