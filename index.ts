interface Operation {
    value: number;
    toString(): string;
}

class Value implements Operation {
    constructor(public readonly value: number) { }

    toString() {
        return this.value.toString();
    }
}

class Sum implements Operation {
    constructor(
        private readonly leftOperation: Operation,
        private readonly rightOperation: Operation
    ) { }

    get value() {
        return this.leftOperation.value + this.rightOperation.value;
    }

    toString() {
        return `(${this.leftOperation.toString()} + ${this.rightOperation.toString()})`;
    }
}

class Subtraction implements Operation {
    constructor(
        private readonly leftOperation: Operation,
        private readonly rightOperation: Operation
    ) { }

    get value() {
        return this.leftOperation.value - this.rightOperation.value;
    }

    toString() {
        return `(${this.leftOperation.toString()} - ${this.rightOperation.toString()})`;
    }
}

class Multiplication implements Operation {
    constructor(
        private readonly leftOperation: Operation,
        private readonly rightOperation: Operation
    ) { }

    get value() {
        return this.leftOperation.value * this.rightOperation.value;
    }

    toString() {
        return `(${this.leftOperation.toString()} * ${this.rightOperation.toString()})`;
    }
}

class Divide implements Operation {
    constructor(
        private readonly leftOperation: Operation,
        private readonly rightOperation: Operation
    ) { }

    get value() {
        return this.leftOperation.value / this.rightOperation.value;
    }

    toString() {
        return `(${this.leftOperation.toString()} / ${this.rightOperation.toString()})`;
    }
}

/*
    Will apply this formula: ((10 + 20) * (5 - 3)) / ((6 + 2) * (4 / 2))
*/
const example1 = new Divide(
    new Multiplication(
        new Sum(
            new Value(10), 
            new Value(20)
        ),
        new Subtraction(
            new Value(5), 
            new Value(3)
        )
    ),
    new Multiplication(
        new Sum(
            new Value(6), 
            new Value(2)
        ),
        new Divide(
            new Value(4), 
            new Value(2)
        )
    )
);

/*
    Will apply this formula: (50 - ((10 * 3) + (8 / 2))) + (20 * (4 + 1))
*/
const example2 = new Sum(
    new Subtraction(
        new Value(50),
        new Sum(
            new Multiplication(
                new Value(10), 
                new Value(3)
            ),
            new Divide(
                new Value(8), 
                new Value(2)
            )
        )
    ),
    new Multiplication(
        new Value(20),
        new Sum(
            new Value(4), 
            new Value(1)
        )
    )
);

/*
    Will apply this formula: ((15 + 5) - (20 / (4 + 1))) * ((10 * 2) + (30 / 6))
*/
const example3 = new Multiplication(
    new Subtraction(
        new Sum(
            new Value(15), 
            new Value(5)
        ),
        new Divide(
            new Value(20), 
            new Sum(
                new Value(4), 
                new Value(1)
            )
        )
    ),
    new Sum(
        new Multiplication(
            new Value(10), 
            new Value(2)
        ),
        new Divide(
            new Value(30), 
            new Value(6)
        )
    )
);

/*
    Will apply this formula: (((30 / 3) + (5 * 2)) - (12 / (4 - 1))) * (25 - (10 + 5))
*/
const example4 = new Multiplication(
    new Subtraction(
        new Sum(
            new Divide(
                new Value(30), 
                new Value(3)
            ),
            new Multiplication(
                new Value(5), 
                new Value(2)
            )
        ),
        new Divide(
            new Value(12), 
            new Subtraction(
                new Value(4), 
                new Value(1)
            )
        )
    ),
    new Subtraction(
        new Value(25),
        new Sum(
            new Value(10), 
            new Value(5)
        )
    )
);

/*
    Will apply this formula: ((100 / (5 + 5)) * ((30 - 10) + (40 / 2))) - (50 * ((6 + 4) / 2))
*/
const example5 = new Subtraction(
    new Multiplication(
        new Divide(
            new Value(100), 
            new Sum(
                new Value(5), 
                new Value(5)
            )
        ),
        new Sum(
            new Subtraction(
                new Value(30), 
                new Value(10)
            ),
            new Divide(
                new Value(40), 
                new Value(2)
            )
        )
    ),
    new Multiplication(
        new Value(50),
        new Divide(
            new Sum(
                new Value(6), 
                new Value(4)
            ),
            new Value(2)
        )
    )
);


const printExample = (example: Operation) => console.log(`${example.toString()} = ${example.value}`);

[example1, example2, example3, example4, example5]
    .forEach(printExample);