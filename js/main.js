window.onload = function() {

	var makedArray = 0;
	function makeTheShip(elem) {
		let arr = [];
		function makeArr() {
			for (var i=-4;i<14;i++) {
				arr[i]=[];
				for (var j=-4;j<14;j++) {

					arr[i][j] = {
						chip: false,
						shooted: false,
						id: i+"."+j,
						color: "green"
					};
				}
			}
	// console.table(arr)
};
makeArr();

var dir,x,y;

function makeFirstDeck() {
	dir = Math.round(Math.random(1,0));
	// console.log(dir);
	x = Math.round(Math.random()*9);
	y = Math.round(Math.random()*9);
	// console.log("x: "+x+"; y: "+y);

	if (arr[x][y].chip==true || arr[x][y+1].chip==true || arr[x][y-1].chip==true ||
		arr[x-1][y].chip==true || arr[x-1][y+1].chip==true || arr[x-1][y-1].chip==true ||
		arr[x+1][y].chip==true || arr[x+1][y+1].chip==true || arr[x+1][y-1].chip==true) {
		makeFirstDeck();
};


};


function makeShips(decks,ships) {

	makeFirstDeck();
	if (dir == 0) { makeGorDecks(decks,ships);} else { makeVertDecks(decks,ships);}

}

function makeGorDecks(decks,ships) {

	function checkGorDirect(decks,ships) {
		for (var i=0;i<=decks;i++) {
			if (y+i>10 || arr[x][y+i].chip==true || arr[x+1][y+i].chip==true || arr[x-1][y+i].chip==true) {
				return false;
			}
		}
		return true;
	}

	(function buildGorShip(decks) {

		if (checkGorDirect(decks,ships)==true) {
			for (var i=0;i<decks;i++) {
				arr[x][y+i].chip=true;
				arr[x][y+i].color="red";
				ships.arr_decks.push(arr[x][y+i])
			}


			ships.arr_empty = [];
			ships.arr_empty.push(arr[x][y-1]);
			ships.arr_empty.push(arr[x][y+ships.arr_decks.length]);
			for (var c = -1; c<=ships.arr_decks.length; c++) {
				ships.arr_empty.push(arr[x-1][y+c]);
				ships.arr_empty.push(arr[x+1][y+c]);
			}


		} else { makeShips(decks,ships) }

	})(decks);

};

var _4decks = {arr_decks: []};
var _3decks1 = {arr_decks: []};
var _3decks2 = {arr_decks: []};
var _2decks1 = {arr_decks: []};
var _2decks2 = {arr_decks: []};
var _2decks3 = {arr_decks: []};
var _1decks1 = {arr_decks: []};
var _1decks2 = {arr_decks: []};
var _1decks3 = {arr_decks: []};
var _1decks4 = {arr_decks: []};

function makeVertDecks(decks,ships) {

	function checkVertDirect(decks,ships) {
		for (var i=0;i<=decks;i++) {
			if (x+i>10 || arr[x+i][y].chip==true || arr[x+i][y+1].chip==true || arr[x+i][y-1].chip==true) {
				return false;
			}
		}
		return true;
	}

	(function buildVertShip(decks,ships) {
		if (checkVertDirect(decks,ships)==true) {
			for (var i=0;i<decks;i++) {
				arr[x+i][y].chip=true;

				ships.arr_decks.push(arr[x+i][y]);
			}

			ships.arr_empty = [];
			ships.arr_empty.push(arr[x-1][y]);
			ships.arr_empty.push(arr[x+ships.arr_decks.length][y]);
			for (var c = -1; c<=ships.arr_decks.length; c++) {
				ships.arr_empty.push(arr[x+c][y-1]);
				ships.arr_empty.push(arr[x+c][y+1]);
			}

		} else { makeShips(decks,ships) }


	})(decks,ships);

};

makeShips(4,_4decks );
makeShips(3,_3decks1);
makeShips(3,_3decks2);
makeShips(2,_2decks1);
makeShips(2,_2decks2);
makeShips(2,_2decks3);
makeShips(1,_1decks1);
makeShips(1,_1decks2);
makeShips(1,_1decks3);
makeShips(1,_1decks4);

var array = [];

(function getArray() {
	for (var i = 0; i<10; i++) {
		array[i] = arr[i].splice(0,10)
	};
	// console.table(array);
})();


(function toColorShips() {
	var trs = document.querySelector("#"+elem).children[0].children;
	// console.dir(trs);
	for (var i=0;i<10;i++) {
		for (var j=0;j<10;j++) {
			trs[i].children[j].id = i+""+j;
			if (elem=="myShips") {
				trs[i].style.pointerEvents = 'none';
			}
		}
	}
	if (document.querySelector("#"+elem).id=="myShips") {
		for (var i=0;i<10;i++) {
			for (var j=0;j<10;j++) {
				if (array[i][j].chip==true) {
					trs[i].children[j].style.backgroundColor="#51AFE1"
				}
			}
		}
	}
})();
var lastShoots = [];
var ammountOfDecks = 0;
var ammountOfDecksOfComputer = 1;



function checkAllTheDecksOfComputer() {
	var trsForShoot = document.querySelector("#computerShips").children[0].children;
	for (var i = 0; i<10; i++) {
		for (var u = 0; u<10; u++) {


			if (trsForShoot[i].children[u].obj.shooted == true && trsForShoot[i].children[u].obj.chip == true) {
				++ammountOfDecksOfComputer;
				if (ammountOfDecksOfComputer==20) {
					alert("You are win");
				}
			}

		}
	}
	console.log(ammountOfDecksOfComputer);
	ammountOfDecksOfComputer=0;
}


(function bindObjectsСomputerShips() {


	var trsMy = document.querySelector("#myShips").children[0].children;
	var trsComputer = document.querySelector("#computerShips").children[0].children;
	var trs = document.querySelector("#"+elem).children[0].children;
	for (var i=0;i<10;i++) {

		for (var j=0;j<10;j++) {

			trs[i].children[j].obj = array[i][j];
			trs[i].children[j].addEventListener("click", ev);
			trs[i].children[j].addEventListener("click", checkAllTheDecksOfComputer);
			function ev () {

				this.obj.shooted = true;
			}

			trs[i].children[j].addEventListener("click", check);
			function check() {
				if (elem=="computerShips") {
					lastShoots.push(this.obj.chip);
				}

				if (this.obj.chip == true && this.obj.shooted == true) {

					this.style.backgroundColor = "red";

				} else {this.style.backgroundColor="#68FF2C"}

			}
			trs[i].children[j].addEventListener("click", checkObj);




			var firstCripperCoords = {
				ammountOfChips: 10,
				k: undefined,
				f: undefined
			}

			function checkObj() {
				ceckInside(_4decks );
				ceckInside(_3decks1 );
				ceckInside(_3decks2 );
				ceckInside(_2decks1 );
				ceckInside(_2decks2 );
				ceckInside(_2decks3 );
				ceckInside(_1decks1 );
				ceckInside(_1decks2 );
				ceckInside(_1decks3 );
				ceckInside(_1decks4 );

				function ceckInside(shipObj) {
					var check = 0;

					for (var i = 0;i<shipObj.arr_decks.length;i++) {
						if (shipObj.arr_decks[i].shooted==true && shipObj.arr_decks[i].chip==true) {
							++check;
							checkAllTheDecksOfComputer;

						}
					}

					if (check==shipObj.arr_decks.length) {

						for (var i=0;i<shipObj.arr_empty.length;i++) {
							shipObj.arr_empty[i].shooted=true;
						}

					}
				}
			}
			trs[i].children[j].addEventListener("click", colorObj);
			function colorObj() {
				for (var i = 0;i<10;i++) {
					for (var j = 0;j<10;j++) {
						if (trs[i].children[j].obj.shooted==true && trs[i].children[j].obj.chip==false) {

							trs[i].children[j].style.backgroundColor="#68FF2C";
						}
					}
				}
			}
			trs[i].children[j].addEventListener("click", checkShooting);
			function checkShooting() {
				for (var c = 0; c<10;c++) {
					for (var k=0; k<10; k++) {
						(function(c,k) {
								// console.log(c,k);
								if (trs[c].children[k].obj.shooted==true) {
									// console.log(trs[c].children[k])
									trs[c].children[k].style.pointerEvents = 'none';
								}
							})(c,k)
						}
					}
				}
			}
		}



		if (elem=="computerShips") {
			var trsForShoot = document.querySelector("#myShips").children[0].children;
			var lastFunk;


			function rightSoot(u,v) {
				v++;
				lastFunk = "right";
				if (trsForShoot[u].children[v]) {

					if (trsForShoot[u].children[v].obj.shooted == true) {
						leftShoot(firstCripperCoords.k,firstCripperCoords.f);
					} else if (trsForShoot[u].children[v].obj.shooted == false && trsForShoot[u].children[v].obj.chip == true) {
						ammountOfDecks++;
						trsForShoot[u].children[v].click();
						rightSoot(u,v);
					} else if (trsForShoot[u].children[v].obj.shooted == false && trsForShoot[u].children[v].obj.chip == false) {
						trsForShoot[u].children[v].click();
					}

				} else {
					leftShoot(firstCripperCoords.k,firstCripperCoords.f)
				}
			}


			function leftShoot(u,v) {
				v--;
				lastFunk = "left";
				if (trsForShoot[u].children[v]) {

					if (trsForShoot[u].children[v].obj.shooted == true) {
						downShoot(firstCripperCoords.k,firstCripperCoords.f);
					} else if (trsForShoot[u].children[v].obj.shooted == false && trsForShoot[u].children[v].obj.chip == true) {
						ammountOfDecks++;
						trsForShoot[u].children[v].click();
						leftShoot(u,v);
					} else if (trsForShoot[u].children[v].obj.shooted == false && trsForShoot[u].children[v].obj.chip == false) {
						trsForShoot[u].children[v].click();
					}

				} else {
					downShoot(firstCripperCoords.k,firstCripperCoords.f)
				}
			}

			function downShoot(u,v) {
				u++;
				lastFunk = "down";
				if (trsForShoot[u]) {

					if (trsForShoot[u].children[v].obj.shooted == true) {
						upShoot(firstCripperCoords.k,firstCripperCoords.f);
					} else if (trsForShoot[u].children[v].obj.shooted == false && trsForShoot[u].children[v].obj.chip == true) {
						ammountOfDecks++;
						trsForShoot[u].children[v].click();
						downShoot(u,v);
					} else if (trsForShoot[u].children[v].obj.shooted == false && trsForShoot[u].children[v].obj.chip == false) {
						trsForShoot[u].children[v].click();
					}

				} else {
					upShoot(firstCripperCoords.k,firstCripperCoords.f)
				}
			}

			function upShoot(u,v) {
				u--;
				lastFunk = "up";
				if (trsForShoot[u]) {

					if (trsForShoot[u].children[v].obj.shooted == true) {
						firstCripperCoords.k = undefined;
						firstCripperCoords.f = undefined;
						shoot();
					} else if (trsForShoot[u].children[v].obj.shooted == false && trsForShoot[u].children[v].obj.chip == true) {
						ammountOfDecks++;
						trsForShoot[u].children[v].click();
						upShoot(u,v);
					} else if (trsForShoot[u].children[v].obj.shooted == false && trsForShoot[u].children[v].obj.chip == false) {
						trsForShoot[u].children[v].click();
						firstCripperCoords.k = undefined;
						firstCripperCoords.f = undefined;
					}

				} else {
					firstCripperCoords.k = undefined;
					firstCripperCoords.f = undefined;
					shoot();
				}
			}



			for (var x=0;x<10;x++) {

				for (var y=0;y<10;y++) {

					function checkAllTheDecks() {
						if (ammountOfDecks==20) {
							alert("Computer Win!");

						}
					}

					function shoot() {
						console.log("was",firstCripperCoords);

						k = Math.round(Math.random(1,0)*9);
						f = Math.round(Math.random(1,0)*9);

						if (lastShoots[lastShoots.length-1]==false) {



							if (lastFunk=="right" && firstCripperCoords.k != undefined) {
								leftShoot(firstCripperCoords.k,firstCripperCoords.f);
								return;
							} else if (lastFunk=="left" && firstCripperCoords.k != undefined) {
								downShoot(firstCripperCoords.k,firstCripperCoords.f);
								return;
							} else if (lastFunk=="down" && firstCripperCoords.k != undefined) {
								upShoot(firstCripperCoords.k,firstCripperCoords.f);
								return;
							} else if (lastFunk=="up" && firstCripperCoords.k != undefined) {
								lastFunk = undefined;
								firstCripperCoords.k = undefined;
								firstCripperCoords.f = undefined;
								shoot();
								return;
							}


							if (trsForShoot[k].children[f].obj.shooted == true) {

								shoot();
							} else if (trsForShoot[k].children[f].obj.shooted == false && trsForShoot[k].children[f].obj.chip == true) {
								ammountOfDecks++;
								if (firstCripperCoords.k==undefined || lastFunk=="up") {
									firstCripperCoords.k = k;
									firstCripperCoords.f = f;
								}



								trsForShoot[k].children[f].click();



								// shoot();
								rightSoot(k,f);

							} else {

								trsForShoot[k].children[f].obj.shooted = true;

								trsForShoot[k].children[f].click();


							}




						}

						// console.log("now",firstCripperCoords);

					}
					trsComputer[x].children[y].addEventListener("click", shoot);
					trsComputer[x].children[y].addEventListener("click", checkAllTheDecks);

				}



			}
		}


	})();


}

makeTheShip("myShips");
makeTheShip("computerShips");
};
