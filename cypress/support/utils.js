function name(){
    const numeroAleatorio = Math.floor(Math.random() * 100); 
    return `Teste ${numeroAleatorio.toString().padStart(2, '0')}`;
}

function type(){
    const list = ["amigo", "família", "trabalho", "faculdade", "atendente", "dentista", "mecanico", "cabeleleiro", "medico", "professor", "academia"]
    const min = 0;
    const max = list.length - 1;
    const index = Math.floor(Math.random() * (max - min + 1)) + min;
    
    return list[index]
}

function phone(){
    const max = 9;
    const min = 0;
    let numberPhone = "(92)9 "
    for(let i = 0; i < 8; i++){
       const value = Math.floor(Math.random() * (max - min + 1)) + min;
       numberPhone += value.toString();
    }

    return numberPhone
}

function coordinates(){
    const data = {
        "sp": [
            -23.5505,
            -46.6333
        ],
        "rj": [
            -22.9068,
            -43.1729
        ],
        "df": [
            -15.7801,
            -47.9292
        ],
        "ssa": [
            -12.9714,
            -38.5014
        ],
        "bh": [
            -19.9191,
            -43.9386
        ]
    }

    const list = ["sp", "rj", "df", "ssa", "bh"]
    const min = 0
    const max = 4
    const index = Math.floor(Math.random() * (max - min + 1)) + min;
   
    const key = list[index]

    return data[key];
}

module.exports = {
    name,
    type,
    phone,
    coordinates
};