function calculateComparison() {
    const priceA = parseFloat(document.getElementById('priceA').value);
    const piecesA = parseFloat(document.getElementById('piecesA').value) || 1;
    let unitA = parseFloat(document.getElementById('unitA').value);
    const typeA = document.getElementById('typeA').value;

    const priceB = parseFloat(document.getElementById('priceB').value);
    const piecesB = parseFloat(document.getElementById('piecesB').value) || 1;
    let unitB = parseFloat(document.getElementById('unitB').value);
    const typeB = document.getElementById('typeB').value;

    const boxA = document.getElementById('boxA');
    const boxB = document.getElementById('boxB');
    const finalResult = document.getElementById('finalResult');

    // เคลียร์คลาสและเอฟเฟกต์เก่าออกก่อน
    boxA.classList.remove('winner', 'best-deal');
    boxB.classList.remove('winner', 'best-deal');
    finalResult.style.display = 'block';

    if (!priceA || !unitA || !priceB || !unitB || unitA <= 0 || unitB <= 0 || piecesA <= 0 || piecesB <= 0) {
        finalResult.innerText = "⚠️ กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน";
        finalResult.style.background = "#fff1f2";
        finalResult.style.color = "#e11d48";
        return;
    }

    let baseUnitA = unitA;
    let baseUnitB = unitB;
    if (typeA === 'kg' || typeA === 'l') baseUnitA = unitA * 1000;
    if (typeB === 'kg' || typeB === 'l') baseUnitB = unitB * 1000;

    const totalA = piecesA * baseUnitA;
    const totalB = piecesB * baseUnitB;

    const rateA = priceA / totalA;
    const rateB = priceB / totalB;

    document.getElementById('resultA').innerText = `เฉลี่ย ${rateA.toFixed(3)} บาท/หน่วย`;
    document.getElementById('resultB').innerText = `เฉลี่ย ${rateB.toFixed(3)} บาท/หน่วย`;

    if (rateA < rateB) {
        boxA.classList.add('winner', 'best-deal');
        const percent = (((rateB - rateA) / rateB) * 100).toFixed(1);
        finalResult.innerText = `🎉 สินค้า A คุ้มค่ากว่า! (ประหยัดได้ ${percent}%)`;
        finalResult.style.background = "#ecfdf5";
        finalResult.style.color = "#047857";
    } else if (rateB < rateA) {
        boxB.classList.add('winner', 'best-deal');
        const percent = (((rateA - rateB) / rateA) * 100).toFixed(1);
        finalResult.innerText = `🎉 สินค้า B คุ้มค่ากว่า! (ประหยัดได้ ${percent}%)`;
        finalResult.style.background = "#ecfdf5";
        finalResult.style.color = "#047857";
    } else {
        finalResult.innerText = "⚖️ ทั้งสองตัวเลือกคุ้มค่าเท่ากัน!";
        finalResult.style.background = "#fffbe6";
        finalResult.style.color = "#d97706";
    }
}
