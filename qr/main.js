document.getElementById('generate-btn').addEventListener('click', function() {
    const qrInput = document.getElementById('qr-input').value;
    const qrCodeContainer = document.getElementById('qr-code');
    qrCodeContainer.innerHTML = ''; // Clear previous QR code
    const qrcode = new QRCode(qrCodeContainer, {
        text: qrInput,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
    // Optionally, you can add a download button
    const downloadBtn = document.createElement('button');
    downloadBtn.innerText = 'Download QR Code';
    downloadBtn.addEventListener('click', function() {
        const canvas = qrCodeContainer.querySelector('canvas');
        if (canvas) {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'qrcode.png';
            link.click();
        }
    });
    qrCodeContainer.appendChild(downloadBtn);
    // Optionally, you can add a copy to clipboard button
    const copyBtn = document.createElement('button');
    copyBtn.innerText = 'Copy to Clipboard';
    copyBtn.addEventListener('click', function() {
        const canvas = qrCodeContainer.querySelector('canvas');
        if (canvas) {
            canvas.toBlob(function(blob) {
                const item = new ClipboardItem({ 'image/png': blob });
                navigator.clipboard.write([item]).then(function() {
                    alert('QR Code copied to clipboard!');
                }, function(error) {
                    console.error('Error copying QR Code to clipboard:', error);
                });
            });
        }
    });
    qrCodeContainer.appendChild(copyBtn);
    // Optionally, you can add a print button
    const printBtn = document.createElement('button');
    printBtn.innerText = 'Print QR Code';
    printBtn.addEventListener('click', function() {
        const canvas = qrCodeContainer.querySelector('canvas');
        if (canvas) {
            const printWindow = window.open('', '_blank');
            printWindow.document.write('<html><head><title>Print QR Code</title></head><body>');
            printWindow.document.write('<img src="' + canvas.toDataURL('image/png') + '" />');
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.print();
        }
    });
    qrCodeContainer.appendChild(printBtn);
    // Optionally, you can add a clear button
    const clearBtn = document.createElement('button');
    clearBtn.innerText = 'Clear QR Code';
    clearBtn.addEventListener('click', function() {
        qrCodeContainer.innerHTML = ''; // Clear QR code
        document.getElementById('qr-input').value = ''; // Clear input field
        document.getElementById('generate-btn').disabled = true; // Disable button
    });
    qrCodeContainer.appendChild(clearBtn);
});
document.getElementById('qr-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('generate-btn').click();
    }
});
document.getElementById('qr-input').addEventListener('input', function() {
    const qrInput = document.getElementById('qr-input').value;
    if (qrInput.length > 0) {
        document.getElementById('generate-btn').disabled = false;
    } else {
        document.getElementById('generate-btn').disabled = true;
    }
});
document.getElementById('generate-btn').disabled = true; // Disable button initially