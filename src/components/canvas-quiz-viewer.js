

AFRAME.registerComponent("canvas-quiz-viewer", {
  init: function() {
    console.log("Canvas Quiz Viewer: Hello World");

    async function fetchData() {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
        method: "GET"
      });
      const data = await response.json();

      this.textElement = document.createElement("a-entity");
      this.textElement.setAttribute("text", `value: ${data.body}`);
      this.el.appendChild(this.textElement);
    }

    this.boxMesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 0.1),
        new THREE.MeshPhysicalMaterial()
    )
    this.el.object3D.add(this.boxMesh);

    fetchData();
  }
})