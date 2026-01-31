const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String, // Rich text or markdown
    },
    image: {
        type: String,
        required: true
    },
    tags: [String],
    liveUrl: String,
    sourceUrl: String,
    featured: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
