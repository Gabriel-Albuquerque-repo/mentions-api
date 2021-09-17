const universal = require("./eita");

exports.updateLogin = async(oldOne, newOne, collName) => {
    const Login = universal.setCollName(collName) 
    /* 
    CURIOSIDADE
    const OBJ = {
        a: 1, 
        b: 2, 
        c: 3, 
        d: {cara: "burro"},   
        e: [4,5,6]
    }
    const e = Object.entries(OBJ)

    e.forEach(array => {
        console.log(array)
        console.log(typeof(array));
        console.log(Array.isArray(array))
        console.log()
      })
    const index = 4
    const index2 = 1
    console.log()
    console.log(e[index][index2])
    console.log(Array.isArray(e[index][index2]))
    console.log(typeof(e[index][index2]))
    console.log() */


    // TESTANDO VALIDAÇÃO!
    // KKKKKKKKKKKKKKKKKKKK
    // JÁ VEM TRATADA!!!
    /* const vemDoFront = [{
        processo: '1',
        recorrente: 'gabriel', 
        vara: 2,
    },
    {
        processo: '2',
        recorrente: undefined, 
        vara: undefined,
    },
    {
        processo: '3',
        recorrente: undefined, 
        vara: 'minhaVARA',
    }

    ];
    vemDoFront.forEach(object => {
        const searchValuesUnd = Object.values(object);
        const keys = Object.keys(object);

        searchValuesUnd.forEach((value, index) => {
            if(value === undefined){
                delete object[keys[index]]
            }
        })

    })
    console.log(vemDoFront)
    console.log(1)
    console.log()
    console.log(vemDoFront);
    console.log() */

    return await Login.findOneAndUpdate(oldOne, newOne);
}