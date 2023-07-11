import {app} from "../src/app";
import request from 'supertest';
import {expect} from 'chai';
import * as path from "path";


describe('Tests..', () => {
    describe('POST /grid/data', function () {
        it('Checking controller for correct response status', function (done) {
            request(app)
                .post('/grid/data')
                .set('Accept', 'multipart/form-data')
                .field('event', 'grid')
                .attach('grid', path.join(process.cwd(), 'tests', 'resources', 'sst.grid'))
                .expect(200)
                .end((err, res) => {
                    if (err) done(err)
                    expect(res.body).to.be.an('Array');
                })
            done()
        });
    });
});
