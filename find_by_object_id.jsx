#target "indesign"
#targetengine 'cc.milligramme.find_with_object_id'
#include './scriptui_boilerplate/ui/index.jsx'


var find_with_object_id = function (obj_id) {
  var doc = app.activeDocument;
  var api = doc.allPageItems;
  for (var i=0, len=api.length; i < len ; i++) {
    if (api[i].id == obj_id) {
      return api[i];
    }
  };
  return null
}

var main = function () {
  var ui = new UI('window', {title: "🔎"});
  var win = ui.win;

  ui.add_text(win, {text: "Object ID: "});
  ui.add_input(win, {text: "", size: [120,32], name: 'input_obj_id'});
  ui.add_text(win, {text: "", size: [120,32], name: 'console', multiline: true});

  ui.add_button(win, {text: "Search", name: "ok"});


  win['ok'].onClick = function () {
    var obj_id_text = win['input_obj_id'].text;
    win['console'].text = "";
    var ret = find_with_object_id(obj_id_text);
    
    if (ret !== null) {
      ret.select();
    }
    else {
      app.selection = NothingEnum.NOTHING;
      win['console'].text = "no found object ID:" + obj_id_text;
    }
  }
  win.show();
}

main();