// Wait for the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // Function to render math
    function renderMath(mathExpression) {
        // Select the element where you want to render math
        const mathContainer = document.getElementById('mathContainer');
        
        // Set the inner HTML of the math container to the math expression
        mathContainer.textContent = 'What is the numerical coefficient of the leading term \\[' + mathExpression + '\\]';
        
        // Trigger MathJax to render the math
        MathJax.typesetPromise();
    }

    // Call the renderMath function with a sample expression
    renderMath("\\frac{1}{2} + \\frac{1}{3} = \\frac{5}{6}");
});
