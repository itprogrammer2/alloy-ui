YUI.add("aui-layout-builder-move",function(e,t){function d(){}var n=e.getClassName("layout","builder","move","cancel"),r=e.getClassName("layout","builder","move","col","target"),i=e.getClassName("layout","builder","move","cut","button"),s=e.getClassName("layout","builder","move","cut","row","button"),o=e.getClassName("layout","builder","move","cut","col","button"),u=e.getClassName("layout","builder","move","row","target"),a=e.getClassName("layout","builder","move","target"),f=e.getClassName("layout","row","container","row"),l=".col",c=".layout-row",h='<div class="'+i+'" tabindex="2"></div>',p='<div class="'+a+'" tabindex="3">Move</div>';d.prototype={_colToBeMoved:null,_rowToBeMoved:null,initializer:function(){this._eventHandles.push(this.after("enableMoveColsChange",e.bind(this._afterEnableMoveColsChange,this)),this.after("enableMoveRowsChange",e.bind(this._afterEnableMoveRowsChange,this)),this.after("layout-row:colsChange",e.bind(this._afterMoveColsChange,this)),this.after("layout-row:movableChange",e.bind(this._afterMoveMovableChange,this)),this.after("layout:rowsChange",e.bind(this._afterMoveRowsChange,this)),this.after("layout:isColumnModeChange",e.bind(this._afterMoveIsColumnModeChange,this)),this.after("layoutChange",e.bind(this._afterMoveLayoutChange,this))),this._uiSetEnableMoveRows(this.get("enableMoveRows")),this._uiSetEnableMoveCols(this.get("enableMoveCols"))},destructor:function(){this._unbindMoveColEvents(),this._unbindMoveRowEvents()},cancelMove:function(){this._resetMoveUI()},_addColMoveButton:function(t,n){var r=e.Node.create(h);r.setData("node-row",n),r.setData("node-col",t),r.addClass(o),t.append(r)},_addColMoveTarget:function(t,n){var i=e.Node.create(p);i.setData("col-index",n),i.addClass(r),t.get("node").append(i)},_afterEnableMoveColsChange:function(){this._resetMoveUI()},_afterEnableMoveRowsChange:function(){this._resetMoveUI()},_afterMoveMovableChange:function(e){var t=e.target.get("node");e.newVal?this._insertCutButtonOnRow(t.one(c)):this._removeCutButtonFromRow(t)},_afterMoveColsChange:function(){this._resetMoveUI()},_afterMoveIsColumnModeChange:function(e){var t=this,n=this._layoutContainer.all(c);e.newVal?n.each(function(e){t._hasAnythingMovable(e)&&t._insertCutButtonOnCols(e)}):this.get("removeColMoveButtons")()},_afterMoveLayoutChange:function(){this._resetMoveUI()},_afterMoveRowsChange:function(){this._resetMoveUI()},_appendMoveButtonToRows:function(){var e=this,t=this._layoutContainer.all(c);t.each(function(t){e._hasAnythingMovable(t)&&e._insertCutButtonOnRow(t)})},_appendMoveButtonToCols:function(){var e=this,t=this._layoutContainer.all(c);t.each(function(t){e._hasAnythingMovable(t)&&e._insertCutButtonOnCols(t)})},_bindMoveColEvents:function(){var t="."+i+"."+o,n="."+a+"."+r;this._moveColEventHandles=[this._layoutContainer.delegate("click",e.bind(this._onMouseClickOnMoveCutButton,this),t),this._layoutContainer.delegate("key",e.bind(this._onKeyPressOnMoveCutButton,this),"press:13",t),this._layoutContainer.delegate("click",e.bind(this._onMouseClickOnMoveTarget,this),n),this._layoutContainer.delegate("key",e.bind(this._onKeyPressOnMoveTarget,this),"press:13",n)]},_bindMoveRowEvents:function(){var t="."+i+"."+s,n="."+a+"."+u;this._moveRowEventHandles=[this._layoutContainer.delegate("click",e.bind(this._onMouseClickOnMoveCutButton,this),t),this._layoutContainer.delegate("key",e.bind(this._onKeyPressOnMoveCutButton,this),"press:13",t),this._layoutContainer.delegate("click",e.bind(this._onMouseClickOnMoveTarget,this),n),this._layoutContainer.delegate("key",e.bind(this._onKeyPressOnMoveTarget,this),"press:13",n)]},_chooseColMoveTarget:function(t,n){var r=this,i=this.get("layout").get("rows");this._colToBeMoved=n,e.Array.forEach(i,function(t){e.Array.forEach(t.get("cols"),function(e,t){e!==r._colToBeMoved&&r.get("addColMoveTarget")(e,t)})})},_clickColMoveTarget:function(e){var t=e.ancestor(c).getData("layout-row");this._resetMoveUI(),t.moveColContent(e.getData("col-index"),this._colToBeMoved)},_clickOnCutButton:function(e){this._rowToBeMoved=e.getData("layout-row"),this._removeAllCutButton(e);if(e.hasClass(n)){e.toggleClass(n),this.cancelMove();return}e.toggleClass(n),e.hasClass(s)?this._createRowTargetArea():this.get("chooseColMoveTarget")(e,e.getData("node-col").getData("layout-col"))},_createRowTargetArea:function(){this._createRowTargetAreaInOneDirection("before"),this._createRowTargetAreaInOneDirection("after")},_createRowTargetAreaInOneDirection:function(t){var n,r=e.Array.indexOf(this.get("layout").get("rows"),this._rowToBeMoved),i,s=t==="before"?"previous":"next",o;n=this._rowToBeMoved.get("node")[s]("."+f);while(n){i=n.one(c),t==="before"?r-=1:r+=1;if(!i.getData("layout-row").get("movable"))break;o=e.Node.create(p),o.addClass(u),o.setData("row-index",r),n.insert(o,t),n=n[s]("."+f)}},_hasAnythingMovable:function(e){var t,n,r=e.getData("layout-row");if(r.get("movable"))return!0;n=r.get("cols");for(t=0;t<n.length;t++)if(n[t].get("movableContent"))return!0;return!1},_insertCutButtonOnCols:function(e){var t=this,n,r,i=this._layoutContainer.all(c);n=e.all(l);if(!this.get("layout").get("isColumnMode"))return;if(n.size()===1&&i.size()===1)return;n.each(function(n){r=n.getData("layout-col"),r.get("movableContent")&&t.get("addColMoveButton")(n,e)})},_insertCutButtonOnRow:function(t){var n=e.Node.create(h),r=t.getData("layout-row"),i=this._layoutContainer.all(c);if(i.size()===1)return;if(!r.get("movable"))return;n.addClass(s),n.setData("node-row",t),n.setData("layout-row",r),this._layoutContainer.insertBefore(n,t)},_moveToTarget:function(e){var t=this.get("layout"),n=e.currentTarget;n.hasClass(r)?this.get("clickColMoveTarget")(n):t.moveRow(n.getData("row-index"),this._rowToBeMoved)},_onKeyPressOnMoveCutButton:function(e){this._clickOnCutButton(e.currentTarget)},_onMouseClickOnMoveCutButton:function(e){e.stopPropagation(),this._clickOnCutButton(e.currentTarget)},_onKeyPressOnMoveTarget:function(e){this._moveToTarget(e)},_onMouseClickOnMoveTarget:function(e){this._moveToTarget
(e)},_removeAllCutButton:function(e){var t=this._layoutContainer.all("."+s);this.get("removeColMoveButtons")(e),t.each(function(t){t!==e&&t.remove()})},_removeColMoveButtons:function(e){var t=this._layoutContainer.all("."+o);t.each(function(t){t!==e&&t.remove()})},_removeColMoveTargets:function(){this._layoutContainer.all("."+r).remove()},_removeCutButtonFromRow:function(e){e.one("."+s).remove()},_removeTargetArea:function(){this._layoutContainer.all("."+u).remove(),this.get("removeColMoveTargets")()},_resetMoveUI:function(){this._removeAllCutButton(),this._removeTargetArea(),this._unbindMoveColEvents(),this._unbindMoveRowEvents(),this._uiSetEnableMoveCols(this.get("enableMoveCols")),this._uiSetEnableMoveRows(this.get("enableMoveRows"))},_uiSetEnableMoveCols:function(e){e?(this._appendMoveButtonToCols(),this._bindMoveColEvents()):this._unbindMoveColEvents()},_uiSetEnableMoveRows:function(e){e?(this._appendMoveButtonToRows(),this._bindMoveRowEvents()):this._unbindMoveRowEvents()},_unbindMoveColEvents:function(){this._moveColEventHandles&&(new e.EventHandle(this._moveColEventHandles)).detach()},_unbindMoveRowEvents:function(){this._moveRowEventHandles&&(new e.EventHandle(this._moveRowEventHandles)).detach()}},d.ATTRS={addColMoveButton:{validator:e.Lang.isFunction,valueFn:function(){return e.bind(this._addColMoveButton,this)}},addColMoveTarget:{validator:e.Lang.isFunction,valueFn:function(){return e.bind(this._addColMoveTarget,this)}},chooseColMoveTarget:{validator:e.Lang.isFunction,valueFn:function(){return e.bind(this._chooseColMoveTarget,this)}},clickColMoveTarget:{validator:e.Lang.isFunction,valueFn:function(){return e.bind(this._clickColMoveTarget,this)}},enableMoveCols:{validator:e.Lang.isBoolean,value:!0},enableMoveRows:{validator:e.Lang.isBoolean,value:!0},removeColMoveButtons:{validator:e.Lang.isFunction,valueFn:function(){return e.bind(this._removeColMoveButtons,this)}},removeColMoveTargets:{validator:e.Lang.isFunction,valueFn:function(){return e.bind(this._removeColMoveTargets,this)}}},e.LayoutBuilderMove=d},"3.0.3-deprecated.5",{requires:["aui-node-base","base-build"],skinnable:!0});
