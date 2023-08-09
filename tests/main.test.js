const { expect } = require('chai');
const lepik = require('../index.js');

describe('lepik', function () {

  this.timeout(5000);

  after(() => {
    lepik.close();
  });

  it('should initialize correctly', () => {
    expect(lepik.ps).to.not.be.null;
  });

  describe('getMousePosition()', () => {
    it('should return mouse position', async () => {
      const position = await lepik.getMousePosition();
      expect(position).to.be.an('object');
      expect(position).to.have.property('x').that.is.a('number');
      expect(position).to.have.property('y').that.is.a('number');
    });
  });

  describe('mouseClick()', () => {
    it('should not throw an error', async () => {
      expect(() => lepik.mouseClick('left', 1)).to.not.throw();
    });
  });

  describe('mouseDoubleClick()', () => {
    it('should not throw an error', async () => {
      expect(() => lepik.mouseDoubleClick('left')).to.not.throw();
    });
  });

  describe('mouseScroll()', () => {
    it('should not throw an error', async () => {
      expect(() => lepik.mouseScroll(1)).to.not.throw();
    });
  });

  describe('mouseMove()', () => {
    it('should not throw an error', async () => {
      expect(() => lepik.mouseMove(100, 100, true)).to.not.throw();
    });
  });

  describe('keyDown()', () => {
    it('should not throw an error', async () => {
      expect(() => lepik.keyDown('Shift')).to.not.throw();
    });
  });

  describe('keyUp()', () => {
    it('should not throw an error', async () => {
      expect(() => lepik.keyUp('Shift')).to.not.throw();
    });
  });

  describe('copy()', () => {
    it('should not throw an error', async () => {
      expect(() => lepik.copy()).to.not.throw();
    });
  });

  describe('getActiveWindow()', () => {
    it('should return a number', async () => {
      const windowId = await lepik.getActiveWindow();
      expect(windowId).to.be.a('number');
    });
  });

  describe('setActiveWindow()', () => {
    it('should not throw an error', async () => {
      const windowId = await lepik.getActiveWindow();
      console.log("IN windowId::::: " + windowId)
      expect(() => lepik.setActiveWindow(windowId)).to.not.throw();
    });
  });

  describe('getWindowTitle()', () => {
    it('should return a string', async () => {
      const title = await lepik.getWindowTitle('window123');
      expect(title).to.be.a('string');
    });
  });

  describe('getWindowSize()', () => {
    it('should return an object with width and height', async () => {
      const windowId = await lepik.getActiveWindow();
      console.log("IN windowId::::: " + windowId)
      const size = await lepik.getWindowSize(windowId);
      console.log("IN SIZES::::: " + size)
      expect(size).to.be.an('object');
      expect(size).to.have.property('width').that.is.a('number');
      expect(size).to.have.property('height').that.is.a('number');
    });
  });

  describe('delay()', () => {
    it('should not throw an error', async () => {
      expect(() => lepik.delay(1000)).to.not.throw();
    });
  });
})