document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('generatePDF');

  btn.addEventListener('click', () => {
    const htmlContent = document.getElementById('userText').value.trim();

    if (!htmlContent) {
      alert('Please paste your HTML conversation first.');
      return;
    }

    // Create a container div for PDF rendering
    const container = document.createElement('div');
    container.innerHTML = htmlContent;

    // Optional: style code blocks
    container.querySelectorAll('pre code').forEach(block => {
      block.style.background = '#f5f5f5';
      block.style.padding = '10px';
      block.style.borderRadius = '5px';
      block.style.fontFamily = 'monospace';
      block.style.whiteSpace = 'pre-wrap';
    });

    // Optional: style chat bubbles if you labeled messages with roles
    container.querySelectorAll('.user').forEach(div => {
      div.style.background = '#DCF8C6';
      div.style.padding = '12px';
      div.style.borderRadius = '10px';
      div.style.marginBottom = '10px';
    });
    container.querySelectorAll('.ChatGPT').forEach(div => {
      div.style.background = '#FFFFFF';
      div.style.padding = '12px';
      div.style.borderRadius = '10px';
      div.style.marginBottom = '10px';
    });

    // PDF options
    const opt = {
      margin: 0.5,
      filename: 'chatgpt-conversation.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    document.body.appendChild(container);
    html2pdf().set(opt).from(container).save().then(() => {
      document.body.removeChild(container);
    });
  });
});
