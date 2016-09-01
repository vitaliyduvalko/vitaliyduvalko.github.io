"use strict";

window.onload = function() {

	var makedArray = 0;

	function makeTheShip(elem) {

		let arr = [];

		function makeArr() {

			for (var i = -4; i < 14; i++) {
				arr[i] = [];
				for (var j =-4 ; j <14; j++) {

					arr[i][j] = {
						ship: false,
						shooted: false
					};

				}
			}
		}

		makeArr();

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

				ships.arr_empty = [];
				ships.arr_empty.push(arr[x][y - 1]);
				ships.arr_empty.push(arr[x][y + ships.arr_decks.length]);

				for (var c = -1; c <= ships.arr_decks.length; c++) {
					ships.arr_empty.push(arr[x - 1][y + c]);
					ships.arr_empty.push(arr[x + 1][y + c]);
				}

			} else {
				makeShips(decks, ships);
			}
		} )(decks);
	}


	var _4decks = { arr_decks: [] };
	var _3decks1 = { arr_decks: [] };
	var _3decks2 = { arr_decks: [] };
	var _2decks1 = { arr_decks: [] };
	var _2decks2 = { arr_decks: [] };
	var _2decks3 = { arr_decks: [] };
	var _1decks1 = { arr_decks: [] };
	var _1decks2 = { arr_decks: [] };
	var _1decks3 = { arr_decks: [] };
	var _1decks4 = { arr_decks: [] };


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

		} else {
			makeShips(decks, ships);
		}

	} )(decks, ships);

}

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

var array = [];

( function getArray() {

	for (var i = 0; i<10; i++) {
		array[i] = arr[i].splice(0, 10);
	}

} )();


( function toColorShips() {

	var trs = document.querySelector("#" + elem).children[0].children;

	for (var i = 0;i < 10; i++) {
		for (var j = 0;j < 10; j++) {
			trs[i].children[j].id = i + "" + j;

			if (elem == "myShips") {
				trs[i].style.pointerEvents = 'none';
			}
		}
	}

	if (document.querySelector("#" + elem).id == "myShips") {
		for (var i = 0; i < 10; i++) {
			for (var j = 0; j < 10; j++) {
				if (array[i][j].ship == true) {
					trs[i].children[j].style.backgroundColor = "#51AFE1";
				}
			}
		}
	}
} )();

//
//
//
// Здесь начинается раздел кода отвечающий за логику компьютера и игрока *
//
//
//
//
//

var lastShoots = [];
var ammountOfDecks = 0;
var ammountOfDecksOfComputer = 0;

function checkAllTheDecksOfComputer() {

	var trsForShoot = document.querySelector("#computerShips").children[0].children;
	for (var i = 0; i < 10; i++) {
		for (var u = 0; u < 10; u++) {

			if (trsForShoot[i].children[u].obj.shooted == true && trsForShoot[i].children[u].obj.ship == true) {
				++ammountOfDecksOfComputer;

				if (ammountOfDecksOfComputer == 20) {

					setTimeout( "alert('You are win')", 100 );

				}
			}

		}
	}
	ammountOfDecksOfComputer = 0;
}


( function bindObjectsСomputerShips() {

	var firstCrippedCooords = {
		k: undefined,
		f: undefined
	}

	var trsMy = document.querySelector("#myShips").children[0].children;
	var trsComputer = document.querySelector("#computerShips").children[0].children;
	var trs = document.querySelector("#" + elem).children[0].children;

	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {


			function ev () {
				this.obj.shooted = true;
			}

			function check() {

				if (elem == "computerShips") {
					lastShoots.push(this.obj.ship);
				}

				if (this.obj.ship == true && this.obj.shooted == true) {
					this.style.backgroundColor = "red";
				} else {
					this.style.backgroundColor="#68FF2C";
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

					for (var i = 0; i < shipObj.arr_empty.length; i++) {
						shipObj.arr_empty[i].shooted = true;
					}

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

							trs[i].children[j].style.backgroundColor="#68FF2C";
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


			trs[i].children[j].obj = array[i][j];
			trs[i].children[j].addEventListener("click", ev);
			trs[i].children[j].addEventListener("click", checkAllTheDecksOfComputer);
			trs[i].children[j].addEventListener("click", check);
			trs[i].children[j].addEventListener("click", checkObj);
			trs[i].children[j].addEventListener("click", colorObj);
			trs[i].children[j].addEventListener("click", blockShootedCells);

		}
	}


	function rightSoot(u, v) {

		v++;
		lastFunk = "right";

		if (trsForShoot[u].children[v]) {

			if (trsForShoot[u].children[v].obj.shooted == true) {

				leftShoot(firstCrippedCooords.k, firstCrippedCooords.f);

			} else if (trsForShoot[u].children[v].obj.shooted == false && trsForShoot[u].children[v].obj.ship == true) {

				trsForShoot[u].children[v].click();
				rightSoot(u, v);

			} else if (trsForShoot[u].children[v].obj.shooted == false && trsForShoot[u].children[v].obj.ship == false) {

				trsForShoot[u].children[v].click();

			}

		} else {

			leftShoot(firstCrippedCooords.k, firstCrippedCooords.f);
		}
	}


	function leftShoot(u, v) {

		v--;
		lastFunk = "left";

		if (trsForShoot[u].children[v]) {

			if (trsForShoot[u].children[v].obj.shooted == true) {

				downShoot(firstCrippedCooords.k, firstCrippedCooords.f);

			} else if (trsForShoot[u].children[v].obj.shooted == false && trsForShoot[u].children[v].obj.ship == true) {

				trsForShoot[u].children[v].click();
				leftShoot(u, v);

			} else if (trsForShoot[u].children[v].obj.shooted == false && trsForShoot[u].children[v].obj.ship == false) {

				trsForShoot[u].children[v].click();

			}

		} else {

			downShoot(firstCrippedCooords.k, firstCrippedCooords.f);
		}
	}

	function downShoot(u, v) {

		u++;
		lastFunk = "down";

		if (trsForShoot[u]) {

			if (trsForShoot[u].children[v].obj.shooted == true) {

				upShoot(firstCrippedCooords.k, firstCrippedCooords.f);

			} else if (trsForShoot[u].children[v].obj.shooted == false && trsForShoot[u].children[v].obj.ship == true) {

				trsForShoot[u].children[v].click();
				downShoot(u, v);

			} else if (trsForShoot[u].children[v].obj.shooted == false && trsForShoot[u].children[v].obj.ship == false) {

				trsForShoot[u].children[v].click();

			}

		} else {

			upShoot(firstCrippedCooords.k, firstCrippedCooords.f);
		}
	}

	function upShoot(u,v) {

		u--;
		lastFunk = "up";

		if (trsForShoot[u]) {

			if (trsForShoot[u].children[v].obj.shooted == true) {

				firstCrippedCooords.k = undefined;
				shoot();

			} else if (trsForShoot[u].children[v].obj.shooted == false && trsForShoot[u].children[v].obj.ship == true) {

				trsForShoot[u].children[v].click();
				upShoot(u,v);

			} else if (trsForShoot[u].children[v].obj.shooted == false && trsForShoot[u].children[v].obj.ship == false) {

				trsForShoot[u].children[v].click();
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


			if (trsForShoot[k].children[f].obj.shooted == true) {

				shoot();
			} else if (trsForShoot[k].children[f].obj.shooted == false && trsForShoot[k].children[f].obj.ship == true) {

				ammountOfDecks++;

				if (firstCrippedCooords.k == undefined || lastFunk == "up") {
					firstCrippedCooords.k = k;
					firstCrippedCooords.f = f;
				}

				trsForShoot[k].children[f].click();
				rightSoot(k,f);

			} else {

				trsForShoot[k].children[f].obj.shooted = true;
				trsForShoot[k].children[f].click();
			}


		}



	}

	if (elem == "computerShips") {

		var trsForShoot = document.querySelector("#myShips").children[0].children;
		var lastFunk,k,f;

		for (var x=0;x<10;x++) {
			for (var y=0;y<10;y++) {

				trsComputer[x].children[y].addEventListener("click", shoot);

			}
		}

	}

} )();
}

makeTheShip("myShips");
makeTheShip("computerShips");

};
