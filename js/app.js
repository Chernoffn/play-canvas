var canvas = document.getElementById("application-canvas");

// Create the application and start the update loop
var application = new pc.fw.Application(canvas);
application.start();

// Set the canvas to fill the window and automatically change resolution to be the same as the canvas size
application.setCanvasFillMode(pc.fw.FillMode.FILL_WINDOW);
application.setCanvasResolution(pc.fw.ResolutionMode.AUTO);

application.context.scene.ambientLight = new pc.Color(0.2, 0.2, 0.2);

// Create a Entity with a Box model component
var box = new pc.fw.Entity();
application.context.systems.model.addComponent(box, {
    type: "box",
});

// Create an Entity with a point light component and a sphere model component.
var light = new pc.fw.Entity();
application.context.systems.light.addComponent(light, {
    type: "point",
    color: new pc.Color(1, 0, 0),
    radius: 10
});
application.context.systems.model.addComponent(light, {
    type: "sphere"
});
// Scale the sphere down to 0.1m
light.setLocalScale(0.1, 0.1, 0.1);

// Create an Entity with a camera component
var camera = new pc.fw.Entity();
application.context.systems.camera.addComponent(camera, {
    clearColor: new pc.Color(0.4, 0.45, 0.5)
});

// Add the new Entities to the hierarchy
application.context.root.addChild(box);
application.context.root.addChild(light);
application.context.root.addChild(camera);

// Move the camera 10m along the z-axis
camera.translate(0, 0, 10);

// Set an update function on the application's update event
var angle = 0;
application.on("update", function (dt) {
    angle += dt;
    if (angle > 360) {
        angle = 0;
    }

    // Move the light in a circle
    light.setLocalPosition(3 * Math.sin(angle), 0, 3 * Math.cos(angle));

    // Rotate the box
    box.setEulerAngles(angle*2, angle*4, angle*8);
});
