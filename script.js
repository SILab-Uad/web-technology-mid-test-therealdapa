const generatePassword = (length, options) => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()";

    let characterSet = "";
    if (options.includeUppercase) characterSet += uppercase;
    if (options.includeLowercase) characterSet += lowercase;
    if (options.includeNumbers) characterSet += numbers;
    if (options.includeSpecialChars) characterSet += specialChars;

    if (characterSet.length === 0) {
        throw new Error("Setidaknya satu opsi harus dipilih untuk menghasilkan kata sandi.");
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characterSet.length);
        password += characterSet[randomIndex];
    }
    return password;
};

document.addEventListener("DOMContentLoaded", () => {
    const passwordLengthInput = document.getElementById("password-length");
    const includeUppercaseInput = document.getElementById("include-uppercase");
    const includeLowercaseInput = document.getElementById("include-lowercase");
    const includeNumbersInput = document.getElementById("include-numbers");
    const includeSpecialCharsInput = document.getElementById("include-special-chars");
    const generateButton = document.getElementById("generate-button");
    const passwordOutput = document.getElementById("password-output");
    const copyButton = document.getElementById("copy-button");

    generateButton.addEventListener("click", () => {
        const length = parseInt(passwordLengthInput.value);
        const options = {
            includeUppercase: includeUppercaseInput.checked,
            includeLowercase: includeLowercaseInput.checked,
            includeNumbers: includeNumbersInput.checked,
            includeSpecialChars: includeSpecialCharsInput.checked
        };

        if (length <= 0 || Object.values(options).every(option => !option)) {
            alert("Password tidak bisa dibuat.");
            return;
        }

        try {
            const password = generatePassword(length, options);
            passwordOutput.textContent = `nih sandi lu jink: ${password}`;
        } catch (error) {
            alert(error.message);
        }
    });

    copyButton.addEventListener("click", () => {
        const password = passwordOutput.textContent.replace("nih sandi lu jink: ", "");
        navigator.clipboard.writeText(password)
            .then(() => {
                alert("Sandi telah disalin!");
            })
            .catch(err => {
                console.error('Gagal menyalin: ', err);
            });
    });
});