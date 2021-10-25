var user = "SOR:\\\> ";
var pointer = 0;
var textHistory = [""];
var historyIndex = 0;
var crypt = 0;
var bits = 512;
var key = sor2017;

//tratativas iniciais da tecla enter (13), pra cima (38) ou pra baixo (40), com chamada de funções avançadas. 

function onEnter(keyCode, text){

    if (keyCode == 13){

        document.getElementById("textbox").innerHTML = document.getElementById("textbox").innerHTML + user + text + "<br><br>" ;
	
	document.getElementById("terminal").value = "";

	textHistory[historyIndex] = text;

	historyIndex++; 
	
        pointer = historyIndex;

	main(text, crypt, key);
    
        document.getElementById("textbox").scrollTo(0, document.getElementById("textbox").scrollHeight);

    }

    if (keyCode == 38){

        if (pointer != 0){ 

            pointer--;
          
            document.getElementById("terminal").value = textHistory[pointer];

        }

    }

    if (keyCode == 40){

        if (pointer < historyIndex && historyIndex != 0){ 

            pointer++;
           
            if(pointer < historyIndex){

                document.getElementById("terminal").value = textHistory[pointer];
            }else{

            document.getElementById("terminal").value = "";
   
            }

        }

    }

}

//função para converter texto do terminal em voz

function readBack (text){

        responsiveVoice.speak(text);

}

function setCrypt (CryptBtn){

    if(CryptBtn == "0"){

    crypt = 0;
    document.getElementById("btn1").className = "buttonOn";
    document.getElementById("btn2").className = "buttonOff";
    readBack("Encryption Mode Activated.");
    document.getElementById("textbox").innerHTML = document.getElementById("textbox").innerHTML + "<span style = 'color:yellow';>Encryption Mode Activated.</span><br><br>" ;

    }

    if(CryptBtn == "1"){

    crypt = 1;
    document.getElementById("btn1").className = "buttonOff";
    document.getElementById("btn2").className = "buttonOn";
    readBack("Decryption Mode Activated.");
    document.getElementById("textbox").innerHTML = document.getElementById("textbox").innerHTML + "<span style = 'color:yellow';>Decryption Mode Activated.</span><br><br>" ;

    }

    document.getElementById("textbox").scrollTo(0, document.getElementById("textbox").scrollHeight);

}

function login(){
	
    readBack("Link Established: SOR HeadQuarters Encryption Software Online. Welcome avenger. Select 'CODE' or 'DECODE', and enter the pass key on the menu to the left. Then, type the messege you wish to process on the terminal below and press the enter key.");
	
    document.getElementById("terminal").value = ""; 	

}

function setFocus(){
    
    document.getElementsByTagName("input")[0].setFocus();

}

function changeKey(){

    key = document.getElementsByTagName("input")[0].value;

}

function main(messege, process, codeKey){

    var cryptKey = cryptico.generateRSAKey(codeKey, bits);
    var publicKey = cryptico.publicKeyString(cryptKey);

    if(process == "0"){

	readBack("Encryption completed. Copy the encoded messege below.");

        var encodedText = cryptico.encrypt(messege, publicKey);

        document.getElementById("textbox").innerHTML = document.getElementById("textbox").innerHTML + "<span style = 'color: yellow'>Encryption completed. Copy the encoded messege below.</span><br><br>";

        document.getElementById("textbox").innerHTML = document.getElementById("textbox").innerHTML + "<span style = 'color: orange'>" + encodedText.cipher + "</span><br><br>" ;


    } 

    if(process == "1"){

	readBack("Decryption completed. Copy the decoded messege below.");

        var decodedText = cryptico.decrypt(messege, cryptKey);

        document.getElementById("textbox").innerHTML = document.getElementById("textbox").innerHTML + "<span style = 'color: yellow'>Decryption completed. Copy the decoded messege below.</span><br><br>";

        document.getElementById("textbox").innerHTML = document.getElementById("textbox").innerHTML + "<span style = 'color: lime'>" + decodedText.plaintext + "</span><br><br>" ;

    }

    document.getElementById("textbox").scrollTo(0, document.getElementById("textbox").scrollHeight);

}
