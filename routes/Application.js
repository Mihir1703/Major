const Router = require('express').Router();
const Application = require('../models/Application');
const User = require('../models/User');
const Jobs = require('../models/Jobs');

Router.post('/getMine/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;
        const applications = await Application.find({ userId: user_id });
        applications.forEach(async (application) => {
            application.score = undefined;
        });
        res.json({ success: true, applications });
    } catch (err) {
        console.log(err);
        res.json({ success: false, err });
    }
});

Router.post('/get/:job_id', async (req, res) => {
    try {
        const { user_id } = req.body;
        const job = await Jobs.findById(req.params.job_id);
        if (!job) {
            res.status(200).json({ success: false, err: 'Job not found' });
            return;
        }
        if (job.userId.toString() !== user_id.toString()) {
            res.status(200).json({ success: false, err: 'Unauthorized' });
            return;
        }
        const applications = await Application.find({ jobId: req.params.job_id });
        res.status(200).json({ success: true, applications });
    } catch (err) {
        res.json({ success: false, err });
    }
});


module.exports = Router