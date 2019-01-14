
// User inputs
var numberOfPoints = 0;
var points = { x: 0, y: 0, z: 0};

// The geometric points created by the user
var matrixes = [];

// Html
var inputNumberOfPoints;
var outputResult;
var inputPointsArea;
var selectMenu;
var menuArray = [];

function init() 
{
  inputNumberOfPoints = document.querySelector("#nrPontos");
  inputPointsArea = document.querySelector("#areaConjuntoPontos");
  outputResult = document.querySelector("#resultado");
  selectMenu = document.querySelector("#menuSelecao");

  menuArray = [
    {
      name: "translacao",
      val: document.querySelector("#menuTranslacao"),
    },
    {
      name: "escala",
      val: document.querySelector("#menuEscala"),
    },
    {
      name: "rotacao",
      val: document.querySelector("#menuRotacao"),
    },
    {
      name: "reflexao",
      val: document.querySelector("#menuReflexao"),
    },
  ];

  // Verify select menu
  checkSelectMenu();

}

function checkSelectMenu() {
  for (var i = 0; i < menuArray.length; i++) {
    if (menuArray[i].name === selectMenu.value) {
      menuArray[i].val.style.display = "inline-block";
    } else {
      menuArray[i].val.style.display = "none";
    }
  }
}

function createPoints() 
{
  numberOfPoints = inputNumberOfPoints.value;

  // Clear inputPointsArea div
  inputPointsArea.innerHTML = "";

  if(numberOfPoints <= 0) 
  {

    var warn = document.createTextNode("<div class='alert alert-danger'>Must be a number higher than 0</div>");
    var warnElement = document.createElement("div");
    warnElement.innerHTML = warn.textContent;

    inputPointsArea.appendChild(warnElement);

    return;
  }

  for(var i = 0; i < numberOfPoints; i++) 
  {

    var labelText = document.createTextNode(""
      + "<br/><div class='row'>"
      + "<div class='col-12'> "
      + "<label>Conjunto "+ (i + 1) + "</label> "
      + "</div> "
    + "</div> ");

    labelDiv = document.createElement("div")
    labelDiv.innerHTML = labelText.textContent;
    inputPointsArea.appendChild(labelDiv);


    nodeToInsert = document.createElement("div")
    nodeToInsert.innerHTML = divContent.textContent;
    inputPointsArea.appendChild(nodeToInsert);
  }
}

function createArray() 
{

  // Check all created arrays 
  var arraysOfX = document.querySelectorAll(".arrayValX");
  var arraysOfY = document.querySelectorAll(".arrayValY");
  var arraysOfZ = document.querySelectorAll(".arrayValZ");

  // Clear matrixes before repopulating it
  matrixes = [];
    
  for(var i = 0; i < numberOfPoints; i++) 
  {
    
    x = parseFloat(arraysOfX[i].value);
    y = parseFloat(arraysOfY[i].value);
    z = parseFloat(arraysOfZ[i].value);

    matrixes.push([x, y, z]);

  }
}

function performTranslate() 
{
  outputResult.innerHTML = "";

  var t = { x: 0, y: 0, z: 0 };

  t.x = parseFloat(document.querySelector('#tX').value);
  t.y = parseFloat(document.querySelector('#tY').value);
  t.z = parseFloat(document.querySelector('#tZ').value);

  for(var i = 0; i < matrixes.length; i++) {

    // Start off with previous transformations values if they exist
    var r = { x: 0, y: 0, z: 0 };

    r.x = matrixes[i][0] + t.x;
    r.y = matrixes[i][1] + t.y;
    r.z = matrixes[i][2] + t.z;
    
    // Update matrixes too
    matrixes[i][0] = r.x;
    matrixes[i][1] = r.y;
    matrixes[i][2] = r.z;

    // Print result
    printResult(r, i);

  }

}
function performScale() 
{
	outputResult.innerHTML = "";

  var t = { x: 0, y: 0, z: 0 };

  t.x = parseFloat(document.querySelector('#sX').value);
  t.y = parseFloat(document.querySelector('#sY').value);
  t.z = parseFloat(document.querySelector('#sZ').value);


  for(var i = 0; i < matrixes.length; i++) {

    var r = { x: 0, y: 0, z: 0 };
    r.x = matrixes[i][0] * t.x;
    r.y = matrixes[i][1] * t.y;
    r.z = matrixes[i][2] * t.z;

    // Update matrixes too
    matrixes[i][0] = r.x;
    matrixes[i][1] = r.y;
    matrixes[i][2] = r.z;
    

    // Print result
    printResult(r, i);

  }
}

function performXRotation() 
{
	outputResult.innerHTML = "";

  var angle = 0;

  angle = parseFloat(document.querySelector('#ang').value);

  for(var i = 0; i < matrixes.length; i++) {

    var r = { x: 0, y: 0, z: 0 };
	
    r.x = matrixes[i][0];
    r.y = (matrixes[i][1] * Math.cos(angle)) - (matrixes[i][2]* Math.sin(angle));
    r.z = (matrixes[i][1] * Math.sin(angle)) + (matrixes[i][2] * Math.cos(angle));
    
    // Update matrixes too
    matrixes[i][0] = r.x;
    matrixes[i][1] = r.y;
    matrixes[i][2] = r.z;

    // Print result
    printResult(r, i);

  }
}

function performYRotation() 
{
	outputResult.innerHTML = "";

  var angle = 0;

  angle = parseFloat(document.querySelector('#ang').value);

  for(var i = 0; i < matrixes.length; i++) {

    var r = { x: 0, y: 0, z: 0 };
	
    r.x = (matrixes[i][2] * Math.sin(angle)) + (matrixes[i][0] * Math.cos(angle));
    r.y = matrixes[i][1];
    r.z = (matrixes[i][2] * Math.cos(angle)) - (matrixes[i][0] * Math.sin(angle));
    
    // Update matrixes too
    matrixes[i][0] = r.x;
    matrixes[i][1] = r.y;
    matrixes[i][2] = r.z;

    // Print result
    printResult(r, i);

  }
}

function performZRotation() 
{
	outputResult.innerHTML = "";

  var angle = 0;

  angle = parseFloat(document.querySelector('#ang').value);
  
  for(var i = 0; i < matrixes.length; i++) {

    var r = { x: 0, y: 0, z: 0 };
	
    r.x = (matrixes[i][0] * Math.cos(angle)) - (matrixes[i][1] * Math.sin(angle));
    r.y = (matrixes[i][0] * Math.sin(angle)) + (matrixes[i][1] * Math.cos(angle));
    r.z = matrixes[i][2];
    
    // Update matrixes too
    matrixes[i][0] = r.x;
    matrixes[i][1] = r.y;
    matrixes[i][2] = r.z;

    // Print result
    printResult(r, i);

  }
}

function performXYReflexion() 
{
	outputResult.innerHTML = "";

  angle = parseFloat(document.querySelector('#ang').value);
  
  for(var i = 0; i < matrixes.length; i++) {

	
    r.x = matrixes[i][0] * -1;
    r.y = matrixes[i][1] * -1;
    r.z = matrixes[i][2];
    
    // Update matrixes too
    matrixes[i][0] = r.x;
    matrixes[i][1] = r.y;
    matrixes[i][2] = r.z;

    // Print result
    printResult(r, i);

  }
}

function performXZReflexion() 
{
	outputResult.innerHTML = "";

  angle = parseFloat(document.querySelector('#ang').value);
  
  for(var i = 0; i < matrixes.length; i++) {

    var r = { x: 0, y: 0, z: 0 };
	
    r.x = matrixes[i][0] * -1;
    r.y = matrixes[i][1];
    r.z = matrixes[i][2] * -1;
    
    // Update matrixes too
    matrixes[i][0] = r.x;
    matrixes[i][1] = r.y;
    matrixes[i][2] = r.z;

    // Print result
    printResult(r, i);

  }
}

function performYZReflexion() 
{
	outputResult.innerHTML = "";

  angle = parseFloat(document.querySelector('#ang').value);
  
  for(var i = 0; i < matrixes.length; i++) {

    var r = { x: 0, y: 0, z: 0 };
	
    r.x = matrixes[i][0];
    r.y = matrixes[i][1] * -1;
    r.z = matrixes[i][2] * -1;
    
    // Update matrixes too
    matrixes[i][0] = r.x;
    matrixes[i][1] = r.y;
    matrixes[i][2] = r.z;

    // Print result
    printResult(r, i);

  }
}

// Helper functions

function printResult(r, i) 
{

  var labelText = document.createTextNode(""
      + "<br/><div class='row'>"
      + "<div class='col-12'> "
      + "<label>Conjunto "+ (i + 1) + "</label> "
      + "</div> "
    + "</div> ");

  var labelDiv = document.createElement("div");
  labelDiv.innerHTML = labelText.textContent;
  outputResult.appendChild(labelDiv);


  var content = document.createElement("div");
  content.innerHTML = ""
  + "<br/> x: " + r.x
  + "<br/> y: " + r.y
  + "<br/> z: " + r.z;

  outputResult.appendChild(content);

}

// Input of points to create template
var divContent = document.createTextNode(""
+ "<div class='row'>"
  + "<div class='col-4'> " 
    + "<label for='address2'>X: </label> " 
    + "<input " 
      + "type='text' "  
      + "class='form-control arrayValX' "  
      + "onchange='createArray();' " 
    + " /> " 
  + "</div> " 

  + "<div class='col-4'> " 
    + "<label for='address2'>Y: </label> " 
    + "<input " 
      + "type='text' " 
      + "class='form-control arrayValY' " 
      + "onchange='createArray();' "
    + " /> " 
  + "</div> " 

  + "<div class='col-4'> " 
      + "<label for='address2'>Z: </label> " 
      + "<input " 
        + "type='text' " 
        + "class='form-control arrayValZ' " 
        + "onchange='createArray();' " 
      + " /> "
  + "</div> " 
+ "</div> ");




