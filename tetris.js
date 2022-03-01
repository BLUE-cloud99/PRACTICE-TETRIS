//落ちるスピード//
const GAME_SPEED =300;


//フィールドサイズ  W:横10,H:縦20 画面範囲にブロックがいくつおけるかどうか設定//
const FIELD_W =10;  
const FIELD_H =20;




//ブロック１つのサイズ指定//
const BLOCK_SIZE=30; 

//スクリーンサイズpxサイズで定義(),W＝wigth  H=height//
const SCREEN_W =BLOCK_SIZE *FIELD_W;
const SCREEN_H =BLOCK_SIZE *FIELD_H;


//テトロミノ1辺の大きさ//
const TETRO_SIZE=4;

//html内のcanvasタグからcanvas 図を描く能力を持ってきた）//
//documentは画面全体を指す//
let can =document.getElementById("can");

//描く図を2次元に指定。(図を描くとき必要)
let con =can.getContext("2d");

//背景画面の縦（height）、横(width)を出力//
can.width = SCREEN_W;
can.height= SCREEN_H;

//スクリーンの枠組みを出力//
can.style.border="4px solid #555";


//それぞれのテトロミノの色//
const TETRO_COLORS=
[
  "#000",          //0空
  "#0cf",          //1水色
  "#f60",          //2オレンジ
  "#30c",          //3青
  "#96f",          //4紫
  "#fd2",          //5黄色
  "#f44",          //6赤
  "#0c3",          //7緑
];



const TETRO_TYPES=[

  [],          //0.空っぽ

  [            //1.Iミノ
    [0,0,0,0],
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0]
  ],
  [           //2.Lミノ
    [0,1,0,0],
    [0,1,0,0],
    [0,1,1,0],
    [0,0,0,0]
  ],
  [          //3.Jミノ
    [0,0,1,0],
    [0,0,1,0],
    [0,1,1,0],
    [0,0,0,0]
  ],
  [         //4.Tミノ
    [0,1,0,0],
    [0,1,1,0],
    [0,1,0,0],
    [0,0,0,0]
  ],
  [         //5.Oミノ
    [0,0,0,0],
    [0,1,1,0],
    [0,1,1,0],
    [0,0,0,0]
  ],
  [         //6.Zミノ
    [0,0,0,0],
    [1,1,0,0],
    [0,1,1,0],
    [0,0,0,0]
  ],
  [         //7.Sミノ
    [0,0,0,0],
    [0,0,1,1],
    [0,1,1,0],
    [0,0,0,0]
  ]
];

//初期位置//
const START_X=FIELD_W/2-TETRO_SIZE/2;
const START_Y=0;


//テトロミノ本体//
let tetro;


//テトロミノの形//
let tetro_t;


//テトロミノのゲーム開始の座標//
let tetro_x=START_X;
let tetro_y=START_Y;



//フィールド本体//
let field =[];

//ゲームオーバーフラグ//
let over=false;


//テトロミノのランダム選出//
tetro_t =Math.floor(Math.random()*(TETRO_TYPES.length-1) )+1;

tetro=TETRO_TYPES[tetro_t];


//これらの関数を使うことを宣言//
init();
drawAll();


setInterval(dropTetro,GAME_SPEED);




//フィールド初期化//
function init()
{
  for(let y=0;y<FIELD_H;y++)
  {
    field[y]=[]; 
    for(let x=0;x<FIELD_W;x++)
    {
      field[y][x]=0;
    }
  }


  //ブロック表示されるかのテスト用////
  //field[5][8] =1;
}






//ブロック1つを描画する//
function drawBlock(x,y,c)
{
  let px=x*BLOCK_SIZE;
  let py=y*BLOCK_SIZE;
        
   //図形の中に塗る色の設定//
  con.fillStyle=TETRO_COLORS[c];

   //(x軸,y軸,横幅（ｘ）、縦の長さ（ｙ）)色が塗られた1つの四角形を描く//
  con.fillRect(px,py,BLOCK_SIZE,BLOCK_SIZE);
        
    //ブロックの枠の色指定//
  con.strokeStyle="black";

    //ブロックの色を塗る指定//
   //fill＝塗りつぶし、stroke=線//
  con.strokeRect(px,py,BLOCK_SIZE,BLOCK_SIZE);

}



//全部描画する draw関数は図形を動かす時にいる。
function drawAll()
{
  //ミノを動かした時に残るブロックを消す。
  con.clearRect(0,0,SCREEN_W,SCREEN_H);
  

  for(let y=0;y<FIELD_H;y++)
  {

    for(let x=0;x<FIELD_W;x++)
    {
        if(field [y][x])
        {
        
           //フィールドのブロック描画する//  
          drawBlock(x,y, field[y][x] );
    
        }
    }
  }


  //テトロミノを表示する draw関数は図形を動かす時にいる。ループの役割//

  for(let y=0;y<TETRO_SIZE;y++)
  {

    for(let x=0;x<TETRO_SIZE;x++)
    {
        if(tetro [y][x])
        {
         //テトロミノ描画する//  
        drawBlock(tetro_x+x,tetro_y+y,tetro_t);
        }
    
    }
  }

  if(over)
  {
    let s="GAME OVER";
    con.font="40px'MSゴシック'";
    let w=con.measureText(s).width;
    let x=SCREEN_W/2-w/2;
    let y=SCREEN_H/2-20;
    con.lineWidth =4
    con.strokeText(s,x,y);
    con.fillStyle="white"
    con.fillText(s,x,y);
  }

}

//ブロックの衝突判定//  ?部分
function checkMove(mx,my,newtetro) 
{
    if (newtetro==undefined) 
    {
      newtetro=tetro;
    }

    for(let y=0;y<TETRO_SIZE;y++)
    {
      for(let x=0;x<TETRO_SIZE;x++)
      {
        if(newtetro[y][x])
        {
          let nx=tetro_x+mx+x;
          let ny=tetro_y+my+y;
          
            if( ny<0 || 
              nx<0 ||
              ny>=FIELD_H ||
              nx>=FIELD_W ||
              field[ny][nx] )
            {
              return false;
            }
          
          
      
        }

      }
    
    }
    return true;
}


//テトロミノの回転//
function rotate()
{
  let newtetro =[];//初期化操作[]←で初期化になる。//

  for(let y=0;y<TETRO_SIZE;y++)
  {
    newtetro[y]=[];
    for(let x=0;x<TETRO_SIZE;x++)
    {
      newtetro[y][x]=tetro[TETRO_SIZE-x-1][y];
    }
  }
  
  return newtetro;
}

//底に落ちたテトロミノを固定//
function fixTetro()
{
  for(let y=0;y<TETRO_SIZE;y++)
  {
    for(let x=0;x<TETRO_SIZE;x++)
    {
      if(tetro[y][x])
      {
        field[tetro_y+y][tetro_x+x]=tetro_t;
      }
    }
  }
}

//ラインがそろったか、チェックして消す。
function checkLine()
{
  let linec=0;

  for(let y=0;y<FIELD_H;y++)
  {
    let flag=true;
    for(let x=0;x<FIELD_W;x++)
    {
      //!は反対を表す=0//
      //フィールドの中に０以外の数字が入ってない場合//
      if(!field[y][x])
      {
        flag=false;
        break
      }
    }
    //フィールドの中に０以外の数字は入った場合//

    if(flag)
    {
      linec++;

      for(let ny=y;ny>0;ny--)
      {
        for(let nx=0;nx<FIELD_W;nx++)
        {
          //横ラインブロック消す//
            field[ny][nx]=field[ny-1][nx];

        }

      }


    }
  }
}





//ブロック落ちる処理//
function dropTetro()
{
  if(over)return;

  //下に障害物がなかったら下に1マス進む。//
  if(checkMove(0,1))tetro_y++;
  else
  {
  //下に障害物があったらそこで止まる//
    fixTetro();
    checkLine();
  //新たなテトロミノが上から落ちてくる//
    tetro_t =Math.floor(Math.random()*(TETRO_TYPES.length-1))+1;
    tetro=TETRO_TYPES[tetro_t];
    tetro_x=START_X;
    tetro_y=START_Y;


    //テトロミノが置けない場合//
    if(!checkMove(0,0))
    {
      over=true;

    }
  }
  drawAll();
  
  
}




//キーボードが押された時の処理//
document.onkeydown=function(e)
{
    if(over)return;
// onkeydown  key 検索(キーボードはそれぞれ数字で表されている。なので調べる。)

    //switch文はif文みたいなやつ  case(この場合は)の後は:、break(止めるやつ大事)の後は;//
    switch(e.keyCode)  
    {
    case 37://左//
        if(checkMove(-1,0))tetro_x--;
        break;
    case 38://上//
      if(checkMove(0,-1))tetro_y--;
        break;
    case 39://右//
      if(checkMove(1,0))tetro_x++;
        break;
    case 40://下//
      if(checkMove(0,1))tetro_y++;
        break;
    case 32://スペース//
        let newtetro=rotate();
        if(checkMove(0,0,newtetro)) tetro= newtetro;
        break;
    }
     //ミノが動いた後も表示させるやつ//
    drawAll();
}