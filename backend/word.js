const revealChars = (callback) => {
    const interval = 3000;
    const gword = 'subhadra';

    const len = gword.length;
    let reveal = Array(len).fill('_');

    const revealChar = () => {
        const remainingIndices = reveal.map((char, index) => char === '_' ? index : -1).filter(index => index !== -1);

        if (remainingIndices.length > 0) {
            const randomIndex = remainingIndices[Math.floor(Math.random() * remainingIndices.length)];
            reveal[randomIndex] = gword[randomIndex];
            let a = reveal.join(' ')
            callback(a);
        } else {
            // clearInterval(revealInterval);
        }
    };

    const revealInterval = setInterval(revealChar, interval);

    return () => clearInterval(revealInterval);
};

export { revealChars };
