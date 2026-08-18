function calculate() {
    const priceA = parseFloat(document.getElementById('priceA').value);
    const quantityA = parseFloat(document.getElementById('quantityA').value) || 1;
    const unitAmountA = parseFloat(document.getElementById('unitAmountA').value);
    const unitTypeA = document.getElementById('unitTypeA').value;

    const priceB = parseFloat(document.getElementById('priceB').value);
    const quantityB = parseFloat(document.getElementById('quantityB').value) || 1;
    const unitAmountB = parseFloat(document.getElementById('unitAmountB').value);
    const unitTypeB = document.getElementById('unitTypeB').value;

    if (!priceA || !unitAmountA || !priceB || !unitAmountB) {
        alert('กรุณากรอกข้อมูลราคาและปริมาณให้ครบถ้วนทั้งสองฝั่งครับ');
        return;
    }

    let totalBaseA = unitAmountA * quantityA;
    if (unitTypeA === 'kg' || unitTypeA === 'l') totalBaseA *= 1000;

    let totalBaseB = unitAmountB * quantityB;
    if (unitTypeB === 'kg' || unitTypeB === 'l') totalBaseB *= 1000;

    const unitPriceA = priceA / totalBaseA;
    const unitPriceB = priceB / totalBaseB;

    const boxA = document.getElementById('boxA');
    const boxB = document.getElementById('boxB');
    const summaryBox = document.getElementById('result-summary');

    summaryBox.style.display = 'block';

    if (unitPriceA < unitPriceB) {
        boxA.classList.add('winner');
        boxB.classList.remove('winner');
        summaryBox.className = 'summary-a';
        summaryBox.innerHTML = '🎉 สินค้า A คุ้มค่ากว่า!';
    } else if (unitPriceB < unitPriceA) {
        boxB.classList.add('winner');
        boxA.classList.remove('winner');
        summaryBox.className = 'summary-b';
        summaryBox.innerHTML = '🚀 สินค้า B คุ้มค่ากว่า!';
    } else {
        boxA.classList.remove('winner');
        boxB.classList.remove('winner');
        summaryBox.className = 'summary-equal';
        summaryBox.innerHTML = '⚖️ ทั้งสองตัวเลือกคุ้มค่าเท่ากัน!';
    }
}
