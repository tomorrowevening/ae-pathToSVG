{
  #include "utils/AEUI.js";
  #include "utils/AESVG.js";

  var ui = new AEUI(this, "Path to SVG", 300, 100);
  var group;

  group = ui.addGroup();
  ui.addText("Vertices:", group);
  var txtVertices = ui.addEditText("", group);

  group = ui.addGroup();
  ui.addText("In Tangents:", group);
  var txtInTangents = ui.addEditText("", group);

  group = ui.addGroup();
  ui.addText("Out Tangents:", group);
  var txtOutTangents = ui.addEditText("", group);

  group = ui.addGroup();
  ui.addText("Path:", group);
  var txtSVG = ui.addEditText("", group);

  var uiBtn = ui.addButton('Log');
  uiBtn.alignment = "fill";
  uiBtn.onClick = function () {
    if (!app.project) {
      alert("Please open a project and highlight a path layer in your Composition.");
      return;
    }
    if (!app.project.activeItem || !app.project.activeItem instanceof CompItem) {
      alert("Please highlight a path layer in your Composition.");
      return;
    }
  
    var comp = app.project.activeItem;
    var time = comp.time;
    var props = comp.selectedProperties;
    var layer = comp.selectedLayers[0];
    var totalProps = props.length;
    var found = false;
    for (var i = 0; i < totalProps; ++i) {
      var prop = comp.selectedProperties[i];
      if (prop.matchName.search('Shape') < 0) {
        continue;
      }

      if (prop instanceof Property) {
        var transform = layer.property("Transform");
        var position = transform.property("Position").value;
        var shape = prop.valueAtTime(time, false);
        var vertices = shape.vertices;
        var inTangents = shape.inTangents;
        var outTangents = shape.outTangents;
        txtVertices.text = vertices.join(', ');
        txtInTangents.text = inTangents.join(', ');
        txtOutTangents.text = outTangents.join(', ');
        txtSVG.text = '<path d="' + pathToSVG(
          vertices,
          inTangents,
          outTangents,
          shape.closed,
          -position[0],
          -position[1]
        ) + '"></path>';
        found = true;
        break;
      }
    }

    if (!found) {
      alert("Please highlight a path in your Composition.");
    }
  };

  ui.show();
}
