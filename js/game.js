var game = new Phaser.Game(800,600,Phaser.AUTO,null,{

    preload: preload,
    create: create,
    update: update,
    render: render

});

var plataformas;
var queroQuero;
var queroQueroVoando;
var click;
var estado = 'parado';
var cuias;
var bandeira;

function preload() {
    
    game.load.image('ceu','sprites/sky.png');
    game.load.image('nuvem', 'sprites/nuvem.png')
    game.load.image('chao','sprites/platform.png');
    game.load.image('estrela','sprites/star.png');
    game.load.spritesheet('queroQuero','sprites/quero-quero.png',32,32);
    game.load.spritesheet('queroQueroVoando','sprites/voando.png',35,30);
    game.load.spritesheet('bandeira','sprites/bandeira.png',32,132);
    game.load.spritesheet('cuias','sprites/cuias.png',32,42);

}

function create() {
    
    //FISICA
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    //FUNDO
    game.add.sprite(0,0,'ceu');
    
    //PLATAFORMA
    plataformas = game.add.group();
    plataformas.enableBody = true;

    //CHAO
    var chao = plataformas.create(0,535,'chao');
    chao.scale.setTo(2,2);
    chao.body.immovable = true;

    //NUVEM
    var nuvem = plataformas.create(0,70,'nuvem');
    nuvem.body.immovable = true;
    var nuvem = plataformas.create(240,70,'nuvem');
    nuvem.body.immovable = true;
    var nuvem = plataformas.create(540,70,'nuvem');
    nuvem.body.immovable = true;
    
    //BANDEIRA
    bandeira = game.add.sprite(680,190,'bandeira');
    bandeira.animations.add('bandeira',[0,1,2],5,true);
    bandeira.scale.setTo(2.7,2.7);
    
    //QUERO-QUERO VOANDO
    queroQueroVoando = game.add.sprite(20,250,'queroQueroVoando')
    queroQueroVoando.scale.setTo(2,2);
    queroQueroVoando.inputEnabled = true;
    game.physics.arcade.enable(queroQueroVoando);
    queroQueroVoando.anchor.setTo(0.2, 0.2);
    queroQueroVoando.body.allowRotation = true;
    queroQueroVoando.body.collideWorldBounds = true; 
    queroQueroVoando.animations.add('voando',[0,1],5,true);
    
    //QUERO-QUERO PARADO
    queroQuero = game.add.sprite(0,220,'queroQuero');
    queroQuero.scale.setTo(2,2);
    queroQuero.inputEnabled = true;
    queroQuero.events.onInputDown.add(listener, this);
    game.physics.arcade.enable(queroQuero);
    queroQuero.anchor.setTo(0.2, 0.2);
    queroQuero.body.allowRotation = true;
    queroQuero.body.collideWorldBounds = true; 
    queroQuero.animations.add('parado',[0,1,2],5,true);
    
    //CUIAS
    cuias = plataformas.create(240,220,'cuias'); 
    cuias.body.immovable = true;
    cuias.animations.add('cuiasAnimadas',[0,1,2],8,true);
    cuias.scale.setTo(1,1);
    cuias.enableBody = true;
    
    cuias1 = plataformas.create(340,220,'cuias'); 
    cuias1.body.immovable = true;
    cuias1.animations.add('cuiasAnimadas1',[0,1,2],8,true);
    cuias1.scale.setTo(1,1);
    cuias1.enableBody = true;
    
    cuias2 = plataformas.create(440,220,'cuias'); 
    cuias2.body.immovable = true;
    cuias2.animations.add('cuiasAnimadas2',[0,1,2],8,true);
    cuias2.scale.setTo(1,1);
    cuias2.enableBody = true;
    
    cuias3 = plataformas.create(540,220,'cuias'); 
    cuias3.body.immovable = true;
    cuias3.animations.add('cuiasAnimadas3',[0,1,2],8,true);
    cuias3.scale.setTo(1,1);
    cuias3.enableBody = true;
    
}
function update() {   
    
    bandeira.animations.play('bandeira');
    cuias.animations.play('cuiasAnimadas');
    cuias1.animations.play('cuiasAnimadas1');
    cuias2.animations.play('cuiasAnimadas2');
    cuias3.animations.play('cuiasAnimadas3');
    
    game.physics.arcade.collide(cuias, plataformas);
    game.physics.arcade.collide(cuias1, plataformas);
    game.physics.arcade.collide(cuias2, plataformas);
    game.physics.arcade.collide(cuias3, plataformas);
    
    game.physics.arcade.overlap(queroQueroVoando, cuias,coleta,null,this);
    game.physics.arcade.overlap(queroQueroVoando, cuias1,coleta1,null,this);
    game.physics.arcade.overlap(queroQueroVoando, cuias2,coleta2,null,this);
    game.physics.arcade.overlap(queroQueroVoando, cuias3,coleta3,null,this);
    
    if(estado == 'parado'){
    queroQuero.animations.play('parado');
    game.physics.arcade.collide(queroQuero, plataformas);
    queroQueroVoando.visible = false;
    }
    if(estado == 'voando'){
    queroQuero.visible = false; 
    queroQueroVoando.visible = true;
    queroQueroVoando.animations.play('voando');
    game.physics.arcade.collide(queroQueroVoando, plataformas);
    passaroVoando(click);
    }
}

function render() {
    game.debug.spriteInfo(queroQuero, 32, 32);
}

function listener () {
 click = true;
 estado = 'voando';
}

function passaroVoando(click){
    if(click == true){
    queroQueroVoando.rotation = game.physics.arcade.moveToPointer(queroQueroVoando,1080, game.input.activePointer, 2080);
    }
}

function coleta(queroQueroVoando, cuias){
    cuias.kill();
}
function coleta1(queroQueroVoando, cuias1){
    cuias1.kill();
}
function coleta2(queroQueroVoando, cuias2){
    cuias2.kill();
}
function coleta3(queroQueroVoando, cuias3){
    cuias3.kill();
}