var imgNames = [];
var selectedSymbol;

getJSON('resources/symbols.json', function (data) {
    var jsonObj = JSON.parse(data);

    for (var k = 0; k < jsonObj.sym.length; k++) {
        imgNames[k] = jsonObj.sym[k].filename;
    }
    var i = 0;
    imgNames.forEach(function (item) {
        if (item) {
            i++;
            if (i === imgNames.length) {
                symbols.init();
                selectSymbol.init();
            }
        }

    });

});

var renderer = PIXI.autoDetectRenderer(960, 536, {transparent: true});

document.body.appendChild(renderer.view);
c = new Charm(PIXI);

var stage = new PIXI.Container();



var back = new Background();
stage.addChild(back.background);



var spinBtn = new SpinBtn();
stage.addChild(spinBtn.spinBtnContainer);

var symbols = new Symbols();


stage.addChild(symbols.symArea);

var winPresentation = new winPresentation();
stage.addChild(winPresentation.textContainer);

var selectSymbol = new selectSymbol();
stage.addChild(selectSymbol.rootContainer);



animate();
function animate() {
    requestAnimationFrame(animate);

    c.update();
    symbols.update();


    renderer.render(stage);
}
