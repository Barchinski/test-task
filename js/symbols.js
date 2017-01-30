function Symbols () {
    var me = this;

    this.state = 'idle';
    this.spin = 'stopped';
    this.winSymbol = 'none';
    this.symArea = new PIXI.Container();

    me.symArea.x = 190;
    me.symArea.y = 30;


    this.addSymbol = function (symPath, x, y, state){
        var symbol = PIXI.Sprite.fromImage(symPath);
        symbol.x = x;
        symbol.y = y;
        symbol.state = state;
        symbol.anchor.x = 0.5;
        symbol.anchor.y = 0.5;
        symbol.zoomed = false;
        symbol.isWin = false;
        symbol.name = symPath;
        me.symArea.addChild(symbol);
        console.log(symPath);

    };
    this.init = function () {
        for (var k = 0; k < imgNames.length; k++) {
            if (k < 3){
                me.addSymbol(imgNames[k], k*235, 60, 'stopped');
            } else if (k === 3) {
                me.addSymbol(imgNames[k], 0, k*70, 'stopped');
            } else if (k === 4) {
                me.addSymbol(imgNames[k], k*60, 210, 'stopped');
            } else {
                me.addSymbol(imgNames[k], k*95, 210, 'stopped');
            }


        }
    };

    this.zoomIn = function(item) {
        c.fadeIn(item);
        //c.breathe(item, 1.1, 1.1, 60);
        c.wobble(item);
    };

    this.zoomOut = function (item) {
        c.fadeOut(item);
        return item.zoomed = false;

    };


    this.startSpin  = function () {
        me.symArea.children.forEach(function(item){
            me.zoomIn(item);
        });
        me.state = 'started';
        me.spin = 'started';
    };

    this.stopSpin = function (){
        if (me.spin === 'started') {
            me.spin = 'stopped';
            for (var i = 0; i < me.symArea.children.length; i++) {
                if (me.symArea.children[i].isWin === false) {
                    me.zoomOut(me.symArea.children[i]);
                } else {
                    me.symArea.children[i].isWin = false;
                }
            }
        }

    };


    this.getWinSymbol = function () {
        var i = parseInt(Math.random()*(5-1)+1);
        me.symArea.children[i].isWin = true;;
        me.winSymbol = me.symArea.children[i];

        setTimeout(function(){
            fireEvent('spinStopping');
        }, 3000);
        setTimeout(function(){
            fireEvent('checkWin');
        }, 4500);

    };

    this.checkWin = function () {
        if (me.winSymbol.name === selectedSymbol){
            fireEvent('win');
        } else {
            fireEvent('loose');
        }
    };


    addListener('spinStart', function() {
        me.state = 'spinning';
        me.getWinSymbol();
    });
    addListener('spinStopping', function() {
        me.state = 'stopping';
    });
    addListener('checkWin', me.checkWin);
    
    this.update = function () {
        if (me.state === 'spinning') {
            me.startSpin();
        }

        if (me.state === 'stopping') {
            me.stopSpin();
        }
        if (me.state === 'started') {

        }
    }
}
