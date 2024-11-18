export function generatePrintableHTML(combination: any) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${combination.name} - Herb Combination Details</title>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.5; }
          .container { max-width: 800px; margin: 0 auto; padding: 2rem; }
          h1 { color: #166534; }
          .section { margin-bottom: 1.5rem; }
          .label { font-weight: 600; color: #374151; }
          .reference { margin-left: 1rem; font-style: italic; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>${combination.name}</h1>
          <div class="section">
            <p>${combination.description}</p>
          </div>
          <div class="section">
            <div class="label">Herbs:</div>
            <ul>
              ${combination.herbs.map((herb: string) => `<li>${herb}</li>`).join('')}
            </ul>
          </div>
          <div class="section">
            <div class="label">Benefits:</div>
            <ul>
              ${combination.benefits.map((benefit: string) => `<li>${benefit}</li>`).join('')}
            </ul>
          </div>
          <div class="section">
            <div class="label">Scientific Evidence:</div>
            ${combination.scientificEvidence.map((evidence: any) => `
              <p>${evidence.summary}</p>
              <div class="reference">
                ${evidence.references.map((ref: string) => `<p>${ref}</p>`).join('')}
              </div>
            `).join('')}
          </div>
          <div class="section">
            <div class="label">Dosage:</div>
            <p>${combination.dosage}</p>
          </div>
          <div class="section">
            <div class="label">Interactions:</div>
            <ul>
              ${combination.interactions.map((interaction: string) => `<li>${interaction}</li>`).join('')}
            </ul>
          </div>
          <div class="section">
            <div class="label">Contraindications:</div>
            <ul>
              ${combination.contraindications.map((contraindication: string) => `<li>${contraindication}</li>`).join('')}
            </ul>
          </div>
          <footer>
            <p><small>Generated on ${new Date().toLocaleDateString()}</small></p>
          </footer>
        </div>
      </body>
    </html>
  `;
}

export function printCombination(combination: any) {
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(generatePrintableHTML(combination));
    printWindow.document.close();
    printWindow.print();
  }
}

export function shareCombination(combination: any) {
  if (navigator.share) {
    navigator.share({
      title: combination.name,
      text: `Check out this herb combination: ${combination.name}`,
      url: window.location.href
    });
  } else {
    // Fallback to copying to clipboard
    const url = window.location.href;
    navigator.clipboard.writeText(
      `${combination.name}\n\n${combination.description}\n\nView more at: ${url}`
    );
  }
}