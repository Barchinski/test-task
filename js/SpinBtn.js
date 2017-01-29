function SpinBtn() {
    var me = this;


    this.x = 824;
    this.y = 219;

    this.spinBtnContainer = new PIXI.Container();

    var spinBtnImg = PIXI.Sprite.fromImage('resources/img/BTN_Spin.png');
    spinBtnImg.visible = true;
    spinBtnImg.interactive = true;
    this.spinBtnContainer.addChild(spinBtnImg);


    var spinBtnClickedImg = PIXI.Sprite.fromImage('resources/img/BTN_Spin_d.png');
    spinBtnClickedImg.visible = false;
    spinBtnClickedImg.interactive = true;
    this.spinBtnContainer.addChild(spinBtnClickedImg);

    this.spinBtnContainer.position.x = me.x;
    this.spinBtnContainer.position.y = me.y;

    this.onClick = function () {
        fireEvent('spinStart');
        spinBtnImg.visible = false;
        spinBtnClickedImg.visible = true;
    };

    spinBtnImg.on('pointerdown', me.onClick);


    addListener('spinAvailable', function() {
        spinBtnImg.visible = true;
        spinBtnClickedImg.visible = false;
    });


}
