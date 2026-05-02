(function() {
    const patterns = {
        name: /^[A-Za-z ]{3,}$/,
        address: /^[A-Za-z0-9,\/ ]{5,}$/,
        contact: /^(?:\+94|0)?7[0-9]{8}$/,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        amount: /^\d+(\.\d{1,2})?$/,
    };

    function validateField(element, regex) {
        if (!element || element.val() === undefined) return false;
        const value = element.val().trim();
        if (regex.test(value)) {
            element.removeClass("is-invalid").addClass("is-valid");
            return true;
        } else {
            element.removeClass("is-valid").addClass("is-invalid");
            return false;
        }
    }

    function validateForm(rules) {
        let isAllValid = true;
        for (const rule of rules) {
            if (!validateField(rule.element, rule.regex)) {
                isAllValid = false;
            }
        }
        return isAllValid;
    }

    function clearValidation(selector = ".form-control") {
        $(selector).removeClass("is-invalid is-valid");
    }

    window.patterns = patterns;
    window.validateField = validateField;
    window.validateForm = validateForm;
    window.clearValidation = clearValidation;
})();