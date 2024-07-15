const fs = require('fs');
const path = require('path');

const mmdFilePath = path.join(__dirname, 'diagram.mmd');
const htmlFilePath = path.join(__dirname, 'diagram_with_image.html');
const outputHtmlFilePath = path.join(__dirname, 'diagram_with_image_updated.html');

// Read the Mermaid diagram from diagram.mmd
fs.readFile(mmdFilePath, 'utf8', (err, mmdData) => {
    if (err) {
        console.error('Error reading the Mermaid diagram file:', err);
        return;
    }

    // Read the HTML file
    fs.readFile(htmlFilePath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('Error reading the HTML file:', err);
            return;
        }

        // Insert the Mermaid diagram into the HTML file
        const updatedHtmlData = htmlData.replace(
            /<div class="mermaid">.*?<\/div>/s,
            `<div class="mermaid">\n${mmdData}\n</div>`
        );

        // Save the updated HTML file
        fs.writeFile(outputHtmlFilePath, updatedHtmlData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing the updated HTML file:', err);
                return;
            }

            console.log('The Mermaid diagram has been successfully injected into the HTML file.');
        });
    });
});
