addEventListeners();

function addEventListeners() {
    let inputs = document.querySelectorAll(".input100");

    for (let input of inputs) {
        console.log(input);

        let placeholder = input.placeholder;

        input.addEventListener('focus', function() {
            input.placeholder = "";
        });

        input.addEventListener('blur', function() {
            setTimeout(function() {
                if (input.value == "")
                    input.placeholder = placeholder;
            }, 200);
        });
    }
        
    
}