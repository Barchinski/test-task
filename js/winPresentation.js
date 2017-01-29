function winPresentation () {
    var me = this;
    this.textContainer = new PIXI.Container();

    this.winStyle = {
        font : 'bold italic 72px Arial',
        fill : '#1e6718',
        stroke : '#4a1850',
        strokeThickness : 5,
        dropShadow : true,
        dropShadowColor : '#000000',
        dropShadowAngle : Math.PI / 6,
        dropShadowDistance : 6
    };

    this.winText = new PIXI.Text('YOU WIN!', me.winStyle);
    me.winText.x = 290;
    me.winText.y = 290;
    me.winText.visible = false;
    me.textContainer.addChild(me.winText);

    this.looseStyle = {
        font : 'bold italic 48px Arial',
        fill : '#e5a257',
        stroke : '#4a1850',
        strokeThickness : 5,
        dropShadow : true,
        dropShadowColor : '#000000',
        dropShadowAngle : Math.PI / 6,
        dropShadowDistance : 6
    };

    this.looseText = new PIXI.Text('Better luck next time', me.looseStyle);
    me.looseText.x = 230;
    me.looseText.y = 290;
    me.looseText.visible = false;
    me.textContainer.addChild(me.looseText);

    addListener('win', function(){
        me.winText.visible = true;
        fireEvent('spinAvailable');
    });
    addListener('loose', function(){
        me.looseText.visible = true;
        fireEvent('spinAvailable');
    });
    addListener('spinStart', function(){
        me.looseText.visible = false;
        me.winText.visible = false;
    })


}