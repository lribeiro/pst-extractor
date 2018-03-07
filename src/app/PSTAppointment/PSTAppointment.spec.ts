import { PSTAppointment } from './PSTAppointment.class';
import * as chai from 'chai';
import * as mocha from 'mocha';
import { PSTFile } from '../PSTFile/PSTFile.class';
import { PSTFolder } from '../PSTFolder/PSTFolder.class';
const resolve = require('path').resolve;
const expect = chai.expect;
let pstFile: PSTFile;
let folder: PSTFolder;

before(() => {
    pstFile = new PSTFile(resolve('./src/testdata/mtnman1965@outlook.com.ost'));

    // get to Calendar folder
    let childFolders: PSTFolder[] = pstFile.getRootFolder().getSubFolders();
    folder = childFolders[1]; // Root - Mailbox
    childFolders = folder.getSubFolders();
    folder = childFolders[4]; // IPM_SUBTREE
    childFolders = folder.getSubFolders();
    folder = childFolders[11]; // Calendar
});

after(() => {
    pstFile.close();
});

describe('PSTActivity tests', () => {
    it('should have a Journal folder', () => {
        expect(folder.displayName).to.equal('Calendar');
    });

    it('should have two calendar items', () => {
        let appt: PSTAppointment = folder.getNextChild();
        // console.log(appt.toJSONstring())
        expect(appt.messageClass).to.equal('IPM.Appointment');
        expect(appt.subject).to.equal('get lunch');
        expect(appt.startTime).to.eql(new Date("2018-03-04T19:00:00.000Z"));
        expect(appt.senderName).to.equal('Mountain Man');
        expect(appt.duration).to.equal(60);

        appt = folder.getNextChild();
        // console.log(appt.toJSONstring())
        expect(appt.messageClass).to.equal('IPM.Appointment');
        expect(appt.subject).to.equal('workout');
        expect(appt.creationTime).to.eql(new Date("2018-03-05T20:26:12.738Z"));
        expect(appt.senderName).to.equal('Mountain Man');
        expect(appt.duration).to.equal(60);
    });
});