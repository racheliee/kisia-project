(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{1217:function(e,t,o){e.exports={box:"box_8XcFf",tablebox:"tablebox_YkNpV",filter:"filter_lqfyG",form:"form_6sd1G",table:"table_e9Td1"}},1220:function(e,t,o){"use strict";var n=o(1217),c=o.n(n);o.d(t,"default",(function(){return c.a}))},1463:function(e,t,o){"use strict";t.a={computed:{$_recentRoadmap_cookieName:function(){return"".concat(this.$config.app.cookie.prefix,"roadmap_recent")},$_recentObjective_cookieName:function(){return"".concat(this.$config.app.cookie.prefix,"objective_recent")},recentRoadmap:function(){return this.$cookies.get(this.$_recentRoadmap_cookieName)},recentObjective:function(){return this.$cookies.get(this.$_recentObjective_cookieName)}},methods:{setRecentRoadmap:function(e){var t={id:e.id,title:e.title};this.$cookies.set(this.$_recentRoadmap_cookieName,t,{path:"/",maxAge:604800,domain:this.$config.app.cookie.domain})},setRecentObjective:function(e){var t={id:e.id,title:e.title};this.$cookies.set(this.$_recentObjective_cookieName,t,{path:"/",maxAge:604800,domain:this.$config.app.cookie.domain})},clearRecentRoadmap:function(){this.$cookies.remove(this.$_recentRoadmap_cookieName,{path:"/",domain:this.$config.app.cookie.domain})},clearRecentObjective:function(){this.$cookies.remove(this.$_recentObjective_cookieName,{path:"/",domain:this.$config.app.cookie.domain})}}}},1702:function(e,t,o){e.exports={}},1956:function(e,t,o){"use strict";o(1702)},2076:function(e,t,o){"use strict";o(104);var n={props:{size:{type:Number,default:2},icon:{type:String,required:!0}},methods:{getViewBox:function(e){return{check:"0 0 20 20",pencil:"-4 -4 25 25",lock:"-5 -5 30 30"}[e]||""}}},c=(o(1956),o(5)),component=Object(c.a)(n,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"milestone-icon",style:{width:"".concat(e.size,"rem"),height:"".concat(e.size,"rem")}},[t("svg",{staticClass:"milestone-icon-wrapper",attrs:{viewBox:"0 0 84 96",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}},[t("polygon",{attrs:{fill:"check"===e.icon?"#ffffff":"#dedee6",points:"84,72 84,24 42,0 0,24 0,72 42,96"}}),e._v(" "),t("dh-icon",{staticClass:"icon",class:e.icon,attrs:{icon:e.icon,viewBox:e.getViewBox(e.icon)}})],1)])}),[],!1,null,"4d7557fa",null);t.a=component.exports},2748:function(e,t,o){e.exports={}},2749:function(e,t,o){e.exports={}},2750:function(e,t,o){e.exports={}},2751:function(e,t,o){e.exports={}},3248:function(e,t,o){"use strict";o(28),o(48),o(6),o(55);var n=o(75),c=(o(9),o(65),o(7),o(13),o(14),o(10),o(8),o(1)),r=(o(104),o(635)),l=o(1463),d=o(393),v={props:{objective:{type:Object,required:!0},size:{type:Number,default:5},color:{type:Array,required:!0},lock:{type:Boolean,default:!1}},data:function(){return{strokeDashoffset:282.75}},computed:{cnt_comp_challenges:function(){return this.objective.challenges.filter((function(e){return e.completed_at})).length},cnt_comp_courses:function(){return this.objective.courses.filter((function(e){return e.completed_at})).length},cnt_comp_quizzes:function(){return this.objective.quizzes.filter((function(e){return e.completed_at})).length},cnt_completed:function(){return this.cnt_comp_challenges+this.cnt_comp_courses+this.cnt_comp_quizzes},cnt_entity:function(){return this.objective.challenges.length+this.objective.courses.length+this.objective.quizzes.length},offset:function(){var e=90*Math.PI;return(1-(0===this.cnt_entity||isNaN(this.cnt_entity)?0:this.cnt_completed/this.cnt_entity))*e+0*Math.PI},icon:function(){return this.lock||!this.objective.is_accessible?"lock":this.objective.courses.length>0?"lecture":"flag"},iconColor:function(){return this.objective.completed_at?"white":"#b5b5be"}},mounted:function(){var e=this;this.$nextTick((function(){e.strokeDashoffset=e.offset}))},methods:{getViewBox:function(e){return{lock:"-10 -10 40 40",lecture:"-13 -13 50 50",flag:"-10 -10 35 35"}[e]||""}}},m=(o(4182),o(5)),_=Object(m.a)(v,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"objective-icon",style:{width:"".concat(e.size,"rem"),height:"".concat(e.size,"rem")}},[t("div",{staticClass:"wrapper"},[t("svg",{staticClass:"objective-progress",attrs:{viewBox:"0 0 100 100",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}},[t("defs",[t("linearGradient",{attrs:{id:"linear-".concat(e.objective.id),x1:"0%",y1:"0%",x2:"100%",y2:"0%",gradientTransform:"rotate(90)"}},[t("stop",{attrs:{offset:"0%","stop-color":e.color[0]}}),e._v(" "),t("stop",{attrs:{offset:"100%","stop-color":e.color[1]}})],1)],1),e._v(" "),t("g",[t("circle",{attrs:{r:"45",cx:"50",cy:"50",fill:e.objective.completed_at?"url(#linear-".concat(e.objective.id,")"):"white",transform:"rotate(-90 ) translate(-100 0)"}}),e._v(" "),t("circle",{style:{strokeWidth:".25rem"},attrs:{id:"bar",r:"45",cx:"50",cy:"50",fill:"transparent","stroke-dasharray":"282.75","stroke-dashoffset":"0",stroke:"#dedee6"}}),e._v(" "),t("circle",{staticClass:"objective-progressbar",style:{strokeDashoffset:e.strokeDashoffset,strokeWidth:".275rem"},attrs:{id:"bar",r:"45",cx:"50",cy:"50",fill:"transparent","stroke-dasharray":"282.75","stroke-dashoffset":"0",stroke:"url(#linear-".concat(e.objective.id,")"),transform:"rotate(-90) translate(-100 0)"}}),e._v(" "),t("dh-icon",{attrs:{viewBox:e.getViewBox(e.icon),icon:e.icon,color:e.iconColor}}),e._v(" "),e.objective.completed_at?t("dh-icon",{staticClass:"objective-completed circle",attrs:{viewBox:"-50 -50 70 70",icon:"check-circle"}}):e._e(),e._v(" "),e.objective.completed_at?t("dh-icon",{staticClass:"objective-completed check",attrs:{viewBox:"-50 -50 70 70",icon:"check"}}):e._e()],1)])])])}),[],!1,null,"55c26d44",null).exports,h={components:{ObjectiveIcon:_},mixins:[l.a,d.a],model:{prop:"visible",event:"change"},props:{roadmap:{type:Object,required:!0},objective:{type:Object,required:!0},color:{type:Array,required:!0},visible:{type:Boolean,default:!1}},computed:{cnt_comp_challenges:function(){return this.objective.challenges.filter((function(e){return e.completed_at})).length},cnt_comp_courses:function(){return this.objective.courses.filter((function(e){return e.completed_at})).length},cnt_comp_quizzes:function(){return this.objective.quizzes.filter((function(e){return e.completed_at})).length},cnt_completed:function(){return this.cnt_comp_challenges+this.cnt_comp_courses+this.cnt_comp_quizzes},cnt_entity:function(){return this.objective.challenges.length+this.objective.courses.length+this.objective.quizzes.length}},mounted:function(){var e=this;this.$nextTick((function(){var t=Number(e.$route.query.obj);isNaN(t)||t!==e.objective.id||e.$emit("select-stage")}))},methods:{onEntityClick:function(){this.setRecentRoadmap(this.roadmap),this.setRecentObjective(this.objective),this.clearRecentCurriculum(),this.clearRecentCycle(),this.$store.dispatch("roadmap/".concat(r.types.RECENT),this.roadmap)},entityUrl:function(e,t){return{name:{course:"lecture-courses-id",quiz:"learn-quiz-id",challenge:"wargame-challenges-id"}[e],params:{id:t}}}}},f=(o(4183),Object(m.a)(h,(function(){var e=this,t=e._self._c;return t("b-sidebar",{staticClass:"objective-sidebar",attrs:{visible:e.visible,backdrop:"",right:"",shadow:"","no-close-on-route-change":""},on:{change:function(t){return e.$emit("change",t)}}},[t("div",{staticClass:"sidebar-wrapper"},[t("div",{staticClass:"header"},[t("div",{staticClass:"icon-wrapper"},[t("objective-icon",{attrs:{objective:e.objective,color:e.color}})],1),e._v(" "),t("div",{staticClass:"objective-title"},[t("div",{staticClass:"title"},[e._v("\n          "+e._s(e.objective.title)+"\n        ")]),e._v(" "),e.objective.description?t("div",{staticClass:"description"},[e._v("\n          "+e._s(e.objective.description)+"\n        ")]):e._e()])]),e._v(" "),t("div",{staticClass:"content"},[t("div",{staticClass:"content-title"},[t("span",[e._v(e._s(e.$tc("roadmaps.objective",e.cnt_entity)))]),e._v(" "),t("span",{staticClass:"cnt"},[e._v(e._s(e.cnt_completed)+"/"+e._s(e.cnt_entity))])]),e._v(" "),t("b-overlay",{attrs:{show:!e.objective.is_accessible,variant:"transparent",opacity:"1",blur:"5px"},scopedSlots:e._u([{key:"overlay",fn:function(){return[t("div",{staticClass:"objective-overlay"},[t("i18n",{attrs:{tag:"span",path:"roadmaps.objectives.sidebar.overlay_msg"},scopedSlots:e._u([{key:"obj",fn:function(){return[t("b",[e._v(e._s(e.$t("global.formatting.all",{value:e.$t("roadmaps.objective")})))])]},proxy:!0}])})],1)]},proxy:!0}])},[t("div",{staticClass:"entity"},[e._l(e.objective.courses,(function(n){return[t("div",{key:"course-".concat(n.id)},[t("nuxt-link",{staticClass:"entity-box",attrs:{to:e.entityUrl("course",n.id)},nativeOn:{click:function(t){return e.onEntityClick.apply(null,arguments)}}},[t("div",{staticClass:"completed",style:n.completed_at?"background-image: linear-gradient(172deg, ".concat(e.color.join()," 100%);"):""}),e._v(" "),t("div",{staticClass:"inline-wrapper"},[t("dh-icon",{staticClass:"icon",attrs:{icon:"lecture"}}),e._v(" "),t("div",{staticClass:"entity-title"},[e._v("\n                    "+e._s(n.title)+"\n                  ")]),e._v(" "),n.completed_at?t("dh-icon",{staticClass:"icon-check",attrs:{icon:"check-circle"}}):e._e(),e._v(" "),!e.roadmap.is_purchased&&n.purchasable?t("div",{staticClass:"purchasable-info"},[n.purchasable.is_purchased?t("div",{staticClass:"content-purchased"},[e._v("\n                      "+e._s(e.$t("payments.purchased"))+"\n                    ")]):t("div",{staticClass:"coin-banner"},[t("img",{attrs:{src:o(1288)}}),e._v(" "),t("span",[e._v(e._s(e.$t("payments.formatting.coin_with_noun",{amount:n.purchasable.price})))])])]):e._e()],1)])],1)]})),e._v(" "),e._l(e.objective.quizzes,(function(o){return[t("div",{key:"quiz-".concat(o.id)},[t("nuxt-link",{staticClass:"entity-box",attrs:{to:e.entityUrl("quiz",o.id)},nativeOn:{click:function(t){return e.onEntityClick.apply(null,arguments)}}},[t("div",{staticClass:"completed",style:o.completed_at?"background-image: linear-gradient(172deg, ".concat(e.color.join()," 100%);"):""}),e._v(" "),t("div",{staticClass:"inline-wrapper"},[t("dh-icon",{staticClass:"icon",attrs:{icon:"comment-question"}}),e._v(" "),t("div",{staticClass:"entity-title"},[t("b",[e._v(e._s(o.title))])]),e._v(" "),o.completed_at?t("dh-icon",{staticClass:"icon-check",attrs:{icon:"check-circle"}}):e._e()],1)])],1)]})),e._v(" "),e._l(e.objective.challenges,(function(o){return[t("div",{key:"challenge-".concat(o.id)},[t("nuxt-link",{staticClass:"entity-box",attrs:{to:e.entityUrl("challenge",o.id)},nativeOn:{click:function(t){return e.onEntityClick.apply(null,arguments)}}},[t("div",{staticClass:"completed",style:o.completed_at?"background-image: linear-gradient(172deg, ".concat(e.color.join()," 100%);"):""}),e._v(" "),t("div",{staticClass:"inline-wrapper"},[t("dh-icon",{staticClass:"icon",attrs:{icon:"flag"}}),e._v(" "),t("div",{staticClass:"entity-title"},[t("b",[e._v(e._s(o.title))])]),e._v(" "),o.completed_at?t("dh-icon",{staticClass:"icon-check",attrs:{icon:"check-circle"}}):e._e()],1)])],1)]})),e._v(" "),e.objective.completed_at?t("div",{staticClass:"message"},[t("div",[e._v("\n              "+e._s(e.$t("roadmaps.objectives.sidebar.completed_msg1"))+"\n            ")]),e._v(" "),t("div",[e._v("\n              "+e._s(e.$t("roadmaps.objectives.sidebar.completed_msg2"))+"\n            ")])]):e._e()],2)])],1),e._v(" "),t("div",{staticClass:"footer"},[e.objective.completed_at?e._e():t("div",{staticClass:"suggestion"},[t("div",{staticClass:"message"},[t("div",[e.objective.challenges.length>0||e.objective.quizzes.length>0?[e._v("\n              "+e._s(e.$t("roadmaps.objectives.sidebar.suggestion_todo1"))+"\n            ")]:[e._v("\n              "+e._s(e.$t("roadmaps.objectives.sidebar.suggestion_todo2"))+"\n            ")]],2)])]),e._v(" "),t("div",{staticClass:"suggestion"},[t("div",{staticClass:"message"},[t("div",[t("b",[e._v(e._s(e.$t("roadmaps.objectives.sidebar.suggestion_forum1")))])]),e._v(" "),t("div",[e._v("\n            "+e._s(e.$t("roadmaps.objectives.sidebar.suggestion_forum2"))+"\n          ")])]),e._v(" "),t("nuxt-link",{attrs:{to:"/forum/qna"}},[t("b-button",{staticClass:"suggestion-button",attrs:{block:"",pill:"",variant:"outline-primary"}},[e._v("\n            "+e._s(e.$t("roadmaps.objectives.sidebar.move_forum"))+"\n          ")])],1)],1)])])])}),[],!1,null,"0006f075",null));function j(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}var y={components:{ObjectiveSidebar:f.exports,ObjectiveIcon:_},props:{grandParent:{type:Object,required:!0},parent:{type:Object,required:!0},objective:{type:Object,required:!0}},data:function(){return{sidebar:!1}},computed:{roadmapColorset:function(){return Object(n.w)(this.grandParent.tags)}},watch:{sidebar:function(e){var t=function(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?j(Object(o),!0).forEach((function(t){Object(c.a)(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):j(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}({},this.$route.query);e?t.obj=this.objective.id:delete t.obj,this.pushRouteQuery(t)}},created:function(){this.$route.query.obj===this.objective.id.toString()&&(this.sidebar=!0)},methods:{pushRouteQuery:function(e){this.$router.push({path:this.$route.path,hash:this.$route.hash,query:e})}}},k=y,C=(o(4184),{components:{Objective:Object(m.a)(k,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"objective"},[t("div",{staticClass:"wrapper",on:{click:function(t){e.sidebar=!0}}},[t("div",{staticClass:"icon"},[t("objective-icon",{attrs:{objective:e.objective,color:e.roadmapColorset}})],1),e._v(" "),t("div",{staticClass:"title",class:{inaccessible:!e.objective.is_accessible}},[e._v("\n      "+e._s(e.objective.title)+"\n    ")]),e._v(" "),e.objective.description?t("div",{staticClass:"description"},[e._v("\n      "+e._s(e.objective.description)+"\n    ")]):e._e()]),e._v(" "),e.parent.is_accessible?t("objective-sidebar",{attrs:{roadmap:e.grandParent,objective:e.objective,color:e.roadmapColorset},on:{"select-stage":function(t){return e.$emit("select-stage")}},model:{value:e.sidebar,callback:function(t){e.sidebar=t},expression:"sidebar"}}):e._e()],1)}),[],!1,null,"6fb8df59",null).exports,MilestoneIcon:o(2076).a},props:{parent:{type:Object,required:!0},milestone:{type:Object,required:!0},admin:{type:Boolean,default:!1}},data:function(){return{isHovered:!1,collapse:!1,isPurchasePopupOpened:!1}},computed:{objectiveSorted:function(){return 0===this.milestone.objectives.length?[]:this.milestone.objectives.reduce((function(e,t){var o="level";return Object.prototype.hasOwnProperty.call(t,o)&&(Array.prototype.hasOwnProperty.call(e,t[o]-1)||(e[t[o]-1]=[]),e[t[o]-1].push(t)),e}),[])},roadmapColorset:function(){return Object(n.w)(this.parent.tags)},percentage:function(){return void 0===this.milestone.comp_objectives?0:this.milestone.comp_objectives/this.milestone.cnt_objectives*100},milestoneIcon:function(){return this.milestone.completed_at?"check":this.milestone.is_accessible?"pencil":"lock"},totalContentCount:function(){return this.milestone.objectives.reduce((function(e,t){return e+t.courses.length+t.quizzes.length+t.challenges.length}),0)}},created:function(){var e=this;(null===this.milestone.completed_at&&this.milestone.is_accessible||void 0===this.milestone.completed_at&&1===this.milestone.level||this.milestone.objectives.some((function(t){return t.id.toString()===e.$route.query.obj})))&&(this.collapse=!0)},methods:{handleHover:function(e){this.isHovered=e},milestonePurchase:function(){this.isPurchasePopupOpened=!0},onClose:function(){this.isPurchasePopupOpened=!1}}}),w=(o(4185),{components:{Milestone:Object(m.a)(C,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"milestone",class:{completed:e.milestone.completed_at,incompleted:!e.milestone.completed_at},attrs:{id:"stage-".concat(e.milestone.level)}},[t("div",{staticClass:"milestone-title",class:{collapsed:e.collapse},style:{backgroundImage:e.milestone.completed_at?"linear-gradient(96deg, ".concat(e.roadmapColorset.join()," 100%)"):""},on:{click:function(t){e.collapse=!e.collapse}}},[t("div",{staticClass:"title-left"},[t("milestone-icon",{staticClass:"milestone-icon",attrs:{size:2.5,icon:e.milestoneIcon}})],1),e._v(" "),t("div",{staticClass:"title-center"},[t("div",{staticClass:"milestone-span pc"},[t("span",{staticClass:"span-level"},[t("b",[e._v("STAGE "+e._s(e.milestone.level))])]),e._v(" "),e.milestone.title?t("span",{staticClass:"span-title"},[e._v(e._s(e.milestone.title))]):e._e(),e._v(" "),t("span",[e._v("("+e._s(e.milestone.comp_objectives||0)+"/"+e._s(e.milestone.objectives.length)+")")])]),e._v(" "),t("div",{staticClass:"milestone-span mobile"},[t("div",[t("span",{staticClass:"span-level"},[t("b",[e._v("STAGE "+e._s(e.milestone.level))])]),e._v(" "),t("span",[e._v("("+e._s(e.milestone.comp_objectives||0)+"/"+e._s(e.milestone.objectives.length)+")")])]),e._v(" "),e.milestone.title?t("div",{staticClass:"span-title"},[e._v(e._s(e.milestone.title))]):e._e()])]),e._v(" "),t("div",{staticClass:"title-right",class:{collapsed:e.collapse}},[t("dh-icon",{staticClass:"angle",attrs:{icon:"angle-down"}})],1)]),e._v(" "),t("div",{staticClass:"milestone-progress",style:{clipPath:"polygon(0% 50%, ".concat(e.percentage,"% 50%, ").concat(e.percentage,"% 100%, 0% 100%)"),backgroundImage:"linear-gradient(96deg, ".concat(e.roadmapColorset.join()," 100%)")}}),e._v(" "),t("b-collapse",{model:{value:e.collapse,callback:function(t){e.collapse=t},expression:"collapse"}},[t("b-overlay",{directives:[{name:"b-hover",rawName:"v-b-hover",value:e.handleHover,expression:"handleHover"}],staticClass:"milestone-inner",attrs:{show:e.isHovered&&!e.milestone.is_accessible,variant:"transparent",opacity:"1",blur:"3px"},scopedSlots:e._u([{key:"overlay",fn:function(){return[1===e.milestone.level?[e.parent.is_enrollable?t("div",{staticClass:"milestone-overlay start",on:{click:function(t){return e.$emit("enroll")}}},[e._v("\n            "+e._s(e.$t("roadmaps.milestones.enroll_roadmap"))+"\n          ")]):t("div",{staticClass:"milestone-overlay"},[e._v("\n            "+e._s(e.$t("roadmaps.milestones.prerequisite_roadmap_msg"))+"\n          ")])]:t("div",{staticClass:"milestone-overlay"},[t("i18n",{attrs:{path:"roadmaps.milestones.prerequisite_milestone_msg",tag:"span"},scopedSlots:e._u([{key:"level",fn:function(){return[t("b",[e._v("STAGE "+e._s(e.milestone.level-1))])]},proxy:!0}])})],1)]},proxy:!0}])},e._l(e.objectiveSorted,(function(o,n){return t("b-row",{key:n,staticClass:"milestone-row"},e._l(o,(function(o,n){return t("objective",{key:n,attrs:{objective:o,parent:e.milestone,"grand-parent":e.parent},on:{"select-stage":function(t){return e.$emit("select-stage",e.milestone.id)}}})})),1)})),1)],1)],1)}),[],!1,null,"e018ee26",null).exports,ErrorSearchNoResult:o(1219).a},props:{roadmap:{type:Object,required:!0},admin:{type:Boolean,default:!1}},data:function(){return{stage:void 0}},watch:{stage:function(){this.scroll()}},methods:{setStage:function(e){this.stage=e},scroll:function(){this.$refs["milestone-".concat(this.stage)][0].$el.scrollIntoView()}}}),x=Object(m.a)(w,(function(){var e=this,t=e._self._c;return t("div",[0===e.roadmap.milestones.length?[t("error-search-no-result",{attrs:{"print-text":e.$t("roadmaps.errors.no_data")}})]:e._l(e.roadmap.milestones,(function(o,n){return t("div",{key:n},[t("milestone",{ref:"milestone-".concat(o.id),refInFor:!0,attrs:{milestone:o,parent:e.roadmap,admin:e.admin},on:{enroll:function(t){return e.$emit("enroll")},"on-purchase":function(t){return e.$emit("on-purchase")},"select-stage":e.setStage}})],1)}))],2)}),[],!1,null,null,null);t.a=x.exports},4182:function(e,t,o){"use strict";o(2748)},4183:function(e,t,o){"use strict";o(2749)},4184:function(e,t,o){"use strict";o(2750)},4185:function(e,t,o){"use strict";o(2751)}}]);