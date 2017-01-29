function selectSymbol () {
    var me = this;
    this.counter = 0;


    this.rootContainer = new PIXI.Container();
    this.selectSymbolContainer = new PIXI.Container();


    this.back = new PIXI.Graphics();
    me.back.beginFill(0x3B3141, 0.9);
    me.back.drawRect(0, 0, 960, 536);
    me.rootContainer.addChild(me.back);
    me.rootContainer.addChild(me.selectSymbolContainer);

    this.style = {
        font : 'bold italic 36px Arial',
        fill : '#F7EDCA',
        stroke : '#4a1850',
        strokeThickness : 5,
        dropShadow : true,
        dropShadowColor : '#000000',
        dropShadowAngle : Math.PI / 6,
        dropShadowDistance : 6
    };

    this.titleText = new PIXI.Text('Please select your symbol', me.style);
    me.titleText.x = 280;
    me.titleText.y = 60;
    me.rootContainer.addChild(me.titleText);


    var confirmBtn = PIXI.Sprite.fromImage('resources/img/Btn_Go.png');
    confirmBtn.visible = false;
    confirmBtn.interactive = true;
    confirmBtn.buttonMode = true;
    confirmBtn.position.x = 400;
    confirmBtn.position.y = 280;

    this.rootContainer.addChild(confirmBtn);

    var stopBtn = PIXI.Sprite.fromImage('resources/img/Btn_Stop.png');
    stopBtn.visible = true;
    stopBtn.interactive = false;
    stopBtn.position.x = 400;
    stopBtn.position.y = 280;
    this.rootContainer.addChild(stopBtn);

    this.addSymbol = function (symPath, x, y){
        var symbol = PIXI.Sprite.fromImage(symPath);
        symbol.x = x;
        symbol.y = y;
        symbol.scale.x = 0.6;
        symbol.scale.y = 0.6;
        symbol.anchor.x = 0.5;
        symbol.anchor.y = 0.5;
        symbol.interactive = true;
        symbol.name = symPath;
        symbol.buttonMode = true;
        me.selectSymbolContainer.addChild(symbol);
        symbol.on('pointerdown', me.onClick.bind(this, symbol));


        console.log(symPath);

    };

    this.init = function () {
        for (var k = 0; k < imgNames.length; k++) {
            me.addSymbol(imgNames[k], (k+1)*140, 160);

        }

    };

    this.onClick = function (symbol) {

        if ( me.counter  === 0) {
            me.counter++;
            symbol.scale.x = 1;
            symbol.scale.y = 1;
            symbol.zIndex = 2;
            selectedSymbol = symbol.name;
            confirmBtn.visible = true;
            stopBtn.visible = false;


        } else {
            me.selectSymbolContainer.children.forEach(function(item){
                item.scale.x = 0.6;
                item.scale.y = 0.6;
                item.zIndex = 1;
                me.counter = 0;
                selectedSymbol = null;
                confirmBtn.visible = false;
                stopBtn.visible = true;
            });
        }

    };

    this.closeSelectSymbol = function () {
        me.rootContainer.visible = false;
        fireEvent('symbolSelected');
    };

    confirmBtn.on('pointerdown', me.closeSelectSymbol);

    addListener('changeSymbol', function(){
        me.rootContainer.visible = true;
    });






}
