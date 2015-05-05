var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
    title: {type: String, required: '{PATH} is required!'},
    featured: {type: Boolean, required: '{PATH} is required!'},
    published: {type: Date, required: '{PATH} is required!'},
    tags: [String]
});

var Course = mongoose.model('Course', courseSchema);

function createDefaultCourses() {
    console.log('Inside createDefaultCourses...');
    Course.find({}).exec(function (err, collection) {
        console.log('Inside createDefaultCourses...' + collection.length);
        console.log('Inside createDefaultCourses...' + err);
        if (collection.length === 0) {
            console.log('Inside createDefaultCourses... adding');
            Course.create({title: 'First Course', featured: true, published: new Date("October 13, 2013 11:13:00")});
            Course.create({title: 'Second Course', featured: false, published: new Date("July 1, 2014 10:23:00")});
            Course.create({title: 'Third Course', featured: true, published: new Date("January 15, 2015 10:23:00")});
            Course.create({title: 'Course 4', featured: true, published: new Date("January 1, 2015 10:23:00")});
            Course.create({title: 'Course 5', featured: true, published: new Date("January 4, 2015 10:23:00")});
            Course.create({title: 'Course 6', featured: false, published: new Date("January 5, 2015 10:23:00")});
            Course.create({title: 'Course 7', featured: true, published: new Date("January 15, 2015 10:23:00")});
            Course.create({title: 'Course 8', featured: false, published: new Date("January 25, 2015 10:23:00")});
            Course.create({title: 'Course 9', featured: true, published: new Date("January 26, 2015 10:23:00")});
            Course.create({title: 'Course 10', featured: true, published: new Date("January 28, 2015 10:23:00")});
        }
    });
}

exports.createDefaultCourses = createDefaultCourses;