document.addEventListener('DOMContentLoaded', function() {
    const inputFields = document.querySelectorAll('.input-field');
    
    inputFields.forEach(function(input) {
        input.addEventListener('input', function() {
            const valuePri = parseFloat(document.getElementById('input8').value);
            
            // if (isNaN(valuePri)) {
            //     inputFields.forEach((input, index) => {
            //         if (index > 0) {
            //             const resultSpan = document.getElementById(`result${index}`);
            //             resultSpan.textContent = 'Số không hợp lệ!';
            //         }
            //     });
            //     return;
            // }
            
            inputFields.forEach((input, index) => {
                if (index > 0) {
                    const currentValue = parseFloat(input.value);
                    const resultSpan = document.getElementById(`result${index}`);
                    // const resultInput = document.getElementById(`input${index}`);

                    if(!isNaN(currentValue)){
                        if (isNaN(currentValue) || valuePri === 0 || valuePri < currentValue) {
                            resultSpan.textContent = 'Số phiếu không hợp lệ!';
                        } else {
                            const resultCoupon = valuePri - currentValue;
                            const resultPercent = (resultCoupon / valuePri)*100;
                            if(!isNaN(valuePri)){
                                resultSpan.textContent = `${resultCoupon}/${valuePri} phiếu, đạt ${(resultPercent).toFixed(2)}%`;
                                if(resultPercent < 50){
                                    resultSpan.style.color = 'red';
                                }else{
                                    resultSpan.style.color = '#2662ad';
                                }

                                calculateRank();
                            }
                        }
                    }
                }
            });
        });
    });
});

function calculateRank() {
    // Lấy giá trị từ các thẻ input và chuyển thành mảng
    const inputs = Array.from(document.querySelectorAll('.input-rank'));
    
    // Lấy giá trị từng input và chuyển thành số
    const values = inputs.map(input => parseInt(input.value));

    // Tạo một mảng lưu trữ các cặp giá trị và vị trí của chúng
    const valuePositions = values.map((value, index) => ({ value, position: index }));

    // Sắp xếp các cặp giá trị theo giá trị (tăng dần) và vị trí (tăng dần)
    valuePositions.sort((a, b) => {
        if (a.value !== b.value) {
            return a.value - b.value;
        }
        return a.position - b.position;
    });

    // Xác định xếp hạng cho mỗi giá trị
    const ranks = {};
    let currentRank = 1;
    let currentValue = valuePositions[0].value;
    valuePositions.forEach((item, index) => {
        if (item.value !== currentValue) {
            currentRank += 1;
            currentValue = item.value;
        }
        ranks[item.position] = currentRank;
    });
    // Gán xếp hạng cho mỗi input và thêm vào thẻ span bên cạnh
    inputs.forEach((input, index) => {
        const rank = ranks[index];
        const resultRank = document.getElementById(`rank${index + 1}`);
        resultRank.textContent = `${rank}`;
        resultRank.style.backgroundColor = '#2662ad';
    });
}