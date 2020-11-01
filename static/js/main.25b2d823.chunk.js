(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,function(e,t,a){e.exports=a(30)},,,,,,function(e,t,a){},,function(e,t,a){},,function(e,t,a){},,function(e,t,a){},,function(e,t,a){},,function(e,t,a){},,function(e,t,a){},,function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),s=a(9),r=a.n(s),i=(a(16),a(1)),o=a(2),c=a(5),u=a(4),m=a(6),d=a(7),h=a(3),v=(a(18),a(20),a(22),function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(o.a)(t,[{key:"renderSquare",value:function(e){var t=this,a="square";return this.props.grid[e.x][e.y]||(a+=" empty"),l.a.createElement("div",{className:a,key:e.x+e.y,onClick:function(a){return t.props.handleCellClick(e)}},this.props.grid[e.x][e.y])}},{key:"render",value:function(){var e,t=this;return e=this.props.grid.map(function(e,a){var n=e.map(function(e,n){return t.renderSquare({x:a,y:n})});return l.a.createElement("div",{className:"board-row",key:a},n)}),l.a.createElement("div",{className:"board"},e)}}]),t}(n.Component)),g=function(e,t){return Object(h.a)(Array(t+1).keys()).slice(e)};function f(e){var t=new Date(null);return t.setSeconds(e),t.toISOString().substr(14,5)}var p=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).isAValidGridCell=function(e){return function(t){return t.x>=0&&t.y>=0&&t.x<e.length&&t.y<e.length}},a.reset=function(){a.setState(a.getInitialPuzzleState(a.props.size),function(e){a.props.onReset({duration:a.state.duration,movesCount:a.state.movesCount})}),clearInterval(a.interval),a.interval=null},a.handleCellClick=function(e){var t,n,l=a.state.grid,s=a.state.gameWon;a.interval||(a.interval=setInterval(function(){return a.tick()},1e3),a.props.onStart({grid:(n=l,JSON.parse(JSON.stringify(n)))})),s||(t=a.findEmptyCellAmong(a.getNeighbourCells(e,l),l))&&(l=a.slideCell(e,t,l),a.isGridOrdered(l)&&(s=!0,clearInterval(a.interval)),a.setState({grid:l,movesCount:a.state.movesCount+1,gameWon:s},function(e){a.state.gameWon&&a.props.onSolved({duration:a.state.duration,movesCount:a.state.movesCount})}))},a.state=a.getInitialPuzzleState(e.size),a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"getInitialPuzzleState",value:function(e){return{grid:this.makeShuffledGrid(e),duration:0,movesCount:0,gameWon:!1}}},{key:"makeGrid",value:function(e,t){return Array(e).fill(null).map(function(a,n){var l=n*e,s=l+e;return t.slice(l,s)})}},{key:"makeInitialGrid",value:function(e){return this.makeGrid(e,[].concat(Object(h.a)(g(1,Math.pow(e,2)-1)),[null]))}},{key:"makeShuffledGrid",value:function(e){var t=this.makeGrid(e,[].concat(Object(h.a)(function e(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=Math.floor(Math.random()*t.length);return a.length===t.length?a:(a.includes(t[n])||a.push(t[n]),e(t,a))}(g(1,Math.pow(e,2)-1))),[null]));return this.isGridWinnable(t)?t:this.makeShuffledGrid(e)}},{key:"isGridWinnable",value:function(e){return e.reduce(function(e,t){return[].concat(Object(h.a)(e),Object(h.a)(t))}).filter(function(e){return null!==e}).reduce(function(e,t,a,n){return e+n.slice(a).filter(function(e){return e<t}).length},0)%2===0}},{key:"isGridOrdered",value:function(e){var t=e.length;return function(e){var t=0,a=1,n=!0;do{if(!(n=e[t]<e[a]))return!1;t++,a++}while(a<e.length);return n}(e.reduce(function(e,t){return[].concat(Object(h.a)(e),Object(h.a)(t))}).filter(function(e){return null!==e}))&&null===e[t-1][t-1]}},{key:"getNeighbourCells",value:function(e,t){return e=Object(d.a)({},e),t=Object(h.a)(t),[{x:e.x-1,y:e.y},{x:e.x+1,y:e.y},{x:e.x,y:e.y-1},{x:e.x,y:e.y+1}].filter(this.isAValidGridCell(t))}},{key:"getNeighbours",value:function(e,t){var a=this;return e=Object(d.a)({},e),t=Object(h.a)(t),[{cell:{x:e.x,y:e.y-1},position:"left"},{cell:{x:e.x,y:e.y+1},position:"right"},{cell:{x:e.x-1,y:e.y},position:"top"},{cell:{x:e.x+1,y:e.y},position:"down"}].filter(function(e){return a.isAValidGridCell(t)(e.cell)})}},{key:"findEmptyCellAmong",value:function(e,t){return e.find(function(e){return null===t[e.x][e.y]})}},{key:"findEmptyCellOnGrid",value:function(e){var t;return{x:t=e.findIndex(function(e){return e.includes(null)}),y:e[t].findIndex(function(e){return null===e})}}},{key:"swapCellValues",value:function(e,t,a){var n=(a=Object(h.a)(a))[e.x][e.y];return a[e.x][e.y]=a[t.x][t.y],a[t.x][t.y]=n,a}},{key:"slideCell",value:function(e,t,a){return this.swapCellValues(e,t,a)}},{key:"moveEmptyCellTo",value:function(e){if(e){var t=this.state.grid,a=this.findEmptyCellOnGrid(t),n=this.getNeighbours(a,t).find(function(t){return t.position===e});n&&this.handleCellClick(n.cell)}}},{key:"slideTo",value:function(e){this.moveEmptyCellTo({top:"down",down:"top",left:"right",right:"left"}[e])}},{key:"tick",value:function(){this.setState(function(e){return{duration:e.duration+1}})}},{key:"render",value:function(){return l.a.createElement("div",{className:this.props.theme},l.a.createElement(v,{grid:this.state.grid,handleCellClick:this.handleCellClick}),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("div",{className:"stats-board"},l.a.createElement("div",{className:"stat"},l.a.createElement("svg",{width:"20",height:"19",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"},l.a.createElement("path",{d:"M17 16a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4.01V4a1 1 0 0 1 1-1 1 1 0 0 1 1 1v6h1V2a1 1 0 0 1 1-1 1 1 0 0 1 1 1v8h1V1a1 1 0 1 1 2 0v9h1V2a1 1 0 0 1 1-1 1 1 0 0 1 1 1v13h1V9a1 1 0 0 1 1-1h1v8z"})),l.a.createElement("span",{className:"stat-label"},this.state.movesCount)),l.a.createElement("div",{className:"stat"},l.a.createElement("svg",{width:"20",height:"20",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"},l.a.createElement("path",{d:"M16.32 7.1A8 8 0 1 1 9 4.06V2h2v2.06c1.46.18 2.8.76 3.9 1.62l1.46-1.46 1.42 1.42-1.46 1.45zM10 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM7 0h6v2H7V0zm5.12 8.46l1.42 1.42L10 13.4 8.59 12l3.53-3.54z"})),l.a.createElement("span",{className:"stat-label"},f(this.state.duration)))),this.state.gameWon?l.a.createElement("div",{className:"center pt-30"},l.a.createElement("div",{className:"roman-ribbon ooz-in"},l.a.createElement("span",null,"Puzzle Solved"))):null,l.a.createElement("div",{className:"center pt-30"},l.a.createElement("button",{className:"btn",onClick:this.reset},"Shuffle")))}},{key:"componentDidUpdate",value:function(e,t,a){this.props.slide.timestamp!==e.slide.timestamp&&this.slideTo(this.props.slide.direction)}}]),t}(n.Component),y=(a(24),function(){function e(){Object(i.a)(this,e)}return Object(o.a)(e,[{key:"get",value:function(e,t){return JSON.parse(localStorage.getItem(e))||t}},{key:"set",value:function(e,t){localStorage.setItem(e,JSON.stringify(t))}}]),e}()),b=function(){function e(){Object(i.a)(this,e),this.storage=new y}return Object(o.a)(e,[{key:"get",value:function(){var e=this.storage.get("userSettings",{});return e.hasOwnProperty("darkMode")||(e.darkMode=!1),e.hasOwnProperty("theme")||(e.theme="mud"),e}},{key:"set",value:function(e){var t=this.get();return e.hasOwnProperty("darkMode")&&(t.darkMode=e.darkMode),e.hasOwnProperty("theme")&&(t.theme=e.theme),this.storage.set("userSettings",t),t}}]),e}(),E=function(){function e(){Object(i.a)(this,e),this.wrap=function(e){return function(t){return e(t)}},this.timeFormatter=this.wrap(this.forHumans),this.storage=new y,this.gamePlays=this.storage.get("gamePlays",[])}return Object(o.a)(e,[{key:"sync",value:function(){this.gamePlays=this.storage.get("gamePlays",[])}},{key:"getAll",value:function(){var e=this.getTotalGamePlays(),t=this.getTotalTimeSpend(),a=this.getTotalMovesCount();return{totalGamePlays:e,totalMoves:a,totalTimeSpendStr:this.timeFormatter(t),averageMoves:0!==e?Math.floor(a/e):0,averageTimeStr:0!==e?f(Math.floor(t/e)):"00:00"}}},{key:"getTotalTimeSpend",value:function(){return this.gamePlays.reduce(function(e,t){return e+t.duration},0)}},{key:"getTotalTimeSpendHumanStr",value:function(){return this.timeFormatter(this.getTotalTimeSpend())}},{key:"getTotalGamePlays",value:function(){return this.gamePlays.length}},{key:"getTotalMovesCount",value:function(){return this.gamePlays.reduce(function(e,t){return e+t.movesCount},0)}},{key:"forHumans",value:function(e){var t=[[Math.floor(e/31536e3),"years"],[Math.floor(e%31536e3/86400),"days"],[Math.floor(e%31536e3%86400/3600),"hrs"],[Math.floor(e%31536e3%86400%3600/60),"mins"],[e%31536e3%86400%3600%60,"secs"]],a="";0!==t[1][0]?t.splice(-2,2):0!==t[2][0]&&t.splice(-1);for(var n=0,l=t.length;n<l;n++)0!==t[n][0]&&(a+=" "+t[n][0]+" "+(1===t[n][0]?t[n][1].substr(0,t[n][1].length-1):t[n][1]));return a.trim()}}]),e}(),w=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).changeTheme=function(e){a.setState({theme:e.target.value},function(e){a.props.onUserSettingsChanged(a.userSettings.set(a.state))})},a.toggleDarkMode=function(e){a.setState({darkMode:!a.state.darkMode},function(e){a.props.onUserSettingsChanged(a.userSettings.set(a.state))})},a.userSettings=new b,a.stats=new E,a.state=Object(d.a)({},a.userSettings.get(),{currentTab:0},a.stats.getAll()),a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"loadStatsData",value:function(){this.stats.sync(),this.setState(Object(d.a)({},this.stats.getAll()))}},{key:"render",value:function(){var e=this,t=this.props.show?"modal display-block":"modal display-none";return l.a.createElement("div",{className:t},l.a.createElement("section",{className:"modal-main"},l.a.createElement("div",{className:"header"},l.a.createElement("h2",{className:"heading"},"Settings"),l.a.createElement("div",{className:"close",onClick:this.props.onClose},l.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"black",width:"24px",height:"24px"},l.a.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}),l.a.createElement("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"})))),l.a.createElement("div",{className:"tablist"},l.a.createElement("button",{id:"one-tab",role:"tab","aria-selected":0===this.state.currentTab,"aria-controls":"one",tabIndex:"0",onClick:function(t){return e.setState({currentTab:0})},className:"tab"},"General"),l.a.createElement("button",{id:"two-tab",role:"tab","aria-selected":1===this.state.currentTab,"aria-controls":"two",tabIndex:"1",onClick:function(t){return e.setState({currentTab:1})},className:"tab"},"Stats")),l.a.createElement("br",null),l.a.createElement("div",{className:"tab-panels"},l.a.createElement("div",{role:"tabpanel","aria-expanded":0===this.state.currentTab,"aria-hidden":"false","aria-labelledby":"one-tab",className:"tab-panel"},l.a.createElement("div",{className:"setting"},l.a.createElement("div",{className:"setting-title"},"Themes"),l.a.createElement("select",{name:"theme",value:this.state.theme,onChange:this.changeTheme,id:"theme-select"},l.a.createElement("option",{value:"aqua"},"Aqua"),l.a.createElement("option",{value:"sky"},"Sky"),l.a.createElement("option",{value:"chocolate"},"Chocolate"),l.a.createElement("option",{value:"oreo"},"Oreo"),l.a.createElement("option",{value:"mud"},"Mud"),l.a.createElement("option",{value:"iron-man"},"Iron Man"),l.a.createElement("option",{value:"cadbury"},"Cadbury"),l.a.createElement("option",{value:"forest"},"Forest"))),l.a.createElement("div",{className:"setting"},l.a.createElement("div",{className:"setting-title"},"Dark Mode"),l.a.createElement("label",{className:"switch"},l.a.createElement("input",{type:"checkbox",checked:this.state.darkMode,onChange:this.toggleDarkMode}),l.a.createElement("span",{className:"slider"}))))),l.a.createElement("div",{role:"tabpanel","aria-expanded":1===this.state.currentTab,"aria-hidden":"true","aria-labelledby":"two-tab",className:"tab-panel"},l.a.createElement("div",{className:"stat-box"},l.a.createElement("div",null,l.a.createElement("div",{className:"val"},this.state.totalGamePlays),l.a.createElement("div",{className:"name"},"Game Plays")),l.a.createElement("div",null,l.a.createElement("div",{className:"val"},this.state.totalMoves),l.a.createElement("div",{className:"name"},"Moves"))),l.a.createElement("div",{className:"stat-box"},l.a.createElement("div",null,l.a.createElement("div",{className:"val"},this.state.totalTimeSpendStr),l.a.createElement("div",{className:"name"},"Time Spend"))),l.a.createElement("div",{className:"divider"}),l.a.createElement("div",{className:"section"},l.a.createElement("div",{className:"text-center"},"Average"),l.a.createElement("div",{className:"stat-box"},l.a.createElement("div",null,l.a.createElement("div",{className:"val"},this.state.averageMoves),l.a.createElement("div",{className:"name"},"Moves")),l.a.createElement("div",null,l.a.createElement("div",{className:"val"},this.state.averageTimeStr),l.a.createElement("div",{className:"name"},"Time")))))))}},{key:"componentDidUpdate",value:function(e,t,a){this.props.prevGameSolvedTimestamp!==e.prevGameSolvedTimestamp&&this.loadStatsData()}}]),t}(n.Component),S=(a(26),a(28),function(e){function t(e){var a;Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).handleStart=function(e){a.setState({isGamePlaying:!0})},a.handleReset=function(e){a.setState({isGamePlaying:!1,recordSmashed:!1})},a.handleSolved=function(e){var t=a.state.bestPlay,n=a.getBestGamePlay(a.saveGamePlay(e));if(n){var l=!!t&&!function(e,t){var a=Object.getOwnPropertyNames(e),n=Object.getOwnPropertyNames(t);if(a.length!==n.length)return!1;for(var l=0;l<a.length;l++){var s=a[l];if(e[s]!==t[s])return!1}return!0}(t,n);a.setState({bestPlay:n,isGamePlaying:!1,recordSmashed:l,prevGameSolvedTimestamp:Date.now()})}},a.showModal=function(){a.setState({showSettingsPanel:!0})},a.hideModal=function(){a.setState({showSettingsPanel:!1})},a.handleUserSettingsChange=function(e){a.setState({userSettings:e})},a.storage=new y,a.userSettings=new b;var n=a.getBestGamePlay(a.storage.get("gamePlays",[])),l=a.userSettings.get();return a.state={userSettings:l,showSettingsPanel:!1,bestPlay:n,isGamePlaying:!1,recordSmashed:!1,puzzleSlide:{direction:null,timestamp:null},prevGameSolvedTimestamp:null},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"saveGamePlay",value:function(e){var t=this.storage.get("gamePlays",[]);return t.push(e),this.storage.set("gamePlays",t),t}},{key:"sortGamePLays",value:function(e){return e.slice().sort(function(e,t){return e.duration-t.duration||e.moveCounts-t.moveCounts})}},{key:"getBestGamePlay",value:function(e){return this.sortGamePLays(e)[0]||null}},{key:"componentDidMount",value:function(){window.addEventListener("keydown",this.handleKeydown.bind(this))}},{key:"componentWillUnmount",value:function(){window.removeEventListener("keydown",this.handleKeydown.bind(this))}},{key:"handleKeydown",value:function(e){var t={39:"right",37:"left",38:"top",40:"down",87:"top",65:"left",83:"down",68:"right"}[e.keyCode];t&&this.setState({puzzleSlide:{direction:t,timestamp:Date.now()}})}},{key:"render",value:function(){var e=null;if(this.state.bestPlay){var t="best";this.state.isGamePlaying||(t+=" highlight"),this.state.recordSmashed&&(t+=" flash"),e=l.a.createElement("div",{className:t},l.a.createElement("div",{className:"flex-content-space-between"},l.a.createElement("div",{className:"flex-align-center"},l.a.createElement("svg",{width:"15",height:"14",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"},l.a.createElement("path",{d:"M15 9a3 3 0 0 0 3-3h2a5 5 0 0 1-5.1 5 5 5 0 0 1-3.9 3.9V17l5 2v1H4v-1l5-2v-2.1A5 5 0 0 1 5.1 11H5a5 5 0 0 1-5-5h2a3 3 0 0 0 3 3V4H2v2H0V2h5V0h10v2h5v4h-2V4h-3v5z"})),l.a.createElement("span",{className:"best-stat-label"},"Best")),l.a.createElement("div",{className:"flex-align-center"},l.a.createElement("svg",{width:"15",height:"15",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"},l.a.createElement("path",{d:"M17 16a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4.01V4a1 1 0 0 1 1-1 1 1 0 0 1 1 1v6h1V2a1 1 0 0 1 1-1 1 1 0 0 1 1 1v8h1V1a1 1 0 1 1 2 0v9h1V2a1 1 0 0 1 1-1 1 1 0 0 1 1 1v13h1V9a1 1 0 0 1 1-1h1v8z"})),l.a.createElement("span",{className:"best-stat-label"},this.state.bestPlay.movesCount)),l.a.createElement("div",{className:"flex-align-center"},l.a.createElement("svg",{width:"15",height:"15",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"},l.a.createElement("path",{d:"M16.32 7.1A8 8 0 1 1 9 4.06V2h2v2.06c1.46.18 2.8.76 3.9 1.62l1.46-1.46 1.42 1.42-1.46 1.45zM10 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM7 0h6v2H7V0zm5.12 8.46l1.42 1.42L10 13.4 8.59 12l3.53-3.54z"})),l.a.createElement("span",{className:"best-stat-label"},f(this.state.bestPlay.duration)))))}return l.a.createElement("div",{id:"app",className:this.state.userSettings.darkMode?"dark-side":""},l.a.createElement("div",{className:"container"},l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("div",{className:"flex-content-space-between"},l.a.createElement("div",{className:"title"},l.a.createElement("span",{onDoubleClick:this.showModal},"15")," Puzzle"),e),l.a.createElement("br",null),l.a.createElement(p,{size:4,theme:this.state.userSettings.theme,slide:this.state.puzzleSlide,onStart:this.handleStart,onReset:this.handleReset,onSolved:this.handleSolved})),l.a.createElement(w,{prevGameSolvedTimestamp:this.state.prevGameSolvedTimestamp,show:this.state.showSettingsPanel,onClose:this.hideModal,onUserSettingsChanged:this.handleUserSettingsChange}))}}]),t}(n.Component));r.a.render(l.a.createElement(S,null),document.getElementById("root"))}],[[10,2,1]]]);
//# sourceMappingURL=main.25b2d823.chunk.js.map