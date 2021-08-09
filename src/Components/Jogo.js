import{ React, useState, useEffect } from 'react';
import './Jogo.css';


function verificaGanhador(itemMatriz) {
    if (itemMatriz[0][0] === itemMatriz[0][1] && itemMatriz[0][1] === itemMatriz[0][2]) {
        return itemMatriz[0][0]/* Verifica se linhaMatriz na posição 0,1,2 tem o mesmo valor e retorna o */
    }
    else if (itemMatriz[1][0] === itemMatriz[1][1] && itemMatriz[1][1] === itemMatriz[1][2]) {
        return itemMatriz[1][0]
    }
    else if (itemMatriz[2][0] === itemMatriz[2][1] && itemMatriz[2][1] === itemMatriz[2][2]) {
        return itemMatriz[2][0]
    }
    else if (itemMatriz[0][0] === itemMatriz[1][0] && itemMatriz[1][0] === itemMatriz[2][0]) {
        return itemMatriz[0][0]/* Verifica se os valores da coluna são iguais */
    }
    else if (itemMatriz[0][1] === itemMatriz[1][1] && itemMatriz[1][1] === itemMatriz[2][1]) {
        return itemMatriz[0][1]
    }
    else if (itemMatriz[0][2] === itemMatriz[1][2] && itemMatriz[1][2] === itemMatriz[2][2]) {
        return itemMatriz[0][2]
    }
    else if (itemMatriz[0][0] === itemMatriz[1][1] && itemMatriz[1][1] === itemMatriz[2][2]) {
        return itemMatriz[0][0]/* Verifica se na diagonal os valores são iguais */
    }
    else if (itemMatriz[0][2] === itemMatriz[1][1] && itemMatriz[1][1] === itemMatriz[2][0]) {
        return itemMatriz[0][2]
    }
    else {
        return null 
    }
}

export default function Jogar() {
    const matriz = [ /* Linhas e Colunas do Jogo */
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
    
    const [valor, setValor] = useState('X'); /* Valor inicial passado pelo useState como X*/
    const [itemMatriz, setItemMatriz] = useState (matriz); /* itemMatriz recebe a matriz */

    const limpaJogo = () => { /* Função para retornar a matriz no modelo inicial */
        setItemMatriz(matriz);
        setValor('X');
    }

    useEffect(() => {
        document.title = `Vez do jogador ${valor}!`;
        let vencedor = verificaGanhador(itemMatriz);/* vencedor recebe matriz no estado atual para verificar o momento de se manifestar */
        if(vencedor != null) {/* Quando houver vencedor imprima a mensagem */
            alert('Vencedor é o player "' + vencedor + '"')
            limpaJogo()
        }
    });

    const elementos = (posicaoLinha, posicaoColuna) => {/* Posição linha clicada e coluna clicada */     
        if(itemMatriz[posicaoLinha][posicaoColuna] == null) {/* Se a posição clicada for null, a magtriz recebe valor */
            itemMatriz[posicaoLinha][posicaoColuna] = valor
            if (valor === 'X') {
                setValor('O')
            } else if (valor === 'O') {
                setValor('X')
            }
        }
    }       
    return (
        <div className='container'>
            <div >
                <h1>Vez do jogador: <span className='valor'>{valor}</span></h1>
        
                {itemMatriz.map((linha, index) => /* map percorrendo cada linha */
                    <div className='row'>
                        {linha.map((item, itemIndex) => /* map percorrendo coluna */
                            <p onClick={() => elementos(index, itemIndex)}>{item}</p>
                        )}
                    </div>
                )}
                <button className='play' onClick={() => {/* Chamada da função que retorna a matriz para seu estado inicial */
                    limpaJogo()
                }}>Recomeçar Jogo</button>        
            </div>
        </div>
        
        ) 
    }