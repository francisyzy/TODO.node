var rect = require('./rectangle')

function solveRect(l,b){
    console.log("Solve reactangle with length of: " + l + " and breath of: " + b)
    rect(l,b, (err,rectangle) => {
        if(err){
            console.log("ERROR: ", err.message)
        } else {
            console.log("Area of rectange with length of: " + l + " and breath of: " + b + "= " + rectangle.area(l,b))
            console.log("Perimeter of rectange with length of: " + l + " and breath of: " + b + " = " + rectangle.perimeter(l,b))
        }
    })

    console.log("test statement for async programming")
}

solveRect(2,4)
solveRect(3,5)
solveRect(0,2)
solveRect(-5,2)