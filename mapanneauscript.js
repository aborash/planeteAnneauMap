// init des types de cases
let listeimage = new Array();

let plaine = new Image();
plaine.src="https://i.imgur.com/01MyZgV.png";
listeimage.push(plaine);

let ville = new Image();
ville.src = "https://vignette.wikia.nocookie.net/farmville/images/f/f5/King_Castle-icon.png";
listeimage.push(ville);

let foret = new Image();
foret.src = "https://i.imgur.com/fu2WFWv.png";
listeimage.push(foret);

let colline  = new Image();
colline.src = "https://i.imgur.com/R8pwmkN.png";
listeimage.push(colline);

let eau = new Image();
eau.src = "https://i.imgur.com/Sl0GEj1.png";
listeimage.push(eau);

let montagne  = new Image();
montagne.src = "https://i.imgur.com/RDkN2Hz.png";
listeimage.push(montagne);

let desert  = new Image();
desert.src = "https://i.imgur.com/SAvBZgz.png";
listeimage.push(desert);

let jungle  = new Image();
jungle.src = "https://i.imgur.com/AOsCsC8.png";
listeimage.push(jungle);

let marais  = new Image();
marais.src = "https://i.imgur.com/dJ0fRgn.png";
listeimage.push(marais);

// Chargement des images
let imageCount = listeimage.length;
let imagesLoaded = 0;

for(let i=0; i<imageCount; i++){
    listeimage[i].onload = function(){
        imagesLoaded++;
        if(imagesLoaded == imageCount){
            allLoaded();
        }
    }
}
// hashmap js
let hashmap = new Array();
function put(_case)
{
 hashmap[_case.xCase+_case.yCase*100]=_case;
}
function get(xCase, yCase)
{
 return hashmap[xCase+100*yCase];
}

function createcase(image, xCase, yCase,lien,images )
{
  let newcase ={};
  newcase.image = image;
  newcase.xCase=xCase;
  newcase.yCase=yCase;
  newcase.lien =lien;
  newcase.images = images;
  return newcase;
}
/*
for(let i=0;i<96;i++)
{
	for(let y=0;y<48;y++)
	{
		put(createcase(plaine, i,y,undefined,undefined));
	}
}*/
put(createcase(montagne, 0,47,undefined,undefined));
put(createcase(montagne, 1,47,undefined,undefined));
put(createcase(montagne, 2,47,undefined,undefined));
put(createcase(montagne, 3,47,undefined,undefined));
put(createcase(montagne, 4,47,undefined,undefined));

put(createcase(montagne, 0,0,undefined,undefined));
put(createcase(montagne, 1,0,undefined,undefined));
put(createcase(colline, 2,0,undefined,undefined));
put(createcase(desert, 3,0,undefined,undefined));
put(createcase(jungle, 4,0,undefined,undefined));

put(createcase(montagne, 0,1,undefined,undefined));
put(createcase(plaine, 1,1,'http://www.pathfinder-fr.org/Wiki/Parties.P199-carte_1_1.ashx',[ville]));
put(createcase(plaine, 2,1,undefined,undefined));
put(createcase(plaine, 3,1,undefined,undefined));
put(createcase(plaine, 4,1,undefined,undefined));

put(createcase(montagne, 0,2,undefined,undefined));
put(createcase(plaine, 1,2,undefined,undefined));
put(createcase(foret, 2,2,undefined,undefined));
put(createcase(foret, 3,2,undefined,undefined));
put(createcase(eau, 4,2,undefined,undefined));

put(createcase(montagne, 0,3,undefined,undefined));
put(createcase(plaine, 1,3,undefined,undefined));
put(createcase(eau, 2,3,undefined,undefined));
put(createcase(eau, 3,3,undefined,undefined));
put(createcase(eau, 4,3,undefined,undefined));

put(createcase(montagne, 0,4,undefined,undefined));
put(createcase(plaine, 1,4,undefined,undefined));
put(createcase(marais, 2,4,undefined,undefined));
put(createcase(eau, 3,4,undefined,undefined));
put(createcase(plaine, 4,4,undefined,undefined));

// unité, encore un peu obscure
let marge_px = 10;
let Haut_px = 680;
let Larg_px = 680;
let zoom = 100; // hauteur d'une case en px TAILLE EN PX / ZOOM = TAILLE EN CASE
/*
H par lat 6 case
Tour petit r 48 case
Equat int 96 case de large et 6 de haut
Equat ext 192 case de large et 6 de haut
Pôle 144 case de large et 6 de haut
Tropic int 120 case de large et 6 de haut
Tropic ext 168 case de large et 6 de haut

Total, sachant que les tropic sont en double ça fait un total de 6912 cases
*/
// case 0,0  : une des case la plus haute de Equat ext
let nbCaseHParLattitude = 6;
let nbCaseLEquatExt = 196;
let nbCaseLTropicCancerExt = 168; 
let nbCaseLPoleNord = 144;
let nbCaseLTropicCancerInt = 120;
let nbCaseLEquatInt = 96;
let nbCaseLTropicCapricornInt= 120;
let nbCaseLPoleSud = 144;
let nbCaseLTropicCapricornExt = 168;
// fonction drawn
function draw( x_px_coinHautGaucheCanvas, y_px_coinHautGaucheCanvas)
{
console.log("===================== git");
	// Recup infos canvas et init
	let mycanvas = document.getElementById("torusmap");
	mycanvas.height=Haut_px+(marge_px*2);
	mycanvas.width=Larg_px+(marge_px*2);
	let ctx = mycanvas.getContext("2d");
	
	// liste des Y_case a afficher :
	let nbCaseHaut = Math.floor(mycanvas.height / zoom)+2 ;
	let y_case_premiereCase  = boucle(Math.floor(y_px_coinHautGaucheCanvas /zoom),(nbCaseHParLattitude*8));

	let nbCaseLargeEquatExt = Math.floor(mycanvas.height / zoom*(nbCaseLEquatExt/nbCaseLEquatExt))+2 ;
	let nbCaseLargeTropicCancerExt = Math.floor(mycanvas.height / zoom*(nbCaseLTropicCancerExt/nbCaseLEquatExt))+2 ;
	let nbCaseLargePoleNord = Math.floor(mycanvas.height / zoom*(nbCaseLPoleNord/nbCaseLEquatExt))+2 ;
	let nbCaseLargeTropicCancerInt = Math.floor(mycanvas.height / zoom*(nbCaseLTropicCancerInt/nbCaseLEquatExt))+2 ;
	let nbCaseLargeEquatInt = Math.floor(mycanvas.height / zoom*(nbCaseLEquatInt/nbCaseLEquatExt))+2 ;
	let nbCaseLargeTropicCapricornInt = Math.floor(mycanvas.height / zoom*(nbCaseLTropicCapricornInt/nbCaseLEquatExt))+2 ;
	let nbCaseLargePoleSud = Math.floor(mycanvas.height / zoom*(nbCaseLPoleSud/nbCaseLEquatExt))+2 ;
	let nbCaseLargeTropicCapricornExt = Math.floor(mycanvas.height / zoom*(nbCaseLTropicCapricornExt/nbCaseLEquatExt))+2 ;
	
	let x_case_premiereCaseEquatExt = boucle(Math.floor(x_px_coinHautGaucheCanvas/ zoom*(nbCaseLEquatExt/nbCaseLEquatExt)),nbCaseLEquatExt) ;
	let x_case_premiereCaseTropicCancerExt = boucle(Math.floor(x_px_coinHautGaucheCanvas / zoom*(nbCaseLTropicCancerExt/nbCaseLEquatExt)),nbCaseLTropicCancerExt) ;
	let x_case_premiereCasePoleNord = boucle(Math.floor(x_px_coinHautGaucheCanvas / zoom*(nbCaseLPoleNord/nbCaseLEquatExt)),nbCaseLPoleNord) ;
	let x_case_premiereCaseTropicCancerInt = boucle(Math.floor(x_px_coinHautGaucheCanvas / zoom*(nbCaseLTropicCancerInt/nbCaseLEquatExt)),nbCaseLTropicCancerInt);
	let x_case_premiereCaseEquatInt = boucle(Math.floor(x_px_coinHautGaucheCanvas / zoom*(nbCaseLEquatInt/nbCaseLEquatExt)),nbCaseLEquatInt) ;
	let x_case_premiereCaseTropicCapricornInt = boucle(Math.floor(x_px_coinHautGaucheCanvas/ zoom*(nbCaseLTropicCapricornInt/nbCaseLEquatExt)),nbCaseLTropicCapricornInt) ;
	let x_case_premiereCasePoleSud = boucle(Math.floor(x_px_coinHautGaucheCanvas / zoom*(nbCaseLPoleSud/nbCaseLEquatExt)),nbCaseLPoleSud) ;
	let x_case_premiereCaseTropicCapricornExt = boucle(Math.floor(x_px_coinHautGaucheCanvas/ zoom*(nbCaseLTropicCapricornExt/nbCaseLEquatExt)),nbCaseLTropicCapricornExt) ;

	// pas inf zero pas sup taille max
	let printy_px_premierecase;
	let printx_px_premierecase;
	for(let iy=0;iy<nbCaseHaut;iy++)
	{
		
		let YcaseCourante = iy+y_case_premiereCase;
		if(YcaseCourante>=(nbCaseHParLattitude*8))
		{
			YcaseCourante = YcaseCourante - (nbCaseHParLattitude*8);
		}
		
		if(printy_px_premierecase === undefined)
		{
			printy_px_premierecase = (YcaseCourante*zoom)-y_px_coinHautGaucheCanvas;
		}
		//if(iy==0){console.log(" ->"+printy_px_premierecase+" "+(YcaseCourante*zoom)+" "+y_px_coinHautGaucheCanvas);}
		printx_px_premierecase = undefined;
		
		let lattitute = Math.floor(YcaseCourante/nbCaseHParLattitude);
		let nbcaseX;
		let premierecaseX;
		let tailleMax;
		let ratio ;
		if(lattitute==0){
			nbcaseX=nbCaseLargeEquatExt;
			premierecaseX=x_case_premiereCaseEquatExt;
			ratio=nbCaseLEquatExt/nbCaseLEquatExt;
			tailleMax=nbCaseLEquatExt;
		}else if(lattitute==1){
			nbcaseX=nbCaseLargeTropicCancerExt;
			premierecaseX=x_case_premiereCaseTropicCancerExt;
			ratio = nbCaseLEquatExt/nbCaseLTropicCancerExt;
			tailleMax=nbCaseLTropicCancerExt;
		}else if(lattitute==2){
			nbcaseX=nbCaseLargePoleNord;
			premierecaseX=x_case_premiereCasePoleNord;
			ratio = nbCaseLEquatExt/nbCaseLPoleNord;
			tailleMax=nbCaseLPoleNord;
		}else if(lattitute==3){
			nbcaseX=nbCaseLargeTropicCancerInt;
			premierecaseX=x_case_premiereCaseTropicCancerInt;
			ratio = nbCaseLEquatExt/nbCaseLTropicCancerInt;
			tailleMax=nbCaseLTropicCancerInt;
		}else if(lattitute==4){
			nbcaseX=nbCaseLargeEquatInt;
			premierecaseX=x_case_premiereCaseEquatInt;
			ratio=nbCaseLEquatExt/nbCaseLEquatInt;
			tailleMax=nbCaseLEquatInt;
		}else if(lattitute==5){
			nbcaseX=nbCaseLargeTropicCapricornInt;
			premierecaseX=x_case_premiereCaseTropicCapricornInt;
			ratio = nbCaseLEquatExt/nbCaseLTropicCapricornInt;
			tailleMax=nbCaseLTropicCapricornInt;
		}else if(lattitute==6){
			nbcaseX=nbCaseLargePoleSud;
			premierecaseX=x_case_premiereCasePoleSud;
			ratio = nbCaseLEquatExt/nbCaseLPoleSud;
			tailleMax=nbCaseLPoleSud;
		}else if(lattitute==7){
			nbcaseX=nbCaseLargeTropicCapricornExt;
			premierecaseX=x_case_premiereCaseTropicCapricornExt;
			ratio = nbCaseLEquatExt/nbCaseLTropicCapricornExt;
			tailleMax=nbCaseLTropicCapricornExt;
		}

		for(let jx=0;jx<nbcaseX;jx++)
		{
			let XcaseCourante = jx+premierecaseX;
			if(XcaseCourante>=tailleMax)
			{
				XcaseCourante = XcaseCourante - tailleMax;
			}
			
			if(printx_px_premierecase === undefined)
			{
				printx_px_premierecase = (XcaseCourante*zoom*ratio)-x_px_coinHautGaucheCanvas;
			}
		
			if(get(XcaseCourante,YcaseCourante)!== undefined){
				ctx.drawImage(get(XcaseCourante,YcaseCourante).image,printx_px_premierecase+(jx*zoom*ratio) ,printy_px_premierecase+(iy*zoom),zoom*ratio,zoom); 
				if(get(XcaseCourante,YcaseCourante).images!==undefined)
				{
					// todo mieux
					ctx.drawImage(get(XcaseCourante,YcaseCourante).images[0],printx_px_premierecase+(jx*zoom*ratio)+zoom/4 ,printy_px_premierecase+(iy*zoom)+zoom/4,zoom*ratio/2,zoom/2);
				}
			}
			ctx.font = "15px Arial";
			ctx.fillStyle = "blue";
			//ctx.fillText("["+XcaseCourante+","+YcaseCourante+"]"+"("+printy_px_premierecase+")",(printx_px_premierecase+(jx*zoom*ratio))+zoom/3,(printy_px_premierecase+(iy*zoom))+zoom/3);
		}
	}
	
	// dessin des 4 boutons
	ctx.fillStyle="grey";
	ctx.fillRect(0,0,Larg_px+(2*marge_px),marge_px);
	ctx.fillRect(0,0,marge_px,Haut_px+(2*marge_px));
	ctx.fillRect(Larg_px+marge_px,0,marge_px,Haut_px+(2*marge_px));
	ctx.fillRect(0,Haut_px+marge_px,Larg_px+(2*marge_px),marge_px);
}
function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
let currentX=marge_px;
let currentY=marge_px;

let mycanvas = document.getElementById("torusmap")
mycanvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(mycanvas, evt);
  //  console.log("x "+mousePos.x+" y "+mousePos.y+" "+(Larg_px+marge_px));
    var upadateimage = false;
    if(mousePos.x<marge_px)
    {
       currentX = currentX -10;
       upadateimage = true;
    }else if (mousePos.x>(Larg_px+marge_px))
    {
       currentX = currentX +10;
       upadateimage = true;
    }
    if (mousePos.y < marge_px)
    {
       currentY = currentY -10; 
       upadateimage = true; 
    }else if (mousePos.y > (Haut_px+marge_px))
    {
        currentY = currentY +10;
       upadateimage = true;
    }
	if(currentX>=zoom*nbCaseLEquatExt)
	{
		currentX = currentX - (zoom*nbCaseLEquatExt);
	}
	if(currentX<0)
	{
		currentX = currentX + (zoom*nbCaseLEquatExt);
	}
	if(currentY>=zoom*48)
	{
		currentY = currentY - (zoom*48);
	}
	if(currentY<0)
	{
		currentY = currentY + (zoom*48)
	}
    if ( upadateimage)
    {
       draw (currentX,currentY);
    }
    let incidetouchx = boucle(Math.floor((mousePos.x + currentX) / zoom),nbCaseLEquatExt);
    let incidetouchy = boucle(Math.floor((mousePos.y + currentY) / zoom),48);
    console.log ("incidetouchx "+incidetouchx+" incidetouchy "+incidetouchy)
   if(get(incidetouchx,incidetouchy )!==undefined && get(incidetouchx,incidetouchy ).lien!==undefined)
   {
		window.location.replace(get(incidetouchx,incidetouchy ).lien);
   }
}, false);

var Oldpose;
mycanvas.addEventListener('mousedown', function(evt) {
    var mousePos = getMousePos(mycanvas, evt);
	Oldpose = mousePos;
	console.log("down");
}, false);

mycanvas.addEventListener('mouseup', function(evt) {
    var mousePos = getMousePos(mycanvas, evt);
	Oldpose = undefined;
		console.log("up");
}, false);

mycanvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(mycanvas, evt);
	console.log("move");
	if(Oldpose!==undefined)
	{
		let Xdif=Oldpose.x-mousePos.x;
		let Ydif=Oldpose.y-mousePos.y;
		Oldpose = mousePos;
		//console.lof
		currentX = currentX+Xdif;
		currentY = currentY+Ydif;
		currentX= boucle(currentX,zoom*nbCaseLEquatExt);
		currentY=boucle(currentY,zoom*48);
		
		draw (currentX,currentY);
	}
}, false);

mycanvas.onmousewheel = function (event){
	if(event.wheelDelta>0)
	{
		zoom = zoom*1.1;
	}else{
		zoom = zoom/1.1;
	}
	console.log("zoom "+zoom);
	draw (currentX,currentY);
}

function boucle(nombre, maxexclus)
{
	if(nombre>=maxexclus)
	{
		return nombre - maxexclus;
	}
	if(nombre<0)
	{
		return  nombre + maxexclus;
	}
	return nombre;
}

//init
function allLoaded(){
   draw (currentX,currentY);
}
