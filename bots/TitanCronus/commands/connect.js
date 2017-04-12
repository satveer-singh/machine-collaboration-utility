const delay = Promise.delay;

module.exports = function connect(self, params) {
  try {
    if (self.fsm.current !== 'ready') {
      throw new Error(`Cannot connect from state "${self.fsm.current}"`);
    }
    self.fsm.connect();

    self.queue.queueCommands({
      open: true,
      postCallback: async () => {
        self.commands.toggleUpdater(self, { update: true });
        self.fsm.connectDone();
      },
    });
  } catch (ex) {
    self.logger.error('Connect fail.', ex);
    self.fsm.connectFail();
  }
  return self.getBot();
};
