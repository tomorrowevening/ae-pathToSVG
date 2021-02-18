function AEUI(context, name, width, height) {
  var window;
  if (context instanceof Panel) {
    window = context;
  } else {
    window = new Window("palette", name);
  }
  window.preferredSize.width = width;
  window.preferredSize.height = height;
  window.spacing = 2;
  window.layout.resize();

  this.addGroup = function () {
    var group = window.add("group{orientation:'row',alignment:'fill',margins:[4,0,0,0]}");;
    group.graphics.backgroundColor = group.graphics.newBrush(group.graphics.BrushType.SOLID_COLOR, [0, 0, 0, 0.2]);
    return group;
  };

  this.addButton = function (text, group) {
    var container = group !== undefined ? group : window;
    return container.add("button", undefined, text);
  };

  this.addText = function (text, group) {
    var container = group !== undefined ? group : window;
    var txt = container.add("statictext");
    txt.text = text;
    return txt;
  };

  this.addEditText = function (text, group) {
    var container = group !== undefined ? group : window;
    var txt = container.add("edittext{alignment:['fill','fill']}");
    txt.text = text;
    return txt;
  };

  this.show = function () {
    window.show();
  };

  this.getWindow = function () {
    return window;
  };
}
