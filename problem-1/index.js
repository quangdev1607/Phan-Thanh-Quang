var sum_to_n_a = function (n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

var sum_to_n_b = function (n) {
    const customArray = Array.from({ length: n }, (_, i) => i + 1);
    const initialValue = 0;
    const sum = customArray.reduce((acc, curr) => acc + curr, initialValue);

    return sum;
};

var sum_to_n_c = function (n) {
    return (n * (n + 1)) / 2;
};
