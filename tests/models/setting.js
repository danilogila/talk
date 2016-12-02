const Setting = require('../../models/setting');
const expect = require('chai').expect;

describe('Setting: model', () => {

  beforeEach(() => {
    const defaults = {
      id: 1
    };
    return Setting.update({id: '1'}, {$setOnInsert: defaults}, {upsert: true});
  });

  describe('#getSettings()', () => {
    it('should have a moderation field defined', () => {
      return Setting.getSettings().then(settings => {
        expect(settings).to.have.property('moderation').and.to.equal('pre');
      });
    });

    it('should have two infoBox fields defined', () => {
      return Setting.getSettings().then(settings => {
        expect(settings).to.have.property('infoBoxEnable').and.to.equal(false);
        expect(settings).to.have.property('infoBoxContent').and.to.equal('');
      });
    });
  });

  describe('#updateSettings()', () => {
    it('should update the settings with a passed object', () => {
      const mockSettings = {moderation: 'post', infoBoxEnable: true, infoBoxContent: 'yeah'};
      return Setting.updateSettings(mockSettings).then(updatedSettings => {
        expect(updatedSettings).to.be.an('object');
        expect(updatedSettings).to.have.property('moderation').and.to.equal('post');
        expect(updatedSettings).to.have.property('infoBoxEnable', true);
        expect(updatedSettings).to.have.property('infoBoxContent', 'yeah');
      });
    });
  });

  describe('#getPublicSettings', () => {
    it('should return the moderation settings', () => {
      return Setting.getPublicSettings().then(({moderation, infoBoxEnable, infoBoxContent, wordlist}) => {
        expect(moderation).not.to.be.null;
        expect(infoBoxEnable).not.to.be.null;
        expect(infoBoxContent).not.to.be.null;
        expect(wordlist).to.be.undefined;
      });
    });
  });
});