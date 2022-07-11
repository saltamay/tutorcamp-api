import express from 'express';
import request from 'supertest';
import mongoose from 'mongoose';

import { createApp, server } from '../../index.js';
import { Bootcamp } from '../models/bootcamp.model.js';
import { connectDatabase } from '../database/index.js';

const app = createApp();
const uri = '/api/v1/bootcamps';

const createBootcamp = () => {
  return {
    name: 'ModernTech Bootcamp',
    description:
      'ModernTech has one goal, and that is to make you a rockstar developer and/or designer with a six figure salary. We teach both development and UI/UX',
    website: 'https://moderntech.com',
    phone: '(222) 222-2222',
    email: 'enroll@moderntech.com',
    address: '220 Pawtucket St, Lowell, MA 01854',
    careers: ['Web Development', 'UI/UX', 'Mobile Development'],
    housing: false,
    jobAssistance: true,
    jobGuarantee: false,
    acceptGi: true,
  };
};

afterEach(() => {
  return Bootcamp.deleteMany({});
});

afterAll((done) => {
  server.close();
  done();
});

describe('Bootcamps Controller', () => {
  describe('GET /bootcamps', () => {
    it('should respond with a 200 OK status code', async () => {
      const res = await request(app).get(uri);
      expect(res.status).toBe(200);
    });

    it('should respond with success => true', async () => {
      const res = await request(app).get(uri);
      expect(res.body.success).toBe(true);
    });

    it('should respond with json', async () => {
      const res = await request(app).get(uri);
      expect(res.headers['content-type']).toContain('json');
    });

    it('should return an empty array when there are no bootcamps', async () => {
      const res = await request(app).get(uri);
      expect(res.body.data).toEqual([]);
    });

    it('should return an array with bootcamps', async () => {
      const bootcamp = createBootcamp();
      await request(app).post(uri).send(bootcamp);

      const res = await request(app).get(uri);

      expect(res.body.data).toEqual(
        expect.arrayContaining([expect.objectContaining(bootcamp)])
      );
    });
  });

  describe('POST /bootcamps', () => {
    it('return 201 OK when bootcamp is successfuly created', (done) => {
      const bootcamp = createBootcamp();
      request(app).post(uri).send(bootcamp).expect(201, done);
    });
  });
});
