var chessBoard = {
    cells: [],
}

chessBoard.init = function chessboard (){
    this.element = document.getElementById('board');
    var arr = [" ", 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', " "];
    var number = 9;
    this.board = [];
    for (i=0; i<10; i++){
        this.board.push([]);
        for (j=0; j<10; j++){
            this.board[i].push({});
            this.board[i][j].element = document.createElement('div');
            this.board[i][j].element.classList.add('cell');
            if (i==0 || i==9){
                this.board[i][j].element.classList.add('edge', 'cell');
                this.board[i][j].element.innerHTML = arr[j];
            } else {
                if (j==0 || j==9) {
                    this.board[i][j].element.classList.add('edge', 'cell');
                    this.board[i][j].element.innerHTML = number;
                } else {
                    if ((i%2!=0 & j%2!=0) || (i%2==0 & j%2==0))
                        this.board[i][j].element.classList.add('whiteCell');
                        else 
                            this.board[i][j].element.classList.add('blackCell');
                    switch (i){
                        case 2:
                            this.board[i][j].element.classList.add('blackPawns');
                            break;
                        case 7:
                            this.board[i][j].element.classList.add('whitePawns');
                            break;
                        default:
                            break;  
                    }
                    var color;
                    if (i==1 || i==8){
                        if (i==1) 
                            color = "black";
                            else 
                                color = "white";
                        if (j==1 || j==8)
                        this.board[i][j].element.classList.add(color+'Rook');
                        else if (j==2 || j==7)
                        this.board[i][j].element.classList.add(color+'Knight');
                        else if (j==3 || j==6)
                        this.board[i][j].element.classList.add(color+'Bishop');
                        else if (j==4)
                        this.board[i][j].element.classList.add(color+'Queen');
                        else
                        this.board[i][j].element.classList.add(color+'King');
                    }            
                }
            }
            this.element.appendChild(this.board[i][j].element);
        }number--;
    }
}
chessBoard.init();

