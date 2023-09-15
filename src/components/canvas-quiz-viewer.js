AFRAME.registerComponent("canvas-quiz-viewer", {
  init() {
    console.log("Canvas Quiz Viewer: Hello World");

    this.boxMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.1, 0.1),
      new THREE.MeshPhysicalMaterial()
    );
    this.el.object3D.add(this.boxMesh);

    this.textElement2 = document.createElement("a-entity");
    this.textElement2.setAttribute("text", "value: This is the Canvas Quiz Cube custom component");
    this.textElement2.setAttribute("position", "0 0.2 0");
    this.el.appendChild(this.textElement2);

    this.fetchData();
  },

  async fetchData() {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1",
      {
        method: "GET"
      }
    );
    const data = await response.json();
    this.textElement = document.createElement("a-entity");
    this.textElement.setAttribute("text", `value: ${data.title}`);
    this.el.appendChild(this.textElement);
  }
});