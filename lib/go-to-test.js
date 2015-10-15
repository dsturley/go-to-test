var CompositeDisposable, GoToTest;

CompositeDisposable = require('atom').CompositeDisposable;

module.exports = GoToTest = {
  modalPanel: null,
  subscriptions: null,
  activate: function(state) {
    var self = this;
    this.subscriptions = new CompositeDisposable();
    return this.subscriptions.add(atom.commands.add('atom-workspace', {
      'go-to-test:go': function() {
        return self.go();
      }
    }));
  },
  deactivate: function() {
    console.log('off');
  },
  go: function() {
    var editor = atom.workspace.getActivePaneItem();
    var file = editor && editor.buffer.file;
    var filePath = file && file.path;
    if (!file || !filePath) { return; }
    var relativePath = atom.project.relativizePath(filePath)[1];
    if (!/^test\//.test(relativePath)) {
      atom.workspace.open('test/' + relativePath);
    }
  }
};
