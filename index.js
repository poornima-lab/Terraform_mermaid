const fs = require('fs');

// Function to read and parse the tfstate file
function readTfState(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

// Function to extract resources from tfstate
function extractResources(tfState) {
    return tfState.resources.map(resource => {
        return {
            type: resource.type,
            name: resource.name,
            dependencies: resource.depends_on || [],
            instances: resource.instances.map(instance => ({
                id: instance.attributes.id || instance.attributes.name,
                ...instance.attributes
            }))
        };
    });
}

// Function to generate Mermaid diagram code
function generateMermaidDiagram(resources) {
    let diagram = 'graph TD\n';
    
    resources.forEach(resource => {
        resource.instances.forEach(instance => {
            const nodeName = `${resource.type}_${instance.id}`.replace(/[\.\-]/g, '_');
            diagram += `${nodeName}["${resource.type}-${instance.id}"]\n`;
        });
    });

    resources.forEach(resource => {
        resource.dependencies.forEach(dep => {
            const targetResource = resources.find(r => `${r.type}.${r.name}` === dep);
            if (targetResource) {
                targetResource.instances.forEach(targetInstance => {
                    const fromNode = `${resource.type}_${resource.instances[0].id}`.replace(/[\.\-]/g, '_');
                    const toNode = `${targetResource.type}_${targetInstance.id}`.replace(/[\.\-]/g, '_');
                    diagram += `${toNode} --> ${fromNode}\n`;
                });
            }
        });
    });

    return diagram;
}

// Read the tfstate file
const tfState = readTfState('terraform.tfstate');

// Extract resources and dependencies
const resources = extractResources(tfState);

// Generate Mermaid diagram content
const mermaidDiagram = generateMermaidDiagram(resources);

// Write Mermaid diagram to a file
fs.writeFileSync('diagram.mmd', mermaidDiagram);

console.log('Mermaid diagram generated successfully.');
console.log(mermaidDiagram);
