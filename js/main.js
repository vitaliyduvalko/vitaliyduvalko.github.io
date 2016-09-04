"use strict";

window.onload = function() {


	var myArmy = document.createElement("table");
	var computerArmy = document.createElement("table");

	( function createTables() {

		for (var i = 0; i < 10; i++) {
			var tr = document.createElement("tr");
			myArmy.appendChild(tr);
			for (var j = 0; j < 10; j++) {

				var td = document.createElement("td");
				tr.appendChild(td);
			}
		}

		document.querySelector("#tables").appendChild(myArmy);
		myArmy.id = "myShips";



		for (var i = 0; i < 10; i++) {
			var tr = document.createElement("tr");
			computerArmy.appendChild(tr);
			for (var j = 0; j < 10; j++) {

				var td = document.createElement("td");
				tr.appendChild(td);
			}
		}

		document.querySelector("#tables").appendChild(computerArmy);
		computerArmy.id = "computerShips";

	} )()


	function makeTheShip(elem) {

		var _4decks = { arr_decks: [], arr_empty: [], name: "_4decks" };
		var _3decks1 = { arr_decks: [], arr_empty: [], name: "_3decks1" };
		var _3decks2 = { arr_decks: [], arr_empty: [], name: "_3decks2" };
		var _2decks1 = { arr_decks: [], arr_empty: [], name: "_2decks1" };
		var _2decks2 = { arr_decks: [], arr_empty: [], name: "_2decks2" };
		var _2decks3 = { arr_decks: [], arr_empty: [], name: "_2decks3" };
		var _1decks1 = { arr_decks: [], arr_empty: [], name: "_1decks1" };
		var _1decks2 = { arr_decks: [], arr_empty: [], name: "_1decks2" };
		var _1decks3 = { arr_decks: [], arr_empty: [], name: "_1decks3" };
		var _1decks4 = { arr_decks: [], arr_empty: [], name: "_1decks4" };



		let arr = [];

		function makeArr() {

			for (var i = -4; i < 14; i++) {
				arr[i] = [];
				for (var j = -4; j < 14; j++) {

					arr[i][j] = {
						ship: false,
						shooted: false,
						i: i,
						j: j,
						boats: new Array()
					};

					// if (elem == myArmy) {
						if (JSON.parse(localStorage.getItem(elem.id + "" + i+""+j))) {
							arr[i][j].shooted = JSON.parse(localStorage.getItem(elem.id + "" + i+""+j)).shooted;
						// }
					}
				}
			}
		}

		makeArr();

		ifShipsIncache();

		function ifShipsIncache() {


			if (JSON.parse(localStorage.getItem(elem.id+'objects_ships4'))) {

				_4decks = JSON.parse(localStorage.getItem( elem.id+"objects_ships4" ));
				_3decks1 = JSON.parse(localStorage.getItem( elem.id+"objects_ships31"));
				_3decks2 = JSON.parse(localStorage.getItem( elem.id+"objects_ships32"));
				_2decks1 = JSON.parse(localStorage.getItem( elem.id+"objects_ships21"));
				_2decks2 = JSON.parse(localStorage.getItem( elem.id+"objects_ships22"));
				_2decks3 = JSON.parse(localStorage.getItem( elem.id+"objects_ships23"));
				_1decks1 = JSON.parse(localStorage.getItem( elem.id+"objects_ships11"));
				_1decks2 = JSON.parse(localStorage.getItem( elem.id+"objects_ships12"));
				_1decks3 = JSON.parse(localStorage.getItem( elem.id+"objects_ships13"));
				_1decks4 = JSON.parse(localStorage.getItem( elem.id+"objects_ships14"));


				buildOldShips(_4decks);
				buildOldShips(_3decks1);
				buildOldShips(_3decks2);
				buildOldShips(_2decks1);
				buildOldShips(_2decks2);
				buildOldShips(_2decks3);
				buildOldShips(_1decks1);
				buildOldShips(_1decks2);
				buildOldShips(_1decks3);
				buildOldShips(_1decks4);

				function buildOldShips(shipFromCache) {

					for (var l = 0; l < shipFromCache.arr_decks.length; l++) {

						for (var h = -4; h < 14; h++ ) {
							for (var b = -4; b < 14; b++) {
								if (shipFromCache.arr_decks[l].i == h && shipFromCache.arr_decks[l].j == b) {
									arr[h][b] = shipFromCache.arr_decks[l];

								}
							}
						}
					}

					for (var l = 0; l < shipFromCache.arr_empty.length; l++) {

						for (var h = -4; h < 14; h++ ) {
							for (var b = -4; b < 14; b++) {
								if (shipFromCache.arr_empty[l].i == h && shipFromCache.arr_empty[l].j == b) {
									arr[h][b].ship = shipFromCache.arr_empty[l].ship;
									arr[h][b].shooted = shipFromCache.arr_empty[l].shooted;
									arr[h][b].i = shipFromCache.arr_empty[l].i;
									arr[h][b].j = shipFromCache.arr_empty[l].j;
									arr[h][b].boats = shipFromCache.arr_empty[l].boats;
									shipFromCache.arr_empty[l] = arr[h][b];
								}
							}
						}
					}

				}

			} else {

				makeAllChips();

			}

		}



		var dir, x, y;

		function makeFirstDeck() {

			dir = Math.round( Math.random(1, 0) );
			x = Math.round( Math.random()*9 );
			y = Math.round( Math.random()*9 );

			if (arr[x][y].ship == true || arr[x][y + 1].ship == true || arr[x][y - 1].ship == true ||
				arr[x-1][y].ship == true || arr[x - 1][y + 1].ship == true || arr[x - 1][y - 1].ship == true ||
				arr[x+1][y].ship == true || arr[x + 1][y + 1].ship == true || arr[x + 1][y - 1].ship == true) {

				makeFirstDeck();
		}
	}


	function makeShips(decks, ships) {

		makeFirstDeck();

		if (dir == 0) {
			makeGorDecks(decks, ships);
		}
		else {
			makeVertDecks(decks, ships);
		}

	}

	function makeGorDecks(decks, ships) {

		function checkGorDirect(decks, ships) {

			for (var i = 0; i <= decks; i++) {

				if ( y + i > 10 ||
					arr[x][y + i].ship == true ||
					arr[x + 1][y + i].ship == true ||
					arr[x - 1][y + i].ship == true )
				{
					return false;
				}
			}

			return true;
		}

		( function buildGorShip(decks) {

			if (checkGorDirect(decks, ships) == true) {

				for (var i = 0; i < decks; i++) {
					arr[x][y + i].ship = true;
					ships.arr_decks.push(arr[x][y + i]);
				}

				// ships.arr_empty = [];
				ships.arr_empty.push(arr[x][y - 1]);
				ships.arr_empty.push(arr[x][y + ships.arr_decks.length]);

				for (var c = -1; c <= ships.arr_decks.length; c++) {

					ships.arr_empty.push(arr[x - 1][y + c]);
					ships.arr_empty.push(arr[x + 1][y + c]);
				}


				for (var i = 0; i < ships.arr_decks.length; i++) {
					ships.arr_decks[i].boats.push(ships.name);
				}

				for (var i = 0; i < ships.arr_empty.length; i++) {
					ships.arr_empty[i].boats.push(ships.name);
				}


			} else {
				makeShips(decks, ships);
			}
		} )(decks);
	}


	function colorFirst(elem) {
		for (var i = 0; i<10; i++) {
			for (var j = 0; j<10; j++) {
				if (trs[i].children[j].obj.shooted == true && trs[i].children[j].obj.ship == false) {

					trs[i].children[j].style.backgroundColor="#9CF797";
				} else if (trs[i].children[j].obj.shooted == true && trs[i].children[j].obj.ship == true) {
					trs[i].children[j].style.backgroundColor="red";
				}
			}
		}
	}


	function makeVertDecks(decks, ships) {

		function checkVertDirect(decks, ships) {

			for (var i = 0; i <= decks; i++) {
				if (x + i > 10 || arr[x + i][y].ship == true ||
					arr[x + i][y + 1].ship == true ||
					arr[x + i][y - 1].ship == true) {
					return false;
			}
		}

		return true;
	}



	( function buildVertShip(decks, ships) {

		if (checkVertDirect(decks, ships) == true) {

			for (var i = 0; i < decks; i++) {
				arr[x + i][y].ship = true;
				ships.arr_decks.push(arr[x + i][y]);

			}

			ships.arr_empty = [];
			ships.arr_empty.push(arr[x - 1][y]);
			ships.arr_empty.push(arr[x + ships.arr_decks.length][y]);

			for (var c = -1; c <= ships.arr_decks.length; c++) {
				ships.arr_empty.push( arr[x + c][y - 1] );
				ships.arr_empty.push( arr[x + c][y + 1] );
			}

			for (var i = 0; i < ships.arr_decks.length; i++) {
				ships.arr_decks[i].boats.push(ships.name);
			}

			for (var i = 0; i < ships.arr_empty.length; i++) {
				ships.arr_empty[i].boats.push(ships.name);
			}

		} else {
			makeShips(decks, ships);
		}

	} )(decks, ships);

}




function makeAllChips() {

	makeShips(4, _4decks );
	makeShips(3, _3decks1);
	makeShips(3, _3decks2);
	makeShips(2, _2decks1);
	makeShips(2, _2decks2);
	makeShips(2, _2decks3);
	makeShips(1, _1decks1);
	makeShips(1, _1decks2);
	makeShips(1, _1decks3);
	makeShips(1, _1decks4);
}

function saveObjTolocalStorage() {

	if (!JSON.parse(localStorage.getItem(elem.id+"objects_ships4"))) {
		localStorage.setItem(elem.id+"objects_ships4" ,JSON.stringify(_4decks));
		localStorage.setItem(elem.id+"objects_ships31",JSON.stringify(_3decks1));
		localStorage.setItem(elem.id+"objects_ships32",JSON.stringify(_3decks2));
		localStorage.setItem(elem.id+"objects_ships21",JSON.stringify(_2decks1));
		localStorage.setItem(elem.id+"objects_ships22",JSON.stringify(_2decks2));
		localStorage.setItem(elem.id+"objects_ships23",JSON.stringify(_2decks3));
		localStorage.setItem(elem.id+"objects_ships11",JSON.stringify(_1decks1));
		localStorage.setItem(elem.id+"objects_ships12",JSON.stringify(_1decks2));
		localStorage.setItem(elem.id+"objects_ships13",JSON.stringify(_1decks3));
		localStorage.setItem(elem.id+"objects_ships14",JSON.stringify(_1decks4));

		for ( var i = -4; i < 14; i++ ) {
			for ( var j = -4; j < 14; j++ ) {
				localStorage.setItem(elem.id + "" + i + ""+ j , JSON.stringify(arr[i][j]));
			}
		}
	}

}

function saveAgain() {

	for ( var i = -4; i < 14; i++ ) {
		for ( var j = -4; j < 14; j++ ) {
			localStorage.setItem(elem.id + "" + i + ""+ j , JSON.stringify(arr[i][j]));
		}
	}


	localStorage.setItem(elem.id+"objects_ships4" ,JSON.stringify(_4decks));
	localStorage.setItem(elem.id+"objects_ships31",JSON.stringify(_3decks1));
	localStorage.setItem(elem.id+"objects_ships32",JSON.stringify(_3decks2));
	localStorage.setItem(elem.id+"objects_ships21",JSON.stringify(_2decks1));
	localStorage.setItem(elem.id+"objects_ships22",JSON.stringify(_2decks2));
	localStorage.setItem(elem.id+"objects_ships23",JSON.stringify(_2decks3));
	localStorage.setItem(elem.id+"objects_ships11",JSON.stringify(_1decks1));
	localStorage.setItem(elem.id+"objects_ships12",JSON.stringify(_1decks2));
	localStorage.setItem(elem.id+"objects_ships13",JSON.stringify(_1decks3));
	localStorage.setItem(elem.id+"objects_ships14",JSON.stringify(_1decks4));
}

saveObjTolocalStorage();

//
//
//
// Здесь начинается раздел кода отвечающий за логику компьютера и игрока *
//
//
//
//
//

var lastFunk,k,f;

var firstCrippedCooords = {
	k: undefined,
	f: undefined
}

var lastShoots = [];
var ammountOfMyDecks = 0;
var ammountOfDecksOfComputer = 0;

var trs = elem.children;
var trsMy = myArmy.children;
var trsComputer = computerArmy.children;

( function toColorShips() {

	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			trsMy[i].children[j].style.pointerEvents = 'none';
		}
	}

	if (elem == myArmy) {
		for (var i = 0; i < 10; i++) {
			for (var j = 0; j < 10; j++) {

				if (arr[i][j].ship == true) {
					trs[i].children[j].style.backgroundColor = "blue";
					// trs[i].children[j].innerHTML += "<div style='background-color:orange; padding:0px; left:5%; border-radius:8px; width:18px; height: 18px'></div>"
				} else {
					trs[i].children[j].style.backgroundColor = "#69BBF5";
				}
			}
		}
	}
} )();


function checkAllTheDecksOfComputer() {

	for (var i = 0; i < 10; i++) {
		for (var u = 0; u < 10; u++) {

			if (trsComputer[i].children[u].obj.shooted == true && trsComputer[i].children[u].obj.ship == true) {
				++ammountOfDecksOfComputer;

				if (ammountOfDecksOfComputer == 20) {

					setTimeout( "alert('You are win')", 100 );

				}
			}
		}
	}
	ammountOfDecksOfComputer = 0;
}


function checkAllTheDecksOfMy() {

	for (var i = 0; i < 10; i++) {
		for (var u = 0; u < 10; u++) {

			if (trsMy[i].children[u].obj.shooted == true && trsMy[i].children[u].obj.ship == true) {
				++ammountOfMyDecks;

				if (ammountOfMyDecks == 20) {

					setTimeout( "alert('Computer win')", 100 );

				}
			}
		}
	}
	ammountOfMyDecks = 0;
}


function click_check() {

	this.obj.shooted = true;

	if (elem == computerArmy) {

		lastShoots.push(this.obj.ship);

	}

	if (this.obj.ship == true && this.obj.shooted == true) {
		this.style.backgroundColor = "red";

	} else {
		this.style.backgroundColor="#9CF797";

	}

}


function checkInside(shipObj) {

	var check = 0;
	for (var i = 0; i < shipObj.arr_decks.length; i++) {
		if (shipObj.arr_decks[i].shooted == true && shipObj.arr_decks[i].ship == true) {
			++check;
			checkAllTheDecksOfComputer;
		}
	}

	if (check == shipObj.arr_decks.length) {

		// console.log("here");
		for (var i = 0; i < shipObj.arr_empty.length; i++) {
			shipObj.arr_empty[i].shooted = true;
			// console.log(shipObj.arr_empty[i]);
		}
		colorObj();
	}
}

function checkObj() {

	checkInside( _4decks );
	checkInside( _3decks1 );
	checkInside( _3decks2 );
	checkInside( _2decks1 );
	checkInside( _2decks2 );
	checkInside( _2decks3 );
	checkInside( _1decks1 );
	checkInside( _1decks2 );
	checkInside( _1decks3 );
	checkInside( _1decks4 );

}

function colorObj() {

	for (var i = 0; i<10; i++) {
		for (var j = 0; j<10; j++) {
			if (trs[i].children[j].obj.shooted == true && trs[i].children[j].obj.ship == false) {

				trs[i].children[j].style.backgroundColor="#9CF797";
			} else if (trs[i].children[j].obj.shooted == true && trs[i].children[j].obj.ship == true) {
				trs[i].children[j].style.backgroundColor="red";
			}
		}
	}
}

function blockShootedCells() {

	for (var c = 0; c < 10; c++) {
		for (var k = 0; k < 10; k++) {
			( function(c, k) {

				if (trs[c].children[k].obj.shooted == true) {
					trs[c].children[k].style.pointerEvents = 'none';
				}

			} )(c, k)
		}
	}
}

function rightSoot(u, v) {

	v++;
	lastFunk = "right";

	if (trsMy[u].children[v]) {

		if (trsMy[u].children[v].obj.shooted == true) {

			leftShoot(firstCrippedCooords.k, firstCrippedCooords.f);

		} else if (trsMy[u].children[v].obj.shooted == false && trsMy[u].children[v].obj.ship == true) {

			trsMy[u].children[v].click();
			rightSoot(u, v);

		} else if (trsMy[u].children[v].obj.shooted == false && trsMy[u].children[v].obj.ship == false) {

			trsMy[u].children[v].click();

		}

	} else {

		leftShoot(firstCrippedCooords.k, firstCrippedCooords.f);
	}
}


function leftShoot(u, v) {

	v--;
	lastFunk = "left";

	if (trsMy[u].children[v]) {

		if (trsMy[u].children[v].obj.shooted == true) {

			downShoot(firstCrippedCooords.k, firstCrippedCooords.f);

		} else if (trsMy[u].children[v].obj.shooted == false && trsMy[u].children[v].obj.ship == true) {

			trsMy[u].children[v].click();
			leftShoot(u, v);

		} else if (trsMy[u].children[v].obj.shooted == false && trsMy[u].children[v].obj.ship == false) {

			trsMy[u].children[v].click();

		}

	} else {

		downShoot(firstCrippedCooords.k, firstCrippedCooords.f);
	}
}

function downShoot(u, v) {

	u++;
	lastFunk = "down";

	if (trsMy[u]) {

		if (trsMy[u].children[v].obj.shooted == true) {

			upShoot(firstCrippedCooords.k, firstCrippedCooords.f);

		} else if (trsMy[u].children[v].obj.shooted == false && trsMy[u].children[v].obj.ship == true) {

			trsMy[u].children[v].click();
			downShoot(u, v);

		} else if (trsMy[u].children[v].obj.shooted == false && trsMy[u].children[v].obj.ship == false) {

			trsMy[u].children[v].click();

		}

	} else {

		upShoot(firstCrippedCooords.k, firstCrippedCooords.f);
	}
}

function upShoot(u,v) {

	u--;
	lastFunk = "up";

	if (trsMy[u]) {

		if (trsMy[u].children[v].obj.shooted == true) {

			firstCrippedCooords.k = undefined;
			shoot();

		} else if (trsMy[u].children[v].obj.shooted == false && trsMy[u].children[v].obj.ship == true) {

			trsMy[u].children[v].click();
			upShoot(u,v);

		} else if (trsMy[u].children[v].obj.shooted == false && trsMy[u].children[v].obj.ship == false) {

			trsMy[u].children[v].click();
			firstCrippedCooords.k = undefined;
		}

	} else {

		firstCrippedCooords.k = undefined;
		shoot();
	}
}

function shoot() {


	k = Math.round(Math.random(1, 0)*9);
	f = Math.round(Math.random(1, 0)*9);

	if (lastShoots[lastShoots.length - 1] == false) {

		if (lastFunk == "right" && firstCrippedCooords.k != undefined) {

			leftShoot(firstCrippedCooords.k, firstCrippedCooords.f);
			return;

		} else if (lastFunk == "left" && firstCrippedCooords.k != undefined) {

			downShoot(firstCrippedCooords.k, firstCrippedCooords.f);
			return;

		} else if (lastFunk == "down" && firstCrippedCooords.k != undefined) {
			upShoot(firstCrippedCooords.k, firstCrippedCooords.f);
			return;

		} else if (lastFunk == "up" && firstCrippedCooords.k != undefined) {

			lastFunk = undefined;
			firstCrippedCooords.k = undefined;
			shoot();
			return;

		}




		(function click() {

			if (trsMy[k].children[f].obj.shooted == true) {

				shoot();

			} else if (trsMy[k].children[f].obj.shooted == false && trsMy[k].children[f].obj.ship == true) {

				if (firstCrippedCooords.k == undefined || lastFunk == "up") {

					firstCrippedCooords.k = k;
					firstCrippedCooords.f = f;

				}

				trsMy[k].children[f].click();
				rightSoot(k,f);

			} else {

				trsMy[k].children[f].obj.shooted = true;
				trsMy[k].children[f].click();

			}

		})();

	}


}

function clearAll(elem) {

	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			trs[i].children[j].style.backgroundColor="#69BBF5";
			trs[i].children[j].obj = arr[i][j];
			trs[i].children[j].removeEventListener("click", click_check);
			trs[i].children[j].removeEventListener("click", checkObj);
			trs[i].children[j].removeEventListener("click", colorObj);
			trs[i].children[j].removeEventListener("click", blockShootedCells);
			trs[i].children[j].removeEventListener("click", saveAgain);
			trs[i].children[j].style = '';

			if (elem == computerArmy) {
				trsComputer[i].children[j].removeEventListener("click", shoot);
				trsComputer[i].children[j].removeEventListener("click", checkAllTheDecksOfMy);
				trsComputer[i].children[j].removeEventListener("click", checkAllTheDecksOfComputer);
			}
		}
	}
}

( function addEventsForTds() {

	document.querySelector("#clearCache").onclick = clearLc;

	function clearLc() {

		localStorage.clear();
		clearAll(myArmy);
		clearAll(computerArmy);
		makeTheShip(myArmy);
		makeTheShip(computerArmy);

	}

	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {

			trs[i].children[j].obj = arr[i][j];
			trs[i].children[j].addEventListener("click", click_check);
			trs[i].children[j].addEventListener("click", checkObj);
			trs[i].children[j].addEventListener("click", colorObj);
			trs[i].children[j].addEventListener("click", blockShootedCells);
			trs[i].children[j].addEventListener("click", saveAgain);

			if (elem == computerArmy) {
				trsComputer[i].children[j].addEventListener("click", shoot);
				trsComputer[i].children[j].addEventListener("click", checkAllTheDecksOfMy);
				trsComputer[i].children[j].addEventListener("click", checkAllTheDecksOfComputer);
			}
		}
	}
} )();

colorFirst(elem);
blockShootedCells();
}


makeTheShip(myArmy);
makeTheShip(computerArmy);


};
