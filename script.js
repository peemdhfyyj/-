function calculateCost() {
    const priceA = parseFloat(document.getElementById('priceA').value);
    const quantityA = parseFloat(document.getElementById('quantityA').value) || 1;
    const unitAmountA = parseFloat(document.getElementById('unitAmountA').value);
    const unitTypeA = document.getElementById('unitTypeA').value;

    const priceB = parseFloat(document.getElementById('priceB').value);
    const quantityB = parseFloat(document.getElementById('quantityB').value) || 1;
    const unitAmountB = parseFloat(document.getElementById('unitAmountB').value);
    const unitTypeB = document.getElementById('unitTypeB').value;

    const resultBox = document.getElementById('result-summary');
    const badgeA = document.querySelector('#boxA .badge-winner');
    const badgeB = document.querySelector('#boxB .badge-winner');
    const boxA = document.getElementById('boxA');
    const boxB = document.getElementById('boxB');

    // รีเซ็ตสถานะเดิมก่อนคำนวณใหม่
    badgeA.style.display = 'none';
    badgeB.style.display = 'none';
    boxA.classList.remove('winner-card');
    boxB.classList.remove('winner-card');

    // ตรวจสอบว่ากรอกข้อมูลครบหรือไม่
    if (!priceA || !unitAmountA || !priceB || !unitAmountB) {
        resultBox.style.display = 'block';
        resultBox.style.background = '#ffebee';
        resultBox.style.color = '#c62828';
        resultBox.innerText = '⚠️ กรุณากรอกข้อมูลราคาและปริมาณให้ครบถ้วนครับ';
        return;
    }

    // แปลงเป็นหน่วยฐาน (กรัม หรือ มิลลิลิตร)
    let totalUnitA = quantityA * unitAmountA;
    if (unitTypeA === 'kg' || unitTypeA === 'l') totalUnitA *= 1000;

    let totalUnitB = quantityB * unitAmountB;
    if (unitTypeB === 'kg' || unitTypeB === 'l') totalUnitB *= 1000;

    // คำนวณราคาต่อ 1 หน่วย
    const unitPriceA = priceA / totalUnitA;
    const unitPriceB = priceB / totalUnitB;

    resultBox.style.display = 'block';

    // เปรียบเทียบผลลัพธ์
    if (Math.abs(unitPriceA - unitPriceB) < 0.0001) {
        resultBox.style.background = '#e3f2fd';
        resultBox.style.color = '#1565c0';
        resultBox.innerText = '⚖️ ทั้งสองสินค้าคุ้มค่าเท่ากันเลยครับ!';
    } else if (unitPriceA < unitPriceB) {
        const diffPercent = (((unitPriceB - unitPriceA) / unitPriceB) * 100).toFixed(1);
        resultBox.style.background = '#e8f5e9';
        resultBox.style.color = '#2e7d32';
        resultBox.innerText = `🎉 สินค้า A คุ้มค่ากว่าประมาณ ${diffPercent}%`;

        badgeA.style.display = 'block';
        boxA.classList.add('winner-card');
    } else {
        const diffPercent = (((unitPriceA - unitPriceB) / unitPriceA) * 100).toFixed(1);
        resultBox.style.background = '#e8f5e9';
        resultBox.style.color = '#2e7d32';
        resultBox.innerText = `🎉 สินค้า B คุ้มค่ากว่าประมาณ ${diffPercent}%`;

        badgeB.style.display = 'block';
        boxB.classList.add('winner-card');
    }
}
