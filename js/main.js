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
		console.log(ships);
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
		console.log(ships);

		
		
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
			// 	console.log("Hollo")
			// 	trs[i].children[j].disabled = true;
			// 	trs[i].disabled = true;
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
var lastComputerShoots = [];
(function bindObjectsСomputerShips() {
	
	var trsMy = document.querySelector("#myShips").children[0].children;
	var trsComputer = document.querySelector("#computerShips").children[0].children;
	var trs = document.querySelector("#"+elem).children[0].children;
	for (var i=0;i<10;i++) {

		for (var j=0;j<10;j++) {

			trs[i].children[j].obj = array[i][j];
			trs[i].children[j].addEventListener("click", ev);
			function ev () {

				this.obj.shooted = true;
			}

			trs[i].children[j].addEventListener("click", check);
			function check() {
				if (elem=="computerShips") {

					lastShoots.push(this.obj.chip);
					// console.log(lastShoots[lastShoots.length-1]);
					// console.log(lastShoots);
					
				}
				if (this.obj.chip == true && this.obj.shooted == true) {

					this.style.backgroundColor = "red";

				} else {this.style.backgroundColor="#68FF2C"}

			}
			trs[i].children[j].addEventListener("click", checkObj);
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
							++check
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
			console.log(trsForShoot);
			for (var k=0;k<10;k++) {

				for (var j=0;j<10;j++) {
					var shoot;
					
					shoot = function () {
						if (lastShoots[lastShoots.length-1]==false) {

							var k = Math.round(Math.random(1,0)*9);
							var j = Math.round(Math.random(1,0)*9);
							if (trsForShoot[k].children[j].obj.shooted == true) {
								shoot();
							} else if (trsForShoot[k].children[j].obj.shooted == false && trsForShoot[k].children[j].obj.chip == true) {
								// console.log(k,j);
								trsForShoot[k].children[j].obj.shooted = true;
								trsForShoot[k].children[j].click();
								shoot();
							} else {
								trsForShoot[k].children[j].obj.shooted = true;
								trsForShoot[k].children[j].click();
							}
						}
					}
					
					trsComputer[k].children[j].addEventListener("click", shoot);

				}
			}
		}

	})();
	

}

makeTheShip("myShips");
makeTheShip("computerShips");
};
