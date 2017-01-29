function Background() {
    var me = this;

    this.x = 0;
    this.y = 0;

    var selectedSymbolImage;

    this.background = new PIXI.Container();

    var backImage = PIXI.Sprite.fromImage('resources/img/bg.png');

    me.background.addChild(backImage);

    me.background.x = me.x;
    me.background.y = me.y;

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

    this.yourSymbolText = new PIXI.Text('Your Symbol:', me.style);
    me.yourSymbolText.x = 80;
    me.yourSymbolText.y = 460;
    me.background.addChild(me.yourSymbolText);

    this.changeSymbolText = new PIXI.Text('Change Symbol:', me.style);
    me.changeSymbolText.x = 500;
    me.changeSymbolText.y = 460;
    me.background.addChild(me.changeSymbolText);

    this.update = function () {
            changeBtn.visible = true;
            changeBtnNotAvailable.visible = false;
            if (selectedSymbolImage === undefined){
                selectedSymbolImage = PIXI.Sprite.fromImage(selectedSymbol);
                selectedSymbolImage.position.x = 350;
                selectedSymbolImage.position.y = 440;
                selectedSymbolImage.scale.x = 0.5;
                selectedSymbolImage.scale.y = 0.5;
                me.background.addChild(selectedSymbolImage);
            } else {
                selectedSymbolImage.destroy();
                selectedSymbolImage = PIXI.Sprite.fromImage(selectedSymbol);
                selectedSymbolImage.position.x = 350;
                selectedSymbolImage.position.y = 440;
                selectedSymbolImage.scale.x = 0.5;
                selectedSymbolImage.scale.y = 0.5;
                me.background.addChild(selectedSymbolImage);
            }
    };

    addListener('symbolSelected', me.update);


    var changeBtn = PIXI.Sprite.fromImage('resources/img/Btn_change.png');
    changeBtn.visible = false;
    changeBtn.interactive = true;
    changeBtn.buttonMode = true;
    changeBtn.position.x = 840;
    changeBtn.position.y = 460;
    me.background.addChild(changeBtn);

    var changeBtnNotAvailable = PIXI.Sprite.fromImage('resources/img/Btn_change_clicked.png');
    changeBtnNotAvailable.visible = true;
    changeBtnNotAvailable.interactive = false;
    changeBtnNotAvailable.position.x = 840;
    changeBtnNotAvailable.position.y = 460;
    me.background.addChild(changeBtnNotAvailable);

    addListener('spinStart', function(){
        changeBtn.visible = false;
        changeBtnNotAvailable.visible = true;
    });

    addListener('spinAvailable', function(){
        changeBtn.visible = true;
        changeBtnNotAvailable.visible = false;
    });



    this.changeClick = function () {
        fireEvent('changeSymbol');
        changeBtn.visible = false;
        changeBtnNotAvailable.visible = true;
    };

    changeBtn.on('pointerdown', me.changeClick);



}
